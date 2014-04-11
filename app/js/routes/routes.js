/**
 * Created by crivas on 4/7/2014.
 */

Crivas.config(function ($routeProvider, $locationProvider) {

    //$locationProvider.html5Mode(true);

    $routeProvider
        .when('/portfolio', {
            templateUrl: 'partials/portfolio.html',
            controller: 'PortfolioCtrl'
        })
        .when('/resume', {
            templateUrl: 'partials/resume.html',
            controller: 'ResumeCtrl'
        })
        .when('/plugins', {
            templateUrl: 'partials/plugins.html',
            controller: 'PluginsCtrl'
        })
        .when('/contact', {
            templateUrl: 'partials/contact.html',
            controller: 'ContactCtrl'
        })
        .otherwise({
            redirectTo: '/portfolio'
        });

});