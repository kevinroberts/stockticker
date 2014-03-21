define("utils", ["jquery"], function ($) {
	'use strict';

	var stockInterval = null;

	function _countChar (val, length) {
		var len = val.value.length;
		if (len >= length) {
			val.value = val.value.substring(0, length);
		} else {
			var charsLeft = length - len;
			$('#charNum').text(charsLeft + " characters left");
		}
	}


	function _showAlertMessage(message) {
		if ($('#errorMsg').is(':visible')) {
			$("#errorMessage").html(message);
		} else {
			$("#errorMessage").html(message);
			$('#errorMsg').slideDown().delay(5000).fadeOut();
		}
	}

	function _showLoadingMessage(message) {
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

	function _showStockLoadingMessage(message) {
		var imgSrc = $("#loadingImageSrc").val();
        $('.stockTickerList').block({
			message: '<h3> <img src="' + imgSrc + '" /> ' + message + '</h3>',
			css: { border: '2px solid #a00' }
		});
	}

	function _log(message, obj) {
		if (typeof console == "object") {
			if (obj && typeof(obj) != "undefined"){
				console.log(message, obj);
			} else {
				console.log(message);
			}
		}
	}

	return {

		/**
		 * guid
		 * Returns a GUID / UUID -
		 * 32 randomly unique characters that stay in the ASCII range.
		 * http://www.ietf.org/rfc/rfc4122.txt
		 * @returns {string}
		 */
		guid : function() {
			var s = [];
			var hexDigits = "0123456789abcdef";
			for (var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
			s[8] = s[13] = s[18] = s[23] = "-";

			var uuid = s.join("");
			return uuid;
		},
		log : function(message, obj) {
			return _log(message, obj);
		},
		countChar : function(val, length) {
			return _countChar(val, length);
		},
		/**
		 * Show a bootstrap style alert message above the UI with
		 * the specified message.
		 * @param message
		 * @returns {*}
		 */
		showAlertMessage : function(message) {
			return _showAlertMessage(message);
		},
		showLoadingMessage : function(message) {
			return _showLoadingMessage(message);
		},
		showStockLoadingMessage : function(message) {
			return _showStockLoadingMessage(message);
		},
		setStockInterval : function(intVID) {
			stockInterval = intVID;
		},
		getStockInterval : function() {
			return stockInterval;
		}
	};

});