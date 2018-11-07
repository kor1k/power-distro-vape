/* jshint undef: true, unused: true */
/* global define: false */
define(['backbone', 'velocity', 'waitImg'], function(Backbone){
	"use strict";

	var ItemView = Backbone.View.extend({
		tagName: 'div',
		className: 'details-container',

		template: _.template([
			'<div class="row">',
				'<div class="close-details"></div>',
				'<div class="column large-6 medium-6 custom-column">',
					'<div class="gallery-container js-product-gallery">',
						'<div class="details-preloader">',
							'<svg id="Layer_1" x="0px" y="0px" width="600px" height="690px" viewBox="0 0 600 690" enable-background="new 0 0 600 690" xml:space="preserve">',
								'<polygon fill="#f1f1f1" class="polygon" stroke="#A7A9AC" stroke-width="8" stroke-miterlimit="10" points="54.558,557.559 300,132.441 ',
									'545.441,557.559 "/>',
								'<polygon fill="#8856A3"  class="inner" points="96.037,535.115 300,168.885 503.963,535.115 "/>',
							'</svg>',
						'</div>',
						'<div class="images-list">',
							'<% _.each(gallery, function(item){ %>',
								'<img src="<%= path %><%= item %>" alt="">',
							'<% }) %>',
						'</div>',
					'</div>',
				'</div>',
				'<div class="column large-6 medium-6 custom-column">',
					'<div class="product-details">',
						'<div class="price">',
							'<% if (price.old) {%>',
								'<p class="curent-price new"><span class="value"><%= price.current %></span><span class="currency"></span></p>',
								'<p class="old-price"><span class="value"><%= price.old %></span><span class="currency"></span></p>',
							'<% } else {%>',
								'<p class="curent-price"><span class="value"><%= price.current %></span><span class="currency"></span></p>',
							'<% } %>',
						'</div>',
						'<div class="title">',
							'<h4><%= name %></h4>',
						'</div>',
						'<div class="description">',
							'<p><%= details %></p>',
						'</div>',
						'<div class="add-to-cart-btn">',
							'<span class="theme-bg-c button" data-target="<%= cid %>">',
								'Add to cart',
								'<span class="added">',
									'<svg class="ok-sign" enable-background="new 0 0 24 24" version="1.0" viewBox="0 0 24 24" xml:space="preserve">',
									    '<polyline points="20,6 9,17 4,12" class="check-mark"/>',
									'</svg>',
								'</span>',
							'</span>',
						'</div>',
					'</div>',
				'</div>',
			'</div>',
		].join('')),

		initialize: function () {
			var that = this;
			
			var templateData = _.extend(that.model.toJSON(), { cid: that.model.cid });
			that.$el.append(that.template(templateData));
			

			$('.button', that.$el).click(function () {
				$(window).trigger('addToCart', $(this).data('target'));

				if (!$(this).hasClass('active')) {
					var btn = $(this);
					btn.addClass('active');
					setTimeout(function() {
						btn.removeClass('active');
					}, 1000);

					var target = $('.added', $(this));

					target.velocity({
						translateY: ['0', '-100%']
					}, 250, function () {
						target.velocity({
							translateY: ['100%', '0']
						}, {duration: 250, delay: 500});
					});
				}
			});

			$('.currency', that.$el).html($('body').data('currency'));

			
		},

		render: function () {
			return this;
		}
	});

	return ItemView;
});