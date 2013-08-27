Crivas.ViewModel = function() {

	var self = this;

	self.longList = Crivas.Data.portfolio.workExperience;

	self.currentSectionID = ko.observable(0);

	self.portfolioData = ko.observable(self.longList[self.currentSectionID()]);

	self.visiblePortfolio = ko.observable(true);
	
	self.visibleResume = ko.observable(true);
	
	self.visibleContact = ko.observable(true);

	self.scrollSpeed = 2;

	self.showPortflio = function(animateScroll) {

		animateScroll = typeof animateScroll !== 'undefined' ? animateScroll : true;

		self.goToPosition = $('#portfolio-section').offset().top - $('.main-wrapper').offset().top;
		self.startScroll(self.goToPosition, animateScroll);
		self.setHash('portfolio');
		self.highlightCurrentMenuItem(0);
		//self.showNewSection();

	};

	self.showResume = function(animateScroll) {

		animateScroll = typeof animateScroll !== 'undefined' ? animateScroll : true;

		self.goToPosition = $('#resume-section').offset().top - $('.main-wrapper').offset().top + 20;
		self.startScroll(self.goToPosition, animateScroll);
		self.setHash('resume');
		self.highlightCurrentMenuItem(1);
		//self.showNewSection();

	};

	self.showContact = function(animateScroll) {

		animateScroll = typeof animateScroll !== 'undefined' ? animateScroll : true;

		self.goToPosition = $('#contact-section').offset().top - $('.main-wrapper').offset().top - 250;
		//self.goToPosition = 4000;
		self.startScroll(self.goToPosition, animateScroll);
		self.setHash('contact');
		self.highlightCurrentMenuItem(2);
		//self.showNewSection();

	};

	self.goToPosition = 0;

	self.startScroll = function(goToPosition, animateScroll) {

		console.log('////////////////');

		var currentScrollPosition = window.scrollY;
		var diff = Math.abs(currentScrollPosition - goToPosition);

		var speed =  diff / self.scrollSpeed;

		if (animateScroll) {
		  $('html, body').animate({
			scrollTop: goToPosition
		  }, speed);
		} else {
		  window.scrollTo(0, goToPosition);
		}

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
		self.highlightCurrentMenuItem(data.id);
	};

	self.highlightCurrentMenuItem = function(i) {
	
		var $allMenuItems = $('.menu-item');
		$allMenuItems.each(function () {
		  $(this).removeClass('selected');
		});
		var $selectedMenuItem = $($allMenuItems[i]);
		$selectedMenuItem.addClass('selected');
		
	};

	self.menuOpen = false;

	self.openSmallMenu = function() {

		self.menuOpen = !self.menuOpen;

		var $portfolioContainer = $('.portfolio-container'),
				$mainWrapper = $('.main-wrapper'),
				$mainMenu = $('.main-menu'),
				$navBar = $('.nav-bar');

		$portfolioContainer.toggleClass('slide-menu-in');
		$portfolioContainer.addClass('animate');

		$mainWrapper.toggleClass('slide-menu-in');
		$mainWrapper.addClass('animate');

		//$mainMenu.toggleClass('slide-menu-in');
		//$mainMenu.addClass('animate');

		$navBar.toggleClass('slide-menu-in');
		$navBar.addClass('animate');

		var calculatedWidth = $(window).width() - 50;

		$('.slide-menu-in').css({left:calculatedWidth});

		if (self.menuOpen) {
			$('.animate').css({left:calculatedWidth});
		} else {
			$('.animate').css({left:0});
		}

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

	self.imageClicked = function(data){

		var currentID = data.id,
			url = Crivas.Data.portfolio.workExperience[currentID].url;

			console.log('url', url);
			window.open(url,'_blank');

	};

	self.experienceList = ko.observableArray(
		ko.utils.arrayMap(Crivas.Data.resume, function(i) {
			return {
				id: i.id,
				companyName: i.companyName,
				jobTitle: i.jobTitle,
				jobType: i.jobType,
				datesAtJob: i.datesAtJob,
				isFullTime: i.jobType == "full-time" ? true : false,
				tasks: i.tasks
			};
		})
	);

	self.summaryText = Crivas.Data.portfolio.summaryText;

	self.skillSet = Crivas.Data.portfolio.skillset;

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
		//self.initCycle();
		$('.image-container').crivasgallery({
			child: '.work-images',
			direction: 'forward'
		});
	};

	self.showPreloader = function() {
		$('.image-preloader').show();
		$('.striped-border').hide();
	};

	self.defaultSection = 'portfolio';

	self.dataModel = null;

	self.setHash = function(val) {
		window.location.hash = val;
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
    self.showNewSection();

		if (hash == '#resume') {

			self.showResume(false);

		} else if (hash == '#contact') {

			self.showContact(false);

		} else {

			self.setHash(self.defaultSection);
			self.showPortflio(false);

		}

    var $allMenuItems = $('.menu-item');
    console.log('$allMenuItems', $allMenuItems);

	};

	setTimeout(self.start, 250);

	return self;

};