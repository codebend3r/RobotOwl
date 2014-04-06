/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 4:18 PM
 * To change this template use File | Settings | File Templates.
 */

crivas.controller('MainMenuCtrl', function ($scope) {

    $scope.navs = [
        {
            id: 0,
            name: 'Portfolio',
            subMenu: true,
            subMenuSelector: '.portfolio-list',
            url: '#/portfolio',
            isActive: ''
        },
        {
            id: 1,
            name: 'Resume',
            subMenu: false,
            subMenuSelector: '',
            url: '#/resume',
            isActive: ''
        },
        {
            id: 2,
            name: 'Plugins',
            subMenu: false,
            subMenuSelector: '',
            url: '#/plugins',
            isActive: ''
        },
        {
            id: 3,
            name: 'Contact',
            subMenu: false,
            subMenuSelector: '',
            url: '#/contact',
            isActive: ''
        }
    ];

    /*
     $scope.setCurrentMenuItem = function(event, n) {
     $scope.navItems.forEach(function(element){
     element.isActive = '';
     });
     $scope.navItems[n].isActive = 'active';
     };
     */

    //$scope.$on('updatemenu', $scope.setCurrentMenuItem);

});