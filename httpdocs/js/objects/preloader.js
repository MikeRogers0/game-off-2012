// First create the loading events, so when we preloaded everyting we can start up nicely.
evt = document.createEvent('Event');
evt.initEvent('preLoaderCompleted',true,true);
var patterns = {};
var objectsImgs = {};

function preLoader(){
	this.patterns = {'brick':true};
	this.objectsImgs = {'normal':true, 'fork':true};
	this.totalElements = 0;
	this.totalElementsLoaded = 0;
}

preLoader.prototype.addObject = function(name){
	if(this.patterns[name] == undefined){
		this.patterns[name] = true;
	}
}

preLoader.prototype.addPlayer = function(name){
	if(this.objectsImgs[name] == undefined){
		this.objectsImgs[name] = true;
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
	for(var i in this.objectsImgs){
		this.totalElements++;
		objectsImgs[i] = new Image();
		objectsImgs[i].onload = function(){preLoader.loaded()};
		objectsImgs[i].src = 'res/objects/'+i+'.png';
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