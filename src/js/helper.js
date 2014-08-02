SW.clear = function () {
	SW.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	SW.ctx.fillRect( 0, 0, SW.WIDTH, SW.HEIGHT );
	SW.background();
}

// Draw the faint background grid.
SW.background = function() 
{
	SW.ctx.fillStyle = 'hsla(0, 0%, 50%, 0.05)';

	var i = Math.round( SW.HEIGHT / SW.background_size_small );
	while( i-- ) 
	{
		SW.ctx.fillRect( 0, i * SW.background_size_small + 25, SW.WIDTH, 1 );
	}

	i = Math.round( SW.WIDTH / SW.background_size_small );
	while( i-- )
	{
		SW.ctx.fillRect( i * SW.background_size_small, 0, 1, SW.HEIGHT );
	}

	SW.ctx.fillStyle = 'hsla(0, 0%, 50%, 0.07)';

	var i = Math.round( SW.HEIGHT / SW.background_size_big );
	while( i-- ) 
	{
		SW.ctx.fillRect( 0, i * SW.background_size_big + 25, SW.WIDTH, 1 );
	}

	i = Math.round( SW.WIDTH / SW.background_size_big );
	while( i-- )
	{
		SW.ctx.fillRect( i * SW.background_size_big, 0, 1, SW.HEIGHT );
	}
}

SW.rand = function(min, max) {
	return Math.random() * ( max - min ) + min;
}

SW.calculateDistance = function( p1x, p1y, p2x, p2y ) {
	var xDistance = p1x - p2x,
		yDistance = p1y - p2y;
	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

SW.arcInRect = function( ax, ay, ar, rx, ry, rw, rh ) {
	return !( ax + ar <= rx || ax - ar >= rx + rw || ay + ar <= ry || ay - ar >= ry + rh );
};

SW.pointInRect = function( px, py, rx, ry, rw, rh ) {
	return ( px >= rx && px <= rx + rw && py >= ry && py <= ry + rh );
};

SW.archInArch = function(touch_distance, ax, ay, ar, bx, by, br) {
	// Thankies - http://content.gpwiki.org/index.php/C:Collision_detection_between_two_circles
	var distance_squared = ((ax - bx) * (ax - bx)) + ((ay - by) * (ay - by));
	var radii_squared = (ar + br) * (ar + br);

	if ( -touch_distance < radii_squared - distance_squared && radii_squared - distance_squared < touch_distance) 
	{ 
		return true//"Touching" 
	} 
	else if (radii_squared > distance_squared) 
	{ 
		return true//"Overlapping" 
	} 
	else {
	 return false
	}

}


// =================== User Input =================== //
canvas.addEventListener( 'mousemove', function( e ) {
	SW.mouse_x = e.pageX - canvas.offsetLeft;
	SW.mouse_y = e.pageY - canvas.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
canvas.addEventListener( 'mousedown', function( e ) {
	e.preventDefault();
	SW.mouse_down = true;
});

canvas.addEventListener( 'mouseup', function( e ) {
	e.preventDefault();
	SW.mouse_down = false;
});

window.addEventListener( 'keydown', function( e ) {
	if(e.keyCode == '87' || e.keyCode == '38')
		SW.up_down = true;

	if(e.keyCode == '83' || e.keyCode == '40')
		SW.down_down = true;

	if(e.keyCode == '65' || e.keyCode == '37')
		SW.left_down = true;

	if(e.keyCode == '39' || e.keyCode == '68')
		SW.right_down = true;
});

window.addEventListener( 'keyup', function( e ) {
	if(e.keyCode == '87' || e.keyCode == '38')
		SW.up_down = false;

	if(e.keyCode == '83' || e.keyCode == '40')
		SW.down_down = false;

	if(e.keyCode == '65' || e.keyCode == '37')
		SW.left_down = false;

	if(e.keyCode == '39' || e.keyCode == '68')
		SW.right_down = false;
});
// =================== User Input =================== //
// 87 w
// 65 a
// 83 s
// 68 d

// 38 up
// 40 down
// 37 left
// 39 right