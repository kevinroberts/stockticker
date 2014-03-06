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
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
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
                <div class="col-md-8 column">

                    <div class="action-group">
                        <form class="form-inline" role="form">
                            <div class="form-group" data-bind=" css: { 'has-error': !stockSymbolIsValid() }">
                                <label class="sr-only" for="symbolToAdd">Enter Stock Symbol</label>
                                <input id="symbolToAdd" type="text" class="form-control" data-bind="value: symbolToAdd, valueUpdate: 'keyup'" placeholder="Stock Symbol" />
                            </div>

                            <div class="form-group">
                                <div class="btn-group">
                                    <button class="btn btn-default" data-bind="click: addStock"><span class="glyphicon glyphicon-plus"></span> Add Stock</button> <button data-toggle="dropdown" class="btn btn-default dropdown-toggle"><span class="caret"></span></button>
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
                        </form>
                    </div>

                    <div class="list-group stockTickerList">
                        <a href="#" class="list-group-item active headerRow">
                            &nbsp;
                        </a>
                        <div class="list-group-item">
                            <table id="stockTickerTable" class="table table-striped sorted_table">
                                <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th><a href="#"><span class="glyphicon glyphicon-sort" data-bind="click: $root.sortStocksBySymbol, tooltip: {title: 'Sort by name'}"></span></a> Stock Symbol</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Change</th>
                                </tr>
                                </thead>
                                <tbody data-bind="foreach: stocks">
                                <tr data-bind="attr: { id: id }">
                                    <td><a href="#" data-bind="click: $root.removeStock, tooltip: {title: 'Remove ' + symbol}"><span class="glyphicon glyphicon-remove"></span></a></td>
                                    <td><span class="stock-symbol" data-bind="text: symbol">N/A</span></td>
                                    <td><span class="stock-name" data-bind="text: name">Name Pending</span>
                                        &nbsp; - last updated <span class="stock-updated" data-bind="text: lastUpdated">Name Pending</span>
                                    </td>
                                    <td>
                                        <span class="stock-price" data-bind="text: formattedPrice">-</span>
                                    </td>
                                    <td>
                                        <span class="stock-price-change" data-bind="text: formattedPriceChange, css: { 'alert-success': priceChange > 0, 'alert-danger': priceChange < 0 }">+0.00 (0.00%)</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <a class="list-group-item active"><span class="badge stockcount" data-bind="text: stocks().length + ' stocks'">1</span>&nbsp;</a>
                    </div>

                </div>
                <div class="col-md-4 column">
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
                                        NYSE
                                    </td>
                                    <td>
                                        New York Stock Exchange
                                    </td>
                                    <td>
                                        09:30a-04:00pm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        TSE
                                    </td>
                                    <td>
                                        Tokyo Stock Exchange
                                    </td>
                                    <td>
                                        09:00a-11:00am<br>
                                        12:30p-03:00pm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        LSE
                                    </td>
                                    <td>
                                        London Stock Exchange
                                    </td>
                                    <td>
                                        08:00a-04:30pm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        HKE
                                    </td>
                                    <td>
                                        Hong Kong Stock Exchange
                                    </td>
                                    <td>
                                        09:30a-04:00pm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        NSE
                                    </td>
                                    <td>
                                        National Stock Exchange of India
                                    </td>
                                    <td>
                                        09:00a-03:30pm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        BM&amp;F BOVESPA
                                    </td>
                                    <td>
                                        Bolsa de Valores, Mercadorias &amp; Futuros de Sao Paulo
                                    </td>
                                    <td>
                                        10:00a-05:00pm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ASX
                                    </td>
                                    <td>
                                        Australian Securities Exchange
                                    </td>
                                    <td>
                                        10:00a-04:00pm
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        FWB
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
                                        RTS
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
                                        JSE
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
                                        DIFX
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
