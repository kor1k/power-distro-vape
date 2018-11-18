/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'velocity', 'inView'], function($){
	"use strict";

	var s = {
		$prod: $('.prod-item'),
		$team: $('.about-team'),
		$news: $('.js-news-item'),
		$stats: $('.stats-item'),
		$footer: $('.logo-block'),
		$why: $('.why-us-item')
	};

	var Reveal = {

		init: function () {
			// Prepare for reveal
			$.each(s, function() {
				this.css('opacity', '0');
			});

			this.bindUiActions();
		},

		bindUiActions: function () {
			this.revealProducts();
			this.revealTeam();
			this.revealNews();
			this.revealList();
			this.revealFooter();
			this.revealWhy();
		},

		revealWhy: function () {
			s.$why.one('inview', function(){
				$('.left-info-block').find(s.$why).velocity('transition.slideLeftBigIn', {stagger: 200, delay: 100, duration: 1000});
				$('.right-info-block').find(s.$why).velocity('transition.slideRightBigIn', {stagger: 200, delay: 100, duration: 1000});
			});
		},

		revealFooter: function () {
			s.$footer.each(function(index) {
				$(this).one('inview', function () {
					$(this).velocity({
						opacity: '1',
						translateY: ['0', '30px']
					}, {duration: 1000, delay: index * 100});
				});
			});
		},

		revealList: function () {
			$('.stats-in-number').one('inview', function(){
				s.$stats.velocity('transition.bounceIn', {stagger: 100, delay: 100});
			});
		},

		revealVideo: function () {
			s.$video.each(function() {
				$(this).one('inview', function () {
					$(this).velocity({
						opacity: '1',
						scale: ['1', '1.2']
					}, {duration: 1000});
				});
			});
		},

		revealNews: function () {
			s.$news.each(function(index) {
				$(this).one('inview', function () {
					$(this).velocity({
						opacity: '1',
						translateY: ['0', '50px']
					}, {duration: 1000, delay: index * 150});
				});
			});
		},

		revealTeam: function () {
			s.$team.each(function(index) {
				$(this).one('inview', function () {
					$(this).velocity({
						opacity: '1',
						translateY: ['0', '50px']
					}, {duration: 1000, delay: index * 150});
				});
			});
		},

		revealProducts: function () {
			s.$prod.each(function(index) {
				$(this).one('inview', function () {
					$(this).velocity({
						opacity: '1',
						translateY: ['0', '50px']
					}, {duration: 1000, delay: index * 150});
				});
			});
		}
	};

	$(window).on('Reveal', function() {
		Reveal.init();
	});
});