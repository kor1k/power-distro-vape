/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'underscore'], function($) {
	'use strict';

	var BgVideo = {
		get: {
			container: $('.js-video-block'),
			playBtn: $('.js-play-btn'),
			video: $('.js-page-video')
		},

		init: function() {
			this.bingUiActions();
		},

		bingUiActions: function() {
			this.bindControll();
		},

		bindControll: function() {
			BgVideo.get.playBtn.on('click tap', function(e) {
				e.preventDefault();
				$(this).toggleClass('playing');

				if ($(this).hasClass('playing')) {
					BgVideo.get.video.trigger('play');
				} else {
					BgVideo.get.video.trigger('pause');
				}
			});
		}
	};

	BgVideo.init();
});