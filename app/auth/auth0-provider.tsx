'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';

export const Auth0ProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const redirectUri = typeof window !== 'undefined' ? window.location.origin : '';

  if (!(domain && clientId)) {
    return null;
  }

  const onRedirectCallback = (appState: any) => {
    // Always redirect to /interview after successful login
    router.push('/interview');
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}; 