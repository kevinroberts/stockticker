define(["jquery", "jquery.sortable"], function($) {

    $('#stockTickerTable tbody').sortable({
        containerSelector: 'table',
        itemPath: '> tbody',
        itemSelector: 'tr',
        placeholder: '<tr class="placeholder"/>'
    })

});