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
                <h1>Stockticker <span>a knockout require js app</span></h1>
            </div>
            <div id="errorMsg" class="alert alert-danger" style="display: none;">
                <h4>
                    Alert!
                </h4>
                <p id="errorMessage" class="message"></p>
            </div>
            <button class="btn btn-default" data-bind="popover: {template: 'popoverTemplate', title: 'Oh Yea', trigger: 'focus'}">
                Launch Simple Popover
            </button>
            <br>
            <script type="text/html" id="popoverTemplate">
                <button class="close pull-right" type="button" data-dismiss="popover">×</button>
                Hey I am some content in A popover
            </script>

            <div class="action-group">
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


            <div class="list-group stockTickerList">
                <a href="#" class="list-group-item active headerRow">
                   &nbsp;
                </a>
                <div class="list-group-item">
                    <table id="stockTickerTable" class="table table-striped sorted_table">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Stock Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                           </tr>
                        </thead>
                        <tbody data-bind="foreach: stocks">
                            <tr data-bind="attr: { id: id }">
                                <td><span class="glyphicon glyphicon-move"></span></td>
                                <td><span class="stock-symbol" data-bind="text: symbol">N/A</span></td>
                                <td><span class="stock-name" data-bind="text: name">Name Pending</span></td>
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
