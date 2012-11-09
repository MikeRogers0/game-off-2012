/**
 * Load all the files we need for this.
 */
head.js(
	'js/core/canvas.js', // Finds and sets up the canvas elements.
	'js/objects/preloader.js', // Loads the images used in the game
	'js/objects/bricks.js', 
	'js/objects/player.js', 
	'js/objects/keyListners.js', 
	'js/objects/levels.js', 
	'js/core/eventLoop.js', 
	'js/core/startGame.js', // Contains the function which starts the game once everything is ready.
	function(){
		levels[0] = new Levels(1);
		preLoader.load();
	}
);

