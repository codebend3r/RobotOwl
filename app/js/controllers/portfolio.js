/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */

Crivas.controller('PortfolioCtrl', function ($scope, portfolio) {

  $scope.hello = 'kjdls;kfjaslk;djs';

  $scope.data = portfolio;

  $scope.workList = portfolio.map(function (i) {

    return {
      id: i.id,
      slug: i.slug,
      title: i.title,
      menuText: i.menuText,
      imageURL: i.imageURL,
      companyName: i.companyName,
      businessCase: i.businessCase,
      details: i.details,
      techUsed: i.techUsed,
      url: i.url,
      isOffline: i.url !== 'offline',
      active: i.active
    };

  });

  $scope.currentWork = $scope.workList[0];

  $scope.selectWork = function ($index) {
    $scope.currentWork = $scope.data[$index];
  }

});
