preLoader.addObject('fork'); // Preload the pattern.

function Fork(location, momentum, pattern){
	this.location = location ? {
		x: location.x + 1,
		y: location.y + 1
	} : {
		x: 25,
		y: 375
	};
	
	
	
	this.size = {
		w: 40,
		h: 5
	};
	this.momentum = momentum ? {
		x: momentum.x + 1,
		y: momentum.y + 1
	} : {
		x: 0,
		y: 0
	}
	this.pattern = pattern ? pattern : 'fork';
	this.ctx = ctx['forks']; // Bricks are locked to the level layer.
	
	// Update the momentum to make it feel sexy.
	this.momentum.y = 3; // We will reset for gravity later.
	if(this.momentum.x < 0){ // It's moving left
		this.momentum.x = -20;
	} else {
		this.momentum.x = 20;
	}
}

Fork.prototype.collisionLeft = function(){
	if(this.momentum.x >= 0){
		return;
	}
	imgData = ctx['level'].getImageData((this.location.x + this.momentum.x), (this.location.y + (this.size.h - 1)), (this.momentum.x * -1), 1);
	
	pixelCollisionN = pixelCollision(imgData.data);
	
	if(pixelCollisionN === false){
		return;
	}
	
	this.momentum.x = 0
	if(pixelCollisionN >= 2){
		this.momentum.x = -pixelCollisionN;
	}
	this.momentum.y = 0;
	//this.momentum.x = (pixelCollision * -1);
}

Fork.prototype.collisionRight = function(){
	if(this.momentum.x <= 0){
		return;
	}
	imgData = ctx['level'].getImageData((this.location.x + this.size.w), (this.location.y + (this.size.h -1)), (this.momentum.x), 1);
	
	pixelCollisionN = pixelCollision(imgData.data);
	
	if(pixelCollisionN === false){
		return;
	}
	
	this.momentum.x = 0;
	if(pixelCollisionN >= 2){
		this.momentum.x = pixelCollisionN;
	}
	this.momentum.y = 0;
	//this.momentum.x = (pixelCollision);
}

Fork.prototype.collisionGround = function(){
	if(this.momentum.y >= 1){
		imgData = ctx['level'].getImageData((this.location.x), (this.location.y + this.size.h), this.size.w, this.momentum.y);
	
		pixelCollisionN = pixelCollision(imgData.data);
		
		if(pixelCollisionN === false){
			if(this.momentum.y == 0){
				this.momentum.y = 2;
			}
			return;
		}
	}
	
	
	this.momentum.y = 0;
	
	if(this.momentum.x <= 2 && this.momentum.x >= -2){
		this.momentum.x = 0;
	} else {
		this.momentum.x = this.momentum.x / 1.5;
	}
	//this.momentum.x = (pixelCollision);
}

Fork.prototype.update = function(){
	// Check for colission.
	this.collisionLeft();
	this.collisionRight();
	this.collisionGround();

	// Add the momentum in
	this.location.x += this.momentum.x;
	this.location.y += this.momentum.y;
	
 	// Check for collison to a player
 	this.draw();
 	
};
Fork.prototype.draw = function(ctx){
	if(ctx){
		this.ctx = ctx;
	}
	this.ctx.drawImage(objectsImgs[this.pattern], this.location.x, this.location.y, this.size.w, this.size.h);
}


function Forks(){
	this.forks = [];
	this.canvas = canvas['forks'];
	this.ctx = ctx['forks'];
}
Forks.prototype.add = function(location, momentum){
	this.forks.push(new Fork(location, momentum));
}

Forks.prototype.count = function(){
	return this.forks.length;
}

Forks.prototype.refresh = function(){
	this.ctx.save();
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	// loop through bullets 
	for(var i in this.forks){
		this.forks[i].update();
		
		if(this.forks[i].momentum.x == 0 && this.forks[i].momentum.y == 0 ){ // It's not moving.
			// Draw it on the collision & level canvas.
			this.forks[i].draw(ctx['level']);
			
			delete this.forks[i];
		}
	}
	
	this.ctx.restore();
}