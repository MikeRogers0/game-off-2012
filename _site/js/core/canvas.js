var canvas = {};
var ctx = {};

for(i in config.canvass){
	canvas[i] = document.getElementById('gf-'+i);
	ctx[i] = canvas[i].getContext('2d');
}