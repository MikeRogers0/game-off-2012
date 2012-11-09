// Load the patterns
var patterns = [];
for(var i in {'brick':true}){
	patterns[i] = new Image();
	patterns[i].onload = function(){};
	patterns[i].src = 'res/patterns/'+i+'.jpg';
}

// Load the player
var playerImgs = [];
for(var i in {'normal':true}){
	playerImgs[i] = new Image();
	playerImgs[i].onload = function(){};
	playerImgs[i].src = 'res/player/'+i+'.png';
}