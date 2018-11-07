define(['jquery', 'velocity', 'velocityUi', 'waitImg', 'SmoothScroll'], function() {
	'use strict';

	var s, Welcome = {
		get: {
			$container: $('.js-work-sections'),
			$logo: $('.js-logo-block'),
			$title: $('.js-title-block'),
			$work: $('.js-work-item'),
			$demo: $('.js-demo-btn'),
			$color: $('.js-color-item'),
			$firstScreen: $('.js-first-screen'),
			$secondScreen: $('.js-second-screen'),
			target: null,
			color: null,
			fileName: null
		},

		init: function() {
			s = Welcome.get;
			this.bindUiActions();
		},

		bindUiActions: function() {
			s.$container.waitForImages(function() {
		    	Welcome.initComponents();
			});

			s.$demo.click(function(e) {
				s.target = $(this).data('target');
				Welcome.showCollors();
			});

			s.$color.hover(function() {
				Welcome.colorHover.on($(this));
			}, function() {
				Welcome.colorHover.off();
			}).click(function(e) {
				s.color = $(this).data('color');
				s.fileName = $(this).data('filename');
				Welcome.layout.hideColors();
			});
		},

		layout: {
			hideColors: function() {
				var length = s.$color.length;

				$('.section-title').fadeOut('300');
				s.$color.each(function(index, el) {
					$(this).delay(index * 100).velocity({
						opacity: '0'
					}, 300, function() {
						if (index === length - 1) {
							Welcome.layout.appendIframe();
						}
					});
				});
			},

			appendIframe: function() {
				$('body').html('').append('<iframe src="'+window.location.href+s.target+'"></iframe>');

				Welcome.layout.setColor();
			},

			setColor: function() {
				if ($('iframe').contents().find('head').length && $('iframe').contents().find('head').html() !== '') {
					$('iframe').contents().find('head').append('<link href="css/less/colors/'+s.fileName+'" rel="stylesheet">');
				} else {
					setTimeout(function() {
						Welcome.layout.setColor();
					}, 100);
				}
			}
		},

		colorHover: {
			on: function(target) {
				s.$color.css('width', '16%');
				target.css('width', '20%');
			},
			off: function() {
				s.$color.css('width', '16.66666667%');
			}
		},

		showCollors: function() {
			s.$firstScreen.velocity({
				translateX: '-20%',
				opacity: ['0', '1']
			}, 1000, 'ease-out', function() {
				s.$firstScreen.hide();
				$('body').css('overflow', 'hidden');

				s.$color.hide();
				s.$secondScreen.show();
				$('.section-title-block').velocity({
					translateX: ['0', '10%'],
					opacity: ['1', '0']
				}, 1000, 'ease-out', function() {
					s.$color.velocity('transition.fadeIn', {duration: 1500, stagger: 250});
				});
			});

			
		},

		initComponents: function() {
			$(window).scrollTop(0);
			s.$logo.velocity('transition.fadeIn', 1500, function() {
				s.$title.velocity('transition.slideDownIn', 1500, function() {
					s.$work.velocity('transition.slideUpIn', {duration: 1000, stagger: 500});
				});
			});
		}
	};

	return Welcome;
});