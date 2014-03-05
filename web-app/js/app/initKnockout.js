require(['knockout', 'appViewModel', 'domReady!'], function(ko, appViewModel) {

	var viewModel = new appViewModel();

    ko.applyBindings(viewModel);

	setInterval(viewModel.updateStockTicker, 5000);

});
