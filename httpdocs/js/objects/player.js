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
	this.state = 'normal';
	this.ctx = ctx['player'];
	this.canvas = canvas['player'];
	
	// Account for gravity & stuff
	this.momentum = {
		x: 0,
		y: 0
	}
	this.addMomentum = {
		x: 5,
		xAir: 1,
		y: 15
	}
	this.maxMomentum = {
		x: 10,
		y: 15
	}
	this.dragMomentum = {
		x: -1,
		xGround: -1, // When the user is touching the ground, add a bit more.
		y: 1 // Gravity.
	}
	
	this.touching = {
		ground: false
	};
}

/**
 * When a user presses left/right/jump buttons account for it.
 */
Player.prototype.addLeft = function(){
	if(this.momentum.x >= (this.maxMomentum.x * -1)){
		this.momentum.x -= this.addMomentum.xAir;
		if(this.touching.ground){
			this.momentum.x -= this.addMomentum.x;
			
		}
	}
}
Player.prototype.addRight = function(){
	if(this.momentum.x <= (this.maxMomentum.x)){
		this.momentum.x += this.addMomentum.xAir;
		if(this.touching.ground){
			this.momentum.x += this.addMomentum.x;
			
		}
	}
}
Player.prototype.addJump = function(){
	if(this.momentum.y <= (this.maxMomentum.y) && this.touching.ground){
		this.touching.ground = false;
		this.momentum.y -= this.addMomentum.y;
	}
}

/**
 * Add in gravity & wind resistance to the momentum.
 */
Player.prototype.addDrag = function(){
	// Moving Right.
	if(this.momentum.x > 0){
		this.momentum.x += this.dragMomentum.x;
		if(this.touching.ground){
			this.momentum.x += this.dragMomentum.xGround;
		}
		if(this.momentum.x < 0){ // If they are now going the other way
			this.momentum.x = 0;
		}
	}
	// Moving left.
	if(this.momentum.x < 0){
		this.momentum.x -= this.dragMomentum.x;
		if(this.touching.ground){
			this.momentum.x -= this.dragMomentum.xGround;
		}
		if(this.momentum.x > 0){
			this.momentum.x = 0;
		}
	}
	
	// Gravity.
	this.momentum.y += this.dragMomentum.y;
}

/**
 * Checks if a collision with a level object occoured, if it does it reduces the momentum to stop it.
 */
Player.prototype.checkCollision = function(){
	// Check around the player on the level.
	this.groundCollision(); 
	this.collisionAbove();
	this.collisionLeft();
	this.collisionRight();
	
	// Check if the user is going outside the canvas
	this.boundaryCollision();
}

/**
 * Does the pixel check for me.
 */
Player.prototype.pixelCollision = function pixelCollision(pix){
	for (var i = 0; n = pix.length, i < n; i += 4) {
		if (pix[i] != 0) {
			return (i / 4); // Returns the amount of pixels we are away.
			//return true; 
		}
	}
	return false;
}

Player.prototype.boundaryCollision = function(){
	xLocation = (this.location.x + this.momentum.x);
	yLocation = (this.location.y + this.momentum.y);
	
	// Check user going left / right.
	if(xLocation <= 1){
		this.momentum.x = 2;
	}
	if(xLocation >= (this.canvas.width - this.size.w)){
		this.momentum.x = -2;
	}
	
	// Now up and down
	if(yLocation <= 1){
		this.momentum.y = 2;
	}
	if(yLocation >= (this.canvas.height - this.size.h)){
		this.momentum.y = -2;
	}
}

Player.prototype.groundCollision = function(){
	this.touching.ground = false;
	
	if(this.momentum.y <= 0){
		return;
	}
	
	// Check if we going to collide in the next move
	imgData = ctx['level'].getImageData((this.location.x), (this.location.y + this.size.h + 5), this.size.w, this.momentum.y);
	
	pixelCollision = this.pixelCollision(imgData.data);
	if(pixelCollision === false){
		return;
	}
	
	this.touching.ground = true;
	this.momentum.y = 0;
	//this.momentum.y = (pixelCollision * -1);
}

Player.prototype.collisionAbove = function(){

	if(this.momentum.y >= 0){
		return;
	}
	
	// Check if we going to collide in the next move
	imgData = ctx['level'].getImageData((this.location.x + (this.size.w / 2)), (this.location.y), this.size.w, (this.momentum.y));
	
	pixelCollision = this.pixelCollision(imgData.data);
	if(pixelCollision === false){
		return;
	}
	
	this.momentum.y = 0;
	//this.momentum.y = (pixelCollision);
}

Player.prototype.collisionLeft = function(){
	if(this.momentum.x >= 0){
		return;
	}
	imgData = ctx['level'].getImageData((this.location.x + this.momentum.x), (this.location.y + (this.size.h - 1)), (this.momentum.x * -1), 1);
	pixelCollision = this.pixelCollision(imgData.data);
	if(pixelCollision === false){
		return;
	}
	
	this.touching.left = true;
	this.momentum.x = 0;
	//this.momentum.x = (pixelCollision * -1);
}

Player.prototype.collisionRight = function(){
	if(this.momentum.x <= 0){
		return;
	}
	imgData = ctx['level'].getImageData((this.location.x + this.size.w), (this.location.y + (this.size.h -1)), (this.momentum.x), 1);
	pixelCollision = this.pixelCollision(imgData.data);
	if(pixelCollision === false){
		return;
	}
	this.touching.right = true;
	this.momentum.x = 0
	//this.momentum.x = (pixelCollision);
}

Player.prototype.moveCanvas = function(){
	// Move them on x axis.
	// If they are in moveable zones.
	if(this.location.x > 400 && this.location.x < (this.canvas.width - 400)){
		for(i in {'level3d':true, 'level':true, 'bullets':true, 'player':true}){
			canvas[i].style.marginLeft = '-'+(this.location.x - 400)+'px';
		}
	}
	if(this.location.y > 200 && this.location.y < (this.canvas.height - 200)){
		for(i in {'level3d':true, 'level':true, 'bullets':true, 'player':true}){
			canvas[i].style.marginTop = '-'+(this.location.y - 200)+'px';
		}
	}
} 

Player.prototype.draw = function(){
	// Update player location
	this.location.x += this.momentum.x;
	this.location.y += this.momentum.y;

	this.ctx.save();
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
 	this.ctx.drawImage(objectsImgs[this.state], this.location.x, this.location.y, this.size.w, this.size.h);
 	this.ctx.restore();
};

Player.prototype.refresh = function(){
	//debugger;
	this.addDrag();
	//console.log('With Drag', this.momentum);
	this.checkCollision();
	//console.log('After Collisions', this.momentum);
	this.draw();
	this.moveCanvas();
}