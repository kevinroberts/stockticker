define(['knockout', 'bootbox', 'utils', 'moment', 'underscore', 'stock', 'stockList', 'dataStore' , 'mousetrap' , 'blockui', 'knockout-bootstrap'], function(ko, bootbox, utils, moment, _, Stock, StockList, dataStore, Mousetrap) {

	var _initStockLists = function() {
		var stock1 = new Stock(utils.guid(), "NASDAQ:AAPL", "Apple Inc.", 0, 0, 0, 0, moment().format("lll"));
		var stock2 = new Stock(utils.guid(), "NASDAQ:ADSK", "Autodesk, Inc.", 0, 0, 0, 0, moment().format("lll"));
		var stock3 = new Stock(utils.guid(), "NASDAQ:INTC", "Intel Corp.", 0, 0, 0, 0, moment().format("lll"));
		var stock4 = new Stock(utils.guid(), "NASDAQ:MSFT", "Microsoft Corp.", 0, 0, 0, 0, moment().format("lll"));

		var stock5 = new Stock(utils.guid(), "NYSE:CMRE", "Costamare Inc.", 0, 0, 0, 0, moment().format("lll"));
		var stock6 = new Stock(utils.guid(), "NYSE:FDX", "FedEx Corp.", 0, 0, 0, 0, moment().format("lll"));
		var stock7 = new Stock(utils.guid(), "NYSE:LUV", "Southwest Airlines Co.", 0, 0, 0, 0, moment().format("lll"));

		var stock8 = new Stock(utils.guid(), "NASDAQ:ICFI", "ICF International", 0, 0, 0, 0, moment().format("lll"));
		var stock9 = new Stock(utils.guid(), "NASDAQ:AGNC", "American Capital Agency Corp.", 0, 0, 0, 0, moment().format("lll"));


		// attempt to load existing lists from browser storage
		if (!_.isNull(dataStore.getItem("stockLists"))) {
			utils.log("Loading stock lists form local browser storage");
			var initialStockLists = dataStore.getItem("stockLists");
			var newStockLists =  ko.observableArray([]);

			ko.utils.arrayMap(initialStockLists, function(list) {
				var stocks = ko.observableArray([]);
				ko.utils.arrayMap(list.stocks, function(stock) {
					stocks.push(new Stock(stock.id, stock.symbol, stock.name, stock.price, stock.prevPrice, stock.priceChange, stock.lastUpdated));
				});
				newStockLists.push(new StockList(list.id, list.name, stocks()));
			});

			return newStockLists;
		} else {
			var initialStockLists = ko.observableArray([
				new StockList("FAVES1", "Favorite Stocks", [stock8, stock9, stock1]),
				new StockList("TECH1", "Tech Stocks", [stock1, stock2, stock3, stock4]),
				new StockList("TRANSPORT1", "Transportation Stocks", [stock5, stock6, stock7])
			]);
			dataStore.setItem("stockLists", initialStockLists());

			return initialStockLists;
		}
	};

	// Main View Model class for the Stock ticker application
    return function appViewModel() {
        var self = this;

		// grab the AJAX url endpoint from server-side html
		var serviceUrl = $("#stockServiceUrl").val().replace(/SYMBOL/g, '');

        // initial stock array
        self.stocks = ko.observableArray([]);
		// container for the stock symbol text input field
        self.symbolToAdd = ko.observable("");
		// flag for automatic update of stock prices
		self.autoUpdate = ko.observable(true);
		// container for StockList(s) -- could be loaded dynamically
		self.stockLists = _initStockLists();
		// container for currently selected StockList from drop-down
		self.selectedList = ko.observable();

        this.stockSymbolIsValid = ko.computed(function() {
            return (self.symbolToAdd() == "") || (self.symbolToAdd().match(/^\s*[a-zA-Z0-9_^:]{1,15}\s*$/) != null);
        }, this);

		self.saveSelectedText = ko.computed(function() {
			if (self.selectedList()) {
				var list = self.getSelectedStockList();
				return "Save stocks to " + list.name();
			} else {
				return "Save to list";
			}
		}, this);

		self.selectedList.subscribe(function (selectedID) {
			if (selectedID) {
				utils.log("Selected list has changed -- loading new list's stocks into view", selectedID);
				self.loadStockList();
			}
		});

		self.getSelectedStockList = function() {
			var selected = false;
			_.each(self.stockLists(), function(list) {
				if (list.id === self.selectedList()) {
					selected = list;
				}
			});
			return selected;
		};

		self.loadStockList = function() {
			utils.log("loading stock list: ", self.selectedList());
			if (self.selectedList()) {
				utils.showStockLoadingMessage("Loading...");
				self.stocks.removeAll();
				var list = self.getSelectedStockList();

				utils.log("adding all the stocks from: " + list.name());

				_.each(list.stocks(), function(stock) {
					self.stocks.push(stock);
				});
				$('.stockTickerList').unblock();
			} else {
				utils.showAlertMessage("Please select a valid list item from the drop-down.");
			}
		};

		self.saveStockList = function() {
			if (self.selectedList()) {
				var list = self.getSelectedStockList();
				if (self.stocks().length > 0) {
					list.stocks(self.stocks());
					// persist changes to local storage
					dataStore.setItem("stockLists", self.stockLists);
					utils.showSuccessMessage(list.name() + " was saved with " + list.stocks().length + " stocks");
				} else {
					utils.showAlertMessage("Please add some stocks before saving to the " + list.name() + " list");
				}
			} else {
				utils.showAlertMessage("Please select a valid list item from the drop-down.");
			}
		};
		// add keyboard shortcuts for saving
		Mousetrap.bind(['ctrl+s', 'command+s'], function(e) {
			self.saveStockList();
		});

		self.newStockList = function() {
			bootbox.prompt("Enter a name for your new list: ", function(newName) {
				if (newName === null) {
					utils.log("New name not entered in bootbox dialog");
				} else {
					utils.log("new list - " + newName);
					if (_.isString(newName) && newName.length > 0) {
						self.stockLists.push(new StockList(utils.guid(), newName, []));
						self.selectedList(self.stockLists()[self.stockLists().length-1].id);
						// persist changes to local storage
						dataStore.setItem("stockLists", self.stockLists);
					} else {
						utils.showAlertMessage("The name you entered was not valid");
					}
				}
			});
		};

		self.editStockListName = function() {
			if (self.selectedList()) {
				var list = self.getSelectedStockList();
				bootbox.prompt("Enter New Name: ", function(result) {
					if (result === null) {
						utils.log("Name not entered in bootbox dialog");
					} else {
						utils.log("renaming list - " + result);
						if (_.isString(result) && result.length > 0) {
							list.name(result);
							// persist changes to local storage
							dataStore.setItem("stockLists", self.stockLists);
						} else {
							utils.showAlertMessage("The name you entered was not valid");
						}
					}
				});
			} else {
				utils.showAlertMessage("Please select a valid list item from the drop-down.");
			}
		};

		self.removeStockList = function() {
			if (self.selectedList()) {
				self.stockLists.remove(function(item) { return item.id == self.selectedList() });
				// persist changes to local storage
				dataStore.setItem("stockLists", self.stockLists);
			}
		};

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
                    utils.log("Stock symbol not entered in bootbox dialog");
                } else {
                    utils.log("removing stock - " + result);
                    self.stocks.remove(function(item) { return item.symbol == result });
                }
            });
        };

        self.addStock = function() {
            if (self.symbolToAdd() && this.stockSymbolIsValid()) {
                var symbol = encodeURIComponent(self.symbolToAdd());
				utils.showStockLoadingMessage("Loading...");
				$.ajax({
					url: serviceUrl + symbol,
					dataType: 'json',
					success: function( stockData ) {
						$('.stockTickerList').unblock();
						if (stockData.error && stockData.error.code) {
							utils.log("Service call contains errors...", stockData.error);
							utils.showAlertMessage(stockData.error.message);
						} else {
							var stock = new Stock(utils.guid(), stockData.symbol, stockData.name, stockData.price, stockData.price, stockData.change, stockData.percentChange, moment().format("lll"));

							var match = ko.utils.arrayFirst(self.stocks(), function(item) {
								return stock.symbol === item.symbol;
							});

							// validate that the entered symbol is new
							if (!match) {
								utils.log('adding new stock: ', stock);
								self.stocks.push(stock);
								self.symbolToAdd(''); // clear the entered symbol for next input
								$("#symbolToAdd").val('');
							} else {
								utils.showAlertMessage("Symbol is already entered.");
							}
						}
					},
					error: function( stockData ) {
						utils.log("ajax error: ", stockData);
						$('.stockTickerList').unblock();
						utils.showAlertMessage("An unexpected server error has occurred. Please try a different stock. (" + stockData.statusText + ")");
					}
				});
            } else {
                utils.showAlertMessage("Invalid ticker symbol entered.");
            }
        };

        var symbolSortToggle = false;
        self.sortStocksBySymbol = function() {
            if (!symbolSortToggle) {
                self.stocks.sort(function(left, right) {
					if (left.symbol.indexOf(':') && right.symbol.indexOf(':')) {
						return left.symbol.substr(left.symbol.indexOf(':')+1, left.symbol.length) == right.symbol.substr(right.symbol.indexOf(':')+1, right.symbol.length) ? 0 : (left.symbol.substr(left.symbol.indexOf(':')+1, left.symbol.length) < right.symbol.substr(right.symbol.indexOf(':')+1, right.symbol.length) ? -1 : 1)
					} else {
						return left.symbol == right.symbol ? 0 : (left.symbol < right.symbol ? -1 : 1)
					}
				});
                symbolSortToggle = true;
            } else {
                self.stocks.sort(function(left, right) {
					if (left.symbol.indexOf(':') && right.symbol.indexOf(':')) {
						return left.symbol.substr(left.symbol.indexOf(':')+1, left.symbol.length) == right.symbol.substr(right.symbol.indexOf(':')+1, right.symbol.length) ? 0 : (left.symbol.substr(left.symbol.indexOf(':')+1, left.symbol.length) > right.symbol.substr(right.symbol.indexOf(':')+1, right.symbol.length) ? -1 : 1)
					} else {
						return left.symbol == right.symbol ? 0 : (left.symbol > right.symbol ? -1 : 1)
					}
				});

                symbolSortToggle = false;
            }
        };

		self.lastUpdate = ko.computed(function() {
			if (self.stocks().length > 0) {
				return " - last updated " + moment().format("h:mm:ss a");
			} else {
				return '';
			}
		}, this);

		self.toggleAutoUpdate = function() {
			if (self.autoUpdate()) {
				utils.log("stopping auto update - " + moment().format("h:mm:ss a"));
				clearInterval(utils.getStockInterval());
				self.autoUpdate(false);
				return true;
			} else {
				utils.log("starting auto update - " + moment().format("h:mm:ss a"));
				utils.setStockInterval(setInterval(this.updateStockTicker, 6000));
				self.autoUpdate(true);
				return true;
			}
		};

		self.updateStockTicker = function() {
			// iterate through stock array and fetch updated ticker information
			utils.log("updating stock tickers - " + moment().format("h:mm:ss a"));
			if (self.stocks().length > 0) {
				ko.utils.arrayForEach(self.stocks(), function(item) {
					utils.log("updating: " + item.symbol);
					$.ajax({
						url: serviceUrl + encodeURIComponent(item.symbol),
						dataType: 'json',
						success: function( stockData ) {
							if (stockData.error && stockData.error.code) {
								utils.log("Service call contains errors...", stockData.error);
							} else {
								utils.log("Updated stock info from service call", stockData);
								item.symbol = stockData.symbol;
								item.prevPrice(item.price());
								item.price(stockData.price);
								item.priceChange(stockData.change);
								item.percentChange(stockData.percentChange);
								item.lastUpdated = moment().format("lll");
								utils.log("Updated stock prices - old: " + item.prevPrice() + " / new: " + item.price());
								var data = self.stocks().slice(0);
								self.stocks([]);
								self.stocks(data);
								// remove any color change for price change after short delay
								var priceChange = item.price() - item.prevPrice();
								if (priceChange > 0) {
									utils.log("price has increased :" + priceChange);
									$("#" + item.id + " .stock-price").removeClass('alert-danger');
									$("#" + item.id + " .stock-price").addClass('alert-success').delay(1500).queue(function(nxt) {
										$(this).removeClass("alert-success");
										nxt();
									});

								} else if (priceChange < 0) {
									utils.log("price has gone down :" + priceChange);
									$("#" + item.id + " .stock-price").removeClass('alert-success');
									$("#" + item.id + " .stock-price").addClass('alert-danger').delay(1500).queue(function(dng) {
										$(this).removeClass("alert-danger");
										dng();
									});
								}
							}
						},
						error: function( stockData ) {
							utils.log("ajax error: ", stockData);
							//utils.showAlertMessage("An unexpected server error has occurred when trying to update stocks.");
						}
					});

				});

			}


		};

    };
});