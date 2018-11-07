/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'velocity', 'velocityUi'], function($){
	'use strict';

	var CustomSelect = {
		select: {
			dropdown: $('.select'),
			options: $('.options-list'),
			container: $('.products-category-list')
		},

		init: function() {
			this.bindUiActions();
		},

		bindUiActions: function() {
			this.select.dropdown.each(function() {
				var thisParent = $(this);

				$("dt a", thisParent).click(function(e) {
					e.preventDefault();

					CustomSelect.toggleOpen(thisParent);
				});

				$("dd .options-list li a", thisParent).click(function(e) {
					e.preventDefault();
				    var text  		= $(this).html(),
				    	thisElem	= $(this);

					CustomSelect.setValue(thisElem, text, thisParent);
				});

				$(document).bind('click', function(e) {
				    var $clicked = $(e.target);
					CustomSelect.closeDropdown($clicked);
				});

				$('.close-btn', CustomSelect.select.options).click(function() {
					CustomSelect.closeDropdown();
				});
			});	
		},

		closeDropdown: function(target) {
			if (! $('.category-list', CustomSelect.select.container).hasClass('changing')) {
				if (target) {
				    if (! target.parents().hasClass("select")) {
		    	        CustomSelect.select.container.each(function() {
		    	        	CustomSelect.select.container.removeClass('active');
		    			});
				    }
				} else {
					CustomSelect.select.container.each(function() {
	    	        	CustomSelect.select.container.removeClass('active');
	    			});
				}
			}
		},

		toggleOpen: function() {
			if(!CustomSelect.select.container.hasClass('active')){
				CustomSelect.select.container.each(function() {
					CustomSelect.select.container.removeClass('active');
				});
				CustomSelect.select.container.addClass('active');

				$('.category-item').css('opacity', '0').velocity("transition.slideLeftIn", {stagger: 150, delay: 500});
			} else {
				CustomSelect.select.container.removeClass('active');
			}
		},

		setValue: function(thisElem, text, thisParent) {
	    	var val = $('span.value', thisElem).html();

		    $("dt a span", thisParent).html(text);

		    if ($('input', thisParent).length) {
			    $("input", thisParent).val(val);
		    }

		    // $("dd .options-list", thisParent).hide();
		}
	};

	CustomSelect.init();
});