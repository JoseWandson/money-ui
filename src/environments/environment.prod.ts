export const environment = {
  production: true,
  apiUrl: 'https://money-api.herokuapp.com',

  tokenAllowedDomains: [new RegExp('money-api.herokuapp.com')],
  tokenDisallowedRoutes: [new RegExp('\/oauth\/token')]
};
