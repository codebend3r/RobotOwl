/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */

Crivas.controller('resumeCtrl', function ($scope, $resumeData) {

  'use strict';

  $scope.currentMenuID = 1;

  /**
   * a list of history of work
   */
  $scope.experienceList = $resumeData.resume.map(function (i) {
    return {
      id: i.id,
      companyName: i.companyName,
      jobTitle: i.jobTitle,
      jobType: i.jobType,
      datesAtJob: i.datesAtJob,
      isFullTime: i.jobType == "full-time" ? true : false,
      tasks: i.tasks
    };
  });

  /**
   * static work summary text
   */
  $scope.summaryText = $resumeData.summaryText;

  /**
   * a list of skillz
   */
  $scope.skillSet = $resumeData.skillset.map(function (i) {
    return {
      skillName: i.skillName,
      yearsOfExperience: i.yearsOfExperience == '1' ? i.yearsOfExperience + ' year' : i.yearsOfExperience + ' years',
      levelOfExpertise: i.levelOfExpertise,
      getLevel: function() {
        if (i.levelOfExpertise == 'BASIC') {
          return 'basic';
        } else if (i.levelOfExpertise == 'ADVANCED') {
          return 'advanced';
        } else if (i.levelOfExpertise == 'EXPERT') {
          return 'expert';
        } else {
          return '';
        }
      }
    };
  });

  $scope.getLevelOfExpertise = function (data) {

  };


});