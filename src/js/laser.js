// =================== Laser Class =================== //
function Laser(ctx,_start_x, _start_y, _end_x, _end_y) 
{
	this.start_x = _start_x;
	this.start_y = _start_y;
	this.end_x = _end_x;
	this.end_y = _end_y;
	
	ctx.beginPath();
	ctx.strokeStyle = "gold";
	ctx.moveTo(start_x, start_y);
	ctx.lineTo(end_x, end_y);
	ctx.stroke();

	this.udpate = function() 
	{
		// This should draw the laser, with each update it should get closer to the target. - See fireworks.
		// Then stop when it hits something.
	}

}
// =================== Laser Class =================== //