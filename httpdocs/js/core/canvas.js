var canvas = {};
var ctx = {};

for(i in {'level3d':true, 'level':true, 'bullets':true, 'player':true}){
	canvas[i] = document.getElementById('gf-'+i);
	ctx[i] = canvas[i].getContext('2d');
}