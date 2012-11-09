// First create the loading events, so when we preloaded everyting we can start up nicely.
evt = document.createEvent('Event');
evt.initEvent('preLoaderCompleted',true,true);
var patterns = {};
var playerImgs = {};

function preLoader(){
	this.patterns = {'brick':true};
	this.playerImgs = {'normal':true};
	this.totalElements = 0;
	this.totalElementsLoaded = 0;
}

preLoader.prototype.addPattern = function(name){
	if(this.patterns[name] == undefined){
		this.patterns[name] = true;
	}
}

preLoader.prototype.addPlayer = function(name){
	if(this.playerImgs[name] == undefined){
		this.playerImgs[name] = true;
	}
}

preLoader.prototype.load = function(){	
	// Load the patterns
	for(var i in this.patterns){
		this.totalElements++;
		patterns[i] = new Image();
		patterns[i].onload = function(){preLoader.loaded()};
		patterns[i].src = 'res/patterns/'+i+'.jpg';
	}
	
	// Load the player
	for(var i in this.playerImgs){
		this.totalElements++;
		playerImgs[i] = new Image();
		playerImgs[i].onload = function(){preLoader.loaded()};
		playerImgs[i].src = 'res/player/'+i+'.png';
	}
}

/**
 * Tells the loading screen we are ready to rock and roll.
 */
preLoader.prototype.loaded = function (){
	this.totalElementsLoaded++;
	if(this.totalElementsLoaded >= this.totalElements){
		document.addEventListener('preLoaderCompleted',startGame(),false);
	}
}

var preLoader = new preLoader();