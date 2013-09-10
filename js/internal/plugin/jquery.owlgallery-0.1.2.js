/*!
 * Owl Gallery
 * crivas.net
 *
 * Copyright (c) Chester Rivas
 */

/*
 * Owl Accordion is a simple JQuery plugin to give a menu the accordion effect when clicked
 *
 * Authors        Chester Rivas
 */

var Owl = {};

Owl.animationTypes = {};
Owl.animationTypes.SLIDE = "slide";
Owl.animationTypes.FADE = "fade";

Owl.direction = {};
Owl.direction.FORWARD = "forward";
Owl.direction.BACKWARD = "backward";

$.fn.owlgallery = function (options) {

    var settings = $.extend({
        // These are the defaults.
        cycleTime: 3000,
        animationTime: 350,
        paginationElement: null,
        animationType: Owl.animationTypes.FADE,
        direction: Owl.direction.FORWARD,
        child: null //will automatically find img tags
    }, options);

    var $this = this,
        $imageList = [],
        $paginationButtonList = [],
        imgWidth = null,
        imgHeight = null,
        loopBack = false,
        startSlide,
        currentSlide,
        prevSlide,
        startPagination,
        currentPaginationButton,
        prevPaginationButton,
        firstImage,
        lastImage,
        numberOfPics = 0,
        cycleTimer = null,
        currentID,
        prevID,
        currentSlideNum,
        fadeForward,
        containerClassName = 'owl-slide-container',
        imageClassName = 'owl-image',
        paginationClassName = 'owl-pagination-button',
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

        $this.addClass(containerClassName);
        $this.css({
            overflow: 'hidden',
            zIndex: 1
        });

        var kids, $paginationContainer, paginationButtonItem, id = 0;

        settings.child !== null ? kids = $(settings.child) : kids = $this.children('img');

        $paginationContainer = $(settings.paginationElement);
        paginationButtonItem = $paginationContainer.children('li');

        // clear the list items
        $paginationContainer.html('');

        kids.each(function () {

            var child = $(this);

            imgWidth = Math.max(child.width(), imgWidth);
            imgHeight = Math.max(child.height(), imgHeight);

            // if child is an img tag
            if (child.is('img')) {

                child.addClass(imageClassName);
                child.css({
                    position: 'absolute'
                });

                var paginationCopy = paginationButtonItem.clone();

                paginationCopy.attr(buttonIDPropertyName, id);
                paginationCopy.addClass(paginationClassName);

                //add a new list item on every loop
                $paginationContainer.append(paginationCopy);

                id += 1;

            } else {

                throw Error("Can not find img tags please use the child property to pass in a valid img selector.");

            }

        });

        $imageList = $('.' + imageClassName);
        $paginationButtonList = $('.' + paginationClassName);
        $paginationButtonList.bind('click', paginationClick);
        numberOfPics = $imageList.length - 1;
        firstImage = $imageList[ 0 ];
        lastImage = $imageList[ numberOfPics ];

        if (settings.direction == Owl.direction.FORWARD) {

            currentSlideNum = 0;
            settings.animationType == Owl.animationTypes.FADE ? showBottomImage(false) : initSlides();

        } else {

            currentSlideNum = numberOfPics;
            settings.animationType == Owl.animationTypes.FADE ? showTopImage(false) : initSlides();

        }

        console.log('STARTING WITH SLIDE #', currentSlideNum);

        // set up the initial slide and pagination button
        startSlide = $imageList[ currentSlideNum ];
        startPagination = $paginationButtonList[ currentSlideNum ];
        $(startPagination).addClass(currentClassName);

        // clear any intervals currently running
        killTimer();

        // start cycling through images
        startTimer();

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

                settings.animationType == Owl.animationTypes.FADE ? showBottomImage(true) : resetImageSlides();

            } else {

                // increment current slide #
                currentSlideNum += 1;

                // define prevSlide and currentSlide
                setCurrentSlide(currentSlideNum);

                if (settings.animationType == Owl.animationTypes.FADE) {

                    // if going forward fade in each image on top
                    fadeForward = true;
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

                settings.animationType == Owl.animationTypes.FADE ? showTopImage(true) : resetImageSlides();

            } else {

                // decrement current slide #
                currentSlideNum -= 1;

                // define prevSlide and currentSlide
                setCurrentSlide(currentSlideNum);

                if (settings.animationType == Owl.animationTypes.FADE) {

                    // if going backwards fade out each image to reveal the image under
                    fadeForward = false;
                    fadeTo();

                } else {

                    // animate the next slide
                    slideBackward();

                }

            }

        }

    };

    var slideForward = function () {

        // move offscreen to the left
        if (loopBack) {

            // take the last image and move it offscreen, only happens once
            $(firstImage).show();
            $(firstImage).css({ left: 0 });
            $(firstImage).animate({
                left: 0 - imgWidth
            }, settings.animationTime, function () {
                $(firstImage).hide();
            });

            loopBack = false;

        } else {

            // when not looping back
            $(prevSlide).show();
            $(prevSlide).css({ left: 0 });
            $(prevSlide).animate({
                left: 0 - imgWidth
            }, settings.animationTime, function () {
                $(prevSlide).hide();
            });

        }

        // move the current slide in from the right
        $(currentSlide).show();
        $(currentSlide).css({ left: imgWidth });
        $(currentSlide).animate({
            left: 0
        }, settings.animationTime);

    };

    var slideBackward = function () {

        // move offscreen to the left
        if (loopBack) {

            // take the last image and move it offscreen, only happens once
            $(firstImage).show();
            $(firstImage).css({ left: 0 });
            $(firstImage).animate({
                left: 0 + imgWidth
            }, settings.animationTime, function () {
                $(firstImage).hide();
            });

            loopBack = false;

        } else {

            // when not looping back
            $(prevSlide).show();
            $(prevSlide).css({ left: 0 });
            $(prevSlide).animate({
                left: 0 + imgWidth
            }, settings.animationTime, function () {
                $(prevSlide).hide();
            });

        }

        // move the current slide in from the right
        $(currentSlide).show();
        $(currentSlide).css({ left: 0 - imgWidth });
        $(currentSlide).animate({
            left: 0
        }, settings.animationTime);

    };

    /**
     Fade to a specific slide

     @method fadeTo
     **/
    var fadeTo = function () {

        $.each($imageList, function () {
            $(this).hide();
        });

        if (fadeForward) {
            $(prevSlide).show();
            $(currentSlide).hide();
            $(currentSlide).fadeIn(settings.animationTime);
        } else {
            $(prevSlide).show();
            $(prevSlide).fadeOut(settings.animationTime);
            $(currentSlide).show();
        }

    };

    ///////////////////////////////
    // FADE ANIMATION METHODS
    ///////////////////////////////

    /**
     Cycles through the whole image array and show and/or reposition every image

     @method initSlides
     **/
    var initSlides = function () {

        if (settings.animationType == Owl.animationTypes.FADE) {
            $.each($imageList, function () {
                $(this).show();
            });
        } else {
            $.each($imageList, function () {
                $(this).hide();
                $(this).css({left: imgWidth + 100});
            });
            $(firstImage).show();
            $(firstImage).css({left: 0});
        }

    };

    /**
     Hide all images and fade in the top image

     @method showTopImage
     **/
    var showTopImage = function (fade) {

        $.each($imageList, function () {
            fade ? $(this).hide() : $(this).show();
            $(this).css({left: 0});
        });

        if (fade) {
            $(firstImage).show();
            $(lastImage).hide();
            $(lastImage).fadeIn(settings.animationTime, function () {
                $.each($imageList, function () {
                    $(this).show();
                });
            });
        } else {
            $(lastImage).show();
        }

        loopBack = true;

    };

    /**
     Hide all images and fade out the top image

     @method showBottomImage
     **/
    var showBottomImage = function (fade) {

        $.each($imageList, function () {
            $(this).hide();
            $(this).css({left: 0});
        });

        $(firstImage).show();

        if (fade) {
            $(lastImage).show();
            $(lastImage).fadeOut(settings.animationTime);
        }

    };

    /**
     reset the image positions when animationType is set to 'slide'
     set loopBack to true

     @method resetImageSlides
     **/
    var resetImageSlides = function () {

        if (settings.direction == Owl.direction.FORWARD) {

            $.each($imageList, function () {
                $(this).hide();
                $(this).css({left: imgWidth + 100});
            });

            $(lastImage).show();
            $(lastImage).css({ left: 0 });
            $(lastImage).animate({
                left: 0 - imgWidth
            }, settings.animationTime, function () {
                $(lastImage).hide();
            });

            $(firstImage).show();
            $(firstImage).css({ left: imgWidth });
            $(firstImage).animate({
                left: 0
            }, settings.animationTime);

        } else {

            $.each($imageList, function () {
                $(this).hide();
                $(this).css({left: 0 - imgWidth - 100});
            });

            $(lastImage).show();
            $(lastImage).css({ left: 0 });
            $(lastImage).animate({
                left: imgWidth
            }, settings.animationTime, function () {
                $(lastImage).hide();
            });

            $(firstImage).show();
            $(firstImage).css({ left: 0 - imgWidth });
            $(firstImage).animate({
                left: 0
            }, settings.animationTime);

        }

        loopBack = true;

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
        currentSlide = $imageList[ currentSlideNum ];
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

        prevID = currentID || null;

        currentID = Number($currentTarget.attr('buttonID'));

        prevID > currentID ? fadeForward = false : fadeForward = true;

        // if the same pagination button hasn't been clicked then change slide
        if (currentID !== prevID) goToSlide(currentID);

    };

    /**
     Takes in a param, stops the timer, set the current and previous slides and animatate towards next slide
     @param a number - determines which slide to go to.
     @method goToSlide
     **/
    var goToSlide = function (i) {

        killTimer();

        currentSlideNum = i;

        setCurrentSlide(currentSlideNum);

        if (settings.direction == Owl.direction.FORWARD) {
            if (settings.animationType == Owl.animationTypes.FADE) {
                fadeTo();
            } else {
                slideForward();
            }

        } else {
            if (settings.animationType == Owl.animationTypes.FADE) {
                fadeTo();
            } else {
                slideBackward();
            }
        }

        startTimer();

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
        if (numberOfPics > 0) {
            cycleTimer = setInterval(cycleImages, settings.cycleTime);
        }
    };

    initCycle();

    return $this;

};