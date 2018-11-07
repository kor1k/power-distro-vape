/* jshint undef: true, unused: true */
/* global define: false */
define(['backbone', 'underscore', 'velocity', 'velocityUi'], function() {
	'use strict';

	var ProductView = Backbone.View.extend({
		tagName: 	'ul',
		className: 	'order-list js-order-list',

		template: _.template([
			'<li class="order-item js-order-item">',
				'<span class="order-name"><%= name %></span>',
				'<span class="order-price js-order-price">',
					'<span class="currency"></span>',
					'<span class="value"><%= price %></span>',
				'</span>',
				'<span class="remove-item-btn fa fa-trash js-remove-prod" data-selfid="<%= cid %>"></span>',
			'</li>',
		].join('')),

		initialize: function() {
			var that = this;

			that.collection.forEach(function (model) {
				var templateData = _.extend(model.toJSON(), { cid: model.cid });
				that.$el.append(that.template(templateData));
			});

			$('.js-remove-prod', that.$el).click(function () {
				that.collection.remove(that.collection.get({cid: $(this).data('selfid')}));

				var parent = $(this).closest('.js-order-item');

				parent.velocity('transition.slideRightBigOut', 400, function() {
					parent.remove();
				});
			});

			$('.js-order-item', that.$el).each(function () {
				var value = $('.js-order-price .value', $(this)).html();
				$('.js-order-price .value', $(this)).html(parseFloat(value).toFixed(2));
			});

			$('.currency', that.$el).html($('body').data('currency'));
		},

		render: function() {
			return this;
		}
	});

	return ProductView;
});