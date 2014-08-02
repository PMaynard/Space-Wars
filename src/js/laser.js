SW.Laser = function(_start_x, _start_y, _end_x, _end_y, max_length) 
{

	// Fire laser when laser range colides with the asteroid w
	
	this.start_x = _start_x;
	this.start_y = _start_y;
	this.end_x = _end_x;
	this.end_y = _end_y;
	this.max_length = max_length
};

SW.Laser.prototype.update = function() 
{
	// This should draw the laser, with each update it should get closer to the target. - See fireworks.
	// Then stop when it hits something.
	if(SW.calculateDistance(this.start_x, this.start_y, this.end_x, this.end_y) <= this.max_length) {		
		SW.ctx.beginPath();
		SW.ctx.strokeStyle = "gold";
		SW.ctx.moveTo(this.start_x, this.start_y);
		SW.ctx.lineTo(this.end_x, this.end_y);
		SW.ctx.stroke();
	}
};