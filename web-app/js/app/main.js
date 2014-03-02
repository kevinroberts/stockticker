define(["jquery", "jquery.bootstrap"], function($) {
    //the jquery.js plugins have been loaded.
    $(function() {
        if (typeof console == "object") {
            console.log("jquery is loaded: version " + $.fn.jquery);
        }
    });

});