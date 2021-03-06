var keys = {16: false, 37: false, 38: false, 39: false, 65: false, 68: false, 87: false}; // This will store the keys which are either up or down.

document.addEventListener('keyup', function(e){
	//console.log(e);
	keys[e.keyCode] = false;
	return false;
}, false);
document.addEventListener('keydown', function(e){
	keys[e.keyCode] = true;
	return false;
}, false);

for(i=0; i<config.playLevel.length; i++){
	config.playLevel[i].addEventListener('click', function(e){
		gameLoop.stop(); // stop current game.
		//console.log(e);
		level[e.target.getAttribute('data-level')].start();
	});
}