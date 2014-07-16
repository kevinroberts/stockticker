define("stockList", ["jquery", "knockout" ], function( $, ko ) {
	'use strict';

	/**
	 * Stock List object
	 * A model of a list of stocks objects
	 * with additional meta information
	 * @returns {object} StockList
	 */
	return function(id, name, stocks) {
		var self = this;
		self.id = id;
		self.stocks = ko.observableArray(stocks);
		self.name = ko.observable(name);
	};

});