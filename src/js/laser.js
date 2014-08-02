SW.Laser = function(_start_x, _start_y, _end_x, _end_y, max_length) 
{
	this.start_x = _start_x;
	this.start_y = _start_y;
	this.end_x = _end_x;
	this.end_y = _end_y;
	this.x = this.start_x;
	this.y = this.start_y;
	this.angle = Math.atan2(this.end_y - this.start_y, this.end_x - this.start_x );
	this.speed = 2;
	this.acceleration = 1.05;
	this.distanceTraveled = 0;
	this.distanceToTarget = SW.calculateDistance( this.start_x, this.start_y, this.end_x, this.end_y );
};

SW.Laser.prototype.update = function() 
{

	if(SW.pointInArch(this.x, this.y, SW.asteroid.x, SW.asteroid.y, SW.asteroid.radius)){
		SW.asteroid.ore--;
		SW.player.hull++;
		console.log("Asteroid Ore: ", SW.asteroid.ore, "Hull: ", SW.player.hull)
	}
	this.angle = Math.atan2(this.end_y - this.start_y, this.end_x - this.start_x );
	this.speed *= this.acceleration;
	var vx = Math.cos( this.angle ) * this.speed,
		vy = Math.sin( this.angle ) * this.speed;
	
	this.distanceTraveled = SW.calculateDistance( this.start_x, this.start_y, this.x + vx, this.y + vy );
	if( this.distanceTraveled >= this.distanceToTarget ) {
		return false;
	}else{
		this.x += vx;
		this.y += vy;
		return true;
	}
};

SW.Laser.prototype.draw = function()
{
	// This should draw the laser, with each update it should get closer to the target. - See fireworks.
	// Then stop when it hits something.
	SW.ctx. beginPath();
	SW.ctx.moveTo( this.start_x, this.start_y );
	SW.ctx.lineTo( this.x, this.y );
	SW.ctx.strokeStyle = "gold";
	SW.ctx.stroke();
	SW.ctx.beginPath();
}