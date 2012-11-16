var timeout = null;

function gameLoop(){
	if(keys[65]){ // A
		player[0].addLeft();
	}
	if(keys[68]){ // D
		player[0].addRight();
	}
	if(keys[87]){ // W
		player[0].addJump();
	}
	
	player[0].refresh();
	
	timeout = window.setTimeout(gameLoop, 50) // ~20 frames per second.
}