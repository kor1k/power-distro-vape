define([
	'components/semanticBinds',
	'components/basicBinds'
], function(Semantic, Basic){
	'use strict';

	var initialize = function(){
		Semantic.init();
		Basic.init();
	};

	return {
		initialize: initialize
	}
});