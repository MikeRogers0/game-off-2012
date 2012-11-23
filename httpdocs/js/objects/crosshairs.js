function Crosshairs(pattern, size){
	this.location = {
		x: 300,
		y: 200
	}

	this.size = {
		w: 50,
		h: 50
	}
	
	this.pattern = pattern ? pattern : 'crosshairs';
	preLoader.addPattern(pattern); // Preload the pattern.
	this.canvas = canvas['crosshairs'];
	this.ctx = ctx['crosshairs'];
}

Crosshairs.prototype.updateLocation = function(){
	
}

Crosshairs.prototype.update = function(){
	this.updateLocation();
	this.ctx.save();
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.ctx.drawImage(objectsImgs[this.pattern], this.location.x, this.location.y, this.size.w, this.size.h);
	this.ctx.restore();
}

var crosshairs = new Crosshairs();