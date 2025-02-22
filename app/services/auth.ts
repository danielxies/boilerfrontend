const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
const CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
const CLIENT_SECRET = 'jEGRfourUj7TyR4MHAO18dEikuCY2Ch6VGY97TNIrbIdXDQlVje1HWjY4hs-TA-B';
const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}` : '';

export const auth = {
  login: () => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID!,
      redirect_uri: REDIRECT_URI,
      scope: 'openid profile email',
      audience: `https://${AUTH0_DOMAIN}/api/v2/`,
    });

    window.location.href = `https://${AUTH0_DOMAIN}/authorize?${params.toString()}`;
  },

  handleCallback: async (code: string) => {
    try {
      const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: CLIENT_ID!,
          client_secret: CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for tokens');
      }

      const tokens = await response.json();
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('id_token', tokens.id_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      
      return tokens;
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw error;
    }
  },

  logout: () => {
    // Clear tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    
    // Redirect to Auth0 logout
    const params = new URLSearchParams({
      client_id: CLIENT_ID!,
      returnTo: REDIRECT_URI,
    });
    
    window.location.href = `https://${AUTH0_DOMAIN}/v2/logout?${params.toString()}`;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  getAccessToken: () => {
    return localStorage.getItem('access_token');
  },

  getUser: async () => {
    const accessToken = auth.getAccessToken();
    if (!accessToken) return null;

    try {
      const response = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user info');
      }

      return response.json();
    } catch (error) {
      console.error('Error getting user info:', error);
      return null;
    }
  },
}; 