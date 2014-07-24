define("stock", ["jquery", "knockout" ], function( $, ko ) {
	'use strict';

	/**
	 * Stock object
	 * A model of a capital stock containing
	 * pricing and other basic information about the equity
	 * @param {String} id a unique identifier for this stock
	 * @param {String} symbol the ticker symbol for this stock
	 * @param {String} name of the stock
	 * @param {Number} price the stocks current price
	 * @param {Number} priceChange number to indicate the overall change in price from the last update
	 * @param {Number} percentChange number to indicate the overall change in percent from the last update
	 * @param {String} lastUpdate - a timestamp to indicate when the last update was made (use something like moment().format("lll")
	 * @returns {object} Stock
	 */
	return function (id, symbol, name, price, prevPrice, priceChange, percentChange, lastUpdated) {
		var self = this;
		self.id = id;
		self.symbol = symbol;
		self.name = name;
		self.price = ko.observable(price);
		self.prevPrice = ko.observable(prevPrice);
		self.priceChange = ko.observable(priceChange);
		self.percentChange = ko.observable(percentChange);
		self.lastUpdated = lastUpdated;

		self.formattedPrice = ko.computed(function() {
			var price = self.price();
			var str = price ? "$" + price.toFixed(2) : "N/A";

			return str;
		});

		self.formattedPriceChange = ko.computed(function() {
			var newPrice = self.price();
			var priceChange = self.priceChange();
			var oldPrice = newPrice - priceChange;
			var percentChange = (newPrice / oldPrice) * 100;

			percentChange = percentChange - 100;

			var positiveSign = '';
			if (percentChange > 0) {
				positiveSign = '+';
			}
			// use pre-formatted percent change provided by webservice call
			var str = percentChange ? positiveSign + priceChange + " (" + self.percentChange() + ")" : "N/A";

			return str;
		});

	};

});