/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'bPopup', 'velocity', 'velocityUi'], function($){
	'use strict';

	var GetinTouch = {
		data: {
			form: $('.form-popup-block'),
			error: $('.error-block'),
			succes: $('.success-block'),
			order: $('.order-form-block')
		},

		init: function() {
			this.bindUiActions();
		},

		bindUiActions: function() {
			$('form').submit(function(event) {
				event.preventDefault();
			});

			$(".checkout").click(function() {
				if ($(this).hasClass('preorder-btn')) {
					$(window).trigger('fillField');
				}

				GetinTouch.validateForm($(this));
			});

			$('input.required').focus(function(){
				var thisElem = $(this);
				thisElem.removeClass('error');
			});
		},

		validateForm: function(submit) {
			var formValid = true,
			 	thisForm = submit.closest('form');

			$('input.required', thisForm).each(function() {
				var thisInput = $(this),
					re		  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

				if ($(this).attr('name') === "mail_field") {
					if(thisInput==="" || !re.test(thisInput.val())){
						formValid = false;
					}
				} else {
					if(thisInput===""){
						formValid = false;
					}
				}
			});

			if (formValid) {
				GetinTouch.sendForm(thisForm);
			} else {
				if (!thisForm.parent().hasClass('products-form-block')) {
					GetinTouch.bindPopup(GetinTouch.data.error);
				} else {
					submit.velocity("callout.shake", 500);
				}
			}
		},

		sendForm: function(thisForm) {
			    var url = "sendmail.php";

			    $.ajax({
					type: "POST",
					url: url,
					data: thisForm.serialize(), // serializes the form's elements.
					success: function(){
						$('input', thisForm).each(function(){
							$('.required', thisForm).val('');
						});

						$('.products-form').trigger('sent');

						var onOpen = function() {
							$('.form-popup-block').bPopup().close();
						};
						
						if (thisForm.parent().hasClass('products-form-block')) {
							$(window).trigger('orderSent');
						} else {
							GetinTouch.bindPopup(GetinTouch.data.succes);
						}

						
					}
				});
				
		    return false;
		},

		bindPopup: function(container, onOpen) {
			container.bPopup({
				closeClass: 'close-popup',
				onOpen: onOpen
			});
		}
	};

	GetinTouch.init();
});