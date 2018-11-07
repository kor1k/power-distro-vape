define([], function(){
	'use strict';

	var Basic = {
		init: function() {
			this.bindUIActions();
		},

		bindUIActions: function() {
			$('.documentation-content i.folder').addClass('blue');
			$('.documentation-content i.file').addClass('green');
		}
	};

	return Basic;
});