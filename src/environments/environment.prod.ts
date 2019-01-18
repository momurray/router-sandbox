export const environment = {
  production: true,
  okta: {
    baseUrl: 'https://dev-288917.oktapreview.com',
    clientId: '0oag6vxqecoBf267O0h7',
    redirectUri: 'https://sandbox.oqlist.co.uk',
    authParams: {
        issuer: 'default',
        responseType: ['id_token', 'token'],
        display: 'page'
    },
    logo: '../../../assets/logo-rms.png',
    language: 'en',
    i18n: {
        en: {
            'primaryauth.title': 'Sign in to MOM RMS'
        }
    },
  }
};
