/**
 * Created by Bouse on 5/23/2014.
 */

Crivas.directive('whenScrolled', function ($window) {

  var dirObj = {

    restrict: 'A',
    transclude: true,
    link: function($scope) {
      console.log('link');
    },
    controller: function($scope, $element, $attrs) {

      console.log('controller');
      //console.log('element', element);
      //console.log('element.scrollHeight', element[0].scrollHeight);

      /*angular.element($window).bind("scroll", function () {
        console.log('this.pageYOffset', this.pageYOffset);
      });*/

    }

  };

  return dirObj;

});
