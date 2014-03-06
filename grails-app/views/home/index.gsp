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
                                &nbsp;[ last updated <span class="stock-updated" data-bind="text: lastUpdated">Name Pending</span> ]
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
    </div>
</div>
</body>
</html>
