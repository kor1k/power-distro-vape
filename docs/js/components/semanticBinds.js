define(['jquery', 'sidebar', 'smoothScroll', 'popup'], function(){
	'use strict';

	var Semantic = {
		init: function() {
			this.bindUIActions();
		},

		bindUIActions: function() {
			Semantic.initSidebar();
			Semantic.smoothScrolling();
			// Semantic.initPopups();
		},

		initPopups: function() {
			$('span[title]').popup();
		},

		initSidebar: function() {
			$('.documentation-sidebar').sidebar({
				overlay: true
			});

			$('.documentation-sidebar').sidebar('show');
		},

		smoothScrolling: function() {
			$('.page-navs').singlePageNav({
				'speed': 700,
				'currentClass': 'active'
			});
		}
	};

	return Semantic;
});