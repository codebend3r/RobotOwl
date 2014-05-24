/**
 * Created by crivas on 4/7/2014.
 */

Crivas.directive('navMenu', function () {

  return {
    restrict: 'E',
    templateUrl: 'partials/nav.html',
    controller: function ($scope) {

      $scope.navs = [
        {
          id: 0,
          name: 'Portfolio',
          subMenu: true,
          subMenuSelector: '.portfolio-list',
          enabled: true,
          url: '#/portfolio'
        },
        {
          id: 1,
          name: 'Resume',
          subMenu: false,
          subMenuSelector: '',
          enabled: true,
          url: '#/resume'
        },
        {
          id: 2,
          name: 'Plugins',
          subMenu: false,
          subMenuSelector: '',
          enabled: false,
          url: '#/plugins'
        },
        {
          id: 3,
          name: 'Contact',
          subMenu: false,
          subMenuSelector: '',
          enabled: true,
          url: '#/contact'
        },
        {
          id: 4,
          name: 'Directives',
          subMenu: false,
          subMenuSelector: '',
          enabled: false,
          url: '#/directives'
        },
        {
          id: 5,
          name: 'Blog',
          subMenu: false,
          subMenuSelector: '',
          enabled: false,
          url: '#/blog'
        }
      ];

      $scope.getCurrentNav = function (n) {
        if ($scope.currentMenuID === 0 && n === 0) {
          return 'selected';
        } else if ($scope.currentMenuID === 1 && n === 1) {
          return 'selected';
        } else if ($scope.currentMenuID === 2 && n === 2) {
          return 'selected';
        } else if ($scope.currentMenuID === 3 && n === 3) {
          return 'selected';
        } else {
          return '';
        }
      };
    }
  }

});
