preLoader.addObject('fork'); // Preload the pattern.

function Fork(location, momentum, pattern){
	this.location = location ? location : {
		x: 25,
		y: 375
	};
	this.size = {
		w: 50,
		h: 50
	};
	this.momentum = momentum ? momentum : {
		x: 0,
		y: 0
	}
	this.pattern = pattern ? pattern : 'fork';
	this.ctx = ctx['forks']; // Bricks are locked to the level layer.
}

Fork.prototype.update = function(){
	// Add the momentum in

 	// Check for collison to a player
 	
 	this.ctx.drawImage(objectsImgs[this.pattern], this.location.x, this.location.y, this.size.w, this.size.h);
 	
};

function Forks(){
	this.forks = [];
	this.canvas = canvas['forks'];
	this.ctx = ctx['forks'];
}
Forks.prototype.add = function(location, momentum){
	this.forks.push(new Fork(location, momentum));
}

Forks.prototype.refresh = function(){
	this.ctx.save();
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	// loop through bullets 
	for(var i in this.forks){
		this.forks[i].update();
	}
	
	this.ctx.restore();
}