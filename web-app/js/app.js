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
        "knockout" : "../lib/knockout-3.0.0",
        "appViewModel" : "../model/appViewModel",
        "jquery.sortable" : "../lib/jquery-sortable"
    },
    "shim": {
        "jquery.bootstrap": {
            // jQuery
            deps: ["jquery"]
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
requirejs(["app/main"]);
requirejs(["app/sortable"]);
requirejs(["app/initKnockout"]);

