/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */

Crivas.controller('portfolioCtrl', function ($scope, $portfolioData) {

  'use strict';

  console.log('portfolioCtrl');

  $scope.currentMenuID = 0;

  $scope.max = 4;

  $scope.active = function(item){
    return item.active;
  };

  $scope.allWorkList = $portfolioData.map(function (i) {

    var portfolioObject = {
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

    return portfolioObject;

  });

  $scope.addMoreItems = function () {
    $scope.max += 5;
  };

  $scope.selectWork = function ($index) {
    $scope.currentWork = $scope.data[$index];
  };

  $scope.addMoreItems();

});