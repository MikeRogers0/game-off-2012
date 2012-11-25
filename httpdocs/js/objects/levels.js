function Level(id){
	this.id = id;
	this.bricks = [];
}

Level.prototype.build = function(){
	// Make the canvas the correct size.
	for(i in config.canvass){
		canvas[i].style.width = '1600px';
		canvas[i].style.height = '400px';
		canvas[i].width = 1600;
		canvas[i].height = 400;
		
		canvas[i].style.marginLeft = '0px';
		canvas[i].style.marginTop = '0px';
	}
	
	// Add in the bricks.
	for(i in this.bricks){
		this.bricks[i].draw();
	}
	
	
}

Level.prototype.start = function() {
	// Clear the current canvas stuff
	for(i in config.canvass){
		ctx[i].clearRect(0, 0, canvas[i].width, canvas[i].height);
	}
	
	// draw the level
	this.build();
	
	// Pop the player in.
	player = new Player;
	player.draw();
	
	config.loadingScreen.style.marginTop = '-'+(config.loadingScreen.offsetHeight * 2)+'px';;
	gameLoop.run();
}

var level = [];