SW.init = function() {
	SW.canvas  = document.getElementById("canvas");
	SW.ctx 	= canvas.getContext("2d");
	SW.WIDTH	= window.innerWidth;
	SW.HEIGHT  = window.innerHeight;
	SW.up_down = false;
	SW.down_down = false;
	SW.left_down = false;
	SW.right_down = false;
	SW.background_size_small = 10;
	SW.background_size_big = 100;
	SW.laser_range = 200;
	SW.mouse_down	= false;
	SW.mouse_x;
	SW.mouse_y;
	SW.numb_hit = 0;
	SW.numb_missed = 0;
	SW.canvas.width = SW.WIDTH;
	SW.canvas.height = SW.HEIGHT;

	SW.dots = [];

	SW.player = new SW.Player(150, SW.HEIGHT/2);
	SW.asteroid = new SW.Asteroid(SW.rand(0,SW.WIDTH), SW.rand(0,SW.HEIGHT), SW.rand(30,150));
	SW.blip = new SW.Blip(150,250)
}

SW.main_loop = function()
{
	// Tidy up screen
	SW.clear();

	// Render
	SW.player.draw();
	SW.asteroid.draw();

	for(i=0; i < SW.dots.length; i++){
		SW.ctx.beginPath();
		SW.ctx.fillStyle = "black";
		SW.ctx.fillRect(SW.dots[i].x, SW.dots[i].y,10,10);
	}

	// Update
	SW.player.update();
}

// Entry Point.
SW.init();
setInterval(SW.main_loop,30);