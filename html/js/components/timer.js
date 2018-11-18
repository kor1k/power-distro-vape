/* jshint undef: true, unused: true */
/* global define: false */
define(['jquery', 'underscore', 'circleTimer'], function($, _) {
	'use strict';

	var s = {
		timer: $('.countdown-block'),
		color: $('.theme-bg-c').css('background-color').replace(/,|rgb|\(|\)/g, '').split(' '),
		timeColor: null
	};

	var Timer = {
		init: function() {
			this.getThemeColor()
			this.initTimer();
		},

		getThemeColor: function () {
			function componentToHex(c) {
			    var hex = c.toString(16);
			    return hex.length == 1 ? "0" + hex : hex;
			}

			function rgbToHex(r, g, b) {
			    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
			}

			s.timeColor = rgbToHex(parseInt(s.color[0]), parseInt(s.color[1]), parseInt(s.color[2]));
		},

		initTimer: function() {

			s.timer.TimeCircles({
				"animation": "smooth",
			    "bg_width": 0.7,
		        "fg_width": 0.013333333333333334,
			    "circle_bg_color": "#dbdbdb",
			    "time": {
			        "Days": {
			            "text": "Days",
			            "color": s.timeColor,
			            "show": true
			        },
			        "Hours": {
			            "text": "Hours",
			            "color": s.timeColor,
			            "show": true
			        },
			        "Minutes": {
			            "text": "Minutes",
			            "color": s.timeColor,
			            "show": true
			        },
			        "Seconds": {
			            "text": "Seconds",
			            "color": s.timeColor,
			            "show": true
			        }
			    }
			});
			$(window).resize(_.debounce(function(){
				s.timer.TimeCircles().rebuild();
			},500));

		}
	};

	Timer.init();
});