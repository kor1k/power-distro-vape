/* jshint undef: true, unused: true */
/* global define: false */
define(['domReady', 'underscore', 'jquery', 'components/reveal', 'velocity', 'velocityUi', 'waitImg'], function(domReady, _, $, Reveal) {
	'use strict';

	var Preloader = {
		get: {
			container: $('.preloader-container'),
			imgBox: $('.img-box'),
			image: $('.preloader-block img')
		},

		init: function() {
			this.bindUiActions();
		},

		bindUiActions: function() {
			if ($('.color-wave').length) {
			    Preloader.createCanvasPreloader();
			}

			domReady(function() {
				$('html, body').stop().animate({
				    'scrollTop': 0
				});

				Preloader.closePreloader();
			});

			Preloader.get.container.waitForImages(function() {
			    Preloader.prepareElementsForEnter();
			});
		},

		closePreloader: function() {
			$(window).trigger('Reveal');

			$('.js-video-bg').trigger('play');
			Preloader.get.container.parent().velocity({
				translateX: '100%'
			}, 700, function() {
				$('.preloader-block').remove();
				Preloader.enterElements();
			});
		},

		prepareElementsForEnter: function() {
			$('.menu-item').css('opacity', '0');
			$('.js-slidedown-reveal').css('opacity', '0');
		},

		enterElements: function() {
			setTimeout(function() {
				$('.js-slidedown-reveal').velocity('transition.slideDownIn', {duration: 1000, stagger: 1000});
			}, 1000);

			$('.menu-item').velocity('transition.slideDownBigIn', {duration: 500, stagger: 150});
		},

		createCanvasPreloader: function() {

			var c = document.getElementById('page-preloader'),
			    ctx = c.getContext('2d'),
			    cw = c.width = Preloader.get.image.outerWidth(),
			    ch = c.height = Preloader.get.image.outerHeight() * 2,
			    points = [],
			    tick = 0,
			    opt = {
				count: 5,
				range: {
					x: 20,
					y: 10
				},
				duration: {
					min: 20,
					max: 40
				},
				thickness: 0,
				strokeColor: '#444',
				level: .8,
				curved: true
			    },
			    rand = function(min, max){ 
			        return Math.floor( (Math.random() * (max - min + 1) ) + min);
			    },
			    ease = function (t, b, c, d) {
				    if ((t/=d/2) < 1) return c/2*t*t + b;
				    return -c/2 * ((--t)*(t-2) - 1) + b;
			    };

			Preloader.get.image.width(cw + 2).height(ch / 2);
			$('.color-wave').width(cw).height((ch / 2));


			ctx.lineJoin = 'round';
			ctx.lineWidth = opt.thickness;
			ctx.strokeStyle = opt.strokeColor;


			var Point = function(config){
				this.anchorX = config.x;
				this.anchorY = config.y;
				this.x = config.x;
				this.y = config.y;
				this.setTarget();  
			};

			Point.prototype.setTarget = function(){
				this.initialX = this.x;
				this.initialY = this.y;
				this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
				this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
				this.tick = 0;
				this.duration = rand(opt.duration.min, opt.duration.max);
			}
			  
			Point.prototype.update = function(){

				var dx = this.targetX - this.x;
				var dy = this.targetY - this.y;
				var dist = Math.sqrt(dx * dx + dy * dy);
			  
				if(Math.abs(dist) <= 0){
					this.setTarget();
				} else {       
					var t = this.tick;
					var b = this.initialY;
					var c = this.targetY - this.initialY;
					var d = this.duration;
					this.y = ease(t, b, c, d);

					b = this.initialX;
					c = this.targetX - this.initialX;
					d = this.duration;
					this.x = ease(t, b, c, d);

					this.tick++;
				}
			};
			    
			Point.prototype.render = function(){
			  ctx.beginPath();
			  ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
			  ctx.fillStyle = '#000';
			  ctx.fill();
			};

			var updatePoints = function(){
				var i = points.length;
				while(i--){
					points[i].update();
				}
			};

			var renderPoints = function(){
			  var i = points.length;
			  while(i--){
			    points[i].render();
			  }
			};

			var renderShape = function(){
			  ctx.beginPath();
			  var pointCount = points.length;
			  ctx.moveTo(points[0].x, points[0].y);	 
			  var i;
			  for (i = 0; i < pointCount - 1; i++) {
			    var c = (points[i].x + points[i + 1].x) / 2;
			    var d = (points[i].y + points[i + 1].y) / 2;
			    ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
			  }
			  ctx.lineTo(-opt.range.x - opt.thickness, ch + opt.thickness);
			  ctx.lineTo(cw + opt.range.x + opt.thickness, ch + opt.thickness);
			  ctx.closePath();   
			  ctx.fillStyle = 'hsl('+(tick/2)+', 70%, 60%)';
			  ctx.fill();
			};

			var clear = function(){
			  ctx.clearRect(0, 0, cw, ch);
			};

			var loop = function(){
				window.requestAnimFrame(loop, c);
				tick++;
				clear();
				updatePoints();
				renderShape();
				// renderPoints();
			};

			var i = opt.count + 2;
			var spacing = (cw + (opt.range.x * 2)) / (opt.count-1);
			while(i--){
			  points.push(new Point({
			    x: (spacing * (i - 1)) - opt.range.x,
			    y: ch - (ch * opt.level)
			  }));
			}

			window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

			loop();
			$(c).addClass('active');
		}
	};

	Preloader.init();
});