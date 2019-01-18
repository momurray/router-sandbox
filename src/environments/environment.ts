// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    okta: {
        baseUrl: 'https://dev-288917.oktapreview.com',
        clientId: '0oag6vxqecoBf267O0h7',
        redirectUri: 'http://localhost:4200',
        authParams: {
            issuer: 'default',
            responseType: ['id_token', 'token'],
            display: 'page'
        },
        logo: '../../../assets/logo-rms.png',
        language: 'en',
        i18n: {
            en: {
                'primaryauth.title': 'Sign in to MOM World'
            }
        },
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
