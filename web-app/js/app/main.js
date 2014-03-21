define(["jquery", "utils", "handlebars", "typeahead" ,"jquery.bootstrap", "bootstrap-switch"], function($, utils) {
    //load the necessary jquery / bootstrap plugins.
    $(function() {
		// test that jQuery has loaded
        if (typeof jQuery == "function") {
			utils.log("jquery is loaded: version " + $.fn.jquery);
        }
//		$("#intervalUpdateToggle").bootstrapSwitch('size', 'small');
//		$('#intervalUpdateToggle').on('switchChange', function (e, data) {
//			var $element = $(data.el);
//			//$element.click();
//
//			console.log(e, $element);
//		});

		var fetchUrl = $("#stockFetchUrl").val();

		var symbols = new Bloodhound({
			datumTokenizer: function (d) {
				return Bloodhound.tokenizers.whitespace(d.symbol);
			},
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			limit: 10,
			remote: fetchUrl + "?symbol=%QUERY"
		});

		symbols.initialize();

		$('#symbolToAdd').typeahead(null, {
			displayKey: 'symbol',
			name: 'name',
			source: symbols.ttAdapter(),
			templates: {
				suggestion: Handlebars.compile('<p><strong>{{symbol}}</strong> – {{name}}</p>')
			}
		});

    });


});