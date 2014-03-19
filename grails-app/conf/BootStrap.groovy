import au.com.bytecode.opencsv.CSVReader
import stockticker.Stock

class BootStrap {

    static grailsApplication

    def init = { servletContext ->

		//System.setProperty("http.agent", "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36");
        log.info("Pre-loading stock symbols...");
        // bootstrap stock symbols from resources
        def filePath = "resources/stocksymbols.csv"
        def appHolder = grailsApplication.parentContext.getResource("classpath:$filePath")
        def reader = new CSVReader(new FileReader(appHolder.getFile()))
        def header = true
        reader.readAll().each { csvrow ->
            if (!header) {
                def stock = new Stock(symbol: csvrow[0].trim(), name: csvrow[1], created : new Date())

                if (!stock.save(flush: true)) {
                    log.info("could not save stock symbol: " + csvrow[0])
                    stock.errors.each {// if save fails --> log reason
                        log.info it
                    }
                }
            }
            header = false
        }

    }
    def destroy = {
    }
}
