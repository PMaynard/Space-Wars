SW.Blip = function(_x, _y)
{
	this.x = _x;
	this.y = _y;
	this.xv = 3;

	this.r = Math.round(Math.random()*255);
	this.g = Math.round(Math.random()*255);
	this.b = Math.round(Math.random()*255);

	this.rgba = "rgba("+this.r+","+this.g+","+this.b+",1)";

	this.radius = 1;
};

SW.Blip.prototype.draw = function()
{
	SW.ctx.beginPath();
	SW.ctx.strokeStyle = this.rgba;
	SW.ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
	SW.ctx.stroke();
};

SW.Blip.prototype.update = function()
{
	if( this.radius < 8 ) {
		this.radius += 0.3;
	} else {
		this.radius = 1;
	}
};
