function Blip(_x, _y)
{
	this.x = _x;
	this.y = _y;

	this.r = Math.round(Math.random()*255);
	this.g = Math.round(Math.random()*255);
	this.b = Math.round(Math.random()*255);

	this.rgba = "rgba("+this.r+","+this.g+","+this.b+",1)";

	this.draw = function()
	{

	}

	this.update = function()
	{

	}
}