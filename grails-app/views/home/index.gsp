<%--
  Author(s): Kevin Roberts <kroberts@citytechinc.com>
  Created Date: 2/21/14 :: 2:27 PM
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Stock Ticker Knockout!</title>
</head>
<body>
<div class="hidden">
    %{--server-side variables for injected re-use in Javascript backing modules--}%
	<form>
    	<input type="hidden" name="stockServiceUrl" id="stockServiceUrl" value="${createLink(mapping: 'symbolScraped', params: [symbol : 'SYMBOL'])}">
		<input type="hidden" name="stockFetchUrl" id="stockFetchUrl" value="${createLink(controller: 'home', action: 'symbolLookup')}">
    	<input type="hidden" name="loadingImageSrc" id="loadingImageSrc" value="${resource(dir: 'images', file: 'spinner.gif')}">
	</form>
</div>
<div class="container">
    <div class="row clearfix">
        <div class="col-lg-12 column">
            <div class="page-header">
                <h1>Stockticker <span>v. <%=grailsApplication.metadata['app.version']%> a knockout require js app</span></h1>
            </div>
            <div id="errorMsg" class="alert alert-danger" style="display: none;">
                <h4>
                    Alert!
                </h4>
                <p id="errorMessage" class="message"></p>
            </div>

            <div class="row clearfix">
                <div class="col-lg-8 column">

                    <div class="action-group">
                        <form class="form-inline" role="form">
                            <div class="form-group" data-bind=" css: { 'has-error': !stockSymbolIsValid() }">
                                <label class="sr-only" for="symbolToAdd">Enter Stock Symbol</label>
                                <input id="symbolToAdd" type="text" class="form-control" data-bind="value: symbolToAdd, valueUpdate: 'keyup'" placeholder="Stock Symbol" autofocus="" autocomplete="off" />
                            </div>

                            <div class="form-group">
                                <div class="btn-group">
                                    <button class="btn btn-default addStockBtn" data-bind="click: addStock"><span class="glyphicon glyphicon-plus"></span> Add Stock</button> <button data-toggle="dropdown" class="btn btn-default dropdown-toggle"><span class="caret"></span></button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="#" data-bind="click: clearStocks">Clear all stocks</a>
                                        </li>
                                        <li>
                                            <a href="#" data-bind="click: removeBySymbol">Remove Stock by Symbol</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
							<div class="form-group pull-right">

								<select class="form-control saved-stocks">
									<option>Tech Stocks</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
								<button class="btn btn-default">Load List <span class="glyphicon glyphicon-log-in"></span> </button>
							</div>
                        </form>

                    </div>

                    <div class="list-group stockTickerList">
                        <a href="#" class="list-group-item active headerRow">
								<label>
									<input id="intervalUpdateToggle" type="checkbox" data-bind="click: toggleAutoUpdate, checked: autoUpdate "> auto-update
								</label>
                        </a>
                        <div class="list-group-item">
                            <table id="stockTickerTable" class="table table-striped sorted_table">
                                <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th><a href="#"><span class="glyphicon glyphicon-sort" data-bind="click: $root.sortStocksBySymbol, tooltip: {title: 'Sort by name'}"></span></a> Stock Symbol</th>
                                    <th>Name&nbsp; <span class="stock-updated" data-bind="text: lastUpdate()"></span></th>
                                    <th>Price</th>
                                    <th>Change</th>
                                </tr>
                                </thead>
                                <tbody data-bind="foreach: stocks">
                                <tr data-bind="attr: { id: id }">
                                    <td><a href="#" data-bind="click: $root.removeStock, tooltip: {title: 'Remove ' + symbol}"><span class="glyphicon glyphicon-remove"></span></a></td>
                                    <td><span class="stock-symbol" data-bind="text: symbol">N/A</span></td>
                                    <td><span class="stock-name" data-bind="text: name">Name Pending</span></td>
                                    <td>
                                        <span class="stock-price" data-bind="text: formattedPrice ">-</span>
                                    </td>
                                    <td>
                                        <span class="stock-price-change" data-bind="text: formattedPriceChange, css: { 'alert-success': priceChange() > 0, 'alert-danger': priceChange() < 0 }">+0.00 (0.00%)</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <a class="list-group-item active"><span class="badge stockcount" data-bind="text: stocks().length + ' stocks'">1</span>&nbsp;</a>
                    </div>

                </div>
                <div class="col-lg-4 column">
                    <div style="margin-top: 55px;" class="panel panel-info">
                        <div class="panel-heading">
                            <h3 class="panel-title">
                                World Stock Exchange Trading Hours
                            </h3>
                        </div>
                        <div class="panel-body">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <td style="border-top: none;" colspan="2">
                                        Stock Exchange
                                    </td>
                                    <td style="border-top: none;">
                                        Hours
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="https://nyse.nyx.com/" target="_blank">NYSE</a> / <a href="http://www.nasdaq.com/">NASDAQ</a>
                                    </td>
                                    <td>
                                        New York Stock Exchange
                                    </td>
                                    <td>
                                        09:30a-04:00pm EST
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="http://www.tse.or.jp/english/" target="_blank">TSE</a>
                                    </td>
                                    <td>
                                        Tokyo Stock Exchange
                                    </td>
                                    <td>
                                        09:00a-11:00am<br>
                                        12:30p-03:00pm JST
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="http://www.londonstockexchange.com/home/homepage.htm">LSE</a>
                                    </td>
                                    <td>
                                        London Stock Exchange
                                    </td>
                                    <td>
                                        08:00a-04:30pm GMT
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="http://www.euronext.com/" target="_blank">Euronext</a>
                                    </td>
                                    <td>
                                        Euronext N.V.
                                    </td>
                                    <td>
                                        09:00a-05:30pm CET
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="https://www.hkex.com.hk/eng/index.htm">HKE</a>
                                    </td>
                                    <td>
                                        Hong Kong Stock Exchange
                                    </td>
                                    <td>
                                        09:30a-04:00pm HKT
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="http://www.nseindia.com/">NSE</a>
                                    </td>
                                    <td>
                                        National Stock Exchange of India
                                    </td>
                                    <td>
                                        09:00a-03:30pm IST
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="http://www.bmfbovespa.com.br/en-us/home.aspx?idioma=en-us">BM&amp;F BOVESPA</a>
                                    </td>
                                    <td>
                                        Bolsa de Valores, Mercadorias &amp; Futuros de Sao Paulo
                                    </td>
                                    <td>
                                        10:00a-05:00pm BRT
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="http://www.asx.com.au/">ASX</a>
                                    </td>
                                    <td>
                                        Australian Securities Exchange
                                    </td>
                                    <td>
                                        10:00a-04:00pm AEST
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="http://boerse-frankfurt.com/en/start">FWB</a>
                                    </td>
                                    <td>
                                        Frankfurt Stock Exchange -<br>
                                        Deutsche Borse
                                    </td>
                                    <td>
                                        09:00a-08:00pm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="http://moex.com/en/">RTS</a>
                                    </td>
                                    <td>
                                        Russian Trading System
                                    </td>
                                    <td>
                                        10:30a-06:00pm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="https://www.jse.co.za/Home.aspx">JSE</a>
                                    </td>
                                    <td>
                                        Johannesburg Stock Exchange
                                    </td>
                                    <td>
                                        09:00a-05:00pm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="http://www.nasdaqdubai.com/">DIFX</a>
                                    </td>
                                    <td>
                                        Dubai International Financial Exchange- now NASDAQ Dubai
                                    </td>
                                    <td>
                                        09:00a-02:00pm
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>







        </div>
    </div>
</div>
</body>
</html>
