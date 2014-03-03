package stockticker

import org.codehaus.groovy.grails.web.json.JSONObject
import grails.plugin.gson.converters.GSON

class HomeController {

    def yahooFinanceService

    def index() {
    }

    def priceQuote() {

        def symbol = params.symbol ? params.symbol : 'goog';
        JSONObject result
        StockResult stockResult = new StockResult()
        try {
            result = yahooFinanceService.getStockSymbolPriceResult(symbol)

            if (result) {
                result = result.getJSONObject("query")

                if (result.containsKey("results") && !JSONObject.NULL.equals(result.get("results"))) {
                    JSONObject symbolJson = result.getJSONObject('results')

                    symbolJson = symbolJson.getJSONObject('quote')

                    String noSymbol = symbolJson.getString('ErrorIndicationreturnedforsymbolchangedinvalid')

                    if (!JSONObject.NULL.equals(symbolJson.get("ErrorIndicationreturnedforsymbolchangedinvalid"))) {
                        log.info("Could not find symbol -- " + noSymbol)
                        stockResult.setError(yahooFinanceService.noResultsReturned(symbol))
                    } else {
                        stockResult.setSymbol(symbolJson.getString('Symbol'))
                        stockResult.setName(symbolJson.getString('Name'))
                        stockResult.setPrice(new BigDecimal(symbolJson.getDouble('BidRealtime')))
                        stockResult.setChange(new BigDecimal(symbolJson.getDouble('Change')))
                        stockResult.setPercentChange(symbolJson.getString('PercentChange'))
                        Error error = new Error();
                        stockResult.setError(error)
                    }

                } else {
                    log.debug("result not found for $symbol")
                    stockResult.setError(yahooFinanceService.noResultsReturned(symbol))
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
}
