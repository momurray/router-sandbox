# Sb7

Using Okta login, dynmaically load a router-outlet after successful login. This is to cater for situations where the router outlet is deeply embedded in the basic appilcation rather than at the very top level of the application. With Okta this is a problem as it's standard redirect mechanism expects the router to be active to support their callback login mechanism. 

Specifically this example uses the following:
    okta integration (with callback)
    dynamic instantiation of the router-outlet
    http interceptors
    http client api calls
    
 This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
