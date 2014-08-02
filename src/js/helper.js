// Helper functions

function rand(min, max)
{
	return Math.random() * ( max - min ) + min;
}

function arcInRect( ax, ay, ar, rx, ry, rw, rh ) {
	return !( ax + ar <= rx || ax - ar >= rx + rw || ay + ar <= ry || ay - ar >= ry + rh );
};

function pointInRect( px, py, rx, ry, rw, rh ) {
	return ( px >= rx && px <= rx + rw && py >= ry && py <= ry + rh );
};

function archInArch(touch_distance, ax, ay, ar, bx, by, br) {
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

function clear(ctx, width, height) {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect( 0, 0, width, height );
	background(ctx, width, height);
}

// Draw the faint background grid.
function background(ctx, width, height) 
{
	ctx.fillStyle = 'hsla(0, 0%, 50%, 0.05)';

	var i = Math.round( height / background_size_small );
	while( i-- ) 
	{
		ctx.fillRect( 0, i * background_size_small + 25, width, 1 );
	}

	i = Math.round( width / background_size_small );
	while( i-- )
	{
		ctx.fillRect( i * background_size_small, 0, 1, height );
	}

	ctx.fillStyle = 'hsla(0, 0%, 50%, 0.07)';

	var i = Math.round( height / background_size_big );
	while( i-- ) 
	{
		ctx.fillRect( 0, i * background_size_big + 25, width, 1 );
	}

	i = Math.round( width / background_size_big );
	while( i-- )
	{
		ctx.fillRect( i * background_size_big, 0, 1, height );
	}
}
