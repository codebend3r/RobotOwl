/**
 * Created by crivas on 4/7/2014.
 */

Crivas.config(function ($routeProvider, $locationProvider) {

  //$locationProvider.html5Mode(true);

  $routeProvider
    .when('/portfolio', {
      templateUrl: 'partials/portfolio.html',
      controller: 'portfolioCtrl'
    })
    .when('/resume', {
      templateUrl: 'partials/resume.html',
      controller: 'resumeCtrl'
    })
    .when('/plugins', {
      templateUrl: 'partials/plugins.html',
      controller: 'pluginsCtrl'
    })
    .when('/blog', {
      templateUrl: 'partials/plugins.html',
      controller: 'pluginsCtrl'
    })
    .when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'contactCtrl'
    })
    .otherwise({
      redirectTo: '/portfolio'
    });

});