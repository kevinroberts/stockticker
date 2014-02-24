define(['knockout', 'jquery'], function(ko, $){
    ko.bindingHandlers.hasFocus = {
        init: function(element, valueAccessor) {
            $(element).focus(function() {
                var value = valueAccessor();
                value(true);
            });
            $(element).blur(function() {
                var value = valueAccessor();
                value(false);
            });
        },
        update: function(element, valueAccessor) {
            var value = valueAccessor();
            if (ko.unwrap(value))
                element.focus();
            else
                element.blur();
        }
    }
});