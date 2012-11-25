level[1] = new Level(1);

// Build the buttom bit.
level[1].bricks.push(new Brick({x:0, y:340}, {w: 1600, h:80}));

// Now some bits to jump over
level[1].bricks.push(new Brick({x:300, y:280}, {w: 60, h:60}));
level[1].bricks.push(new Brick({x:300, y:220}, {w: 60, h:60}));