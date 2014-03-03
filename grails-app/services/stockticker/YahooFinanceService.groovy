package stockticker

import org.apache.commons.lang.StringEscapeUtils
import org.codehaus.groovy.grails.web.json.JSONObject

class YahooFinanceService {

    /**
     * Returns JSON results from Yahoo's finance search webservice
     *
     * @param stockSymbol the name of an Artist you want to search
     * @return the JSONObject containing the search results
     */
    def JSONObject getStockSymbolPriceResult(String stockSymbol) {

        String yql = URLEncoder.encode("select * from yahoo.finance.quotes where symbol=\"$stockSymbol\"", "UTF-8")

        String wsUrl = "http://query.yahooapis.com/v1/public/yql?q=$yql&format=json&env=http://datatables.org/alltables.env"

        def json = grails.converters.JSON.parse(new URL(wsUrl).text)

        log.debug("*********** JSON returned for symbol $stockSymbol: ********\n" + json.toString())

        return new JSONObject(json.toString())
    }


    def Error noResultsReturned(def symbol) {
        symbol = StringEscapeUtils.escapeHtml(String.valueOf(symbol));
		Error error = new Error()
        error.setCode("No Results")
        error.setMessage("No stock could be found with the symbol \"" + symbol + "\"");
        error.setDetailedMessage("")

        return error
    }




}
