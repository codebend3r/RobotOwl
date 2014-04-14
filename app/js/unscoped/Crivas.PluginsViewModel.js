Crivas.PluginsViewModel = function () {

	var self = this;


    $scope.plugins = resume.resume.map(function (i) {
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

	return self;

};