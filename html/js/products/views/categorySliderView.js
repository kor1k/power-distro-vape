/* jshint undef: true, unused: true */
/* global define: false */
define(['backbone',
	'products/views/itemView',
	'products/models/itemModel'
], function(Backbone, ItemView, ItemModel) {
	'use strict';

	var ProductView = Backbone.View.extend({
		tagName: 'div',
		className: 'products-slider js-products-slider',

		template: _.template([
			'<ul class="slides"></ul>'
		].join('')),

		initialize: function() {
			var that = this,
				list = [];

			that.$el.attr('data-target', that.model.cid).append(that.template());

			that.model.get('items').forEach(function (item) {

				var model = new ItemModel();
				model.set(item);

				if (that.model.get('addCodePath')) {
					var path = that.model.get('imagesPath') + item.code + '/';
				} else {
					var path = that.model.get('imagesPath');
				}
				model.set({ path: path });
				window.ItemsCollection.add(model);

				var prodItem = new ItemView({model: model});

				list.push(prodItem.render().el)
			});

			if (that.model.get('oneRow')) {
				that.$el.find('.slides').append(list);
				that.$el.find('.prod-item').wrap('<li></li>');
			} else {
				that.wrapElements(list);
			}

			$('.currency', that.$el).html($('body').data('currency'));
		},

		wrapElements: function (list) {
			var el = '',
				that = this,
				flag = list.length;

			$.each(list, function(index, item) {
				if (index % 2 === 0) {
					el = $('<li>');
					el.append(item);
				} else {
					el.append(item);
					that.$el.find('.slides').append(el);
				}

				if (index === flag - 1 && flag % 2 !== 0) {
					that.$el.find('.slides').append(el);
				}
			});
		},

		render: function() {
			return this;
		}
	});

	return ProductView;
});