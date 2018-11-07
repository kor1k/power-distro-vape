/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'products/defineCategories',
	'products/collection/categoryCollection',
	'products/models/categoryModel',
	'products/views/categoryListView',
	'products/views/categorySliderView',
	'products/collection/itemsCollection',
	'products/collection/formCollection',
	'products/views/modalView',
	'products/models/formModel',
	'products/views/formView',
	'owlCarousel', 'waitImg', 'velocity', 'underscore', 'scroll'
], function($, list, 
	CategoryCollection, CategoryModel, CategoryListView,
	CategorySliderView, ItemsColelction, FormCollection, ModalView, FormModel, FormView
){
	"use strict";

	var s = {
		categoryCollection: new CategoryCollection(),
		formCollection: new FormCollection(),
		curentCat: null,
		nextCat: null
	};

	var Products = {
		init: function () {
			// Create items collection
			window.ItemsCollection = new ItemsColelction();

			// Create category collection
			$.each(list, function() {
				var item = new CategoryModel();
				item.set({
					name: this.name,
					imagesPath: this.imagesPath,
					items: this.items,
					oneRow: this.oneRow,
					addCodePath: this.addCodePath
				});
				s.categoryCollection.add(item);

			});

			// Create category list view
			var categoryListView = new CategoryListView({collection: s.categoryCollection});
			$('.js-category-list').html(categoryListView.render().el);

			// Load first category
			var item = s.categoryCollection.first();
			this.loadCategory(item, true);


			$(window).on('loadNewCategory', function(e, target) {
				e.preventDefault();
				Products.changeCategories.hide(s.categoryCollection.get({cid: target}), target);
			});

			// Show product details
			this.showProductDetails();

			// Add to cart action
			$(window).on('addToCart', function(e, target) {
				e.preventDefault();
				var item = window.ItemsCollection.get({cid: target});

				Products.addToCart.addToList(item.get('name'), item.get('price').current, item.get('code'), target);
				s.formCollection.trigger('itemAdded');
			});
			$('.shopping-cart').click(function() {
				Products.addToCart.showForm();
			});
			$('.products-form .form-close-btn').click(function() {
				Products.addToCart.hideForm();
			});
			
			// Updata cart count
			s.formCollection.on({
				add:function(){
					Products.cart.getLength(s.formCollection.length);
					Products.cart.getTotal();
				},
				remove:function(){
					Products.cart.getLength(s.formCollection.length);
					Products.cart.getTotal();
				}
		  	});

		  	// Bind custom scroll
		  	$('.js-order-container').mCustomScrollbar();

		  	// Send preorder
		  	$(window).on('fillField', function() {
		  		$('#prCode_field').val('');
		  		var prodList = [];
		  		s.formCollection.forEach(function (model) {
		  			prodList.push({
		  				title: model.get('name'),
		  				code: model.get('code')
		  			});
		  		});
		  		$('#prCode_field').val(JSON.stringify(prodList));
		  	});

		  	// Order sent
		  	$(window).on('orderSent', function() {
		  		s.formCollection.reset();
		  		Products.cart.getLength(0);
		  		Products.cart.getTotal();

		  		$('.js-order-list li').wrapAll('<div class="extra-wrapper"></div>');
		  		$('.extra-wrapper').velocity({
		  			scale: '0.8',
		  			opacity: '0'
		  		}, 500, function () {
		  			$('.extra-wrapper').remove();
		  		});
		  	});

		  	$('.currency').html($('body').data('currency'));
		},

		cart: {
			getLength: function (num) {
				$('.js-product-count').html(num);

				if (!$('#products .products-number').hasClass('animated bounce')) {
					$('#products .products-number').addClass('animated bounce');

					setTimeout(function() {
						$('#products .products-number').removeClass('animated bounce');
					}, 1500);
				}
			},
			getTotal: function () {
				var total = 0;
				s.formCollection.forEach(function (model) {
					total += parseFloat(model.get('price'));
				});
				$('.js-total-price .value').html(total.toFixed(2));
			}
		},

		addToCart: {
			addToList: function (name, price, code, id) {
				var newItem = new FormModel({
					name: name,
					price: price,
					parent: id,
					code: code
				});
				s.formCollection.add(newItem);				
			},
			showForm: function () {
				var form = new FormView({collection: s.formCollection});
				$('.js-order-container .mCSB_container').append(form.render().el);
				$('.products-form').addClass('active');
			},
			hideForm: function () {
				$('.products-form').removeClass('active');
				setTimeout(function() {
					$('.js-order-list').remove();
				}, 700);
			}
		},

		showProductDetails: function () {
			$(window).on('showProductItem', function(e, target) {
				e.preventDefault();
				var item = window.ItemsCollection.get({cid: target})

				var modal = new ModalView({model: item});
				$('.product-details-modal').append(modal.render().el);

				$('.product-details-modal .images-list').waitForImages(function() {
				    $('.product-details-modal .details-preloader').fadeOut(500);
				});

				// Bind carousel
				$('.product-details-modal .images-list').owlCarousel({
					items: 1,
					nav: true,
					navText: ['', ''],
					dots: false
				});

				// Show modal
				$('.product-details-modal').velocity({
					translateX: ['0', '-100%']
				}, 700, [0.7,0,0.3,1], function () {
					$('.product-details-modal').css('overflow-y', 'scroll');
					$('body').css('overflow', 'hidden');
				});

				// Close modal
				$('.close-details', $('.product-details-modal')).click(function() {
					$('.product-details-modal').css('overflow', 'hidden');
					$('body').css('overflow-y', 'visible');

					$('.product-details-modal').velocity('reverse', function () {
						$('.details-container', $('.product-details-modal')).remove();
					});
				});
			});
		},

		changeCategories: {
			hide: function (nextCat, cid) {
				if (!nextCat.get('loaded')) {
					$('.options-list').css('opacity', '0');
					$('.loader').fadeIn(300);
				}

				Products.loadCategory(nextCat, false);
			},
			show: function (isNew) {
				s.curentCat.remove();
				s.nextCat.show();
				s.curentCat = s.nextCat;

				Products.checkNavNeed(s.curentCat);

				if (!isNew) {
					s.curentCat.trigger('categoryChanged');
				}

				// Show preloader 
				$('.products-category-list').removeClass('active');
				if (isNew) {
					setTimeout(function() {
						$('.options-list').css('opacity', '1');
						$('.loader').fadeOut(10);
					}, 700);
				}
			}
		},

		loadCategory: function (model, isFirst) {
			model.set({ loaded: true });
			var categorySliderView 	= new CategorySliderView({model: model}),
				doneView			= categorySliderView.render().el;
			$('.js-products-container').append(doneView);

			var block = $('.js-products-container').find(doneView);
			this.initCategoryCarousel(block);

			if (isFirst) {
				s.curentCat = block;
			} else {
				s.nextCat = block;
				s.nextCat.waitForImages(function() {
				    Products.changeCategories.show(true);
				});
			}
		},

		initCategoryCarousel: function (target) {
			var settings = {
				items : 4,
				nav: true,
				navText: ['', ''],
				mouseDrag: false,
				touchDrag: false,
				dots: false,
				smartSpeed: 500,
				navRewind: true,
				responsive:{
			        0:{
			            items: 1,
			            nav: true
			        },
			        430: {
			        	items: 2,
			        	nav: true
			        },
			        600:{
			            items:3,
			            nav: true
			        },
			        1000:{
			            items:4,
			            nav: true
			        }
			    }
			};

			$('.slides', target).owlCarousel(settings);

			target.on('categoryChanged', function() {
				var owl = $('.slides', target);

				owl.data('owlCarousel').destroy();
				owl.removeClass('owl-carousel owl-loaded owl-text-select-on');
				owl.find('.owl-stage-outer').children().unwrap();
				owl.owlCarousel(settings);

				Products.checkNavNeed(target);
			});

			// Check nav need
			$(window).resize(_.debounce(function(){
				Products.checkNavNeed(target);
			},500));
		},

		checkNavNeed: function (target) {
			var stageOuter = $('.owl-stage-outer', target).width(),
				stage = $('.owl-stage', target).width();

			if (stage <= stageOuter) {
				target.addClass('no-nav');
			} else {
				target.removeClass('no-nav');
			}
		}
	};

	Products.init();
});