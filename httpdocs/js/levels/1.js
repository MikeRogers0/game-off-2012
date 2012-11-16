// Build the level
var bricks = [];

// Build the outer walls
bricks[1] = new Brick({x:0, y:340}, {w: 1600, h:80});
//bricks[2] = new Brick({x:0, y:0}, {w: 21, h:400});
//bricks[3] = new Brick({x:790, y:0}, {w: 10, h:400});
//bricks[4] = new Brick({x:0, y:0}, {w: 1600, h:20});

// Now some bits to jump over
bricks[5] = new Brick({x:160, y:280});
bricks[6] = new Brick({x:280, y:280});

var player = [];
player[0] = new Player;