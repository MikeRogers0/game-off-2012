function Level(id, size, playerStart){
	this.id = id;
	this.bricks = [];
	this.water = [];
	this.stuff = [];
	this.text = [];
	
	this.size = size ? size : {w: 1600, h: 400};
	this.playerStart = playerStart ? playerStart : {x: 25, y: 200};
}

Level.prototype.resizeCanvas = function(){
	// Make the canvas the correct size.
	for(i in config.canvass){
		canvas[i].style.width = this.size.w+'px';
		canvas[i].style.height = this.size.h+'px';
		canvas[i].width = this.size.w;
		canvas[i].height = this.size.h;
		
		canvas[i].style.marginLeft = '0px';
		canvas[i].style.marginTop = '0px';
	}
}

Level.prototype.build = function(){
	this.resizeCanvas();
	
	// Add in the bricks.
	for(i in this.bricks){
		this.bricks[i].draw();
	}
	
	// Add in the scaryStuff.
	for(i in this.stuff){
		this.stuff[i].draw();
	}
	
	// Add in the scaryStuff.
	for(i in this.water){
		this.water[i].draw();
	}
	
	// Add in the scaryStuff.
	for(i in this.text){
		this.text[i].draw();
	}
	
}

Level.prototype.start = function() {
	// Clear the current canvas stuff
	for(i in config.canvass){
		ctx[i].clearRect(0, 0, canvas[i].width, canvas[i].height);
	}	
	this.resizeCanvas();
	
	// draw the level
	this.build();
	
	// Pop the player in.
	player = new Player(this.playerStart);
	player.draw();
	
	config.loadingScreen.style.marginTop = '-'+(config.loadingScreen.offsetHeight * 2)+'px';
	gameLoop.run();
}

var level = [];