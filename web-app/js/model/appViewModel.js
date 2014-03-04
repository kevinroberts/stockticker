// Main viewmodel class
define(['knockout', 'bootbox', 'utils', 'blockui', 'knockout-bootstrap'], function(ko, bootbox, stockticker) {

    // Document wide AJAX loading screen
//    $(document).ajaxStart(function() {
//            stockticker.utils.showLoadingMessage("Loading stock information...");
//    }).ajaxComplete(function() {
//            $.unblockUI();
//            $("#symbolToAdd").val('');
//    });

    var Stock = function (id, symbol, name, price, priceChange) {
        var self = this;
        self.id = id;
        self.symbol = symbol;
        self.name = name;
        self.price = price;
        self.priceChange = priceChange;

        self.formattedPrice = ko.computed(function() {
            var price = self.price;
            var str = price ? "$" + price.toFixed(2) : "N/A";

            return str;
        });

        self.formattedPriceChange = ko.computed(function() {
            var newPrice = self.price;
            var priceChange = self.priceChange;
            var oldPrice = newPrice - priceChange;
            var percentChange = (newPrice / oldPrice) * 100;

            percentChange = percentChange - 100;

            var positiveSign = '';
            if (percentChange > 0) {
                positiveSign = '+';
            }

            var str = percentChange ? positiveSign + priceChange + " (" + positiveSign + percentChange.toFixed(3) + "%" + ")" : "N/A";

            return str;
        });

    };

    return function appViewModel() {
        var self = this;

        // initial data
        self.stocks = ko.observableArray([]);

        this.symbolToAdd = ko.observable("");

        this.stockSymbolIsValid = ko.computed(function() {
            return (this.symbolToAdd() == "") || (this.symbolToAdd().match(/^\s*[a-zA-Z0-9_^]{1,15}\s*$/) != null);
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
                    console.log("Stock symbol not entered in bootbox dialog");
                } else {
                    console.log("removing stock - " + result);
                    self.stocks.remove(function(item) { return item.symbol == result })
                }
            });
        };

        self.addStock = function() {
            if (this.symbolToAdd() && this.stockSymbolIsValid()) {
                var symbol = encodeURI(this.symbolToAdd());
				stockticker.utils.showStockLoadingMessage("Loading...");
                $.getJSON(document.documentURI + "symbol/" + symbol, function(stockData) {
					$('.stockTickerList').unblock();
					if (stockData.error && stockData.error.code) {
                        console.log("Contains errors!", stockData.error);
                        stockticker.utils.showAlertMessage(stockData.error.message);
                    } else {
						var stock = new Stock(stockticker.utils.guid(), stockData.symbol, stockData.name, stockData.price, stockData.change);

						var match = ko.utils.arrayFirst(self.stocks(), function(item) {
							return stock.symbol === item.symbol;
						});

						if (!match) {
							console.log('adding new stock: ', stock);
							self.stocks.push(stock);
						} else {
							stockticker.utils.showAlertMessage("Symbol is already entered.");
						}
                    }
                });
            } else {
                stockticker.utils.showAlertMessage("Invalid ticker symbol entered.");
            }
        }


    };
});