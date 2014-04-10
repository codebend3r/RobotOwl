/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 4:18 PM
 * To change this template use File | Settings | File Templates.
 */

Crivas.controller('MainMenuCtrl', function ($scope) {

    $scope.navs = [
        {
            id: 0,
            name: 'Portfolio',
            subMenu: true,
            subMenuSelector: '.portfolio-list',
            url: '#/portfolio'
        },
        {
            id: 1,
            name: 'Resume',
            subMenu: false,
            subMenuSelector: '',
            url: '#/resume'
        },
        {
            id: 2,
            name: 'Plugins',
            subMenu: false,
            subMenuSelector: '',
            url: '#/plugins'
        },
        {
            id: 3,
            name: 'Contact',
            subMenu: false,
            subMenuSelector: '',
            url: '#/contact'
        }
    ];

    $scope.setActiveMenu = function() {



    };

});