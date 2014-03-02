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
            <div class="alert alert-danger alert-dismissable hidden">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4>
                    Alert!
                </h4> <strong>Warning!</strong> Best check yo self, you're not looking too good. <a href="#" class="alert-link">alert link</a>
            </div>
            <div class="action-group">
            <div class="btn-group">
                <button class="btn btn-default" data-bind="click: addStock"><span class="glyphicon glyphicon-plus"></span> Add Stock</button> <button data-toggle="dropdown" class="btn btn-default dropdown-toggle"><span class="caret"></span></button>
                <ul class="dropdown-menu">
                    <li>
                        <a href="#" data-bind="click: clearStocks">Clear all stocks</a>
                    </li>
                    <li class="disabled">
                        <a href="#">Another action</a>
                    </li>
                    <li>
                        <a href="#">Something else here</a>
                    </li>
                </ul>
            </div>
            </div>


            <div class="list-group stockTickerList">
                <a href="#" class="list-group-item active">
                    <span>Stock Symbol / Name / Price</span>

                </a>
                <div class="list-group-item">
                    <table id="stockTickerTable" class="table table-striped sorted_table">
                        <tbody data-bind="foreach: stocks">
                            <tr>
                                <td><span class="glyphicon glyphicon-move"></span></td>
                                <td><span class="stock-symbol" data-bind="text: symbol">N/A</span></td>
                                <td><span class="stock-name" data-bind="text: name">Name Pending</span></td>
                                <td>
                                    <span class="stock-price" data-bind="text: formattedPrice">-</span>
                                </td>
                                <td>
                                    <span class="stock-price-change" data-bind="text: formattedPriceChange, css: { 'alert-success': priceChange > 0, 'alert-danger': priceChange < 0 }">+1.24 (1.30%)</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                 <a class="list-group-item active"><span class="badge stockcount" data-bind="text: stocks().length + ' stocks'">1</span>Help</a>
            </div>
        </div>
    </div>
</div>
</body>
</html>
