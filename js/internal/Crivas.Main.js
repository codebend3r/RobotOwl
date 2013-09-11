Crivas.init = function () {

    var scope = $('body').get(0);

    ko.applyBindings(Crivas.ViewModel(), scope);

    window.onhashchange = function (e) {
        //console.log('HASH CHANGE');
    };

};

$(Crivas.init);



