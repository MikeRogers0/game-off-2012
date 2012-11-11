var canvas = {};
var ctx = {};
canvas['background'] = null
canvas['level'] = null;
canvas['player'] = null;

for(i in {'background':true, 'level':true, 'bullets':true, 'player':true, 'hud':true}){
	canvas[i] = document.getElementById('gf-'+i);
	ctx[i] = canvas[i].getContext('2d');
}