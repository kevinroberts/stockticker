define(["jquery", "jquery.bootstrap", "bootstrap-switch"], function($) {
    //load the necessary jquery / bootstrap plugins.
    $(function() {
		// test that jQuery has loaded
        if (typeof console == "object") {
            console.log("jquery is loaded: version " + $.fn.jquery);
        }
//		$("#intervalUpdateToggle").bootstrapSwitch('size', 'small');
//		$('#intervalUpdateToggle').on('switchChange', function (e, data) {
//			var $element = $(data.el);
//			//$element.click();
//
//			console.log(e, $element);
//		});
    });

});