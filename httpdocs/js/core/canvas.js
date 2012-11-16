var canvas = {};
var ctx = {};

for(i in {'background':true, 'level':true, 'bullets':true, 'player':true, 'hud':true}){
	canvas[i] = document.getElementById('gf-'+i);
	ctx[i] = canvas[i].getContext('2d');
}