Crivas.init = function () {

    var scope = $('body').get(0);

    ko.bindingHandlers.subMenu = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            // This will be called when the binding is first applied to an element
            // Set up any initial state, event handlers, etc. here
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            // This will be called once when the binding is first applied to an element,
            // and again whenever the associated observable changes value.
            // Update the DOM element based on the supplied values here.

            var value = valueAccessor(),
                allBindings = allBindingsAccessor();

            // Next, whether or not the supplied model property is observable, get its current value
            //var valueUnwrapped = ko.unwrap(value);

            //console.log('update - element', element);
            //console.log('update - valueAccessor', valueAccessor);
            //console.log('update - allBindingsAccessor', allBindingsAccessor);
            //console.log('update - viewModel', viewModel);
            //console.log('update - bindingContext', bindingContext);
            console.log('update - value', value);
            //console.log('update - valueUnwrapped', valueUnwrapped);
            var subMenuOn = viewModel.subMenu;
            var subMenuSelector = viewModel.subMenuSelector;
            if (subMenuOn) {

                $(element).append("<ul class='sub-menu'></ul>");
                var data = Crivas.Data.resume;
                //console.log("data", data);
                console.log('!!!!!!!!!!! portfolio-list', $('.portfolio-list'));
                //$(element).find(".sub-menu").append($clonedSubMenu);

                var $clonedMenu = $('.portfolio-list').clone();

                $clonedMenu.addClass('small-menu');

                $('.sub-menu').append($clonedMenu);

            }

        }
    };

    ko.applyBindings(Crivas.ViewModel(), scope);



    window.onhashchange = function (e) {
        //console.log('HASH CHANGE');
    };



};

$(Crivas.init);



