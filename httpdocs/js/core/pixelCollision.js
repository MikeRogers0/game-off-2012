function pixelCollision(pix){
	for (var i = 0; n = pix.length, i < n; i += 4) {
		if (pix[i] != 0) {
			return (i / 4); // Returns the amount of pixels we are away.
			//return true; 
		}
	}
	return false;
}
