export const environment = {
  authConfig: {
    // Url of the Identity Provider
    issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_k2IuT3Myb',
    logoutUrl:
      'https://saman-core.auth.us-east-1.amazoncognito.com/logout?client_id=5arnotdu906unc42a61q5gh0nu&response_type=code&scope=openid+profile+email&redirect_uri=' +
      window.location.origin,

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin,

    // The SPA's id. The SPA is registerd with this id at the auth-server
    // clientId: 'server.code',
    clientId: '5arnotdu906unc42a61q5gh0nu',

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    responseType: 'code',

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,

    showDebugInformation: true,
  },
};
