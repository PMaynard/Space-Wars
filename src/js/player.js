SW.Player = function(_x, _y)
{
	this.x = _x;
	this.y = _y;
	this.xv = 10;
	this.yv = 10;
	this.rotation = 0;
	this.laser = null;
};

SW.Player.prototype.draw = function()
{
	SW.ctx.save();
	SW.ctx.translate(this.x, this.y);
	SW.ctx.rotate(this.rotation);
	SW.ctx.strokeStyle = '#FFF';
	SW.ctx.beginPath();
	SW.ctx.moveTo(25, 0);
	SW.ctx.lineTo(-25, -25);
	SW.ctx.lineTo(-25, 25);
	SW.ctx.lineTo(25, 0);
	SW.ctx.stroke();
	SW.ctx.closePath();
	SW.ctx.restore();
};

SW.Player.prototype.update = function()
{
	// Point to the mouse x y
	this.rotation = Math.atan2(SW.mouse_y - this.y, SW.mouse_x - this.x);

	if(SW.up_down)
		this.y -= this.yv;

	if(SW.down_down)
		this.y += this.yv;

	if(SW.left_down)
		this.x -= this.xv;

	if(SW.right_down)
		this.x += this.xv;

	if(SW.mouse_down){
		if(!this.laser) 
			this.laser = new SW.Laser(this.x, this.y, SW.mouse_x, SW.mouse_y, SW.laser_range);
		if(this.laser.update()){
			this.laser.draw();
		}else{
			this.laser = new SW.Laser(this.x, this.y, SW.mouse_x, SW.mouse_y, SW.laser_range);
		}

		// Draw dots on the asteroid.
		if(SW.pointInArch(SW.mouse_x, SW.mouse_y, SW.asteroid.x, SW.asteroid.y, SW.asteroid.radius)){
			SW.dots.push({"x":SW.mouse_x, "y":SW.mouse_y});
		}
	}
};