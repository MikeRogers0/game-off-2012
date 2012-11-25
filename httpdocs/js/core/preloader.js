// First create the loading events, so when we preloaded everyting we can start up nicely.
var patterns = {};
var objectsImgs = {};

function preLoader(){
	this.patterns = {};
	this.objectsImgs = {};
	this.totalElements = 0;
	this.totalElementsLoaded = 0;
	this.callback = function(){};
}

preLoader.prototype.addPattern = function(name){
	if(this.patterns[name] == undefined){
		this.patterns[name] = true;
	}
}

preLoader.prototype.addObject = function(name){
	if(this.objectsImgs[name] == undefined){
		this.objectsImgs[name] = true;
	}
}

preLoader.prototype.load = function(callback){	
	this.callback = callback;
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
		this.callback(); // Run the callback.
	}
}

var preLoader = new preLoader();