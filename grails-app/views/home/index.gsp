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
    %{--server-side variables injected for re-use in Javascript backing modules--}%
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
                    <g:message default="Alert!" code="app.alert"/>
                </h4>
                <p id="errorMessage" class="message"></p>
            </div>
            <div id="successMsg" class="alert alert-success" style="display: none;">
                <h4><g:message default="Success" code="app.success"/>.</h4>
                <p id="successMessage" class="message"></p>
            </div>

            <div class="row clearfix">
                <div class="col-lg-8 column">

                    <div class="action-group">
                        <form class="form-inline" role="form">
                            <div class="form-group" data-bind=" css: { 'has-error': !stockSymbolIsValid() }">
                                <label class="sr-only" for="symbolToAdd"><g:message code="app.enterSymbol" default="Enter Stock Symbol"/></label>
                                <input id="symbolToAdd" type="text" class="form-control" data-bind="value: symbolToAdd, valueUpdate: 'keyup'" placeholder="Stock Symbol" autofocus="" autocomplete="off" />
                            </div>

                            <div class="form-group">
                                <div class="btn-group">
                                    <button class="btn btn-default addStockBtn" data-bind="click: addStock"><span class="glyphicon glyphicon-plus"></span> <g:message code="app.addStock" default="Add Stock"/></button> <button data-toggle="dropdown" class="btn btn-default dropdown-toggle"><span class="caret"></span></button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="#" data-bind="click: clearStocks"><g:message code="app.clearAll" default="Clear all stocks"/></a>
                                        </li>
                                        <li>
                                            <a href="#" data-bind="click: removeBySymbol"><g:message code="app.removeBySymbol" default="Remove Stock by Symbol"/></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
							<div class="form-group pull-right">

                                <select class="form-control saved-stocks" id="favoriteList" data-bind="options: stockLists,
                                    optionsText: 'name',
                                    optionsValue: 'id',
                                    value: selectedList,
                                    optionsCaption: 'Choose list...'"></select>

								<div class="btn-group">
									<button class="btn btn-default" data-bind="click: editStockListName"><span class="glyphicon glyphicon-log-in"></span> edit list name</button> <button data-toggle="dropdown" class="btn btn-default dropdown-toggle"><span class="caret"></span></button>
									<ul class="dropdown-menu">
										<li>
											<a href="#" data-bind="click: removeStockList">Remove list</a>
										</li>
                                        <li>
                                            <a href="#" data-bind="click: newStockList">Create new list</a>
                                        </li>
									</ul>
								</div>

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
                                    <th><a href="#"><span class="glyphicon glyphicon-sort" data-bind="click: $root.sortStocksBySymbol, tooltip: {title: 'Sort by symbol'}"></span></a> <g:message code="app.stockSymbol" default="Stock Symbol"/></th>
                                    <th><g:message code="app.stockName" default="Name"/>&nbsp; <span class="stock-updated" data-bind="text: lastUpdate()"></span></th>
                                    <th><g:message code="app.price" default="Price"/></th>
                                    <th><g:message code="app.change" default="Change"/></th>
                                </tr>
                                </thead>
                                <tbody data-bind="foreach: stocks">
                                <tr data-bind="attr: { id: id }">
                                    <td>
										<a href="#" data-bind="click: $root.removeStock, tooltip: {title: 'Remove ' + symbol}"><span class="glyphicon glyphicon-remove"></span></a>
									</td>
                                    <td><span class="stock-symbol" data-bind="text: symbol">N/A</span></td>
                                    <td>
                                        <a class="stock-name" target="_blank" data-bind="attr: { href: 'http://stocktwits.com/symbol/' + symbol, title: 'more info on ' + name }, text: name" href="#">Name Pending</a>
                                    </td>
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
                    <div data-bind="visible: selectedList" class="form-group" style="display: none">
                    <button data-bind="click: saveStockList" class="btn btn-default" type="button">
                        <span class="glyphicon glyphicon-floppy-disk"></span> <span data-bind="text: saveSelectedText">Save to list</span>
                    </button>
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
                            <g:render template="markets"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
