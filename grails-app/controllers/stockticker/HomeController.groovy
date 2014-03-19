package stockticker

import org.codehaus.groovy.grails.web.json.JSONObject
import grails.plugin.gson.converters.GSON

class HomeController {

    def financeService

    def index() {
    }

    def priceQuote() {

        def symbol = params.symbol ? params.symbol : 'goog';
        JSONObject result
        StockResult stockResult = new StockResult()
        try {
            result = financeService.getStockSymbolPriceResult(symbol)

            if (result) {
                result = result.getJSONObject("query")

                if (result.containsKey("results") && !JSONObject.NULL.equals(result.get("results"))) {
                    JSONObject symbolJson = result.getJSONObject('results')

                    symbolJson = symbolJson.getJSONObject('quote')

                    String noSymbol = symbolJson.getString('ErrorIndicationreturnedforsymbolchangedinvalid')

                    if (!JSONObject.NULL.equals(symbolJson.get("ErrorIndicationreturnedforsymbolchangedinvalid"))) {
                        log.info("Could not find symbol -- " + noSymbol)
                        stockResult.setError(financeService.noResultsReturned(symbol))
                    } else {
                        stockResult.setSymbol(symbolJson.getString('Symbol'))
                        stockResult.setName(symbolJson.getString('Name'))

                        BigDecimal price = new BigDecimal(0.00)
                        if (symbolJson.getDouble('BidRealtime') != null && symbolJson.getDouble('BidRealtime') > 0) {
                            price = new BigDecimal(symbolJson.getDouble('BidRealtime'))
                        } else if (symbolJson.getDouble('LastTradePriceOnly') != null) {
                            price = new BigDecimal(symbolJson.getDouble('LastTradePriceOnly'))
                        }

                        stockResult.setPrice(price)
                        stockResult.setChange(new BigDecimal(symbolJson.getDouble('Change')))
                        stockResult.setPercentChange(symbolJson.getString('PercentChange'))
                        Error error = new Error();
                        stockResult.setError(error)

                    }

                } else {
                    log.debug("result not found for $symbol")
                    stockResult.setError(financeService.noResultsReturned(symbol))
                }
            }

        } catch (Exception ex) {
            Error error = new Error();
            error.setMessage(ex.getMessage());
            error.setDetailedMessage(ex.getStackTrace().toString())
            error.setCode('500');
            stockResult.setError(error)

        }



        render stockResult as GSON

    }

	def priceQuoteScraped() {
		def symbol = params.symbol ? params.symbol : 'goog';
		def result = financeService.getStockResultScraped(symbol)

		render result as GSON
	}

    def symbolLookup() {
        def symbol = params.symbol ? params.symbol : '';
        List<Stock> stocks;
        if (symbol && symbol.trim() != '') {
            stocks = Stock.findAllBySymbolIlike("%" + symbol + "%");
        } else {
            stocks = Stock.all
        }


        render stocks as GSON
    }



}
