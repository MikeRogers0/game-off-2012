function Levels(id){
	this.id = id;
	this.load();
}
Levels.prototype.load = function() {
	head.js('js/levels/'+this.id+'.js');
}
Levels.prototype.play = function() {
	head.js('js/levels/'+this.id+'-start.js', function(){
		gameLoop();
	});
}

var levels = [] 