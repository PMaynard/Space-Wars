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
	max_blips = 400,
	mouse_down	= false,
	mouse_x,
	mouse_y,
	numb_hit = 0,
	numb_missed = 0;

canvas.width = WIDTH;
canvas.height = HEIGHT;

player = new Player(WIDTH/2, HEIGHT/2);


function main_loop()
{
	clear();
	ctx.font      = "normal 36px Verdana";
	ctx.fillStyle = "green";
	ctx.fillText(numb_hit, 50, 50);
	ctx.fillStyle = "red";
	ctx.fillText(numb_missed, 150, 50);

	player.draw();
	
	if(blips.length < max_blips )
			blips.push( new Blip(WIDTH+10, rand(0, HEIGHT) ) );
	
	for(i = 0; i < blips.length; i++){
		blips[i].draw();
		if(blips[i].x < 0){
			blips.shift();
			numb_missed++;
		}
	}
	update();
}

function update() 
{
	player.update();
	for(i = 0; i < blips.length; i++){
		// Touch das player?
		if(archInArch(0, player.x, player.y, player.radius, blips[i].x, blips[i].y, blips[i].radius )){
			blips.splice(i, 1);
			numb_hit++;
			max_blips--;
		}

		blips[i].update();
	}
}

setInterval(main_loop,30);
// =================== Main Loop =================== //

// =================== Player Class =================== //
function Player(_x, _y)
{
	this.x = _x;
	this.y = _y;
	this.xv = 10;
	this.yv = 10;
	this.radius = 25; 

	this.draw = function()
	{
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.stroke();

	}

	this.update = function()
	{
		if(up_down)
			this.y -= this.yv;

		if(down_down)
			this.y += this.yv;

		if(left_down)
			this.x -= this.yv;

		if(right_down)
			this.x += this.yv;
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