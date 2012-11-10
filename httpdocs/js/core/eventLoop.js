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
	
	player[0].physicsMomentum();
	
	player[0].draw();
	
	timeout = window.setTimeout(gameLoop, 100) // ~10 frames per second.
}