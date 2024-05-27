export const environment = {
  datasourcesFormat: {
    format1: 'http://localhost:{PORT}',
    format2: 'http://localhost:{PORT}/{RESOURCE}',
    resources1: 'http://localhost:8080/{RESOURCE}',
  },
  authConfig: {
    issuer: 'http://keycloak:9080/realms/saman',
    clientId: 'saman-web',
    scope: 'openid profile email',
    redirectUri: window.location.origin,
    responseType: 'code',
    requireHttps: false,
  },
};
