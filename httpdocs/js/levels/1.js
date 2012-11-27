level[1] = new Level(1, {w:5600, h:600}, {x: 25, y: 320});

// Build the bottom bit.
level[1].bricks.push(new Brick({x:-10, y:530}, {w: 810, h:80}));

// Jumping bit.
level[1].bricks.push(new Brick({x:320, y:470}, {w: 60, h:60}));

// Bottom bit, has space before it.
level[1].bricks.push(new Brick({x:900, y:530}, {w: 700, h:80}));

// Bit to climb with fork.
level[1].bricks.push(new Brick({x:1200, y:400}, {w: 100, h:130}));

// Bottom bit, with big forking space next to it.
level[1].bricks.push(new Brick({x:1800, y:530}, {w: 700, h:80}));

// Floating bricks to fork onto.
level[1].bricks.push(new Brick({x:2100, y:420}, {w: 200, h:60}));
level[1].bricks.push(new Brick({x:2400, y:420}, {w: 200, h:60}));

level[1].bricks.push(new Brick({x:2600, y:360}, {w: 200, h:120}));

level[1].bricks.push(new Brick({x:2350, y:260}, {w: 200, h:60}));


// Water in to fill in gaps
level[1].water.push(new Water({x:-10, y:560}, {w: 5610, h:50}));