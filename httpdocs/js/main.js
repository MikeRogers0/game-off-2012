/**
 * Load all the files we need for this.
 */
head.js('js/canvas/canvas.js', // Finds and sets up the canvas elements.
	'js/objects/images.js', // Loads the patterns used in the game
	'js/objects/bricks.js',  // Loads the bricks objects
	'js/objects/player.js',  // Loads the bricks objects
	function(){
		head.js('js/levels/level1.js'); // Build level 1
	}
);