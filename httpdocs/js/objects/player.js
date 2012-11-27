preLoader.addObject('normal-left'); // Preload the pattern.
preLoader.addObject('normal-right');

function Player(location){
	this.location = location ? {
		x: location.x *1,
		y: location.y * 1
	} : {
		x: 25,
		y: 220
	};
	this.size = {
		w: 24,
		h: 46
	};
	this.state = 'normal-left';
	
	this.ctx = ctx['player'];
	this.canvas = canvas['player'];
	
	// Account for gravity & stuff
	this.momentum = {
		x: 0,
		y: 0
	}
	this.addMomentum = {
		x: 5,
		xAir: 1.5,
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
	
	// The fork stuff
	this.forks = new Forks();
	this.updateForkCount();
}

/**
 * When a user presses left/right/jump buttons account for it.
 */
Player.prototype.addLeft = function(){
	if(this.momentum.x >= (this.maxMomentum.x * -1)){
		if(this.momentum.y <= (this.maxMomentum.y / 2)){
			this.momentum.x -= this.addMomentum.xAir;
		}
		if(this.touching.ground){
			this.momentum.x -= this.addMomentum.x;
			
		}
	}
}
Player.prototype.addRight = function(){
	if(this.momentum.x <= (this.maxMomentum.x)){
		if(this.momentum.y <= (this.maxMomentum.y / 2)){
			this.momentum.x += this.addMomentum.xAir;
		}
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

Player.prototype.addFork = function(){
	if(this.forks.count() >= 100){
		return;
	}
	
	sendingMomentum = {x:this.momentum.x, y:this.momentum.y};
	
	if(this.state == 'normal-left'){
		sendingMomentum.x = 2;
	} else {
		sendingMomentum.x = -2;
	}
	
	this.forks.add({
		x: this.location.x+ (this.size.w * 0.25),
		y: (this.location.y + (this.size.h * 0.25))
	}, sendingMomentum);
	this.updateForkCount();
}

Player.prototype.updateForkCount = function(){
	config.forksRemaining.innerHTML = (100 - this.forks.count());
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
	imgData = ctx['level'].getImageData((this.location.x), (this.location.y + this.size.h + 3), this.size.w, this.momentum.y);
	
	pixelCollisionN = pixelCollision(imgData.data);
	
	if(pixelCollisionN === false){
		return;
	}
	
	pixelCollisionN = parseInt(pixelCollisionN / this.size.w);
	
	this.momentum.y = 0;
	if(pixelCollisionN >= 2){
		this.momentum.y = pixelCollisionN;
	}
	this.touching.ground = true;
	//this.momentum.y = (pixelCollision * -1);
}

Player.prototype.collisionAbove = function(){

	if(this.momentum.y >= 0){
		return;
	}
	
	// Check if we going to collide in the next move
	imgData = ctx['level'].getImageData((this.location.x + (this.size.w / 2)), (this.location.y - 1), this.size.w, (this.momentum.y));
	
	pixelCollisionN = pixelCollision(imgData.data, true);
	
	if(pixelCollisionN === false){
		return;
	}
	
	pixelCollisionN = parseInt(pixelCollisionN / this.size.w); // Gives us the pixles above of free space.
	
	this.momentum.y = 0;
	if(pixelCollisionN >= 2){
		this.momentum.y = pixelCollisionN * -1;
		return;
	}
	//this.momentum.y = (pixelCollision);
}

Player.prototype.collisionLeft = function(){
	if(this.momentum.x >= 0){
		return;
	}
	imgData = ctx['level'].getImageData((this.location.x + this.momentum.x), (this.location.y + (this.size.h - 1)), (this.momentum.x * -1), 1);
	
	if(pixelCollision(imgData.data) === false){
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
	
	if(pixelCollision(imgData.data) === false){
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
		for(i in config.shifting_canvass){
			canvas[i].style.marginLeft = '-'+(this.location.x - 400)+'px';
		}
	}
	if(this.location.y > 200 && this.location.y < (this.canvas.height - 200)){
		for(i in config.shifting_canvass){
			canvas[i].style.marginTop = '-'+(this.location.y - 200)+'px';
		}
	}
} 

Player.prototype.updateState = function(){
	if(this.momentum.x > 0){
		this.state = 'normal-left';
	}else if(this.momentum.x < 0){
		this.state = 'normal-right';
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
	// Move the forks around.
	this.forks.refresh();

	//debugger;
	this.addDrag();
	//console.log('With Drag', this.momentum);
	this.checkCollision();
	//console.log('After Collisions', this.momentum);
	
	this.updateState();
	this.draw();
	this.moveCanvas();
}

var player = null;