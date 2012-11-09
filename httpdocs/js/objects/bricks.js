function Brick(location, size, pattern){
	this.location = location ? location : {
		x: 25,
		y: 375
	}
	this.size = size ? size : {
		w: 80,
		h: 90
	}
	this.pattern = pattern ? pattern : 'brick';
	this.ctx = ctx['level']; // Bricks are locked to the level layer.
	
}

Brick.prototype.draw = function(){
 	this.ctx.fillStyle = this.ctx.createPattern(patterns[this.pattern], 'repeat');
 	this.ctx.fillRect(this.location.x, this.location.y, this.size.w, this.size.h);
 	this.ctx.stroke();
};