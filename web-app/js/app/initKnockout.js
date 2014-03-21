require(['knockout', 'appViewModel', 'utils', 'domReady!'], function(ko, appViewModel, utils) {

	var viewModel = new appViewModel();

    ko.applyBindings(viewModel);

	// set interval to update all stocks every 6 seconds
	utils.setStockInterval(setInterval(viewModel.updateStockTicker, 6000));


});
