

Crivas.init = function() {

	debugger;

	ko.applyBindings(Crivas.DataModel);

	window.onhashchange = function(e) {
		console.log('HASH CHANGE');
	};

};

$(Crivas.init);

window.Crivas = Crivas;



