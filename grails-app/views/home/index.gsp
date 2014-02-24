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
<div style="margin-top: 20px;" id="status">
    <button data-bind="enable: !editingName(), click:function() { editingName(true) }">Edit name</button>
    <p>First name: <input data-bind="value: firstName, hasFocus: editingName" /><span data-bind="visible: editingName"> You're editing the name!</span></p>


    <p>First name capitalized: <strong data-bind="text: firstNameCaps"></strong></p>
</div>
</body>
</html>
