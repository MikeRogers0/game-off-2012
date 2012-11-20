// Resize the canvas.
//debugger;
for(i in config.shifting_canvass){
	canvas[i].style.width = '1600px';
	canvas[i].style.height = '400px';
	canvas[i].width = 1600;
	canvas[i].height = 400;
}

for(i in bricks){
	bricks[i].draw();
}

for(i in player){
	player[i].draw();
}