/*!
 * pluginName: OwlSwipe
 * author: Chester Rivas
 * website: crivas.net
 * description: jquery plugin for touch event support, includes touch moving and swiping in any direction
 * version: 0.2.3
 * Copyright (c) 2014 Crivas Inc.
 */

var Owl = Owl || {};

Owl.event = Owl.event || {};
Owl.event.SWIPE = 'swipe';
Owl.event.SWIPE_LEFT = 'swipe_left';
Owl.event.SWIPE_RIGHT = 'swipe_right';
Owl.event.SWIPE_UP = 'swipe_up';
Owl.event.SWIPE_DOWN = 'swipe_down';
Owl.event.TOUCH_MOVE = 'touch_move';
Owl.event.TOUCH_MOVE_LEFT = 'touch_move_left';
Owl.event.TOUCH_MOVE_RIGHT = 'touch_move_right';
Owl.event.TOUCH_MOVE_UP = 'touch_move_up';
Owl.event.TOUCH_MOVE_DOWN = 'touch_move_down';
Owl.event.TOUCH_STOP = 'touch_stop';
Owl.event.NO_MOVEMENT = 'no_swipe';
Owl.event.NO_SWIPE = 'no_swipe';

$.fn.owlswipe = function (options) {

	var settings = $.extend({
		// These are the defaults.
		swipe: function(){},
		swipeLeft: function(){},
		swipeRight: function(){},
		swipeUp: function(){},
		swipeDown: function(){},
		touchMove: function(){},
		touchMoveLeft: function(){},
		touchMoveRight: function(){},
		touchMoveUp: function(){},
		touchMoveDown: function(){},
		touchStop: function(){},
		noSwipe: function(){},
		noMovement: function(){},
		bufferX: 50,
		bufferY: 50,
		minMovementX: 75,
		minMovementY: 75,
		swipeTimeout: 3000,
		maxClickDelay: 200,
		disableHorizontalSwipe: false,
		disableVerticalSwipe: false
	}, options);

	var $this = this,
		self = {},
		touchStart = {x: 0, y: 0},
		touchEnd = {x: 0, y: 0},
		distanceAbs = {x: 0, y: 0},
		distance = {x: 0, y: 0},
		touchXExceeded = false,
		touchYExceeded = false,
		dispatchSwipeEvent = false,
		swipeTimer,
		clickDelayTimer,
		clickDelay = 0,
		callStackCounter = 0;

	self.initDetection = function () {

		$this.on(Owl.event.SWIPE, function(e, d){
			settings.swipe.call(settings, d);
		});

		$this.on(Owl.event.SWIPE_LEFT, function(e, d){
			settings.swipeLeft.call(settings, d);
		});

		$this.on(Owl.event.SWIPE_RIGHT, function(e, d){
			settings.swipeRight.call(settings, d);
		});

		$this.on(Owl.event.SWIPE_UP, function(e, d){
			settings.swipeUp.call(settings, d);
		});

		$this.on(Owl.event.SWIPE_DOWN, function(e, d){
			settings.swipeDown.call(settings, d);
		});

		$this.on(Owl.event.TOUCH_MOVE, function(e, d){
			settings.touchMove.call(settings, d);
		});

		$this.on(Owl.event.TOUCH_MOVE_LEFT, function(e, d){
			settings.touchMoveLeft.call(settings, d);
		});

		$this.on(Owl.event.TOUCH_MOVE_RIGHT, function(e, d){
			settings.touchMoveRight.call(settings, d);
		});

		$this.on(Owl.event.TOUCH_MOVE_UP, function(e, d){
			settings.touchMoveUp.call(settings, d);
		});

		$this.on(Owl.event.TOUCH_MOVE_DOWN, function(e, d){
			settings.touchMoveDown.call(settings, d);
		});

		$this.on(Owl.event.TOUCH_STOP, function(e){
			settings.touchStop.call(settings);
		});

		$this.on(Owl.event.NO_SWIPE, function(e){
			settings.noSwipe.call(settings);
		});

		$this.on(Owl.event.NO_MOVEMENT, function(e){
			settings.noMovement.call(settings);
		});

		$this.on('touchstart', self.onTouchStart);

	};

	self.onTouchStart = function (e) {

		//console.log('self.onTouchStart');
		touchStart.x = touchEnd.x = e.originalEvent.touches[0].pageX;
		touchStart.y = touchEnd.y = e.originalEvent.touches[0].pageY;
		touchXExceeded = false;
		touchYExceeded = false;
		dispatchSwipeEvent = true;
		$this.on('touchend', self.onTouchEnd);
		$this.on('touchmove', self.onTouchMove);
		clearTimeout(swipeTimer);
		clickDelayTimer = setInterval(function(){
			clickDelay += 1;
		}, 1);
		swipeTimer = setTimeout(function(){
			dispatchSwipeEvent = false;
		}, settings.swipeTimeout);

	};

	self.onTouchMove = function (e) {

		//console.log('onTouchMove');
		touchEnd.x = e.originalEvent.touches[0].pageX;
		touchEnd.y = e.originalEvent.touches[0].pageY;
		distance.x = touchEnd.x - touchStart.x;
		distance.y = touchEnd.y - touchStart.y;
		distanceAbs.x = Math.abs(touchEnd.x - touchStart.x);
		distanceAbs.y = Math.abs(touchEnd.y - touchStart.y);

		if (distanceAbs.y > settings.bufferY || distanceAbs.x > settings.bufferX) {
			$this.trigger(Owl.event.TOUCH_MOVE, [distance]);
			e.preventDefault();
		}

		if (distanceAbs.y < settings.bufferY && distanceAbs.x > settings.minMovementX) {

			if (distance.x < 0) {
				$this.trigger(Owl.event.TOUCH_MOVE_LEFT, [distance]);
				e.preventDefault();
			} else if (distance.x > 0) {
				$this.trigger(Owl.event.TOUCH_MOVE_RIGHT, [distance]);
				e.preventDefault();
			}

		} else if (distanceAbs.x < settings.bufferX && distanceAbs.y > settings.minMovementY) {

			if (distance.y < 0) {
				$this.trigger(Owl.event.TOUCH_MOVE_UP, [distance]);
				e.preventDefault();
			} else if (distance.y > 0) {
				$this.trigger(Owl.event.TOUCH_MOVE_DOWN, [distance]);
				e.preventDefault();
			}

		}
	};

	self.onTouchEnd = function (e) {
		//console.log('onTouchEnd');
		$this.off('touchmove touchend');
		$this.trigger(Owl.event.TOUCH_STOP);
		clearInterval(clickDelayTimer);
		if (distanceAbs.y <= 1 && distanceAbs.x <= 1 && clickDelay < settings.maxClickDelay) {
			$this.trigger(Owl.event.NO_MOVEMENT);
			$this.trigger('click');
		}
		clickDelay = 0;
		if (dispatchSwipeEvent) {
			if (distanceAbs.y < settings.bufferY && distanceAbs.x > settings.minMovementX) {
				$this.trigger(Owl.event.SWIPE, [distance]);
				if (distance.x < 0) {
					$this.trigger(Owl.event.SWIPE_LEFT, [distance]);
					e.preventDefault();
				} else if (distance.x > 0) {
					$this.trigger(Owl.event.SWIPE_RIGHT, [distance]);
					e.preventDefault();
				}
			} else if (distanceAbs.x < settings.bufferX && distanceAbs.y > settings.minMovementY) {
				$this.trigger(Owl.event.SWIPE, [distance]);
				if (distance.y < 0) {
					$this.trigger(Owl.event.SWIPE_UP, [distance]);
					e.preventDefault();
				} else if (distance.y > 0) {
					$this.trigger(Owl.event.SWIPE_DOWN, [distance]);
					e.preventDefault();
				}
			} else {
				$this.trigger(Owl.event.NO_SWIPE, [distance]);
			}

		}
	};

	self.initDetection();


};