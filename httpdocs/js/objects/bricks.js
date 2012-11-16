function Brick(location, size, pattern){
	this.location = location ? location : {
		x: 25,
		y: 375
	};
	this.size = size ? size : {
		w: 80,
		h: 90
	};
	this.pattern = pattern ? pattern : 'brick';
	this.ctx = ctx['level']; // Bricks are locked to the level layer.
	this.ctx3d = ctx['level3d'];
}

Brick.prototype.draw = function(){
 	this.ctx.fillStyle = this.ctx.createPattern(patterns[this.pattern], 'repeat');
 	this.ctx.strokeStyle = '#000';
 	this.ctx.fillRect(this.location.x, this.location.y, this.size.w, this.size.h);
 	this.ctx.strokeRect(this.location.x, this.location.y, this.size.w, this.size.h);
 	
 	this.ctx3d.fillStyle = '#d6d6d6';
 	this.ctx3d.strokeStyle = '#000';
 	this.ctx3d.fillRect(this.location.x + 10, this.location.y - 20, this.size.w, this.size.h);
 	this.ctx3d.strokeRect(this.location.x + 10, this.location.y - 20, this.size.w, this.size.h);
};