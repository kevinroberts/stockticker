define(function () {
	'use strict';

	// namespaces
	var stockticker = stockticker || {};
	stockticker.utils = stockticker.utils || {};

	stockticker.utils.countChar = function (val, length) {
		var len = val.value.length;
		if (len >= length) {
			val.value = val.value.substring(0, length);
		} else {
			var charsLeft = length - len;
			$('#charNum').text(charsLeft + " characters left");
		}
	}

	stockticker.utils.s4 = function() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	stockticker.utils.guid = function () {
		return stockticker.utils.s4() + stockticker.utils.s4() + '-' + stockticker.utils.s4() + '-' + stockticker.utils.s4() + '-' +
			stockticker.utils.s4() + '-' + stockticker.utils.s4() + stockticker.utils.s4() + stockticker.utils.s4();
	}

	stockticker.utils.showAlertMessage = function(message) {
		if ($('#errorMsg').is(':visible')) {
			$("#errorMessage").html(message);
		} else {
			$("#errorMessage").html(message);
			$('#errorMsg').slideDown().delay(5000).fadeOut();
		}
	}

	stockticker.utils.showLoadingMessage = function(message) {
		$.blockUI({ css: {
			border: 'none',
			padding: '15px',
			backgroundColor: '#000',
			'-webkit-border-radius': '10px',
			'-moz-border-radius': '10px',
			opacity: .5,
			color: '#fff' },
			message: '<h1> ' + message + '</h1>' });
	}

	stockticker.utils.showStockLoadingMessage = function(message) {
		$('.stockTickerList').block({
			message: '<h1> <img src="' + document.documentURI + 'images/spinner.gif" /> ' + message + '</h1>',
			css: { border: '3px solid #a00' }
		});
	}


	return stockticker;
});