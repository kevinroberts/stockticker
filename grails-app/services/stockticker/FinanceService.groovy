package stockticker

import groovy.util.slurpersupport.GPathResult
import org.apache.commons.lang.StringEscapeUtils
import org.apache.commons.lang.StringUtils
import org.codehaus.groovy.grails.web.json.JSONObject

class FinanceService {

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

        // sample return JSON for Google
        // {"query":{"results":{"quote":{"Open":"1206.75","PriceEPSEstimateCurrentYear":"23.58","BookValue":"259.978","Bid":"1200.50","DaysHigh":"1207.84","ChangeFromFiftydayMovingAverage":"+31.99","OrderBookRealtime":null,"ErrorIndicationreturnedforsymbolchangedinvalid":null,"DaysRange":"1192.14 - 1207.84","MoreInfo":"cnprmiIed","AnnualizedGain":null,"Change_PercentChange":"-12.9601 - -1.07%","DaysRangeRealtime":"N/A - N/A","LowLimit":null,"PercentChangeFromTwoHundreddayMovingAverage":"+16.97%","ChangeFromTwoHundreddayMovingAverage":"+174.5099","DividendYield":null,"EPSEstimateCurrentYear":"51.55","LastTradeDate":"3/3/2014","TwoHundreddayMovingAverage":"1028.1801","AskRealtime":"1202.00","PercentChange":"-1.07%","DividendPayDate":null,"YearRange":"761.26 - 1228.88","symbol":"GOOG","PercentChangeFromFiftydayMovingAverage":"+2.73%","HoldingsGainPercent":"- - -","Change":"-12.9601","Notes":null,"HoldingsGain":null,"YearHigh":"1228.88","Symbol":"GOOG","AfterHoursChangeRealtime":"N/A - N/A","HoldingsGainPercentRealtime":"N/A - N/A","MarketCapitalization":"404.2B","BidRealtime":"1200.50","LastTradePriceOnly":"1202.6899","PERatio":"31.97","EPSEstimateNextQuarter":"11.97","MarketCapRealtime":null,"AverageDailyVolume":"2132610","PercentChangeFromYearLow":"+57.99%","TickerTrend":"&nbsp;=+====&nbsp;","ChangeFromYearHigh":"-26.1901","LastTradeWithTime":"Mar  3 - <b>1202.6899<\/b>","PERatioRealtime":null,"StockExchange":"NasdaqNM","PreviousClose":"1215.65","FiftydayMovingAverage":"1170.70","LastTradeTime":"4:00pm","DaysLow":"1192.14","PriceEPSEstimateNextYear":"20.00","DaysValueChange":"- - -1.07%","HighLimit":null,"TradeDate":null,"OneyrTargetPrice":"1318.13","ChangeRealtime":"-12.9601","ExDividendDate":null,"YearLow":"761.26","EPSEstimateNextYear":"60.78","Volume":"2108720","PricePaid":null,"Ask":"1202.00","HoldingsValue":null,"ChangeFromYearLow":"+441.4299","DividendShare":"0.00","EBITDA":"18.028B","PercebtChangeFromYearHigh":"-2.13%","HoldingsGainRealtime":null,"PEGRatio":"1.40","Name":"Google Inc.","Commission":null,"DaysValueChangeRealtime":"N/A - N/A","LastTradeRealtimeWithTime":"N/A - <b>1202.6899<\/b>","ChangePercentRealtime":"N/A - -1.07%","HoldingsValueRealtime":null,"EarningsShare":"38.021","PriceBook":"4.68","ShortRatio":"1.00","SharesOwned":null,"ChangeinPercent":"-1.07%","PriceSales":"6.83"}},"count":1,"created":"2014-03-04T02:41:53Z","lang":"en-US"}}
        log.debug("*********** JSON returned for symbol $stockSymbol: ********\n" + json.toString())

        return new JSONObject(json.toString())
    }

	def StockResult getStockResultScraped(String stockSymbol) {
		def tagsoupParser = new org.ccil.cowan.tagsoup.Parser()
		def slurper = new XmlSlurper(tagsoupParser)
		GPathResult htmlParser = slurper.parse("http://uk.advfn.com/p.php?pid=qkquote&btn=&epic=$stockSymbol&symbol=")

		StockResult stockResult = new StockResult()

		try {
			int i = 0;
			htmlParser.'**'.find{ it['@id'] == 'q_desc'}.'**'.findAll{ it.name() == 'td'}.each {
				String value = it.text()
				if (i == 0) {
					// this is stock name
					if (value)
						stockResult.setName(StringUtils.replace(value, "Name:", ""));
				}
				if (i == 1) {
					if (value)
						stockResult.setSymbol(StringUtils.replace(value, "Symbol:", ""));
				}
				i++;
			}

			// get price information
			i = 0;
			htmlParser.'**'.findAll{ it['@class'] == 'mb'}.each {
				String value = it.text()
				// change in value
				if (i == 15) {
					stockResult.setChange(new BigDecimal(value))
				}
				if (i == 16) {
					stockResult.setPercentChange(value + "%")
				}
				if (i == 17) {
					stockResult.setPrice(new BigDecimal(value))
				}

				i++
			}

			if (!stockResult.name) {
				stockResult.setError(this.noResultsReturned(stockSymbol))
			}
		} catch (Exception e) {
			log.error("Exception reached trying to parse stock quote - url: " + "http://uk.advfn.com/p.php?pid=qkquote&btn=&epic=$stockSymbol&symbol=", e)
			stockResult.setError(this.noResultsReturned(stockSymbol))
		}



		return stockResult

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
