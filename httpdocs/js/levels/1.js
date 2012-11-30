level[1] = new Level(1, {w:3000, h:800}, {x: 25, y: 520});

// Build the bottom bit.
level[1].bricks.push(new Brick({x:-10, y:730}, {w: 810, h:80}));

// Jumping bit.
level[1].bricks.push(new Brick({x:320, y:670}, {w: 60, h:60}));

// Bottom bit, has space before it.
level[1].bricks.push(new Brick({x:900, y:730}, {w: 700, h:80}));

// Bit to climb with fork.
level[1].bricks.push(new Brick({x:1200, y:600}, {w: 100, h:130}));

// Bottom bit, with big forking space next to it.
level[1].bricks.push(new Brick({x:1800, y:730}, {w: 700, h:80}));

// Floating bricks to fork onto.
level[1].bricks.push(new Brick({x:2100, y:620}, {w: 200, h:60}));
level[1].bricks.push(new Brick({x:2400, y:620}, {w: 200, h:60}));

level[1].bricks.push(new Brick({x:2600, y:560}, {w: 200, h:120}));

level[1].bricks.push(new Brick({x:2560, y:320}, {w: 20, h:60}));
level[1].bricks.push(new Brick({x:2460, y:400}, {w: 120, h:60}));

level[1].bricks.push(new Brick({x:2000, y:400}, {w: 220, h:60}));


// Water in to fill in gaps
level[1].water.push(new Water({x:-10, y:760}, {w: 5610, h:50}));