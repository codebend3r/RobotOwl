/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var crivas = angular.module('CrivasApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ngRoute'
    ]);

crivas.config(function ($routeProvider, $locationProvider) {

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

crivas.directive('navMenu', function(){

    return {
        restrict: 'E',
        templateUrl: 'partials/nav.html'
    }

});
