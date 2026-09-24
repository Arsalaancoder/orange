import React from 'react';
import { useAuth as useClerkAuth, useUser as useClerkUser } from '@clerk/clerk-react';

export function useAdminAuth() {
  const clerkAuth = useClerkAuth();
  const clerkUser = useClerkUser();

  const userObj = React.useMemo(() => {
    if (!clerkUser.user) return null;
    return {
      id: clerkUser.user.id,
      fullName: clerkUser.user.fullName || clerkUser.user.firstName || 'Admin User',
      primaryEmailAddress: {
        emailAddress: clerkUser.user.primaryEmailAddress?.emailAddress || 'admin@orange-paramedical.edu',
      },
    };
  }, [
    clerkUser.user?.id,
    clerkUser.user?.fullName,
    clerkUser.user?.firstName,
    clerkUser.user?.primaryEmailAddress?.emailAddress,
  ]);

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
