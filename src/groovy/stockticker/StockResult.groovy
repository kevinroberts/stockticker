package stockticker

/**
 * stockticker
 *
 * @author Kevin Roberts
 * date: 3/2/14
 */
class StockResult {

    private Error error
    private String name;
    private String symbol;
    private BigDecimal price;
    private BigDecimal change;
    private String percentChange;
    private String stockExchange;

    Error getError() {
        return error
    }

    void setError(Error error) {
        this.error = error
    }

    String getName() {
        return name
    }

    void setName(String name) {
        this.name = name
    }

    String getSymbol() {
        return symbol
    }

    void setSymbol(String symbol) {
        this.symbol = symbol
    }

    BigDecimal getPrice() {
        return price
    }

    void setPrice(BigDecimal price) {
        this.price = price
    }

    BigDecimal getChange() {
        return change
    }

    void setChange(BigDecimal change) {
        this.change = change
    }

    String getPercentChange() {
        return percentChange
    }

    void setPercentChange(String percentChange) {
        this.percentChange = percentChange
    }

    String getStockExchange() {
        return stockExchange
    }

    void setStockExchange(String stockExchange) {
        this.stockExchange = stockExchange
    }
}
