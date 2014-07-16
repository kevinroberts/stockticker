define(["jquery", "utils", "handlebars", "typeahead" ,"jquery.bootstrap", "bootstrap-switch"], function($, utils) {
    //load the necessary jquery / bootstrap plugins.
    $(function() {
		// test that jQuery has loaded
        //if (typeof jQuery == "function") {
		//	utils.log("jquery is loaded: version " + $.fn.jquery);
        //}
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

		// trigger the search immediately after the user selects a typeahead result
		$('#symbolToAdd').bind('typeahead:selected', function(obj, datum, name) {
			//console.log(obj); // object
			// outputs, e.g., {"type":"typeahead:selected","timeStamp":1371822938628,"jQuery19105037956037711017":true,"isTrigger":true,"namespace":"","namespace_re":null,"target":{"jQuery19105037956037711017":46},"delegateTarget":{"jQuery19105037956037711017":46},"currentTarget":
			//console.log(datum); // contains datum value, tokens and custom fields
			// outputs, e.g., {"redirect_url":"http://localhost/test/topic/test_topic","image_url":"http://localhost/test/upload/images/t_FWnYhhqd.jpg","description":"A test description","value":"A test value","tokens":["A","test","value"]}
			// in this case I created custom fields called 'redirect_url', 'image_url', 'description'

			//console.log(name); // contains dataset name
			// outputs, e.g., "my_dataset"
			$(".addStockBtn").click();
		});

    });


});