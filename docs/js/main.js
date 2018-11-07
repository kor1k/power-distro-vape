requirejs.config({
	paths: {
		'jquery': 'lib/jquery-1.11.0.min',
		'sidebar': 'lib/sidebar',
		'smoothScroll': 'lib/jquery.singlePageNav.min',
		'popup': 'lib/popup'
	},

	shim: {
		'sidebar': ['jquery'],
		'smoothScroll': ['jquery'],
		'popup': ['jquery']
	}
});

require([
	'components/initPageScripts'
], function(IPS){
	'use strict';
	IPS.initialize();
});	