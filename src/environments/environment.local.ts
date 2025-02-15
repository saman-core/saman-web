export const environment = {
  datasourcesFormat: {
    format1: 'http://localhost:{PORT}/{RESOURCE}',
    format2: 'https://{SERVER}.saman-tech.com:35443/{RESOURCE}',
    cde1: 'https://{SERVER}.saman-tech.com:35443',
    resources1: 'https://{RESOURCE}.saman-tech.com:35443/{RESOURCE}',
  },
  authConfig: {
    issuer: 'https://identity.saman-tech.com:37443/realms/saman',
    clientId: 'saman-web',
    scope: 'openid profile email',
    redirectUri: window.location.origin,
    responseType: 'code',
  },
};
