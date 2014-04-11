/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */

Crivas.controller('ResumeCtrl', function($scope, resume) {

    /**
     * a list of history of work
     */
    $scope.experienceList = resume.resume.map(function (i) {
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
    $scope.summaryText = resume.summaryText;

    /**
     * a list of skillz
     */
    $scope.skillSet = resume.skillset.map(function (i) {
        return {
            skillName: i.skillName,
            yearsOfExperience: i.yearsOfExperience == '1' ? i.yearsOfExperience + ' year' : i.yearsOfExperience + ' years',
            isBasic: ko.observable(false),
            isAdvanced: ko.observable(false),
            isExpert: ko.observable(false),
            levelOfExpertise: i.levelOfExpertise
        };
    });

    $scope.getLevelOfExpertise = function (data) {
        if (data.levelOfExpertise == 'BASIC') {
            data.isBasic(true);
        } else if (data.levelOfExpertise == 'ADVANCED') {
            data.isAdvanced(true);
        } else if (data.levelOfExpertise == 'EXPERT') {
            data.isExpert(true);
        }
        return data.levelOfExpertise;
    };



});