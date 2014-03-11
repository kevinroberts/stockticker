require(['knockout', 'appViewModel', 'utils', 'domReady!'], function(ko, appViewModel, stockticker) {

	var viewModel = new appViewModel();

    ko.applyBindings(viewModel);

	// set interval to update all stocks every 6 seconds
	stockticker.utils.stockInterval = setInterval(viewModel.updateStockTicker, 6000);


});
