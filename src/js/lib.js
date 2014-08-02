// =================== Main Loop =================== //
window.onload = function()
{
var canvas  = document.getElementById("canvas"),
	ctx 	= canvas.getContext("2d"),
	WIDTH	= window.innerWidth,
	HEIGHT  = window.innerHeight,
	up_down = false,
	down_down = false,
	left_down = false,
	right_down = false,
	background_size_small = 10,
	background_size_big = 100,
	blips 	= [],
	max_blips = 5,
	laser_range = 200,
	mouse_down	= false,
	mouse_x,
	mouse_y,
	numb_hit = 0,
	numb_missed = 0;

canvas.width = WIDTH;
canvas.height = HEIGHT;

player = new Player(150, HEIGHT/2);
asteroid = new Asteroid(rand(WIDTH/2, WIDTH), rand(HEIGHT/2, HEIGHT), rand(30,200))


function main_loop()
{
	clear();

	player.draw();
	asteroid.draw();

	update();
}

function update() 
{
	player.update();
}

setInterval(main_loop,30);
// =================== Main Loop =================== //

// =================== Laser Class =================== //
function Laser(_start_x, _start_y, _end_x, _end_y, max_length) 
{

	// Fire laser when laser range colides with the asteroid w
	
	this.start_x = _start_x;
	this.start_y = _start_y;
	this.end_x = _end_x;
	this.end_y = _end_y;
	this.max_length = max_length

	this.update = function() 
	{
		// This should draw the laser, with each update it should get closer to the target. - See fireworks.
		// Then stop when it hits something.
		if(calculateDistance(this.start_x, this.start_y, this.end_x, this.end_y) <= max_length) {		
			ctx.beginPath();
			ctx.strokeStyle = "gold";
			ctx.moveTo(this.start_x, this.start_y);
			ctx.lineTo(this.end_x, this.end_y);
			ctx.stroke();
		}
	}

}
// =================== Laser Class =================== //

// =================== Asteroid Class =================== //
function Asteroid(_x, _y, r)
{
	this.x = _x;
	this.y = _y;
	this.radius = r;
	this.toughness = rand(5,20); // How long it takes to get ore 
	this.ore = rand(0,r); // Numer of ore contains

	this.draw = function()
	{
		ctx.beginPath();
		ctx.fillStyle = "gray";
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
	}

	this.update = function()
	{
	}
}
// =================== Asteroid Class =================== //

// =================== Player Class =================== //
function Player(_x, _y)
{
	this.x = _x;
	this.y = _y;
	this.xv = 10;
	this.yv = 10;
	this.rotation = 0;

	this.draw = function()
	{
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		ctx.strokeStyle = '#FFF';
		ctx.beginPath();
		ctx.moveTo(25, 0);
		ctx.lineTo(-25, -25);
		ctx.lineTo(-25, 25);
		ctx.lineTo(25, 0);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		ctx.beginPath();
		ctx.strokeStyle = 'rgba(0, 0, 100, 0.5)';
		ctx.arc( this.x, this.y, laser_range, 0, Math.PI * 2 );
		ctx.stroke();
		ctx.closePath();

	}

	this.update = function()
	{
		// Point to the mouse x y
		this.rotation = Math.atan2(mouse_y - this.y, mouse_x - this.x);

		if(up_down)
			this.y -= this.yv;

		if(down_down)
			this.y += this.yv;

		if(left_down)
			this.x -= this.xv;

		if(right_down)
			this.x += this.xv;

		if(mouse_down){
			laser = new Laser(player.x, player.y, mouse_x, mouse_y, laser_range);
			laser.update();
		}
	}
}
// =================== Player Class =================== //


// =================== Blip Class =================== //
function Blip(_x, _y)
{
	this.x = _x;
	this.y = _y;
	this.xv = 3;

	this.r = Math.round(Math.random()*255);
	this.g = Math.round(Math.random()*255);
	this.b = Math.round(Math.random()*255);

	this.rgba = "rgba("+this.r+","+this.g+","+this.b+",1)";

	this.radius = 1;

	this.draw = function()
	{
		ctx.beginPath();
		ctx.strokeStyle = this.rgba;
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.stroke();

	}

	this.update = function()
	{
		if( this.radius < 8 ) {
			this.radius += 0.3;
		} else {
			this.radius = 1;
		}

		this.x -= this.xv;
	}
}
// =================== Blip Class =================== //

// Helper functions

function rand(min, max)
{
	return Math.random() * ( max - min ) + min;
}

function calculateDistance( p1x, p1y, p2x, p2y ) {
	var xDistance = p1x - p2x,
		yDistance = p1y - p2y;
	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
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

function clear() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect( 0, 0, WIDTH, HEIGHT );
	background();
}

// Draw the faint background grid.
function background() 
{
	ctx.fillStyle = 'hsla(0, 0%, 50%, 0.05)';

	var i = Math.round( HEIGHT / background_size_small );
	while( i-- ) 
	{
		ctx.fillRect( 0, i * background_size_small + 25, WIDTH, 1 );
	}

	i = Math.round( WIDTH / background_size_small );
	while( i-- )
	{
		ctx.fillRect( i * background_size_small, 0, 1, HEIGHT );
	}

	ctx.fillStyle = 'hsla(0, 0%, 50%, 0.07)';

	var i = Math.round( HEIGHT / background_size_big );
	while( i-- ) 
	{
		ctx.fillRect( 0, i * background_size_big + 25, WIDTH, 1 );
	}

	i = Math.round( WIDTH / background_size_big );
	while( i-- )
	{
		ctx.fillRect( i * background_size_big, 0, 1, HEIGHT );
	}
}

// =================== User Input =================== //
canvas.addEventListener( 'mousemove', function( e ) {
	mouse_x = e.pageX - canvas.offsetLeft;
	mouse_y = e.pageY - canvas.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
canvas.addEventListener( 'mousedown', function( e ) {
	e.preventDefault();
	mouse_down = true;
});

canvas.addEventListener( 'mouseup', function( e ) {
	e.preventDefault();
	mouse_down = false;
});

window.addEventListener( 'keydown', function( e ) {
	if(e.keyCode == '87' || e.keyCode == '38')
		up_down = true;

	if(e.keyCode == '83' || e.keyCode == '40')
		down_down = true;

	if(e.keyCode == '65' || e.keyCode == '37')
		left_down = true;

	if(e.keyCode == '39' || e.keyCode == '68')
		right_down = true;
});

window.addEventListener( 'keyup', function( e ) {
	if(e.keyCode == '87' || e.keyCode == '38')
		up_down = false;

	if(e.keyCode == '83' || e.keyCode == '40')
		down_down = false;

	if(e.keyCode == '65' || e.keyCode == '37')
		left_down = false;

	if(e.keyCode == '39' || e.keyCode == '68')
		right_down = false;
});
// =================== User Input =================== //

} // END ON LOAD - TODO: Learn Javascript.


// 87 w
// 65 a
// 83 s
// 68 d

// 38 up
// 40 down
// 37 left
// 39 right