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
                var $portfolioList = $('.portfolioList');
                $portfolioList.toggleClass('slideMenuIn');
                $portfolioList.addClass('animate');
            };

            self.showPortflio = function() {
                self.visiblePortfolio(true);
                self.visibleResume(false);
                self.visibleContact(false);
            };

            self.showResume = function() {
                self.visiblePortfolio(false);
                self.visibleResume(true);
                self.visibleContact(false);
            };

            self.showContact = function() {
                self.visiblePortfolio(false);
                self.visibleResume(false);
                self.visibleContact(true);
            };

            self.navArray = [ self.showPortfolio, self.showResume, self.showContact ];

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

                var $portfolioList = $('.portfolioList');

                if ($portfolioList.hasClass('slideMenuIn')) {
                    $portfolioList.removeClass('slideMenuIn');
                }
                Crivas.showNewSection();

            };

            self.experienceList = ko.observableArray(
                ko.utils.arrayMap(data.resume, function(i) {
                    return {
                        id: i.id,
                        companyName: i.companyName,
                        jobTitle: i.jobTitle
                    };
                })
            );

            self.visiblePortfolio = ko.observable(true);
            self.visibleResume = ko.observable(false);
            self.visibleContact = ko.observable(false);

            return self;

        },

        cycler: {

            cycleTime: 3000,

            cycleTimer: null,

            currentSlideNum: 0,

            numberOfPics: 0,

            currentSlideList: null

        },

        /**
         Click event listener method for menu item click

         @method showNewSection
         **/
        showNewSection: function() {

            Crivas.showPreloader();

            $('.stripedBorder').imagesLoaded(function(){

                console.log('showNewSection');
                Crivas.allImagesLoaded();

            });
        },

        /**
         Get a new list of images and starts cycle again

         @method initCycle
         **/
        initCycle: function() {

            console.log('initCycle');

            Crivas.cycler.currentSlideList = $(".stripedBorder img");
            Crivas.cycler.numberOfPics = Crivas.cycler.currentSlideList.length - 1;
            Crivas.cycler.currentSlideNum = Crivas.cycler.currentSlideList.length - 1;

            clearInterval(Crivas.cycler.cycleTimer);

            if (Crivas.cycler.numberOfPics > 0) {
                Crivas.cycler.cycleTimer = setInterval( Crivas.cycler.cycleImages, Crivas.cycler.cycleTime);
            }

        },

        /**
         Cycles through the next image in the array.
         If it's the last image in array it will reset back to the first one.

         @method cycleImages
         **/
        cycleImages: function() {

            console.log('cycleImages');

            var currentSlide = Crivas.cycler.currentSlideList[ Crivas.cycler.currentSlideNum ];
            var firstSlide = Crivas.cycler.currentSlideList[ 0 ];
            var lastSlide = Crivas.cycler.currentSlideList[ Crivas.cycler.numberOfPics ];
            $(currentSlide).fadeOut( 300 );

            Crivas.currentSlideNum -= 1;

            if (Crivas.currentSlideNum <= -1) {
                Crivas.currentSlideNum = Crivas.cycler.numberOfPics;
                $(lastSlide).fadeIn( 300 );
                $(firstSlide).fadeIn( 300, Crivas.showAll );
            }

        },

        showAll: function() {
            $.each( Crivas.currentSlideList, function() {
                $(this).show();
            })
        },

        showPreloader: function() {
            $('.imagePreloader').show();
            $('.stripedBorder').hide();
        },

        allImagesLoaded: function() {
            console.log('allImagesLoaded');
            $('.imagePreloader').hide();
            $('.stripedBorder').show();
            this.initCycle();
        },

        killSection: function() {
            clearInterval(this.cycleTimer);
        },

        init: function() {

            console.log('init');
            ko.applyBindings( Crivas.DataModel() );
            Crivas.showNewSection();
        }

    }

    /*
     Sammy(function() {
     this.get('#/something/:section', function() {

     });

     this.set('#/something/:section', function() {

     });

     }).run();
     */


    Crivas.init();

    window.Site = Crivas;

};



