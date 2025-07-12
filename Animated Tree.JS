    var width = window.innerWidth;
var height = window.innerHeight;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;
ctx.translate (canvas.width/2, canvas.height/2);
ctx.fillStyle = "#000000";
var angle = Math.PI / 2;
var iterations = 1;
var colors = ["72CBDB", "55134E", "A0596B", "FEC343", "EF7351", ];
var colorId = 0;
var andleOfExpL = Math.PI / 6;
var andleOfExpR = Math.PI / 3;
function iterate(startPoitn, deg, iteration){
var lenght = (iterations / iteration) * 15;
var lineBeginning = startPoitn;
var size = lenght/30;
var lineEnding = new point(lineBeginning.x + lenght * Math.cos(deg + andleOfExpL), lineBeginning.y + lenght * Math.sin(deg + andleOfExpL));
var lineEnding2 = new point(lineBeginning.x + lenght * Math.cos(deg - andleOfExpR), lineBeginning.y + lenght * Math.sin(deg - andleOfExpR));
drawLine(lineBeginning, lineEnding, size);
drawLine(lineBeginning, lineEnding2, size);
if(iteration > iterations){
ctx.fillStyle = "#" + colors[colorId % colors.length];
colorId++;
ctx.arc(lineEnding.x, -lineEnding.y, 5, 0, 2 * Math.PI, false);
ctx.closePath();
ctx.arc(lineEnding2.x, -lineEnding2.y, 3, 0, 2 * Math.PI, false);
ctx.fill();
return;
}
iterate(lineEnding, deg + andleOfExpL, iteration + 1);
iterate(lineEnding2, deg - andleOfExpR, iteration + 1);
}
var param = 0;
function animate(){
if(iterations < 7){
iterations += 0.05;
}
clear();
colorId = 0;
andleOfExpR = getDir(new point(0, Math.sin(param/20)*8), new point(Math.abs(mouse.x), mouse.y));
andleOfExpL = getDir(new point(0, Math.sin(param/10)*10), new point(Math.abs(mouse.x), mouse.y));
drawLine(new point(0,-50), new point(0, -150), 4);
iterate(new point(0,-50), angle, 1);
param++;
}
setInterval(animate, 25);
function clear(){
ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
}
var mouse = new point(10, 10);
canvas.addEventListener('mousemove', function(e){
mouse.x = e.clientX - $('#canvas').offset().left - canvas.width/2;
mouse.y = -(e.clientY - $('#canvas').offset().top - canvas.height/2);
});
function getDir(pointA, pointB){
return -Math.atan2(pointB.x - pointA.x, pointB.y - pointA.y) + Math.PI/2;
}
function rand(min, max){
return Math.floor(Math.random() * max) + min;
}
function point(x, y){
this.x = x;
this.y = y;
}
function drawLine(pointA, pointB, size){
x1 = pointA.x;
y1 = pointA.y;
x2 = pointB.x;
y2 = pointB.y;
y2 = -y2;
y1 = -y1;
ctx.strokeStyle = "rgba(141, 89, 36," + (size/iterations + 0.3) + ")";
ctx.lineWidth = size;
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();
ctx.closePath();
}
