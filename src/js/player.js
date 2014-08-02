// =================== Player Class =================== //
function Player(ctx, _x, _y)
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

		if(mouse_down)
			Laser(ctx, player.x, player.y, mouse_x, mouse_y);
	}
}
// =================== Player Class =================== //