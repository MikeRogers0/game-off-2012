/**
 * Define the constants 
 */

var config = {
	// First make references to the dom.
	'wrapper':document.getElementById('game-off'),
	'loadingScreen': document.getElementById('loadingScreen'),
		'loadingScreen_loadingBar': document.getElementById('loadingBar'),
		'loadingScreen_loadingStatus': document.getElementById('loadingStatus'),
	'mainScreen': document.getElementById('mainScreen'),
	'playLevel': document.querySelectorAll('.playLevel'), // The play level buttons
	
	// Now the canvases were using.
	'canvass': {'level3d':true, 'level':true, 'forks':true, 'player':true},
	'shifting_canvass': {'level3d':true, 'level':true, 'forks':true, 'player':true}, // The canvases which move with the player.
	
	// The HUD elements
	'forksRemaining': document.getElementById('forksRemaining'),
	'currentLevel': document.getElementById('currentLevel')
};

// Start the loading sequence.
config.loadingScreen_loadingStatus.innerHTML = 'Starting loading sequence';
config.loadingScreen_loadingBar.style.width = '15%';
config.loadingScreen.style.marginTop = '-1px';

/**
 * Load all the JS objects.
 */
head.js(
	'js/core/canvas.js', // Finds and sets up the canvas elements.
	'js/core/pixelCollision.js', // The pixel collision function
	'js/core/preloader.js', // The pixel collision function
	'js/core/listners.js',
	'js/core/gameLoop.js',
	function(){
		config.loadingScreen_loadingStatus.innerHTML = 'Loading canvas objects';
		config.loadingScreen_loadingBar.style.width = '25%';
		head.js(
		'js/objects/bricks.js', 
		'js/objects/player.js',
		function(){
			config.loadingScreen_loadingBar.style.width = '40%';
			head.js(
				'js/objects/fork.js', 
				'js/objects/levels.js',
				function(){
					config.loadingScreen_loadingStatus.innerHTML = 'Loading images';
					config.loadingScreen_loadingBar.style.width = '60%';
					preLoader.load(function(){
						config.loadingScreen_loadingStatus.innerHTML = 'Loading levels';
						config.loadingScreen_loadingBar.style.width = '80%';
						head.js(
							'js/levels/1.js',
							function(){
								config.loadingScreen_loadingStatus.innerHTML = 'Sweet! Lets run the main screen.';
								config.loadingScreen_loadingBar.style.width = '100%';
								config.loadingScreen.style.marginTop = '-'+config.loadingScreen.offsetHeight+'px';
							}
						);
					});
				}
			);
		}
	);
	}
);
