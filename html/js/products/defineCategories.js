/* jshint undef: true, unused: true */
/* global define: false */
define([
    'products/categories/bad-drip',
    'products/categories/candy-king',
    'products/categories/clown',
    'products/categories/cookie-king',
    'products/categories/directors-cut',
    'products/categories/ice-monster'
], function () {
    "use strict";

    var list = [];
    for (var i = 0; i < arguments.length; i++) {
        list.push(arguments[i]);
    }

    return list;
});