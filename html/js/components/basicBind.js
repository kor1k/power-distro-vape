/* jshint undef: true, unused: true */
/* global define: false */
define(['underscore', 'jquery', 'fancy', 'fancyThumb', 'inView', 'SmoothScroll', 'velocity', 'velocityUi', 'matchH', 'waitImg'], function(_, $){
	'use strict';

	var UIAnim = {
		select: {
			colors: $('.prod-colors-list'),
			numbersTime: 2000,
			videoBlock: $('.video-block .player'),
			timeOut: null
		},

		init: function() {
			this.bindUiActions();
		},

		bindUiActions: function() {
			$('.stats-item').css('opacity', '0');
			this.bindTeamHover();
			this.bindMapToggle();		

			$('.news-section').waitForImages(function() {
		    	UIAnim.matchNewsHeight();
			});

			UIAnim.setLogoHeight();
			$(window).resize(_.debounce(function(){
				UIAnim.setLogoHeight();
				UIAnim.matchNewsHeight();	
				UIAnim.setTopPadding();
				
			},500));	

			setInterval(function(){
				UIAnim.animateWhyus();
			}, 3000);

			$('.js-procede-btn').click(function() {
				$('#products').velocity('scroll', { container: '', duration: 500 });
			});

			this.setTopPadding();
		},

		setTopPadding: function() {
			if ($('.parallax-header').length) {
				$('.page-content').css('padding-top', $(window).innerHeight() + 'px');
			}

			if ($('.js-bgi-v').length) {
				$('.js-bgi-v').css('height', $(window).innerHeight() + 'px');
			}
		},

		animateWhyus: function() {
			var el = $('.why-us-image');

			if (el.hasClass('left-side')) {
				el.removeClass('left-side').addClass('right-side');
			} else if (el.hasClass('right-side')) {
				el.removeClass('right-side');
			} else {
				el.addClass('left-side');
			}
		},

		matchNewsHeight: function() {
			$('.news-image', $('.js-news-item')).each(function() {
				$(this).removeClass('large-image');

				var imgHeight = $(this).height(),
					parHeight = $(this).parent().height();

				if (imgHeight < parHeight) {
					$(this).addClass('large-image');
				}
			});

			$('.js-news-item').matchHeight();
		},

		setLogoHeight: function() {
			$('.logo-img').css('max-height', $(window).innerHeight() * 0.6);
			$('.logo-img').css({
				'max-height':  $(window).innerHeight() * 0.6,
				'max-width': $(window).innerWidth() * 0.85
			});
		},

		bindMapToggle: function() {
			$('.js-map-container').velocity({
				translateY: '-130%'
			}, 10);

			$('.js-map-view').on('click tap', function() {
				$('.js-map-container').velocity({
					translateY: ['0', '-130%']
				}, 700, function() {
					$('.js-map-container').addClass('is-active');
				});
			});

			$('.js-form-view').on('click tap', function() {
				$('.js-map-container').velocity('reverse', function() {
					$('.js-map-container').removeClass('is-active');
				});
			});

			$(window).keyup(function(e) {
				e.preventDefault();

				if (e.keyCode === 27 && $('.js-map-container').hasClass('is-active')) {
					$('.js-map-container').removeClass('is-active').velocity('reverse');
				}
			});
		},

		bindTeamHover: function() {

			$('.about-team').hover(function() {
				$('.js-item-info', $(this)).stop().velocity('stop').velocity({
					opacity: '0'
				}, 250);

				$('.team-social', $(this)).stop().delay(250).each(function(index) {
					$(this).velocity('stop').velocity({
						translateY: ['0', '-20'],
						opacity: ['1', '0']
					}, {
						duration: 250,
						delay: index + '00',
						easing: [ 0.175, 0.885, 0.32, 1.575 ]
					});
				});

			}, function() {
				$('.js-item-info', $(this)).stop().velocity('stop').velocity({
					opacity: '1'
				}, {
					duration: 250,
					delay: 200
				});

				$('.team-social', $(this)).stop().velocity('stop').velocity({
					translateY: '-20px',
					opacity: '0'
				}, 250);
			});
		},

		createVideo: function() {
			UIAnim.select.videoBlock.mb_YTPlayer();
			UIAnim.checkButton();
		},

		animNumbers: function() {
			$("#hours").animateNumbers(24, true, UIAnim.select.numbersTime, "linear");
			$("#sold").animateNumbers(2443, true, UIAnim.select.numbersTime, "linear");
			$("#happy").animateNumbers(98, true, UIAnim.select.numbersTime, "linear");
			$("#experience").animateNumbers(20, true, UIAnim.select.numbersTime, "linear"); 
		},

		initFancy: function(target, parent) {
			target.fancybox({
				padding: 0,
				helpers	: {
					thumbs	: {
						width	: 50,
						height	: 50
					},
					overlay: {
				      locked: false
				    }
				}
			});

			$('.view-product-gallery', parent).click(function() {
				var item = $('.fancyBox-gallery li', parent).first();
				$('.fancybox-thumb', item).click();
			});
		}
	};

	UIAnim.init();
});