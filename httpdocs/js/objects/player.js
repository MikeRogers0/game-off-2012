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
		y: 0
	}
	
	this.touching = {
		ground: false,
		left: false,
		right: false
	};
}

Player.prototype.isOverlapping = function (){
	var imgData = ctx['level'].getImageData(10, 10, 1, 1);
}

Player.prototype.pixelCollision = function pixelCollision(pix){
	for (var i = 0; n = pix.length, i < n; i += 4) {
		if (pix[i] != 0) {
			return i;
			return true; // Returns the amount of pixels we are away.
		}
	}
	return false;
}

Player.prototype.addLeft = function(){
	// Check if the move would collide us with anything
	if(this.momentum.x >= -20){
		this.momentum.x -= 2;
		if(this.touching.ground){
			this.momentum.x -= 7;
		}
	}
}
Player.prototype.addRight = function(){
	if(this.momentum.x <= 20){
		this.momentum.x += 2;
		if(this.touching.ground){
			this.momentum.x += 7;
		}
	}
}
Player.prototype.addJump = function(){
	if(this.momentum.y <= (this.size.h * 0.5) && this.touching.ground){
		this.touching.ground = false;
		this.momentum.y = this.size.h * 0.6;
	}
}

Player.prototype.collisionBelow = function(){
	this.touching.ground = false;
	
	// Check if we going to collide in the next move
	imgData = ctx['level'].getImageData((this.location.x + (this.size.w / 2)), (this.location.y + this.size.h), 1, (this.momentum.y * -1));
	
	pixelCollision = this.pixelCollision(imgData.data);
	if(pixelCollision === false){
		return;
	}
	//debugger;
	if(pixelCollision < 10){
		this.touching.ground = true;
		this.momentum.y = 0;
	} else {
		this.momentum.y = ((pixelCollision / 4) * -1);
	}
}

Player.prototype.collisionAbove = function(){
	//this.touching.ground = false;
	
	// Check if we going to collide in the next move
	imgData = ctx['level'].getImageData((this.location.x + (this.size.w / 2)), (this.location.y), 1, (this.momentum.y));
	
	pixelCollision = this.pixelCollision(imgData.data);
	if(pixelCollision === false){
		return;
	}
	//this.touching.ground = true;
	this.momentum.y = 0;
}

Player.prototype.collisionLeft = function(){
	this.touching.left = false;
	imgData = ctx['level'].getImageData((this.location.x + this.momentum.x), (this.location.y + (this.size.h / 2)), (this.momentum.x * -1), 1);
	pixelCollision = this.pixelCollision(imgData.data);
	if(pixelCollision === false){
		return;
	}
	
	this.touching.left = true;
	this.momentum.x = ((pixelCollision / 4) * -1);
}

Player.prototype.collisionRight = function(){
	this.touching.right = false;
	imgData = ctx['level'].getImageData((this.location.x + this.size.w), (this.location.y + (this.size.h / 2)), (this.momentum.x), 1);
	pixelCollision = this.pixelCollision(imgData.data);
	if(pixelCollision === false){
		return;
	}
	this.touching.right = true;
	this.momentum.x = ((pixelCollision / 4));
}

Player.prototype.gravityMomentum = function(){
	// Add the extra gravity accelerator in:
	if(this.momentum.y > -20){
		this.momentum.y += -5;
	}
	
	if(this.momentum.y < 0){
		this.collisionBelow();
	}
	
	//if(this.momentum.y > 0){
	//	this.collisionAbove();
	//}
	
	this.location.y -= this.momentum.y;
}

Player.prototype.leftRightMomentum = function(){
	//debugger;
	if(this.momentum.x < 0){
		if(this.momentum.x < -4){
			this.momentum.x += 1;
			if(this.touching.ground){
				this.momentum.x += 1;
			}
		}
		this.collisionLeft();
	}
	if(this.momentum.x > 0){
		if(this.momentum.x > 4){
			this.momentum.x -= 1;
			if(this.touching.ground){
				this.momentum.x -= 1;
			}
		}
		this.collisionRight();
	}
	
	if(this.touching.ground && (this.momentum.x > -5 && this.momentum.x < 5)){
		this.momentum.x = 0;
	}
	
	this.location.x += this.momentum.x;
}

Player.prototype.physicsMomentum = function(){
	// These cycle through the momentum avialable, if we have a pixel collision reduce the momentum to that point.
	this.gravityMomentum();
	this.leftRightMomentum();
}


Player.prototype.draw = function(){
	this.ctx.save();
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
 	this.ctx.drawImage(playerImgs[this.state], this.location.x, this.location.y, this.size.w, this.size.h);
 	this.ctx.restore();
};