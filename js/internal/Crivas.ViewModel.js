Crivas.ViewModel = function () {

    var self = this;

    self.longList = Crivas.Data.portfolio.workExperience;

    self.currentSectionID = ko.observable(0);

    self.portfolioData = ko.observable(self.longList[self.currentSectionID()]);

    self.visiblePortfolio = ko.observable(true);

    self.visibleResume = ko.observable(true);

    self.visibleContact = ko.observable(true);

    self.scrollSpeed = 2;

    self.showPortflio = function (animateScroll) {

        animateScroll = typeof animateScroll !== 'undefined' ? animateScroll : true;

        self.goToPosition = $('#portfolio-section').offset().top - $('.main-wrapper').offset().top;
        self.startScroll(self.goToPosition, animateScroll);
        self.setHash('portfolio');
        self.highlightCurrentMenuItem(0);
        //self.showNewSection();

    };

    self.showResume = function (animateScroll) {

        animateScroll = typeof animateScroll !== 'undefined' ? animateScroll : true;

        self.goToPosition = $('#resume-section').offset().top - $('.main-wrapper').offset().top + 20;
        self.startScroll(self.goToPosition, animateScroll);
        self.setHash('resume');
        self.highlightCurrentMenuItem(1);
        //self.showNewSection();

    };

    self.showContact = function (animateScroll) {

        animateScroll = typeof animateScroll !== 'undefined' ? animateScroll : true;

        self.goToPosition = $('#contact-section').offset().top - $('.main-wrapper').offset().top - 250;
        //self.goToPosition = 4000;
        self.startScroll(self.goToPosition, animateScroll);
        self.setHash('contact');
        self.highlightCurrentMenuItem(2);
        //self.showNewSection();

    };

    self.goToPosition = 0;

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

    self.navigationList = ko.observableArray(
        ko.utils.arrayMap(Crivas.Data.portfolio.workExperience, function (i) {
            return {
                id: i.id,
                menuText: i.menuText,
                slug: i.slug.toLowerCase()
            };
        })
    );

    self.menuClick = function (data) {
        //self.killSection();
        self.navArray[data.id]();
        self.highlightCurrentMenuItem(data.id);
    };

    self.highlightCurrentMenuItem = function (i) {

        var $allMenuItems = $('.menu-item');
        $allMenuItems.each(function () {
            $(this).removeClass('selected');
        });
        var $selectedMenuItem = $($allMenuItems[i]);
        $selectedMenuItem.addClass('selected');

    };

    self.menuOpen = false;

    self.openSmallMenu = function () {

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

        $('.slide-menu-in').css({left: calculatedWidth});

        if (self.menuOpen) {
            $('.animate').css({left: calculatedWidth});
        } else {
            $('.animate').css({left: 0});
        }

    };

    self.menuList = ko.utils.arrayMap(Crivas.Data.menu, function (i) {
        return {
            id: i.id,
            name: i.name
        };
    });

    self.changePage = function (data) {

        self.currentSectionID(data.id);

        self.portfolioData(self.longList[self.currentSectionID()]);
        //location.hash = 'portfolio/' + data.slug;

        if (self.$portfolioContainer.hasClass('slide-menu-in')) {
            self.$portfolioContainer.removeClass('slide-menu-in');
            self.$navBar.removeClass('slide-menu-in');
        }

        self.showNewSection();

    };

    self.imageClicked = function (data) {

        var currentID = data.id,
            url = Crivas.Data.portfolio.workExperience[currentID].url;

        //console.log('url', url);
        window.open(url, '_blank');

    };

    self.experienceList = ko.observableArray(
        ko.utils.arrayMap(Crivas.Data.resume, function (i) {
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

        console.log('imgSrc', imgSrc);
        console.log('imgTarget', imgTarget);

        var colorThief = new ColorThief();
        var palette = colorThief.getPalette(imgTarget, 4);

        console.log('COLOR THIEF >>>>>>>>>', palette);

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

    //JQUERY OBJECTS

    self.$imagePreloader = $('.image-preloader');

    self.$stripedBorder = $('.striped-border');

    self.$workImages = $('.work-images');

    self.$portfolioContainer = $('.portfolio-container');

    self.$navBar = $('.nav-bar');

    //INIT

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

    };

    setTimeout(self.start, 250);

    return self;

};