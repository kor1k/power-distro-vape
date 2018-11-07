requirejs.config({
  waitSeconds: 0,
   paths: {
      'jquery': 'lib/jquery-2.1.1.min',
      'velocity': 'lib/velocity.min',
      'velocityUi': 'lib/velocity.ui',
      'waitImg': 'lib/jquery.waitforimages.min',
      'SmoothScroll': 'lib/SmoothScroll'
   },

   shim: {
      'velocity': ['jquery'],
      'velocityUi': ['jquery'],
      'waitImg': ['jquery'],
      'SmoothScroll': ['jquery']
   }
});

require([
  'wl/initWl'
],
function(IFS){
  'use strict';
  IFS.initialize();
});
