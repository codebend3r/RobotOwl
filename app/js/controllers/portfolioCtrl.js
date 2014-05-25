/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */

Crivas.controller('PortfolioCtrl', function ($scope, portfolio, $window) {

  $window.onscroll = function () {
    //console.log(this.scrollY);
    if (this.scrollY == 2500) {
      //$scope.addMoreItems();
    }
  };

  $scope.currentMenuID = 0;

  $scope.min = 0;

  $scope.max = 4;

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
      active: i.active,
      show: false
    };

  });

  $scope.workList = [];

  $scope.addMoreItems = function () {

    console.log('addMoreItems', this);

    for (var i = $scope.min; i <= $scope.max; i++) {
      var currentObj = $scope.allWorkList[i];
      $scope.workList.push(currentObj);
    }

    $scope.min += 5;
    $scope.max += 5;

  };

  $scope.currentWork = $scope.workList[0];

  $scope.selectWork = function ($index) {
    $scope.currentWork = $scope.data[$index];
  };

  $scope.addMoreItems();

});

Crivas.filter('viewablePortfolio', function () {
  return function (a) {
    console.log('a', a);
    return a;
  };
});
