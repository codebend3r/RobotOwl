/**
 * Created by Bouse on 5/23/2014.
 */

Crivas.factory('scroller', function ($scope, $element, $attrs) {

  return {
    scroll: function() {
      console.log('scroller');
    }
  };

  //console.log('element', element);
  //console.log('element.scrollHeight', element[0].scrollHeight);

  /*angular.element($window).bind("scroll", function () {
   console.log('this.pageYOffset', this.pageYOffset);
   });*/

})