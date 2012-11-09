var events = document.createEvent('Event');
events.initEvent('keyLeft', true, true);

function Player(location){
	this.location = location ? location : {
		x: 25,
		y: 220
	};
	this.size = {
		w: 40,
		h: 50
	};
	/*this.momentum = {
		x: 0,
		y: 0
	};*/
	this.state = 'normal';
	this.ctx = ctx['player'];
	this.canvas = canvas['player'];
	
	// Account for gravity & stuff
	this.momentum = {
		x: 0,
		y: 0,
		z: 0
	}
}

Player.prototype.isOverlapping = function (){
	var imgData = ctx['level'].getImageData(10, 10, 1, 1);
}

Player.prototype.pixelCollision = function pixelCollision(pix){
	for (var i = 0; n = pix.length, i < n; i += 4) {
		if (pix[i] != 0) {
			return true;
		}
	}
	return false;
}

Player.prototype.isTouchingGround = function(){
	imgData = ctx['level'].getImageData((this.location.x + (this.size.w / 2)), (this.location.y + this.size.h), this.size.w, 1);
	return this.pixelCollision(imgData.data);	
}

Player.prototype.isTouchingLeft = function(){
	imgData = ctx['level'].getImageData((this.location.x - 1), (this.location.y), 1, this.size.h);
	return this.pixelCollision(imgData.data);	
}

Player.prototype.isTouchingRight = function(){
	imgData = ctx['level'].getImageData((this.location.x + this.size.w), (this.location.y), 1, this.size.h);
	return this.pixelCollision(imgData.data);	
}


Player.prototype.addLeft = function(){
	// Check if the move would collide us with anything
	if(this.isTouchingGround() && this.momentum.x >= -20){
		this.momentum.x -= 5;
	}
}
Player.prototype.addRight = function(){
	if(this.isTouchingGround() && this.momentum.x <= 20){
		this.momentum.x += 5;
	}
}
Player.prototype.addjump = function(){
	if(this.isTouchingGround()){
		this.momentum.y = this.size.h * 0.5;
	}
}

Player.prototype.gravityMomentum = function(){
	touchingGround = this.isTouchingGround();
	//debugger;
	// Figure out if were touching the ground or not.
	if(!touchingGround){
		if(this.momentum.y > -15){ // Accelerate down
			this.momentum.y -= 5;
		}
	}else if(touchingGround && this.momentum.y < 0){
		this.momentum.y = 0;
	}
	
	this.location.y -= this.momentum.y;
}

Player.prototype.leftRightMomentum = function(){
	//debugger;
	if(this.isTouchingLeft() && this.momentum.x < 0){
		this.momentum.x = 0;
	}
	if(this.isTouchingRight() && this.momentum.x > 0){
		this.momentum.x = 0;
	}
	this.location.x += this.momentum.x;
}

Player.prototype.physicsMomentum = function(){
	this.gravityMomentum();
	this.leftRightMomentum();
}


Player.prototype.draw = function(){
	this.ctx.save();
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
 	this.ctx.drawImage(playerImgs[this.state], this.location.x, this.location.y, this.size.w, this.size.h);
 	this.ctx.restore();
};