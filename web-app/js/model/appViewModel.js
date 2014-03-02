// Main viewmodel class
define(['knockout'], function(ko) {

    var Stock = function (symbol, name, price, priceChange) {
        var self = this;
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
            new Stock("AGNC", "American Capital Agency Corp.", 22.29, -0.09),
            new Stock("GOOG", "Google Inc", 1215.65, +123.56),
            new Stock("APPL", "Apple Inc.", 526.24, -1.43)
        ]);

        //console.log("Stocks", self.stocks);

        self.removeStock = function(stock) { self.stocks.remove(stock) }

        self.clearStocks = function() { self.stocks.removeAll(); }

        self.addStock = function() {
            // TODO change to input next to add symbol
            var symbol = prompt("Enter Stock Symbol", "");
            if (symbol!=null)
            self.stocks.push( new Stock(symbol, "Apple Inc.", 526.24, -1.43));
        }
    };
});