Crivas.ViewModel = function() {

	var self = this;

	self.longList = Crivas.Data.portfolio.workExperience;

	self.currentSectionID = ko.observable(0);

	self.portfolioData = ko.observable(self.longList[self.currentSectionID()]);

	self.visiblePortfolio = ko.observable(true);
	self.visibleResume = ko.observable(true);
	self.visibleContact = ko.observable(true);

	self.scrollSpeed = 1000;

	self.showPortflio = function() {

		self.setHash('portfolio');

		//self.visiblePortfolio(true);
		//self.visibleResume(true);
		//self.visibleContact(true);

    $('html, body').animate({
      scrollTop: 0
    }, self.scrollSpeed);

		//setTimeout( self.showNewSection, 100 );
		self.showNewSection();

	};

	self.showResume = function() {

		self.setHash('resume');

    $('html, body').animate({
      scrollTop: 1000
    }, self.scrollSpeed);

		//self.visiblePortfolio(true);
		//self.visibleResume(true);
		//self.visibleContact(true);

    self.showNewSection();

	};

	self.showContact = function() {

		self.setHash('contact');

    $('html, body').animate({
      scrollTop: 1800
    }, self.scrollSpeed);

		//self.visiblePortfolio(true);
		//self.visibleResume(true);
		//self.visibleContact(true);

    //self.showNewSection();

	};

	self.navArray = [ self.showPortflio, self.showResume, self.showContact ];

	self.navigationList = ko.observableArray(
		ko.utils.arrayMap(Crivas.Data.portfolio.workExperience, function(i) {
			return {
				id: i.id,
				menuText: i.menuText,
				slug: i.slug.toLowerCase()
			};
		})
	);

	self.menuClick = function(data) {
		//self.killSection();
		self.navArray[data.id]();
	};

	self.openSmallMenu = function() {

		var $portfolioContainer = $('.portfolio-container'),
			$navBar = $('.nav-bar');

		$portfolioContainer.toggleClass('slide-menu-in');
		$portfolioContainer.addClass('animate');

		$navBar.toggleClass('slide-menu-in');
		$navBar.addClass('animate');

	};

	self.menuList = ko.utils.arrayMap(Crivas.Data.menu, function(i) {
		return {
			id: i.id,
			name: i.name
		};
	});

	self.changePage = function(data) {

		self.currentSectionID(data.id);

		self.portfolioData(self.longList[self.currentSectionID()]);
		//location.hash = 'portfolio/' + data.slug;

		console.log('ViewModel.changePage', self.currentSectionID());

		if (self.$portfolioContainer.hasClass('slide-menu-in')) {
			self.$portfolioContainer.removeClass('slide-menu-in');
			self.$navBar.removeClass('slide-menu-in');
		}

		self.showNewSection();

	};

	self.experienceList = ko.observableArray(
		ko.utils.arrayMap(Crivas.Data.resume, function(i) {
			return {
				id: i.id,
				companyName: i.companyName,
				jobTitle: i.jobTitle,
				jobType: i.jobType,
				datesAtJob: i.datesAtJob,
				tasks: i.tasks
			};
		})
	);

	self.summaryText = Crivas.Data.portfolio.summaryText;

	self.skillSet = Crivas.Data.portfolio.skillset;

	self.cycler = {
		cycleTime: 3000,
		cycleTimer: null,
		currentSlideNum: 0,
		numberOfPics: 0
	};

	/**
	 Click event listener method for menu item click

	 @method showNewSection
	 **/
	self.showNewSection = function() {

		console.log('--------------------------');
		console.log('ViewModel.showNewSection', self.currentSectionID());

		self.showPreloader();

		$('.work-images').imagesLoaded(function(){
			console.log('ALL IMAGES LOADED');
			self.allImagesLoaded();
		});
	};

	/**
	 Listener for when images are loaded

	 @method allImagesLoaded
	 **/
	self.allImagesLoaded = function() {
		console.log('ViewModel.allImagesLoaded');
		//self.$imagePreloader.hide();
		$('.image-preloader').hide();
		$('.striped-border').show();
		self.initCycle();
	};


	/**
	 Get a new list of images and starts cycle again

	 @method initCycle
	 **/
	self.initCycle = function() {

		console.log('ViewModel.initCycle');

		self.$workImages = $('.work-images');

		self.cycler.$currentSlideList = self.$workImages;
		self.cycler.numberOfPics = self.$workImages.length - 1;
		self.cycler.currentSlideNum = self.$workImages.length - 1;

		clearInterval(self.cycler.cycleTimer);

		console.log('self.cycler.numberOfPics', self.cycler.numberOfPics);
		console.log('self.cycler.currentSlideNum', self.cycler.currentSlideNum);

		if (self.cycler.numberOfPics > 0) {
			console.log('START CYCLE');
			self.cycler.cycleTimer = setInterval( self.cycleImages, self.cycler.cycleTime);
		}

	};

	/**
	 Cycles through the next image in the array.
	 If it's the last image in array it will reset back to the first one.

	 @method cycleImages
	 **/
	self.cycleImages = function() {

		console.log('cycleImages');

		var currentSlide = self.cycler.$currentSlideList[ self.cycler.currentSlideNum ];
		var firstSlide = self.cycler.$currentSlideList[ 0 ];
		var lastSlide = self.cycler.$currentSlideList[ self.cycler.numberOfPics ];
		$(currentSlide).fadeOut( 300 );

		self.cycler.currentSlideNum -= 1;

		if (self.cycler.currentSlideNum <= -1) {
			self.cycler.currentSlideNum = self.cycler.numberOfPics;
			$(lastSlide).fadeIn( 300 );
			$(firstSlide).fadeIn( 300, self.showAll );
		}

	};

	/**
	 Cycles through the whole image array and shows everything

	 @method showAll
	 **/
	self.showAll = function() {
		$.each( self.$currentSlideList, function() {
			$(this).show();
		})
	};

	self.showPreloader = function() {
		$('.image-preloader').show();
		$('.striped-border').hide();
	};

	self.killSection = function() {
		clearInterval(this.cycleTimer);
	};

	self.defaultSection = 'portfolio';

	self.dataModel = null;

	self.setHash = function(val) {
		window.location.hash = val;
	};

	self.sendEmail = function() {
		$.ajax({
			type: "POST",
			data: formData,
			url: "php/emailform.php",
			success: blah
		});
	};

	//JQUERY OBJECTS

	self.$imagePreloader = $('.image-preloader');

	self.$stripedBorder = $('.striped-border');

	self.$workImages = $('.work-images');

	self.$portfolioContainer = $('.portfolio-container');

	self.$navBar = $('.nav-bar');

	//INIT

	self.start = function() {

		console.log('self.start');
		var hash = window.location.hash;
		console.log('hash', hash);

		if (hash == 'resume') {

			self.showResume();

		} else if (hash == 'contact') {

			self.showContact();

		} else {

			self.setHash(self.defaultSection);
			self.showPortflio();

		}

	};

	self.start();

	return self;

};