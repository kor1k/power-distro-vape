/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'owlCarousel', 'underscore', 'domReady'], function($, owl, _){
	'use strict';

	var Header = {
		select: {
			header: $(".header-carousel"),
			vbg: 	$('.video-bg-wrapper')
		},

		init: function() {
			this.bindUiActions();
		},

		bindUiActions: function() {
			if ($(".header-carousel").length) {
				Header.initHeaderFlex();
				
				$(window).resize(_.debounce(function(){
					Header.setItemsHeight();
				    Header.resizeHeaderImages();
				},500));
			}

			if ($('.video-bg-wrapper').length) {
				Header.setVbgHeight();
				Header.checkVideoSize();

				$(window).resize(_.debounce(function(){
					Header.setVbgHeight();
					Header.checkVideoSize();
				},500));
			}
		},

		checkVideoSize: function() {
			$('.js-video-bg').removeClass('large-video');
			var vHeight 	= $('.js-video-bg').height(),
				vwHeight 	= $(window).innerHeight();

			if (vHeight < vwHeight) {
				$('.js-video-bg').addClass('large-video');
			}
		},

		setVbgHeight: function() {
			Header.select.vbg.height($(window).innerHeight());
		},

		initCarousel: function(selector, settings) {
			selector.owlCarousel(settings);
		},

		initHeaderFlex: function() {
			this.select.header.on('initialized.owl.carousel', function() {
			    Header.createPaginationDummy();
			    Header.setItemsHeight();
			    Header.resizeHeaderImages();
			});

			var settings = {
				animateOut: 'pushRevealOut',
				animateIn: 'pushRevealIn',
				loop:true,
				autoplay: true,
				autoplayTimeout: 10000,
				mouseDrag: false,
				touchDrag: false,
				pullDrag: false,
				smartSpeed: 1000,
				dots: true,
				nav: false,
				items: 1
			};

			Header.initCarousel(this.select.header, settings);

			this.select.header.on('changed.owl.carousel', function() {
			    Header.initPagination();
			});
		},

		setItemsHeight: function() {
			$('.owl-item', Header.select.header).css('height', $(window).innerHeight());
		},

		resizeHeaderImages: function() {
			$('img', Header.select.header).each(function() {
				$(this).removeClass('absolute-image');
				var imgHeight 		= $(this).height(),
					sliderHeight 	= Header.select.header.height();

				if (imgHeight < sliderHeight) {
					$(this).addClass('absolute-image');

					var margin = $(this).width()/2;
					$(this).css('margin-left', - margin);
				} else {
					$(this).removeClass('absolute-image').removeAttr('style');
				}
			});
		},

		createPaginationDummy: function() {
			Header.select.header.find('.owl-controls').append('<div class="dummy">');

			Header.initPagination();
		},

		initPagination: function() {
			var topPos = $('.owl-dot.active', Header.select.header).position().top,
				dummy = $('.dummy');

			if (topPos === 0) {
				dummy.animate({top: '-6px'}, 500);
			} else {
				dummy.animate({top: topPos+'px'}, 500);
			}

			$('.owl-dot', Header.select.header).click(function() {
				if ($('.animated', Header.select.header).length) {
					return false;
				}
 			});
		},
	};

	Header.init();
});