// Main viewmodel class
define(['knockout', 'bootbox', 'blockui'], function(ko, bootbox) {


    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function showMessage(message) {
        if ($('#errorMsg').is(':visible')) {
            $("#errorMessage").html(message);
        } else {
            $("#errorMessage").html(message);
            $('#errorMsg').slideDown().delay(5000).fadeOut();
        }
    }

    function showLoadingMessage(message) {
        $.blockUI({ css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff' },
            message: '<h1> ' + message + '</h1>' });
    }

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
        self.stocks = ko.observableArray([
        ]);

        //console.log("Stocks", self.stocks);

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
            bootbox.prompt("Enter Stock Symbol: ", function(result) {
                if (result === null) {
                    console.log("Stock symbol not entered in bootbox dialog");
                } else {
                    var symbol = encodeURI(result);
                    showLoadingMessage("Loading stock information...");
                    $.getJSON("/stockticker/home/priceQuote?symbol=" + symbol, function(stockData) {
                        $.unblockUI();
                        if (stockData.error && stockData.error.code) {
                            console.log("Contains errors!", stockData.error);
                            showMessage(stockData.error.message);
                        } else {
                            self.stocks.push( new Stock(guid(), stockData.symbol, stockData.name, stockData.price, stockData.change));
                        }

                    });

                }
            });
        }
    };
});