require(['jquery','game/Game', 'system/Canvas'], function ($, Game, Canvas) {

	$(document).ready(function(){

		var requestAnimationFrame = (function () {
			return  window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
		})();

	canvas = new Canvas('canvas', 'gameArea');
  	game = new Game();

	});

});
