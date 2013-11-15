Crivas.$window;
Crivas.windowWidth;
Crivas.windowHeight;

Crivas.init = function () {

	Crivas.$window = $(window);
	Crivas.$window.on('resize', Crivas.onWindowResize);
	Crivas.onWindowResize();

	var scope = $('body').get(0);

	ko.bindingHandlers.subMenu = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			// This will be called when the binding is first applied to an element
			// Set up any initial state, event handlers, etc. here
		},
		update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			// This will be called once when the binding is first applied to an element,
			// and again whenever the associated observable changes value.
			// Update the DOM element based on the supplied values here.

			var value = valueAccessor(),
				allBindings = allBindingsAccessor();

			// Next, whether or not the supplied model property is observable, get its current value
			// var valueUnwrapped = ko.unwrap(value);

			var subMenuOn = viewModel.subMenu;
			var subMenuSelector = viewModel.subMenuSelector;
			if (subMenuOn) {
				$(element).append("<ul class='sub-menu'></ul>");
				var $clonedMenu = $('.portfolio-list').clone();
				$clonedMenu.addClass('small-menu');
				$('.sub-menu').append($clonedMenu);

			}
		}
	};

	ko.applyBindings(Crivas.ViewModel(), scope);

	//if (window.location.hash) window.location.hash.replace('#', '');

	/*
	 window.onhashchange = function (e) {
	 if (window.location.hash) window.location.hash.replace('#', '');
	 };
	 */

};

Crivas.windowLoaded = function () {

	$('body').fadeIn(500);
	//TweenLite.to($('body'), 2, { autoAlpha: 1, ease: Expo.easeOut });

};

Crivas.onWindowResize = function () {
	console.log('Crivas.onWindowResize');
	Crivas.windowWidth = Crivas.$window.width();
	Crivas.windowHeight = Crivas.$window.height();
};

$(document).ready(Crivas.init);
$(window).load(Crivas.windowLoaded);





