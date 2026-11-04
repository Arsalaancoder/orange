import React from 'react';
import { useAuth as useClerkAuth, useUser as useClerkUser } from '@clerk/clerk-react';

export function useAdminAuth() {
  const clerkAuth = useClerkAuth();
  const clerkUser = useClerkUser();

  const userObj = React.useMemo(() => {
    if (!clerkUser.user) return null;
    return {
      id: clerkUser.user.id,
      fullName: clerkUser.user.fullName || clerkUser.user.firstName || 'Administrator',
      primaryEmailAddress: {
        emailAddress: clerkUser.user.primaryEmailAddress?.emailAddress || '',
      },
    };
  }, [clerkUser.user]);

  return React.useMemo(
    () => ({
      isLoaded: clerkAuth.isLoaded,
      isSignedIn: !!clerkAuth.isSignedIn,
      userId: clerkAuth.userId ?? null,
      user: userObj,
      getToken: clerkAuth.getToken,
      signOut: clerkAuth.signOut,
    }),
    [
      clerkAuth.isLoaded,
      clerkAuth.isSignedIn,
      clerkAuth.userId,
      userObj,
      clerkAuth.getToken,
      clerkAuth.signOut,
    ]
  );
}
