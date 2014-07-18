// Place third party dependencies in the lib folder
requirejs.config({
     //"urlArgs": "bust=" + (new Date()).getTime(),
    "baseUrl": "js/lib",
    "paths": {
        "app": "../app",
        "jquery": "../lib/jquery.min",
        "jquery.bootstrap" : "../lib/bootstrap",
        "bootbox" : "../lib/bootbox",
        "knockout" : "../lib/knockout-3.0.0",
        "appViewModel" : "../model/appViewModel",
        "blockui" : "../lib/jquery.blockUI",
		"knockout-bootstrap" : "../lib/knockout-bootstrap",
        "moment": "../lib/moment-with-langs.min",
		"bootstrap-switch": "../lib/bootstrap-switch",
		"typeahead": "../lib/typeahead.bundle",
		"handlebars" : "../lib/handlebars-v1.3.0",
		"underscore" : "../lib/underscore-min",
		"stock" : "../model/stock",
		"stockList" : "../model/stockList",
		"dataStore" : "../app/datastore",
		"utils" : "../app/utils"
    },
    "shim": {
        "blockui" : {
            deps: ["jquery"]
        },
		"utils" : {
			deps: ["jquery"]
		},
        "jquery.bootstrap": {
            // jQuery
            deps: ["jquery"]
        },
		"typeahead": {
			deps: ["jquery", "jquery.bootstrap"]
		},
		"bootstrap-switch": {
			deps: ["jquery"]
		},
        "bootbox": {
            deps: ["jquery", "jquery.bootstrap"],
            exports: "bootbox"
        },
        knockout:{
            deps: ["jquery"],
            exports: "knockout"
        },
		"knockout-bootstrap" : {
			deps: ["jquery", "jquery.bootstrap" , "knockout"]
		}
    }
});

// Load the main app module to start the app
requirejs(["app/main", "app/initKnockout"]);

