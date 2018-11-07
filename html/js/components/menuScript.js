/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'velocity'], function($){
	'use strict';

	var MainMenu = {
		get: {
			sticker: $("#sticker"),
			menu: $('#nav'),
			menuItem: $('.menu-item')
		},

		init: function() {
			this.bindUiActions();
		},

		bindUiActions: function() {
			this.smoothScrolling();
		},

		smoothScrolling: function() {
			MainMenu.get.menuItem.each(function() {
				$(this).on('click tap', function(e) {
					e.preventDefault();
					
					var target = $('a', $(this)).attr('href');

					var distance = $(target).offset().top;

					$('html, body').stop().animate({
					    'scrollTop': distance
					}, 900, 'swing');
				});
			});
		}
	};

	MainMenu.init();
});