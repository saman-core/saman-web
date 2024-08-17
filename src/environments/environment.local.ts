export const environment = {
  datasourcesFormat: {
    format1: 'http://localhost:{PORT}/{RESOURCE}',
    format2: 'https://{SERVER}.nacxio.com:30443/{RESOURCE}',
    cde1: 'https://{SERVER}.nacxio.com:30443',
    resources1: 'https://{RESOURCE}.nacxio.com:30443/{RESOURCE}',
  },
  authConfig: {
    issuer: 'https://identity.nacxio.com:31443/realms/saman',
    clientId: 'saman-web',
    scope: 'openid profile email',
    redirectUri: window.location.origin,
    responseType: 'code',
  },
};
