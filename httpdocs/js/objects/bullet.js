function Bullet(location, pattern){
	this.location = location ? location : {
		x: 25,
		y: 375
	};
	this.size = {
		w: 5,
		h: 5
	};
	this.momentum = {
		x: 0,
		y: 0
	}
	this.pattern = pattern ? pattern : 'fork';
	this.ctx = ctx['bullet']; // Bricks are locked to the level layer.
}

Bullet.prototype.update = function(){
	// Add the momentum in

 	// Check for collison to a player
 	
 	this.ctx.drawImage(objectsImgs[this.state], this.location.x, this.location.y, this.size.w, this.size.h);
 	
};

function Bullets(){
	this.bullets = [];
	this.ctx = ctx['bullet'];
}
Bullets.prototype.add = function(location, momentum){
	
}

Bullets.prototype.update = function(){
	this.ctx.save();
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	// loop through bullets 
	
	this.ctx.restore();
}