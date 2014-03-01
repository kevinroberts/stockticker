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
            <div class="alert alert-success alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4>
                    Alert!
                </h4> <strong>Warning!</strong> Best check yo self, you're not looking too good. <a href="#" class="alert-link">alert link</a>
            </div>
            <div class="action-group">
            <div class="btn-group">
                <button class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> Add Stock</button> <button data-toggle="dropdown" class="btn btn-default dropdown-toggle"><span class="caret"></span></button>
                <ul class="dropdown-menu">
                    <li>
                        <a href="#">Clear all stocks</a>
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
                        <tr>
                            <td><span class="glyphicon glyphicon-move"></span></td>
                            <td><span class="stock-symbol">AGNC</span></td>
                            <td><span class="stock-name">American Capital Agency Corp.</span></td>
                            <td><span class="stock-price">$23.02</span></td>
                        </tr>
                        <tr>
                            <td><span class="glyphicon glyphicon-move"></span></td>
                            <td><span class="stock-symbol">GOOG</span></td>
                            <td><span class="stock-name">Google Inc</span></td>
                            <td><span class="stock-price">1,215.65</span></td>
                        </tr>
                        <tr>
                            <td><span class="glyphicon glyphicon-move"></span></td>
                            <td><span class="stock-symbol">AAPL</span></td>
                            <td><span class="stock-name">Apple Inc</span></td>
                            <td><span class="stock-price">1,215.65</span></td>
                        </tr>
                    </table>
                </div>
                 <a class="list-group-item active"><span class="badge stockcount">2</span>Help</a>
            </div>
        </div>
    </div>
</div>
</body>
</html>
