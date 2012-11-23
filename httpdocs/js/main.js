/**
 * Define the constants 
 */

var config = {
	'canvass': {'level3d':true, 'level':true, 'forks':true, /*'crosshairs':true,*/ 'player':true},
	'shifting_canvass': {'level3d':true, 'level':true, 'forks':true, 'player':true}, // The canvases which may change size.
	'wrapper':document.getElementById('game-off'),
	'fork_count': document.getElementById('forks-remaining'),
	'canvas_size':{
		w: 800,
		h: 400
	}
};

/**
 * Load all the files we need for this.
 */
head.js(
	'js/core/canvas.js', // Finds and sets up the canvas elements.
	'js/objects/preloader.js', // Loads the images used in the game
	'js/objects/keyListners.js', 
	'js/objects/bricks.js', 
	'js/objects/player.js', 
	'js/objects/fork.js', 
	'js/objects/levels.js', 
	'js/core/eventLoop.js', 
	'js/core/startGame.js', // Contains the function which starts the game once everything is ready.
	function(){
		levels[0] = new Levels(1);
		preLoader.load();
	}
);

