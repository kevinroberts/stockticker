define(["jquery", "jquery.sortable"], function($) {

    $('#stockTickerTable').sortable({
        containerSelector: 'table',
        itemPath: '> tbody',
        itemSelector: 'tr',
        placeholder: '<tr class="placeholder"/>'
    })

});