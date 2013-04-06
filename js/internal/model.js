$(init);

function init() {

    var Crivas = {

        DataModel: function() {

            var self = this;

            self.longList = data.portfolio;

            self.portfolioData = ko.observable(self.longList[0]);

            self.menuClick = function(data) {
                self.killSection();
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

            self.visiblePortfolio = ko.observable(true);
            self.visibleResume = ko.observable(false);
            self.visibleContact = ko.observable(false);

            self.showPortflio = function() {

                self.setHash('portfolio');

                self.visiblePortfolio(true);
                self.visibleResume(false);
                self.visibleContact(false);

                setTimeout( self.showNewSection, 100 );
                //self.showNewSection();

            };

            self.showResume = function() {

                self.setHash('resume');

                self.visiblePortfolio(false);
                self.visibleResume(true);
                self.visibleContact(false);

            };

            self.showContact = function() {

                self.setHash('contact');

                self.visiblePortfolio(false);
                self.visibleResume(false);
                self.visibleContact(true);

            };

            self.navArray = [ self.showPortflio, self.showResume, self.showContact ];

            self.navigationList = ko.observableArray(
                ko.utils.arrayMap(data.portfolio, function(i) {
                    return {
                        id: i.id,
                        menuText: i.menuText,
                        slug: i.slug.toLowerCase()
                    };
                })
            );

            self.menuList = ko.observableArray(
                ko.utils.arrayMap(data.menu, function(i) {
                    return {
                        id: i.id,
                        name: i.name
                    };
                })
            );

            self.changePage = function(data) {

                self.portfolioData(self.longList[data.id]);
                //location.hash = 'portfolio/' + data.slug;

                if (self.$portfolioContainer.hasClass('slide-menu-in')) {
                    self.$portfolioContainer.removeClass('slide-menu-in');
                    self.$navBar.removeClass('slide-menu-in');
                }

                self.showNewSection();

            };

            self.experienceList = ko.observableArray(
                ko.utils.arrayMap(data.resume, function(i) {
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

            self.skillset = ko.observableArray([
                'JavaScript',
                'JQuery',
                'Knockout.js',
                'Sproutcore',
                'HTML/HTML5',
                'CSS/CSS3',
                'MVVM',
                'MVC',
                'Grunt.js',
                'Facebook Development',
                'C#',
                'Android/Java',
                'Photoshop',
                'Illustrator',
                'JavaScript',
                'ActionScript'
            ]);

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
                console.log('showNewSection');

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
                console.log('allImagesLoaded');
                self.$imagePreloader.hide();
                self.$stripedBorder.show();
                //self.initCycle();
            };


            /**
            Get a new list of images and starts cycle again

            @method initCycle
            **/
            self.initCycle = function() {

                console.log('initCycle');

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
                self.$imagePreloader.show();
                self.$stripedBorder.hide();
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

                console.log('DATA MODEL - init');
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

            /*
            self.app = $.sammy(function() {

                this.get('#/section', function() {



                });

            });
            */

            self.start();

        },

        init: function() {

            ko.applyBindings(new Crivas.DataModel());

        }

    }


    Crivas.init();
    window.Site = Crivas;

    window.onhashchange = function(e) {
        console.log('HASH CHANGE');
    };


};



