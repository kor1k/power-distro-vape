/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery'], function($) {
	'use strict';

	var MobileMenu = {
		get: {
			toggleBtn: $('.js-toggle-menu'),
			navContainer: $('.js-mobile-container'),
			navList: $('.js-navs-list')
		},

		init: function() {
			this.bindUiActions();
		},

		bindUiActions: function() {
			MobileMenu.appendNavsForMobile();

			MobileMenu.get.toggleBtn.click(function() {
				MobileMenu.toggleMenu();
			});

			$('.menu-item', MobileMenu.get.navContainer).click(function() {
				MobileMenu.get.toggleBtn.removeClass('is-active');
				MobileMenu.get.navContainer.removeClass('is-active');
			});
		},

		appendNavsForMobile: function() {
			MobileMenu.get.navList.clone().appendTo(MobileMenu.get.navContainer);

			$('.menu-item', MobileMenu.get.navContainer).each(function() {
				$(this).on('click tap', function(e) {
					e.preventDefault();
					
					var target = $('a', $(this)).attr('href');

					var distance = $(target).offset().top;

					$('html, body').stop().animate({
					    'scrollTop': distance
					}, 900, 'swing');
				});
			});
		},

		toggleMenu: function() {
			$('.menu-item', MobileMenu.get.navContainer).css('opacity', '0').velocity('stop').velocity("transition.slideDownIn", {stagger: 100});
			MobileMenu.get.navContainer.toggleClass('is-active');
			MobileMenu.get.toggleBtn.toggleClass('is-active');


		}
	};

	MobileMenu.init();
});