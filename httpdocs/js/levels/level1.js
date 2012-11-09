// Build the level
var bricks = [];

bricks[0] = new Brick({x:0, y:330}, {w: 800, h:90});
bricks[1] = new Brick({x:160, y:280});

for(i in bricks){
	bricks[i].draw();
}

