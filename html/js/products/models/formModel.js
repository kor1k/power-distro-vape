/* jshint undef: true, unused: true */
/* global define: false */
define(['backbone'], function() {
	'use strict';

	var ProductModel = Backbone.Model.extend({
		defaults: {
			name: 	'',
			price: 	'',
			parent: '',
			code: ''
		}
	});

	return ProductModel;
});