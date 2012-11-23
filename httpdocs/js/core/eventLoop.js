var timeout = null;

function gameLoop(){
	if(keys[65] || keys[37]){ // A || Left
		player[0].addLeft();
	}
	if(keys[68] || keys[39]){ // D || Right
		player[0].addRight();
	}
	if(keys[87] || keys[38]){ // W || Up
		player[0].addJump();
	}
	if(keys[69] || keys[16]){ // E || Shift
		player[0].addFork();
	}
	
	player[0].refresh();
	
	timeout = window.setTimeout(gameLoop, 50) // ~20 frames per second.
}