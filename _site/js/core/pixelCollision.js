function pixelCollision(pix, reversed){
	// If you wanna search from the bottom to the top.
	reversed = reversed ? reversed : false;
	
	if(reversed){
		for (var i = (pix.length - 1); i > 4; i -= 4) {
			if (pix[i] != 0) {
				//debugger;
				return (i / 4); // Returns the amount of pixels we are away, you need to figure out the width/height on the other side.
				//return true; 
			}
		}
		return false;
	}
	
	for (var i = 0; n = pix.length, i < n; i += 4) {
		if (pix[i] != 0) {
			return (i / 4); // Returns the amount of pixels we are away, you need to figure out the width/height on the other side.
			//return true; 
		}
	}
	return false;
}
