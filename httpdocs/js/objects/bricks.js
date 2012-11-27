preLoader.addPattern('brick'); // Preload the patterns.
preLoader.addPattern('grass');

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
 	//this.ctx.strokeRect(this.location.x, this.location.y, this.size.w, this.size.h);
 	
 	// Add the 3d bit in.
 	this.ctx3d.fillStyle = this.ctx.createPattern(patterns['grass'], 'repeat');
 	this.ctx3d.strokeStyle = '#1B5C07';
 	this.ctx3d.beginPath();
 	
	this.ctx3d.moveTo(this.location.x ,this.location.y);
	this.ctx3d.lineTo(this.location.x + 10,this.location.y - 20); // /
	this.ctx3d.lineTo(this.location.x + this.size.w + 10,this.location.y - 20); // _
	this.ctx3d.lineTo(this.location.x + this.size.w,this.location.y); // /
	
	this.ctx3d.moveTo(this.location.x + this.size.w + 10,this.location.y - 19);
	this.ctx3d.lineTo(this.location.x + this.size.w + 10,this.location.y  + this.size.h - 20);
	this.ctx3d.lineTo(this.location.x + this.size.w,this.location.y  + this.size.h);
	this.ctx3d.lineTo(this.location.x + this.size.w,this.location.y + 1);
	
	this.ctx3d.stroke();
	this.ctx3d.fill();
 	//this.ctx3d.fillRect(this.location.x + 10, this.location.y - 20, this.size.w, this.size.h);
 	//this.ctx3d.strokeRect(this.location.x + 10, this.location.y - 20, this.size.w, this.size.h);
};