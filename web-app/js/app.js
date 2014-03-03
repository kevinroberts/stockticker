// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "app": "../app",
        "jquery": "../lib/jquery.min",
        "jquery.bootstrap" : "../lib/bootstrap",
        "bootbox" : "../lib/bootbox",
        "knockout" : "../lib/knockout-3.0.0",
        "appViewModel" : "../model/appViewModel",
        "blockui" : "../lib/jquery.blockUI",
        "jquery.sortable" : "../lib/jquery-sortable"

    },
    "shim": {
        "blockui" : {
            deps: ["jquery"]
        },
        "jquery.bootstrap": {
            // jQuery
            deps: ["jquery"]
        },
        "bootbox": {
            deps: ["jquery", "jquery.bootstrap"],
            exports: "bootbox"
        },
        "jquery.sortable": {
            deps: ["jquery"]
        },
        knockout:{
            deps: ["jquery"],
            exports: "knockout"
        }
    }
});

// Load the main app module to start the app

requirejs(["app/main", "app/sortable", "app/initKnockout"]);

