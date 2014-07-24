define("stockList", ["jquery", "knockout" ], function( $, ko ) {
	'use strict';

	/**
	 * Stock List object
	 * A model of a list of stocks objects
	 * with additional meta information
	 * @param {String} id a unique identifier for this list
	 * @param {String} name a user friendly identifier for this stock list
	 * @param {array} an array of Stock objects
	 * @returns {object} StockList
	 */
	return function(id, name, stocks) {
		var self = this;
		self.id = id;
		self.stocks = ko.observableArray(stocks);
		self.name = ko.observable(name);
	};

});