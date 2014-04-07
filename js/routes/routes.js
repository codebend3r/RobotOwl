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
        .otherwise({
            redirectTo: '/portfolio'
        });

});