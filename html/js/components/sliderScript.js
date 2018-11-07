/* jshint undef: true, unused: true */
/* global define: false */
define(['domReady', 'underscore', 'jquery', 'owlCarousel', 'matchH', 'waitImg'], function(domReady, _, $) {
	'use strict';

	var PageSliders = {
		select: {
			partners: $('.partners-carousel .slides'),
			reviews: $('.testimonials-list'),
			news: $('.news-images-list')
		},

		init: function() {
			this.bindUiActions();
		},

		bindUiActions: function() {
			this.initPartnersFlex();
			this.initReviewsSlider();
			this.initNewsSlider();
		},

		initNewsSlider: function() {
			var settings = {
				pagination: false,
				animateIn: 'fadeInCustom',
				animateOut: 'fadeOutCustom',
				autoplayHoverPause: true,
				loop :true,
				autoplay: true,
				autoplayTimeout: 2000,
				items : 1,
				nav: true,
				navText: ['',''],
				smartSpeed: 1000,
				dots: false
			};

			PageSliders.initCarousel(this.select.news, settings);

			this.select.news.waitForImages(function() {
		    	$(window).resize(_.debounce(function(){
		    		$('.owl-item', PageSliders.select.news).height($('.news-image-block').height());
		    	},250));

		    	$('.owl-item', PageSliders.select.news).height($('.news-image-block').height());
			});
		},

		initReviewsSlider: function() {
			var settings = {
				pagination: false,
				autoPlay: true,
				autoplayTimeout: 10000,
				items : 1,
				nav: true,
				navText: ['',''],
				smartSpeed: 1000,
				dots: false,
				loop: true
			};

			$('.testimonial-item').matchHeight();

			PageSliders.initCarousel(this.select.reviews, settings);
		},


		initCarousel: function(selector, settings) {
			selector.owlCarousel(settings);
		},

		initPartnersFlex: function() {
			var settings = {
				autoplay: true,
				autoplayTimeout: 15000,
				items : 4,
				smartSpeed: 500,
				responsive: {
					0: {
						items: 1
					},
					400: {
						items: 2
					},
					600: {
						items: 3
					},
					860: {
						items: 4
					}
				}
			};

			PageSliders.initCarousel(this.select.partners, settings);
		}
	};

	PageSliders.init();
});