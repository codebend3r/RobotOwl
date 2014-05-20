/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var Crivas = angular.module('CrivasApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  //'ngAnimate',
  'ngRoute'
  //'infinite-scroll'
]);

Crivas.directive('whenScrolled', function ($window, $element) {
  return function (scope, elm, attr) {
    var raw = elm[0];
    //console.log('attr', attr);
    //console.log('raw', raw);
    //console.log('elm', elm);
    console.log('elm.scrollTop', elm.scrollTop);
    console.log('elm.offsetHeight', elm.offsetHeight);
    console.log('elm.scrollHeight', elm.scrollHeight);
    console.log('=============================');
    angular.element($window).bind('scroll', function () {
      if ($window.scrollTop + $window.offsetHeight >= $window.scrollHeight) {
        console.log('BOTTOM REACHED');
        //scope.$apply(attr['whenScrolled']);
      }
    });
  };
});