/* jshint undef: true, unused: true */
/* global define: false */
define([
	'products/models/itemModel',
	'backbone',
	'underscore'
], function(ItemModel) {
	'use strict';

	var ItemsCollection = Backbone.Collection.extend({
		model: ItemModel
	});

	return ItemsCollection;
});