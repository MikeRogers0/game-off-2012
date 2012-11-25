function gameLoop(){
	this.timeout = null;
}

gameLoop.prototype.stop = function(){
	clearTimeout(this.timeout);
}

gameLoop.prototype.run = function(){
	this.timeout = null;
	
	if(keys[65] || keys[37]){ // A || Left
		player.addLeft();
	}
	if(keys[68] || keys[39]){ // D || Right
		player.addRight();
	}
	if(keys[87] || keys[38]){ // W || Up
		player.addJump();
	}
	if(keys[69] || keys[16]){ // E || Shift
		keys[69] = false; // stop them holding it
		keys[16] = false;
		player.addFork();
	}
	
	player.refresh();
	
	this.timeout = window.setTimeout(function(){gameLoop.run()}, 50) // ~20 frames per second.
}

var gameLoop = new gameLoop();