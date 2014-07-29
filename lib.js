var WIDTH;
var HEIGHT;

var player_x;
var player_y; 
var player_h; 
var player_w;

var rightDown = false;
var leftDown = false;
var upDown = false;
var spaceDown = false; 
var downDown = false; 

var bullet_x;
var bullet_y;
var bullet = false;
var bullet_speed = 6;

var targets;

var bricks;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;

var debug = false;
var ctx;

// Initialization 
function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  return setInterval(draw, 10);
}

function init_player() {
  player_x = WIDTH / 5;
  player_y = HEIGHT / 2;
  player_w = 50;
  player_h = 10;
}

function init_targets() {
  NCOLS = 15;
  BRICKWIDTH = 100;
  BRICKHEIGHT = 20;
  PADDING = 2;

  targets = new Array(NCOLS);
  for(i = 0; i < NCOLS; i++) {
    targets[i] = new rect(
      (WIDTH - (BRICKWIDTH + PADDING)), 
      (i * (BRICKHEIGHT + PADDING)) + PADDING,
      BRICKWIDTH, BRICKHEIGHT);
  }
}

// Game Functions
function shoot(x,y) {
  circle(x,y,2);
}

// Shape functions
function circle(x,y,r) {
  ctx.fillStyle = "rgba(255, 0, 0, .5)"
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.draw = true;

  ctx.fillStyle = "rgba(0, 255, 100, .5)"
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

rect.prototype.getX = function(){
  return this.x;
};

rect.prototype.getY = function(){
  return this.y;
};

rect.prototype.getW = function(){
  return this.w;
};

rect.prototype.getH = function(){
  return this.h;
};

rect.prototype.setDraw = function(draw){
  this.draw = draw
};

rect.prototype.getDraw = function(){
  return this.draw;
};

// Helper functions
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  background();
}

// Draw the faint background grid.
function background() {
  var size = 15;
  ctx.fillStyle = 'hsla(0, 0%, 50%, 0.05)';

  var i = Math.round( HEIGHT / size );
  while( i-- ) {
    ctx.fillRect( 0, i * size + 25, WIDTH, 1 );
  }

  i = Math.round( WIDTH / size );
  while( i-- ) {
    ctx.fillRect( i * size, 0, 1, HEIGHT );
  }
}

// User Controls
function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
  else if (evt.keyCode == 38) upDown = true;
  else if (evt.keyCode == 40) downDown = true;
  else if (evt.keyCode == 32) spaceDown = true;
  else if (evt.keyCode == 13) debug = true;
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
  else if (evt.keyCode == 38) upDown = false;
  else if (evt.keyCode == 40) downDown = false;
  else if (evt.keyCode == 32) spaceDown = false;
  else if (evt.keyCode == 13) debug = false;

}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);  