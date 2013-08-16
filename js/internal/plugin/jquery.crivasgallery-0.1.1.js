$.fn.crivasgallery = function (options) {

  var FORWARD = 'forward',
      BACKWARD = 'backward';

  var settings = $.extend({
    // These are the defaults.
    cycleTime: 3000,
    cycleTimer: null,
    currentSlideNum: 0,
    numberOfPics: 0,
    fadeTime: 350,
    $imageList: [],
    direction: FORWARD,
    child: null //will automatically find img tags
  }, options);

  var $this = this;

  /**
   Get a new list of images and starts cycle again

   @method initCycle
   **/
  var initCycle = function () {

    console.log('CrivasGallery.initCycle');

    if (settings.direction !== FORWARD && settings.direction !== BACKWARD) {
      throw Error("direction option is not set to 'forward' or 'backwards'. Defaulting to 'forward'");
      settings.direction = FORWARD;
    }

    $this.addClass('crivas-gallery-container');

    var kids;

    settings.child !== null ? kids = $(settings.child) : kids = $this.children('img');

    kids.each(function () {

      var child = $(this);

      // if child is an img tag
      if (child.is('img')) {
        child.addClass('crivas-gallery-image');
      }

    });

    settings.$imageList = $('.crivas-gallery-image');
    settings.numberOfPics = settings.$imageList.length - 1;

    if (settings.direction == FORWARD) {
      settings.currentSlideNum = 0;
      showBottomImage(false);
    } else {
      settings.currentSlideNum = settings.numberOfPics + 1;
      //showAll(false);
    }

    console.log('///////////// SETTINGS /////////////');
    console.log('# OF PICS', settings.numberOfPics);
    console.log('STARTING FROM PIC #', settings.currentSlideNum);
    console.log('ALL IMAGES', settings.$imageList);

    // clear any intervals currently running
    killTimer();

    // start cycling through images
    if (settings.numberOfPics > 0) {
      settings.cycleTimer = setInterval(cycleImages, settings.cycleTime);
    }

  };

  /**
   Cycles through the next image in the array.
   If it's the last image in array it will reset back to the first one.

   @method cycleImages
   **/
  var cycleImages = function () {

    console.log('CrivasGallery.cycleImages', settings.currentSlideNum);

    var currentSlide;

    if (settings.direction == FORWARD) {

      //GOING FORWARD

      if (settings.currentSlideNum >= settings.numberOfPics) {

        settings.currentSlideNum = 0;
        showBottomImage(true);

      } else {

        // increment current slide #
        settings.currentSlideNum += 1;

        // then select current slide from image list array
        currentSlide = settings.$imageList[ settings.currentSlideNum ];

        //if going forward fade in each image on top
        $(currentSlide).fadeIn(settings.fadeTime);

      }

    } else {

      //GOING BACKWARDS

      if (settings.currentSlideNum <= 1) {

        settings.currentSlideNum = settings.numberOfPics + 1;
        //killTimer();
        showTopImage(true);

      } else {

        // decrement current slide #
        settings.currentSlideNum -= 1;

        //console.log('currentSlideNum', settings.currentSlideNum);

        // then select current slide from image list array
        currentSlide = settings.$imageList[ settings.currentSlideNum ];

        //if going backwards fade out each image to reveal the image under
        $(currentSlide).fadeOut(settings.fadeTime);

      }
    }

  };

  /**
   Cycles through the whole image array and shows everything

   @method showAll
   **/
  var showAll = function () {
    $.each(settings.$imageList, function () {
      $(this).show();
    });
  };

  /**
   Hide all images and fade in the top image

   @method showTopImage
   **/
  var showTopImage = function (fade) {

    $.each(settings.$imageList, function () {
      $(this).hide();
    });

    var bottomImage = settings.$imageList[ 0 ];
    var topImage = settings.$imageList[ settings.numberOfPics ];
    $(bottomImage).show();
    $(topImage).show();

    if (fade) {
      $(topImage).hide();
      $(topImage).fadeIn(settings.fadeTime, showAll);
    }

  };

  /**
   Hide all images and fade out the top image

   @method showTopImage
   **/
  var showBottomImage = function (fade) {

    $.each(settings.$imageList, function () {
      $(this).hide();
    });

    var bottomImage = settings.$imageList[ 0 ];
    var topImage = settings.$imageList[ settings.numberOfPics ];
    $(bottomImage).show();

    if (fade) {
      $(topImage).show();
      $(topImage).fadeOut(settings.fadeTime);
    }

  };

  /**
   Stop the cycling timer

   @method killSection
   **/
  var killTimer = function () {
    clearInterval(settings.cycleTimer);
    console.log('TIMER CLEARED');
  };

  initCycle();

  //return $this;
};