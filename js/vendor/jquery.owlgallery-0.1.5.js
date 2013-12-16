/*
 * Owl Gallery
 * crivas.net
 *
 * Author: Chester Rivas
 * Version: 1.5
 */
var Owl = {};

Owl.animationTypes = {};
Owl.animationTypes.SLIDE = "slide";
Owl.animationTypes.FADE = "fade";

Owl.event = {};
Owl.event.SLIDECHANGED = "slidechanged";
Owl.event.SLIDENEXTCLICKED = "slidenextclicked";
Owl.event.SLIDEPREVCLICKED = "slideprevclicked";
Owl.event.PAGINATIONCLICKED = "paginationclicked";

Owl.direction = {};
Owl.direction.FORWARD = "forward";
Owl.direction.BACKWARD = "backward";

Owl.responsivemode = {};
Owl.responsivemode.ALWAYSRESIZE = "alwaysresize";
Owl.responsivemode.ONLYRESIZEWHENSMALLER = "onlyresizewhensmaller";
Owl.responsivemode.NEVERRESIZE = "neverresize";

$.fn.owlgallery = function (options) {

    var settings = $.extend({
        // These are the defaults.
        cycleTime: 3000,
        animationTime: 350,
        galleryWidth: 640,
        galleryHeight: 480,
        maxImagesPerSlide: 1, //TODO: implement customizable images per slide, currently only shows one
        paginationElement: null,
        navElement: null,
        animationType: Owl.animationTypes.SLIDE,
        direction: Owl.direction.FORWARD,
        child: null, //will automatically find img and li tags
        responsiveMode: Owl.responsivemode.NEVERRESIZE,
        enableTweener: false,
        enableTouchEvents: false,
        autoLoadTweener: false,
        hideUntilReady: false,
        autoPlay: true
    }, options);

    var $this = this,
        $galleryListItems = [],
        $galleryImages = [],
        $paginationButtonList = [],
        imgWidth = null,
        imgHeight = null,
        loopBack = false,
        animationTimer,
        startSlide,
        currentSlide,
        prevSlide,
        startPagination,
        currentPaginationButton,
        prevPaginationButton,
        firstImage,
        lastImage,
        currentImageWidth = settings.galleryWidth,
        numberOfPics = 0,
        cycleTimer = null,
        currentID,
        prevID,
        currentSlideNum,
        aspectRatio,
        animating = false,
        originalDirection = settings.direction,
        easeType = 'Strong.easeOut',
        containerClassName = 'owl-slide-container',
        imageClassName = 'owl-image',
        paginationClassName = 'owl-pagination-button',
        listClassName = 'owl-list-item',
        navClassName = 'owl-nav',
        currentClassName = 'current',
        buttonIDPropertyName = 'buttonID';

    /**
     Get a new list of images and starts cycle again

     @method initCycle
     **/
    var initCycle = function () {

        if (settings.direction !== Owl.direction.FORWARD && settings.direction !== Owl.direction.BACKWARD) {
            settings.direction = Owl.direction.FORWARD;
            throw Error("direction option is not set to valid option 'forward' or 'backwards'. Defaulting to 'forward'");
        }

        if (settings.animationType !== Owl.animationTypes.FADE && settings.animationType !== Owl.animationTypes.SLIDE) {
            settings.animationType = Owl.animationTypes.FADE;
            throw Error("animationType option is not set to a valid option 'fade' or 'slide'. Defaulting to 'fade'");
        }

        if ( settings.animationTime > settings.cycleTime ) {
            throw Error("animationTime can not be less than cycleTime");
        }

        aspectRatio = settings.galleryHeight / settings.galleryWidth;

        $this.addClass(containerClassName);
        $this.css({
            overflow: 'hidden',
            zIndex: 1,
            display: 'block',
            position: 'relative',
            width: settings.galleryWidth,
            height: settings.galleryHeight
        });

        if (settings.hideUntilReady) {
            $this.css({
                opacity: 0
            });
        }

        var kids,
            $paginationContainer,
            paginationButtonItem,
            paginationCopy,
            id = 0;

        settings.child !== null ? kids = $this.find(settings.child) : kids = $this.children('img');

        if (!settings.child || settings.child.length == 0) {
            throw Error("child is undefined, therefore plugin can not find slide elements. Make sure an img, li or child div exist.");
        }

        $paginationContainer = $(settings.paginationElement);
        paginationButtonItem = $paginationContainer.children('li');

        // clear the list items
        $paginationContainer.html('');

        //setupPagination();

        kids.each(function () {

            var child = $(this);

            imgWidth = Math.max(child.width(), imgWidth);
            imgHeight = Math.max(child.height(), imgHeight);

            // if child is an img tag
            if (child.is('img')) {

                child.addClass(imageClassName).not('.not-gallery-image');
                child.css({
                    position: 'absolute',
                    display: 'inline-block'
                });

                $galleryListItems = $this.find('.' + imageClassName).not('.not-gallery-image');;

            } else if (child.is('div')) {

                child.addClass(listClassName);
                child.css({
                    position: 'absolute',
                    display: 'inline-block',
                    listStyle: 'none'
                });

                var deeperChild = child.find('img').not('.not-gallery-image');
                deeperChild.addClass(imageClassName);

                $galleryListItems = $this.find('.' + listClassName);

            } else if (child.is('li')) {

                child.addClass(listClassName);
                child.css({
                    position: 'absolute',
                    display: 'inline-block',
                    listStyle: 'none'
                });

                var deeperChild = child.find('img').not('.not-gallery-image');
                deeperChild.addClass(imageClassName);

                $galleryListItems = $this.find('.' + listClassName).not('.not-gallery-image');

            } else {

                throw Error("Can not find img tags please use the child property to pass in a valid img selector.");

            }

            paginationCopy = paginationButtonItem.clone();
            paginationCopy.attr(buttonIDPropertyName, id);
            paginationCopy.addClass(paginationClassName);

            //add a new list item on every loop
            $paginationContainer.append(paginationCopy);

            id += 1;

        });

        $galleryImages = $('.' + imageClassName);

        setupNavigationListeners();

        $paginationButtonList = $this.find('.' + paginationClassName);
        $paginationButtonList.bind('click', paginationClick);
        numberOfPics = $galleryListItems.length - 1;
        firstImage = $galleryListItems[ 0 ];
        lastImage = $galleryListItems[ numberOfPics ];

        setAnimationDefaults();

        // set up the initial slide and pagination button
        startSlide = $galleryListItems[ currentSlideNum ];
        startPagination = $paginationButtonList[ currentSlideNum ];
        $(startPagination).addClass(currentClassName);

        // clear any intervals currently running
        killTimer();

        // start cycling through images
        if (settings.autoPlay) {
            startTimer();
        } else {
            setCurrentSlide(currentSlideNum);
        }

        if (settings.enableTweener) {
            if (settings.autoLoadTweener) {
                $.getScript( "js/vendor/TweenMax.min.js", function() {
                    if (settings.hideUntilReady) {
                        TweenLite.to($this, 1, {
                            autoAlpha: 1, ease: easeType
                        });
                    }
                });
            }
        } else {
            if (settings.hideUntilReady) {
                $this.animate({opacity: 1}, {duration: 1000});
            }
        }

        // if responsive mode doesn't equal to neverresize then add event listener for window resize
        if (settings.responsiveMode !== Owl.responsivemode.NEVERRESIZE) {
            $(window).on('resize', onWindowResize);
            $galleryImages.css({
                minWidth: '100%',
                minHeight: '100%'
            });
            onWindowResize();
        }

    };

    /**
     Cycles through the next image in the array.
     If it's the last image in array it will reset back to the first one.

     @method cycleImages
     **/
    var cycleImages = function () {

        if (settings.direction == Owl.direction.FORWARD) {

            // going forward
            if (currentSlideNum >= numberOfPics) {

                currentSlideNum = 0;

                // define prevSlide and currentSlide
                setCurrentSlide(currentSlideNum);

                if (settings.animationType == Owl.animationTypes.FADE) {
                    showBottomImage(true);
                } else {
                    resetImageSlides();
                }

            } else {

                // increment current slide #
                currentSlideNum += 1;
                // define prevSlide and currentSlide
                setCurrentSlide(currentSlideNum);

                if (settings.animationType == Owl.animationTypes.FADE) {
                    // if going forward fade in each image on top
                    fadeTo();
                } else {
                    // animate the next slide
                    slideForward();
                }

            }

        } else {

            // going backwards
            if (currentSlideNum <= 0) {

                currentSlideNum = numberOfPics;
                // define prevSlide and currentSlide
                setCurrentSlide(currentSlideNum);

                if (settings.animationType == Owl.animationTypes.FADE) {
                    showTopImage(true);
                } else {
                    resetImageSlides();
                }

            } else {

                // decrement current slide #
                currentSlideNum -= 1;
                // define prevSlide and currentSlide
                setCurrentSlide(currentSlideNum);

                if (settings.animationType == Owl.animationTypes.FADE) {
                    // if going backwards fade out each image to reveal the image under
                    fadeTo();
                } else {
                    // animate the next slide
                    slideBackward();
                }

            }

        }

        $this.trigger(Owl.event.SLIDECHANGED, currentSlideNum);

    };

    var calculateParentPadding = function() {
        var totalPadding = 0;
        $.each($this.parents(), function() {
            totalPadding += parseInt( $(this).css('padding-left'), 10 );
            totalPadding += parseInt( $(this).css('padding-right'), 10 );
        });
        return totalPadding;
    }

    var onWindowResize = function() {

        if (settings.responsiveMode == Owl.responsivemode.ALWAYSRESIZE) {
            $this.css({
                width: $(window).width(),
                height: $(window).width() * aspectRatio
            });
            currentImageWidth = $(window).width();
        } else if (settings.responsiveMode == Owl.responsivemode.ONLYRESIZEWHENSMALLER) {
            if ($(window).width() <= settings.galleryWidth ) {
                $this.css({
                    width: $(window).width() - calculateParentPadding(),
                    height: $(window).width() * aspectRatio
                });
                currentImageWidth = $(window).width() - calculateParentPadding();
            } else {
                $this.css({
                    width: settings.galleryWidth,
                    height: settings.galleryHeight
                });
                currentImageWidth = settings.galleryWidth;
            }
        }
        repositionImages();

    };

    /**
     Positions all images based on animationType. Called when cycle reaches the beginning and end.

     @method repositionImages
     **/
    var repositionImages = function() {

        if (settings.animationType == Owl.animationTypes.FADE) {
            $galleryListItems.each(function () {
                $(this).css({left: 0});
            });
        } else {
            $galleryListItems.each(function (i) {
                $(this).css({left: Math.ceil(currentImageWidth * i) - (currentSlideNum * currentImageWidth)});
            });
        }

    };

    /**
     Sets up click event listeners for navigation elements if defined and touch swipeleft/swiperight if touch is enabled

     @method setupNavigationListeners
     **/
    var setupNavigationListeners = function() {

        var $navigationElement = $(settings.navElement),
            navigationButtons = $navigationElement.children('li'),
            $navLeft = $(navigationButtons[0]),
            $navRight = $(navigationButtons[1]);

        $navLeft.on('click', navigationDecrementClick);
        $navLeft.addClass(navClassName);
        $navRight.on('click', navigationIncrementClick);
        $navRight.addClass(navClassName);

        if (settings.enableTouchEvents) {

            $this.mobileswipe({
                event: 'swipeleft',
                callback: function(e) {
                    navigationIncrementClick(e);
                }
            });

            $this.mobileswipe({
                event: 'swiperight',
                callback: function(e) {
                    navigationDecrementClick(e);
                }
            });

        }

    };

    /**
     Wires up the initial animation setup based on animationType and direction

     @method setAnimationDefaults
     **/
    var setAnimationDefaults = function () {
        if (settings.direction == Owl.direction.FORWARD) {
            currentSlideNum = 0;
            settings.animationType == Owl.animationTypes.FADE ? showBottomImage(false) : initSlides();
        } else {
            currentSlideNum = numberOfPics;
            settings.animationType == Owl.animationTypes.FADE ? showTopImage(false) : initSlides();
        }
    };

    /*
     SLIDE ANIMATION METHODS
     */

    /**
     Cycles through the whole image array and show and/or reposition every image

     @method initSlides
     **/
    var initSlides = function () {

        if (settings.animationType == Owl.animationTypes.FADE) {
            $galleryListItems.each(function (i) {
                $(this).show();
            });
        } else {
            $galleryListItems.each(function (i) {
                $(this).show();
                $(this).css({left: ( 0 + currentImageWidth ) * i });
            });
        }

    };

    /**
     Slide animates from left to right

     @method slideForward
     **/
    var slideForward = function () {

        if (!animating) {

            animating = true;

            if (loopBack) {
                loopBack = false;
                initSlides();
            }

            $.each($galleryListItems, function () {

                var leftPos = parseInt($(this).css('left'), 10);
                if (settings.enableTweener) {
                    TweenLite.to($(this), settings.animationTime / 1000, {
                        left: leftPos - currentImageWidth, ease: easeType
                    });
                } else {
                    $(this).animate({
                        left: leftPos - currentImageWidth
                    }, settings.animationTime);
                }

            });

            cancelTimer();

        }

    };

    /**
     Slide animates from right to left

     @method slideBackward
     **/
    var slideBackward = function () {

        if (!animating) {

            animating = true;

            if (loopBack) {
                loopBack = false;
                $galleryListItems.each(function (i) {
                    $(this).show();
                    $(this).css({left: ( ( 0 + currentImageWidth ) * i ) - ( numberOfPics * currentImageWidth ) });
                });
            }

            $.each($galleryListItems, function () {

                var leftPos = parseInt($(this).css('left'), 10);
                if (settings.enableTweener) {
                    TweenLite.to($(this), settings.animationTime / 1000, {
                        left: leftPos + currentImageWidth, ease: easeType
                    });
                } else {
                    $(this).animate({
                        left: leftPos + currentImageWidth
                    }, settings.animationTime);
                }

            });

            cancelTimer();

        }

    };

    /**
     reset the image positions when animationType is set to 'slide'
     set loopBack to true

     @method resetImageSlides
     **/
    var resetImageSlides = function () {

        if (!animating) {

            animating = true;

            if (settings.direction == Owl.direction.FORWARD) {

                // IF GOING FORWARD
                $(firstImage).css({ left: 0 + currentImageWidth });
                $(lastImage).css({ left: 0 });

                $.each($galleryListItems, function () {

                    var leftPos = parseInt($(this).css('left'), 10);
                    if (settings.enableTweener) {
                        TweenLite.to($(this), settings.animationTime / 1000, {
                            left: leftPos - currentImageWidth, ease: easeType
                        });
                    } else {
                        $(this).animate({
                            left: leftPos - currentImageWidth
                        }, settings.animationTime);
                    }

                });

            } else {

                // IF GOING BACKWARDS
                $(firstImage).css({ left: 0 });
                $(lastImage).css({ left: 0 - currentImageWidth });

                $.each($galleryListItems, function () {

                    var leftPos = parseInt($(this).css('left'), 10);
                    if (settings.enableTweener) {
                        TweenLite.to($(this), settings.animationTime / 1000, {
                            left: leftPos + currentImageWidth, ease: easeType
                        });
                    } else {
                        $(this).animate({
                            left: leftPos + currentImageWidth
                        }, settings.animationTime);
                    }

                });

            }

            loopBack = true;
            cancelTimer();

        }

    };

    /**
     Cancels the current timeout and restarts it again

     @method cancelTimer
     **/
    var cancelTimer = function(){

        clearTimeout(animationTimer);
        animationTimer = setTimeout(function(){
            animating = false;
        }, settings.animationTime);

    };

    /*
     FADE ANIMATION METHODS
     */

    /**
     Fade to a specific slide

     @method fadeTo
     **/
    var fadeTo = function () {

        if (!animating) {

            animating = true;

            $.each($galleryListItems, function () {
                if (settings.enableTweener) {
                    $(this).css({
                        opacity: 0
                    });
                } else {
                    $(this).hide();
                }
            });

            if (settings.direction == Owl.direction.FORWARD) {
                if (settings.enableTweener) {
                    $(currentSlide).css({
                        opacity: 0
                    });
                    TweenLite.to($(currentSlide), settings.animationTime / 1000, {
                        autoAlpha: 1, ease: easeType
                    });
                } else {
                    $(prevSlide).show();
                    $(currentSlide).hide();
                    $(currentSlide).fadeIn(settings.animationTime);
                }
            } else {
                if (settings.enableTweener) {
                    $(prevSlide).css({
                        opacity: 1
                    });
                    $(currentSlide).css({
                        opacity: 1
                    });
                    TweenLite.to($(prevSlide), settings.animationTime / 1000, {
                        autoAlpha: 0, ease: easeType
                    });
                } else {
                    $(prevSlide).show();
                    $(prevSlide).fadeOut(settings.animationTime);
                    $(currentSlide).show();
                }
            }

            cancelTimer();

        }

    };

    /**
     Hide all images and fade in the top image

     @method showTopImage
     **/
    var showTopImage = function (fade) {

        if (!animating) {

            animating = true;

            $.each($galleryListItems, function () {
                if (settings.enableTweener) {
                    fade ? $(firstImage).css({opacity: 0}) : $(lastImage).css({opacity: 1});
                    $(this).css({left: 0});
                } else {
                    fade ? $(this).hide() : $(this).show();
                    $(this).css({left: 0});
                }
            });

            if (fade) {

                if (settings.enableTweener) {
                    $(firstImage).css({
                        opacity: 1
                    });
                    $(lastImage).css({
                        opacity: 0
                    });
                    TweenLite.to($(this), settings.animationTime / 1000, {
                        autoAlpha: 1, ease: easeType
                    });
                } else {
                    $(firstImage).show();
                    $(lastImage).hide();
                    $(currentSlide).fadeIn(settings.animationTime);
                }

                if (settings.enableTweener) {
                    TweenLite.to($(lastImage), settings.animationTime / 1000, {
                        autoAlpha: 1, ease: easeType, onComplete: function() {
                            $.each($galleryListItems, function () {
                                $(this).css({
                                    opacity: 1
                                });
                            });
                        }
                    });
                } else {
                    $(lastImage).fadeIn(settings.animationTime, function () {
                        $.each($galleryListItems, function () {
                            $(this).show();
                        });
                    });
                }


            } else {
                $(lastImage).show();
            }

            loopBack = true;
            cancelTimer();

        }

    };

    /**
     Hide all images and fade out the top image

     @method showBottomImage
     **/
    var showBottomImage = function (fade) {

        if (!animating) {

            animating = true;

            $.each($galleryListItems, function () {
                if (settings.enableTweener) {
                    $(this).css({left: 0});
                    $(this).css({
                        opacity: 0
                    });
                } else {
                    $(this).hide();
                    $(this).css({left: 0});
                }
            });

            if (fade) {
                if (settings.enableTweener) {
                    $(firstImage).css({
                        opacity: 0
                    });
                    TweenLite.to($(firstImage), settings.animationTime / 1000, {
                        autoAlpha: 1, ease: easeType
                    });
                } else {
                    $(firstImage).hide();
                    $(firstImage).fadeIn(settings.animationTime);
                }
            } else {
                if (settings.enableTweener) {
                    $(firstImage).css({
                        opacity: 1
                    });
                } else {
                    $(firstImage).show();
                }
            }

            cancelTimer();

        }

    };

    /**
     force definition of previous slide for navigation nev and prev click events

     @method setPreviousSlide
     **/
    var setPreviousSlide = function(i){
        prevSlide = $galleryListItems[ i ];
    };

    /**
     adds the current class to the currently showing image slide and corresponding pagination button

     @method setCurrentSlide
     **/
    var setCurrentSlide = function (i) {

        if (typeof(i) !== 'number') throw Error('variable i is not a number. Type of i is ' + typeof(i));

        currentSlideNum = Number(i);

        // select current slide from list array
        prevSlide = startSlide || currentSlide;
        currentSlide = $galleryListItems[ currentSlideNum ];
        startSlide = null;

        if ($(prevSlide).hasClass(currentClassName)) $(prevSlide).removeClass(currentClassName);
        $(currentSlide).addClass(currentClassName);

        // select current pagination button from list array
        prevPaginationButton = startPagination || currentPaginationButton;
        currentPaginationButton = $paginationButtonList[ currentSlideNum ];
        startPagination = null;

        if ($(prevPaginationButton).hasClass(currentClassName)) $(prevPaginationButton).removeClass(currentClassName);
        $(currentPaginationButton).addClass(currentClassName);

    };

    /**
     Click event for pagination button click.
     Looks for buttonID then calls appropriate slide if same button is not clicked
     @method paginationClick
     **/
    var paginationClick = function (e) {

        var $currentTarget = $(e.currentTarget);
        prevID = currentID || 0;
        currentID = Number($currentTarget.attr('buttonID'));

        if ( prevID > currentID ) {
            settings.direction = Owl.direction.FORWARD;
        } else {
            settings.direction = Owl.direction.BACKWARD;
        }

        // if the same pagination button hasn't been clicked then change slide
        if (currentID !== prevID) goToSlide(currentID, prevID);
        settings.direction = originalDirection;

    };

    /**
     Click event for navigation button click.
     Decrments currentSlideNum

     @method navigationDecrementClick
     **/
    var navigationDecrementClick = function (e) {

        if (!animating) {
            $this.trigger(Owl.event.SLIDEPREVCLICKED, currentSlideNum);
            settings.direction = Owl.direction.BACKWARD;
            cycleImages();
            settings.direction = originalDirection;
        }

    };

    /**
     Click event for navigation button click.
     Increments currentSlideNum

     @method navigationIncrementClick
     **/
    var navigationIncrementClick = function (e) {

        if (!animating) {
            $this.trigger(Owl.event.SLIDENEXTCLICKED, currentSlideNum);
            settings.direction = Owl.direction.FORWARD;
            cycleImages();
            settings.direction = originalDirection;
        }

    };

    /**
     Takes in a param, stops the timer, set the current and previous slides and animates towards next slide
     @param i number value of current slide
     @param p number - previous slide if needed
     @method goToSlide
     **/
    var goToSlide = function (i, p) {

        $this.trigger(Owl.event.SLIDECHANGED, currentSlideNum);
        $this.trigger(Owl.event.PAGINATIONCLICKED, currentSlideNum);

        if (!animating) {

            killTimer();
            currentSlideNum = i;
            setCurrentSlide(currentSlideNum);

            if (settings.direction == Owl.direction.FORWARD) {
                if (settings.animationType == Owl.animationTypes.FADE) {

                    fadeTo();

                } else {

                    $galleryListItems.each(function (i) {
                        $(prevSlide).css({left: 0});
                        $(currentSlide).css({left: 0 - currentImageWidth});
                    });

                    var leftPosP = parseInt($(prevSlide).css('left'), 10);
                    if (settings.enableTweener) {
                        TweenLite.to($(prevSlide), settings.animationTime / 1000, {
                            left: leftPosP + currentImageWidth, ease: easeType
                        });
                    } else {
                        $(prevSlide).animate({
                            left: leftPosP - currentImageWidth
                        }, settings.animationTime);
                    }

                    var leftPosC = parseInt($(currentSlide).css('left'), 10);
                    if (settings.enableTweener) {
                        TweenLite.to($(currentSlide), settings.animationTime / 1000, {
                            left: leftPosC + currentImageWidth, ease: easeType, onComplete:function() {
                                repositionImages();
                            }
                        });
                    } else {
                        $(currentSlide).animate({
                            left: leftPosC - currentImageWidth
                        }, settings.animationTime, function() {
                            repositionImages();
                        });
                    }

                }

            } else {
                if (settings.animationType == Owl.animationTypes.FADE) {

                    fadeTo();

                } else {

                    $galleryListItems.each(function (i) {
                        $(prevSlide).css({left: 0});
                        $(currentSlide).css({left: currentImageWidth});
                    });

                    var leftPosP = parseInt($(prevSlide).css('left'), 10);
                    if (settings.enableTweener) {
                        TweenLite.to($(prevSlide), settings.animationTime / 1000, {
                            left: leftPosP - currentImageWidth, ease: easeType
                        });
                    } else {
                        $(prevSlide).animate({
                            left: leftPosP - currentImageWidth
                        }, settings.animationTime);
                    }

                    var leftPosC = parseInt($(currentSlide).css('left'), 10);
                    if (settings.enableTweener) {
                        TweenLite.to($(currentSlide), settings.animationTime / 1000, {
                            left: leftPosC - currentImageWidth, ease: easeType, onComplete:function() {
                                repositionImages();
                            }
                        });
                    } else {
                        $(currentSlide).animate({
                            left: leftPosC - currentImageWidth
                        }, settings.animationTime, function() {
                            repositionImages();
                        });
                    }

                }
            }

            startTimer();

        }

        cancelTimer();

    };

    /**
     Stop the cycling timer

     @method killSection
     **/
    var killTimer = function () {
        clearInterval(cycleTimer);
    };

    /**
     Starts the cycling timer

     @method killSection
     **/
    var startTimer = function () {

        if (settings.autoPlay) {
            if (numberOfPics > 0) {
                cycleTimer = setInterval(cycleImages, settings.cycleTime);
            }
        }

    };

    initCycle();

    return $this;

};