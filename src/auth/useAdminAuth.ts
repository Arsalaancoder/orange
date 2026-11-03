import { useMemo } from 'react';
import { authClient } from './authClient';

export function useAdminAuth() {
  const { data, isPending, error } = authClient.useSession();
  const user = data?.user;

  return useMemo(() => ({
    isLoaded: !isPending,
    isSignedIn: Boolean(user),
    isAdmin: user?.role === 'admin',
    userId: user?.id ?? null,
    user: user ? {
      id: user.id,
      fullName: user.name,
      primaryEmailAddress: { emailAddress: user.email },
    } : null,
    error,
    signOut: authClient.signOut,
  }), [isPending, user, error]);
}
