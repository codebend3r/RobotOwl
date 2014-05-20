/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */

Crivas.controller('PortfolioCtrl', function ($scope, portfolio) {

  console.log('PortfolioCtrl');

  //infinite-scroll='addMoreItems()'

  $scope.allWorkList = portfolio.map(function (i) {

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
      datePosted: i.datePosted,
      url: i.url,
      isOffline: i.url !== 'offline',
      active: i.active
    };

  });

  $scope.workList = $scope.allWorkList.slice(0, 5);

  $scope.addMoreItems = function () {

    console.log('addMoreItems');

    var last = $scope.images[$scope.workList.length - 1];
    for (var i = 1; i <= 5; i++) {
      $scope.workList.push($scope.allWorkList[last + i]);
    }

  };

  $scope.currentWork = $scope.workList[0];

  $scope.selectWork = function ($index) {
    $scope.currentWork = $scope.data[$index];
  }

});
