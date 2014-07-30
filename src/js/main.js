window.onload = function()
{
	var canvas  = document.getElementById("canvas"),
		ctx 	= canvas.getContext("2d"),
		WIDTH	= window.innerWidth,
		HEIGHT  = window.innerHeight,
		mouse_down	= false,
		mouse_x,
		mouse_y;

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	function draw()
	{
		// Clear the screen 
		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect( 0, 0, WIDTH, HEIGHT );

		// Code to do stuff.

		update();
	}

	function update() 
	{

	}

	// Handle mouse
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

	setInterval(draw,30);
}