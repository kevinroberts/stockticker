// Main viewmodel class
define(['knockout', 'bootbox', 'utils', 'moment', 'blockui', 'knockout-bootstrap'], function(ko, bootbox, stockticker, moment) {

    // Document wide AJAX loading screen
//    $(document).ajaxStart(function() {
//            stockticker.utils.showLoadingMessage("Loading stock information...");
//    }).ajaxComplete(function() {
//            $.unblockUI();
//            $("#symbolToAdd").val('');
//    });

    var Stock = function (id, symbol, name, price, prevPrice, priceChange, percentChange, lastUpdated) {
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

    return function appViewModel() {
        var self = this;

		var serviceUrl = $("#stockServiceUrl").val().replace(/SYMBOL/g, '');

        // initial data
        self.stocks = ko.observableArray([]);

        this.symbolToAdd = ko.observable("");


        this.stockSymbolIsValid = ko.computed(function() {
            return (this.symbolToAdd() == "") || (this.symbolToAdd().match(/^\s*[a-zA-Z0-9_^:]{1,15}\s*$/) != null);
        }, this);

        self.removeStock = function(stock) {
            self.stocks.remove(stock);
        };

        self.clearStocks = function() {
            bootbox.confirm("Are you sure?", function(result) {
                if (result) {
                    self.stocks.removeAll();
                }
            });
        };

        self.removeBySymbol = function() {
            bootbox.prompt("Enter Stock Symbol: ", function(result) {
                if (result === null) {
                    stockticker.utils.log("Stock symbol not entered in bootbox dialog");
                } else {
                    stockticker.utils.log("removing stock - " + result);
                    self.stocks.remove(function(item) { return item.symbol == result })
                }
            });
        };

        self.addStock = function() {
            if (this.symbolToAdd() && this.stockSymbolIsValid()) {
                var symbol = encodeURI(this.symbolToAdd());
				stockticker.utils.showStockLoadingMessage("Loading...");
                $.getJSON(serviceUrl + symbol, function(stockData) {
					$('.stockTickerList').unblock();
					if (stockData.error && stockData.error.code) {
                        stockticker.utils.log("Service call contains errors...", stockData.error);
                        stockticker.utils.showAlertMessage(stockData.error.message);
                    } else {
						var stock = new Stock(stockticker.utils.guid(), stockData.symbol, stockData.name, stockData.price, stockData.price, stockData.change, stockData.percentChange, moment().format("lll"));

						var match = ko.utils.arrayFirst(self.stocks(), function(item) {
							return stock.symbol === item.symbol;
						});

						// validate that the entered symbol is new
						if (!match) {
							stockticker.utils.log('adding new stock: ', stock);
							self.stocks.push(stock);
							self.symbolToAdd(''); // clear the entered symbol for next input
						} else {
							stockticker.utils.showAlertMessage("Symbol is already entered.");
						}
                    }
                });
            } else {
                stockticker.utils.showAlertMessage("Invalid ticker symbol entered.");
            }
        }
        var symbolSortToggle = false;
        self.sortStocksBySymbol = function() {
            if (!symbolSortToggle) {
                self.stocks.sort(function(left, right) { return left.symbol == right.symbol ? 0 : (left.symbol < right.symbol ? -1 : 1) });
                symbolSortToggle = true;
            } else {
                self.stocks.sort(function(left, right) { return left.symbol == right.symbol ? 0 : (left.symbol > right.symbol ? -1 : 1) });
                symbolSortToggle = false;
            }
        }

		self.lastUpdate = ko.computed(function() {
			if (self.stocks().length > 0) {
				return " - last updated " + moment().format("h:mm:ss a");
			} else {
				return '';
			}
		}, this);

		self.updateStockTicker = function() {
			// iterate through stock array and fetch updated information
			stockticker.utils.log("updating stock tickers - " + (new Date()).getTime());
			if (self.stocks().length > 0) {
				ko.utils.arrayForEach(self.stocks(), function(item) {
					console.log("updating: " + item.symbol);
					$.getJSON(serviceUrl + item.symbol, function(stockData) {
						if (stockData.error && stockData.error.code) {
							stockticker.utils.log("Service call contains errors...", stockData.error);
						} else {
							//item.name = stockData.name + " - " + (new Date()).getTime();
							stockticker.utils.log("Updated stock info", stockData);
							item.symbol = stockData.symbol;
							item.prevPrice(item.price());
							item.price(stockData.price);
							item.priceChange(stockData.change);
							item.percentChange(stockData.percentChange);
                            item.lastUpdated = moment().format("lll");
							stockticker.utils.log("Updated stock prices - old: " + item.prevPrice() + " / new: " + item.price());
							var data = self.stocks().slice(0);
							self.stocks([]);
							self.stocks(data);
						}
					});
				});

			}


		}


    };
});