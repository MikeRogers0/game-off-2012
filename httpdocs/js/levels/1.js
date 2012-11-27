level[1] = new Level(1, {w:2600, h:600}, {x: 25, y: 320});

// Build the bottom bit.
level[1].bricks.push(new Brick({x:-10, y:530}, {w: 1010, h:80}));

level[1].bricks.push(new Brick({x:1100, y:530}, {w: 1600, h:80}));

// Now some bits to jump over
level[1].bricks.push(new Brick({x:320, y:470}, {w: 60, h:60}));


// Water in to fill in gaps
level[1].water.push(new Water({x:-10, y:560}, {w: 1600, h:50}));