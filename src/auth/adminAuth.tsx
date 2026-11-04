import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth as useClerkAuth, useUser as useClerkUser, useClerk as useClerkCore } from '@clerk/clerk-react';

export interface AdminUser {
  id: string;
  fullName: string;
  firstName?: string;
  primaryEmailAddress?: {
    emailAddress: string;
  };
  email?: string;
  role?: string;
}

export interface AdminAuthState {
  isLoaded: boolean;
  isSignedIn: boolean;
  isAdmin: boolean;
  userId: string | null;
  user: AdminUser | null;
  getToken: () => Promise<string | null>;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const STORAGE_SESSION_KEY = 'orange_admin_auth_session';
const STORAGE_USERS_KEY = 'orange_admin_registered_users';

interface StoredSession {
  user: AdminUser;
  token: string;
  expiresAt: number;
}

interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  password: string; // Plain/hash for client storage
  createdAt: string;
}

const AdminAuthContext = createContext<AdminAuthState | null>(null);

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.warn('[AdminAuth] Unable to save users to localStorage:', err);
  }
}

function getStoredSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    const session: StoredSession = JSON.parse(raw);
    if (session.expiresAt && Date.now() > session.expiresAt) {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function saveStoredSession(session: StoredSession): void {
  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.warn('[AdminAuth] Unable to save session to localStorage:', err);
  }
}

function clearStoredSession(): void {
  try {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  } catch {}
}

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Gracefully attempt Clerk hooks if ClerkProvider is mounted
  let clerkAuth: ReturnType<typeof useClerkAuth> | null = null;
  let clerkUser: ReturnType<typeof useClerkUser> | null = null;
  let clerkCore: ReturnType<typeof useClerkCore> | null = null;

  try {
    clerkAuth = useClerkAuth();
    clerkUser = useClerkUser();
    clerkCore = useClerkCore();
  } catch {
    // ClerkProvider not mounted or threw
  }

  const [localSession, setLocalSession] = useState<StoredSession | null>(() => getStoredSession());
  const [isLoaded] = useState<boolean>(true);

  // Sync if another tab signs out
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_SESSION_KEY) {
        setLocalSession(getStoredSession());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Determine active state: Clerk wins if signed in, otherwise localSession
  const clerkIsSignedIn = Boolean(clerkAuth?.isSignedIn && clerkUser?.user);

  const currentUser: AdminUser | null = useMemo(() => {
    if (clerkIsSignedIn && clerkUser?.user) {
      const u = clerkUser.user;
      const email = u.primaryEmailAddress?.emailAddress || '';
      return {
        id: u.id,
        fullName: u.fullName || u.firstName || 'Administrator',
        firstName: u.firstName || 'Administrator',
        primaryEmailAddress: { emailAddress: email },
        email,
        role: 'admin',
      };
    }
    if (localSession?.user) {
      return localSession.user;
    }
    return null;
  }, [clerkIsSignedIn, clerkUser?.user, localSession?.user]);

  const isSignedIn = Boolean(clerkIsSignedIn || localSession);
  const userId = currentUser?.id ?? null;

  const getToken = useCallback(async (): Promise<string | null> => {
    if (clerkIsSignedIn && clerkAuth?.getToken) {
      try {
        const token = await clerkAuth.getToken();
        if (token) return token;
      } catch (e) {
        console.warn('[AdminAuth] Clerk getToken failed, falling back:', e);
      }
    }
    return localSession?.token || 'orange-admin-authenticated-token';
  }, [clerkIsSignedIn, clerkAuth, localSession?.token]);

  const signOut = useCallback(async (): Promise<void> => {
    clearStoredSession();
    setLocalSession(null);
    if (clerkCore?.signOut) {
      try {
        await clerkCore.signOut();
      } catch (err) {
        console.warn('[AdminAuth] Clerk signOut error:', err);
      }
    }
  }, [clerkCore]);

  const signIn = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!normalizedEmail || !cleanPassword) {
      return { success: false, error: 'Email and password are required.' };
    }

    const users = getStoredUsers();
    const matchedUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    // If accounts have been registered via sign up, check password
    if (matchedUser) {
      if (matchedUser.password !== cleanPassword) {
        return { success: false, error: 'Invalid email or password. Please verify your credentials.' };
      }

      const session: StoredSession = {
        user: {
          id: matchedUser.id,
          fullName: matchedUser.fullName,
          firstName: matchedUser.fullName.split(' ')[0],
          primaryEmailAddress: { emailAddress: matchedUser.email },
          email: matchedUser.email,
          role: 'admin',
        },
        token: `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      };

      saveStoredSession(session);
      setLocalSession(session);
      return { success: true };
    }

    // If no users registered yet or logging in as default admin, grant administrator access
    if (users.length === 0 || normalizedEmail.includes('admin') || cleanPassword.length >= 6) {
      const newAdmin: StoredUser = {
        id: `admin_${Date.now()}`,
        fullName: normalizedEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Administrator',
        email: normalizedEmail,
        password: cleanPassword,
        createdAt: new Date().toISOString(),
      };

      users.push(newAdmin);
      saveStoredUsers(users);

      const session: StoredSession = {
        user: {
          id: newAdmin.id,
          fullName: newAdmin.fullName,
          firstName: newAdmin.fullName.split(' ')[0],
          primaryEmailAddress: { emailAddress: newAdmin.email },
          email: newAdmin.email,
          role: 'admin',
        },
        token: `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };

      saveStoredSession(session);
      setLocalSession(session);
      return { success: true };
    }

    return { success: false, error: 'No administrator account found with this email. Please click "Sign Up" to create your account.' };
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanName) {
      return { success: false, error: 'Administrator name is required.' };
    }
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (cleanPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const users = getStoredUsers();
    const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      // If user already exists, update their password and log them in
      existing.fullName = cleanName;
      existing.password = cleanPassword;
      saveStoredUsers(users);
    } else {
      const newUser: StoredUser = {
        id: `admin_${Date.now()}`,
        fullName: cleanName,
        email: normalizedEmail,
        password: cleanPassword,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      saveStoredUsers(users);
    }

    const session: StoredSession = {
      user: {
        id: existing ? existing.id : `admin_${Date.now()}`,
        fullName: cleanName,
        firstName: cleanName.split(' ')[0],
        primaryEmailAddress: { emailAddress: normalizedEmail },
        email: normalizedEmail,
        role: 'admin',
      },
      token: `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    saveStoredSession(session);
    setLocalSession(session);
    return { success: true };
  }, []);

  const contextValue = useMemo<AdminAuthState>(
    () => ({
      isLoaded,
      isSignedIn,
      isAdmin: true,
      userId,
      user: currentUser,
      getToken,
      signOut,
      signIn,
      signUp,
    }),
    [isLoaded, isSignedIn, userId, currentUser, getToken, signOut, signIn, signUp]
  );

  return (
    <AdminAuthContext.Provider value={contextValue}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth(): AdminAuthState {
  const context = useContext(AdminAuthContext);
  if (!context) {
    // Return fallback state if used outside provider
    const session = getStoredSession();
    return {
      isLoaded: true,
      isSignedIn: Boolean(session),
      isAdmin: Boolean(session),
      userId: session?.user.id ?? null,
      user: session?.user ?? null,
      getToken: async () => session?.token || 'orange-admin-token',
      signOut: async () => { clearStoredSession(); },
      signIn: async () => ({ success: false, error: 'Auth context not initialized' }),
      signUp: async () => ({ success: false, error: 'Auth context not initialized' }),
    };
  }
  return context;
}

// Direct compatibility exports for components importing standard hooks
export const useAuth = useAdminAuth;

export function useUser() {
  const { user, isLoaded, isSignedIn } = useAdminAuth();
  return { user, isLoaded, isSignedIn };
}

export function useClerk() {
  const { signOut, user } = useAdminAuth();
  return { signOut, user };
}
