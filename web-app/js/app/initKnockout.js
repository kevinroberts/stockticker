require(['knockout', 'appViewModel', 'domReady!'], function(ko, appViewModel) {

    ko.applyBindings(new appViewModel());

});
