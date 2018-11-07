/* jshint undef: true, unused: true */
/* global define: false */
define([
	'products/models/formModel',
	'backbone',
], function(FormModel) {
	'use strict';

	var FormCollection = Backbone.Collection.extend({
		model: FormModel
	});

	return FormCollection;
});