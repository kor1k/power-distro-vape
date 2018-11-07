/* jshint undef: true, unused: true */
/* global define: false */
define([
	'products/models/categoryModel',
	'jquery',
	'backbone',
	'underscore'
], function(CategoryModel) {
	'use strict';

	var CategoryCollection = Backbone.Collection.extend({
		model: CategoryModel
	});

	return CategoryCollection;
});