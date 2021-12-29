export const environment = {
  production: true,
  apiUrl: 'https://wandsonmoney-api.herokuapp.com',

  tokenAllowedDomains: [new RegExp('wandsonmoney-api.herokuapp.com')],
  tokenDisallowedRoutes: [new RegExp('\/oauth2\/token')],
  oauthCallbackUrl: 'https://oidcdebugger.com/debug'
};
