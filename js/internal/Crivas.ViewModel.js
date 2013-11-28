Crivas.ViewModel = function () {

	var self = this;

	self.longList = Crivas.Data.portfolio.workExperience;
	self.currentSectionID = ko.observable(0);
	self.portfolioData = ko.observable(self.longList[self.currentSectionID()]);
	self.visiblePortfolio = ko.observable(true);
	self.visibleResume = ko.observable(true);
	self.visibleContact = ko.observable(true);
	self.scrollSpeed = 2;
	self.menuOpen = false;
	self.goToPosition = 0;

	/**
	 * a list of history of work
	 */
	self.experienceList = ko.observableArray(ko.utils.arrayMap(Crivas.Data.resume, function (i) {
		return {
			id: i.id,
			companyName: i.companyName,
			jobTitle: i.jobTitle,
			jobType: i.jobType,
			datesAtJob: i.datesAtJob,
			isFullTime: i.jobType == "full-time" ? true : false,
			tasks: i.tasks
		};
	}));

	/**
	 * static work summary text
	 */
	self.summaryText = Crivas.Data.portfolio.summaryText;

	/**
	 * a list of skillz
	 */
	self.skillSet = ko.observableArray(ko.utils.arrayMap(Crivas.Data.portfolio.skillset, function (i) {
		return {
			skillName: i.skillName,
			yearsOfExperience: i.yearsOfExperience + ' years',
			isBasic: ko.observable(false),
			isAdvanced: ko.observable(false),
			isExpert: ko.observable(false),
			levelOfExpertise: i.levelOfExpertise
		};
	}));

	self.getLevelOfExpertise = function (data) {
		if (data.levelOfExpertise == 'BASIC') {
			data.isBasic(true);
		} else if (data.levelOfExpertise == 'ADVANCED') {
			data.isAdvanced(true);
		} else if (data.levelOfExpertise == 'EXPERT') {
			data.isExpert(true);
		}
		return data.levelOfExpertise;
	};

	/**
	 * a list of portfolio items
	 */
	self.portfolioList = ko.observableArray(ko.utils.arrayMap(self.longList, function (i) {
		return {
			id: i.id,
			menuText: i.menuText,
			slug: i.slug.toLowerCase(),
			active: i.active
		};
	}));

	/**
	 * a list of menu items
	 */
	self.menuList = ko.utils.arrayMap(Crivas.Data.menu, function (i) {
		return {
			id: i.id,
			name: i.name,
			subMenu: i.subMenu,
			sunMenuSelector: i.subMenuSelector
		};
	});

	self.showPortflio = function (animateScroll) {

		animateScroll = typeof animateScroll !== 'undefined' ? animateScroll : true;

		self.goToPosition = $('#portfolio-section').offset().top - $('.main-wrapper').offset().top;

		if (Crivas.windowWidth <= Crivas.small) {
			console.log('SMALL!!! 0');
			var callback = self.scrollTo.bind(null, self.goToPosition, 'portfolio', 0, animateScroll);
			self.animateSmallMenuReveal(false, true, callback);
		} else {
			self.scrollTo(self.goToPosition, 'portfolio', 0, animateScroll);
		}

	};

	self.showResume = function (animateScroll) {

		animateScroll = typeof animateScroll !== 'undefined' ? animateScroll : true;

		self.goToPosition = $('#resume-section').offset().top - $('.main-wrapper').offset().top + 20;

		if (Crivas.windowWidth <= Crivas.small) {
			console.log('SMALL!!! 1');
			var callback = self.scrollTo.bind(null, self.goToPosition, 'resume', 1, animateScroll);
			self.animateSmallMenuReveal(false, true, callback);
		} else {
			self.scrollTo(self.goToPosition, 'resume', 1, animateScroll);
		}

	};

	self.showContact = function (animateScroll) {

		animateScroll = typeof animateScroll !== 'undefined' ? animateScroll : true;

		self.goToPosition = $('#contact-section').offset().top - $('.main-wrapper').offset().top - 250;

		if (Crivas.windowWidth <= Crivas.small) {
			console.log('SMALL!!! 2');
			var callback = self.scrollTo.bind(null, self.goToPosition, 'contact', 2, animateScroll);
			self.animateSmallMenuReveal(false, true, callback);
		} else {
			self.scrollTo(self.goToPosition, 'contact', 2, animateScroll);
		}

	};

	self.scrollTo = function(yPos, hashValue, currentItem, animateScroll) {

		self.startScroll(yPos, animateScroll);
		self.setHash(hashValue);
		self.highlightCurrentMenuItem(currentItem);

	};

	self.startScroll = function (goToPosition, animateScroll) {

		var currentScrollPosition = window.scrollY,
			diff = Math.abs(currentScrollPosition - goToPosition),
			speed = diff / self.scrollSpeed;

		if (animateScroll) {
			$('html, body').animate({
				scrollTop: goToPosition
			}, speed);
		} else {
			window.scrollTo(0, goToPosition);
		}

	};

	self.navArray = [ self.showPortflio, self.showResume, self.showContact ];

	self.menuClick = function (data) {
		//self.killSection();
		var currentID = data.id;
		self.navArray[currentID]();
		self.highlightCurrentMenuItem(currentID);
	};

	self.portfolioItemClick = function (data) {
		var currentID = data.id;
	};

	self.highlightCurrentMenuItem = function (i) {

		var $allMenuItems = $('.menu-item');
		$allMenuItems.each(function () {
			$(this).removeClass('selected');
		});
		var $selectedMenuItem = $($allMenuItems[i]);
		$selectedMenuItem.addClass('selected');

	};

	self.getPortfolioItemByID = function (id) {
		var currentID;
		for (var i = 0; i < self.portfolioList().length; i += 1) {
			if (id == self.portfolioList()[i].id) {
				currentID = i;
				return currentID;
			}
		}
	};

	self.openSmallMenu = function () {
		console.log('openSmallMenu');
		self.menuOpen = !self.menuOpen;
		self.animateSmallMenuReveal(self.menuOpen);
	};

	self.animateSmallMenuReveal = function(menuOpen, scrollTo, callback){

		scrollTo = typeof scrollTo !== 'undefined' ? scrollTo : false;

		var $portfolioContainer = $('.portfolio-container'),
			$mainWrapper = $('.main-wrapper'),
			$mainMenu = $('.main-menu'),
			$navBar = $('.nav-bar'),
			xPos = Crivas.windowWidth - 72;

		self.menuOpen = menuOpen;

		if (menuOpen) {
			//TweenLite.to($portfolioContainer, 1, { left:xPos, ease: Expo.easeOut });
			TweenLite.to($mainWrapper, 1, { left:xPos, ease: Expo.easeOut });
			//TweenLite.to($mainMenu, 1, { left:xPos, ease: Expo.easeOut });
			TweenLite.to($navBar, 1, { left:xPos, ease: Expo.easeOut });
		} else {
			//TweenLite.to($portfolioContainer, 1, { left:0, ease: Expo.easeOut });
			TweenLite.to($mainWrapper, 1, { left:0, ease: Expo.easeOut });
			//TweenLite.to($mainMenu, 1, { left:0, ease: Expo.easeOut });
			TweenLite.to($navBar, 1, { left:0, ease: Expo.easeOut });
		}

		if (scrollTo) {
			console.log('callback!!!');
			setTimeout(callback, 1000);
		}

	};

	self.changePage = function (data) {
		var currentID = self.getPortfolioItemByID(data.id);
		self.currentSectionID(currentID);
		self.portfolioData(self.longList[self.currentSectionID()]);
		//location.hash = 'portfolio/' + data.slug;
		if (self.$portfolioContainer.hasClass('slide-menu-in')) {
			self.$portfolioContainer.removeClass('slide-menu-in');
			self.$navBar.removeClass('slide-menu-in');
		}
		self.showNewSection();
	};

	self.imageClicked = function (data) {
		var currentID = self.getPortfolioItemByID(data.id),
			url = Crivas.Data.portfolio.workExperience[currentID].url;

		window.open(url, '_blank');
	};

	/**
	 Click event listener method for menu item click

	 @method showNewSection
	 **/
	self.showNewSection = function () {

		self.showPreloader();

		self.$workImages = $('.work-images');

		// wait for all images to load
		self.$workImages.imagesLoaded(function () {
			self.allImagesLoaded();
		});
	};

	/**
	 Listener for when images are loaded

	 @method allImagesLoaded
	 **/
	self.allImagesLoaded = function () {

		var imgTarget = $('.image-border').find('img')[0];
		var imgSrc = $(imgTarget).attr('src');

		//console.log('imgSrc', imgSrc);
		//console.log('imgTarget', imgTarget);

		//var colorThief = new ColorThief();
		//var palette = colorThief.getPalette(imgTarget, 4);

		//console.log('COLOR THIEF >>>>>>>>>', palette);

		self.$imagePreloader = $('.image-preloader');
		self.$stripedBorder = $('.striped-border');
		self.$workImages = $('.work-images');

		self.$imagePreloader.hide();
		self.$stripedBorder.show();

		// init owl gallery
		self.$workImages.owlgallery({
			child: '.work-images',
			direction: 'forward'
		});

	};

	self.showPreloader = function () {

		self.$imagePreloader.show();
		self.$stripedBorder.hide();

	};

	self.defaultSection = 'portfolio';

	self.dataModel = null;

	self.setHash = function (val) {
		window.location.hash = val;
	};

	// JQuery Objects

	self.$imagePreloader = $('.image-preloader');

	self.$stripedBorder = $('.striped-border');

	self.$workImages = $('.work-images');

	self.$portfolioContainer = $('.portfolio-container');

	self.$navBar = $('.nav-bar');

	// Init

	self.start = function () {

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

		//var $allMenuItems = $('.menu-item');

		console.log("self.start");

	};

	setTimeout(self.start, 250);

	return self;

};