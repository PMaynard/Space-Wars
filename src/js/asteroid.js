SW.Asteroid = function(_x, _y, _radius)
{
	this.x = _x;
	this.y = _y;
	this.radius = _radius;
	this.toughness = SW.rand(5,20); // How long it takes to get ore 
	this.ore = SW.rand(0, this.radius); // Numer of ore contains
};

SW.Asteroid.prototype.draw = function()
{
	SW.ctx.beginPath();
	SW.ctx.fillStyle = "gray";
	SW.ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
	SW.ctx.fill();
};