/* jshint undef: true, unused: true */
/* global define: false */
define(['backbone'], function(Backbone){
	"use strict";

	var ItemView = Backbone.View.extend({
		tagName: 'div',
		className: 'prod-item l-mb-40',

		template: _.template([
			'<div class="image-block">',

				'<% if (label.text !== "") { %>',
				'<span class="best-seller-block">',
					'<i class="fa <% if (_.isEmpty(label.icon)){ %>fa-bomb<%} else {%><%= label.icon %><%}%>"></i><%= label.text %>',
				'</span>',
				'<% } %>',

				'<div class="thumbnail"><img src="<%= path %><%= thumb %>" alt=""></div>',
				'<div class="prod-hover-view">',
					'<ul class="hover-controls">',
						'<li class="view-product-gallery js-view-product" data-target="<%= cid %>">',
							'<span></span>',
						'</li>',
						'<li class="add-product-code" data-target="<%= cid %>">',
							'<span></span>',
						'</li>',
					'</ul>',
				'</div>',
			'</div>',
			'<div class="gen-product-info">',
				'<p class="prod-price <% if (price.old){ %>is-new-price<%}%>">',
					'<% if (price.old) { %>',
					'<span class="old-price">',
						'<span class="currency"></span>',
						'<span class="value"><%= price.old %></span>',
					'</span>',
					'<% } %>',
					'<span class="current-price">',
						'<span class="currency"></span>',
						'<span class="value"><%= price.current %></span>',
					'</span>',
				'</p>',
				'<p class="prod-name"><%= name %></p>',
			'</div>',
		].join('')),

		initialize: function () {
			var that = this;
			
			var templateData = _.extend(that.model.toJSON(), { cid: that.model.cid });
			that.$el.append(that.template(templateData));

			// Bind controls
			$('.js-view-product', that.$el).click(function () {
				$(window).trigger('showProductItem', $(this).data('target'));
			});

			// Bind add to cart
			$('.add-product-code', that.$el).click(function () {
				$(window).trigger('addToCart', $(this).data('target'));

				var plusOne = $('<div class="plusOne">+1</div>');
				plusOne.appendTo($(this));
				setTimeout(function() {
					$(plusOne, $(this)).remove();
				}, 1000);
			});

			$('.currency', that.$el).html($('body').data('currency'));
		},

		render: function () {
			return this;
		}
	});

	return ItemView;
});