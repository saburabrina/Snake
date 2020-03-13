function iniciar_jogo(){
	canvas.gameStep = 10; // em pixels
	canvas.foodLength = 1;
	canvas.foodPosition = [];
	canvas.snakeLength = 5;
	canvas.snakePieces = [];
	canvas.snakeSpeed = canvas.snakeSpeedInput.value*1000;
	canvas.snakeSpeedInput.disabled = true;
	canvas.playBtn.disabled = true;
	canvas.msg.innerHTML = "GOOD LUCK";
	canvas.food();
	canvas.snake();
	canvas.movement();

	window.addEventListener("keydown", checkKeyPress, false);
}
	
var canvas = {
	myself : document.getElementById('campo'),
	myCtx : document.getElementById('campo').getContext('2d'),
	food : function (){
		var x = randomize(0, this.foodLength);
		var y = randomize(0, this.foodLength);

		if(checkAvailablePosition(x,y,this.snakePieces)){
			createRect(x, y, this.gameStep, this.gameStep, "white");
			this.foodPosition.push({x: x, y: y});
		}
		else this.food();
	},
	snake: function(){
		this.snakeDirection = randomizeBool(); // #t: X
		this.snakeSense = -1 + (randomizeBool()*2); // #-1: left or up
		this.cmdDirection = this.snakeDirection;
		this.cmdSense = this.snakeSense;

		var x = randomize(this.snakeDirection, this.snakeLength);
		var y = randomize(1-this.snakeDirection, this.snakeLength);

		if(checkAvailablePosition(x,y,this.foodPosition)){
			for(var i = 0; i < this.snakeLength*this.gameStep; i+=this.gameStep){
				createRect(x + i*this.snakeDirection, y + i*(1-this.snakeDirection), this.gameStep, this.gameStep, "yellow");
				this.snakePieces.push({x: x + i*this.snakeDirection, y: y + i*(1-this.snakeDirection)});
			}

			if(this.snakeSense > 0) this.snakePieces = this.snakePieces.reverse();
		}
		else this.snake();
	},
	movement : function(){
		this.interval = setInterval(()=>{
			this.snakeDirection = this.cmdDirection;
			this.snakeSense = this.cmdSense;

			var firstx = this.snakePieces[0].x;
			var firsty = this.snakePieces[0].y;

			var lastx = this.snakePieces[this.snakePieces.length - 1].x;
			var lasty = this.snakePieces[this.snakePieces.length - 1].y;

			var newx = firstx + this.snakeSense*this.gameStep*this.snakeDirection;
			var newy = firsty + this.snakeSense*this.gameStep*(1 - this.snakeDirection);

			if(this.colapse(newx, newy) || 
			(this.snakeSense == 1 && 
			this.colapse(newx+this.gameStep*this.snakeDirection, newy+this.gameStep*(1 - this.snakeDirection)))) {
				this.pauseBtn.disabled = true;
				this.playBtn.disabled = true;
				clearInterval(this.interval);
				this.msg.innerHTML = "You Lost..."
				this.snakeSpeedInput.disabled = false;
				return;
			}

			if(findObj(this.foodPosition, firstx, firsty)) this.food();
		
			if(!(lastx == this.foodPosition[0].x && lasty == this.foodPosition[0].y)){
				clearRect(lastx, lasty, this.gameStep, this.gameStep);
				this.snakePieces.pop();
			}
			else {
				this.foodPosition.shift();
			}
			createRect(newx, newy, this.gameStep, this.gameStep, "yellow");
			this.snakePieces.unshift({x : newx, y: newy});
		},this.snakeSpeed);
	},
	colapse : function(x, y){
		if(x < 0 || y < 0) return true;
		if(x > 400 || y > 400) return true;
		if(findObj(this.snakePieces.slice(1), x, y)) return true;

		return false;
	},
	up: function(){
		if (!this.snakeDirection) return;
		this.cmdDirection = 0;
		this.cmdSense = -1;
	},
	down : function(){
		if (!this.snakeDirection) return;
		this.cmdDirection = 0;
		this.cmdSense = 1;
	},
	left : function(){
		if (this.snakeDirection) return;
		this.cmdDirection = 1;
		this.cmdSense = -1;
	},
	right : function(){
		if (this.snakeDirection) return;
		this.cmdDirection = 1;
		this.cmdSense = 1;
	},
	pauseBtn : document.getElementById("pauseBtn"),
	playBtn : document.getElementById("playBtn"),
	snakeSpeedInput : document.getElementById('snakeSpeed'),
	msg : document.getElementById('msg'),
	pause : function(){
		clearInterval(this.interval);
		this.pauseBtn.disabled = true;
		this.playBtn.disabled = false;
		this.snakeSpeedInput.disabled = false;
	},
	play : function(){
		this.movement();
		this.pauseBtn.disabled = false;
		this.playBtn.disabled = true;
		this.snakeSpeedInput.disabled = true;
	},
	restart : function(){
		this.pauseBtn.disabled = false;
		this.playBtn.disabled = true;
		clearRect(0, 0, 400, 400);
		clearInterval(this.interval);
		iniciar_jogo();
	},
	changeSpeed : function(){
		this.snakeSpeed = 1000*this.snakeSpeedInput.value;
	}
}

function randomizeBool() {
	var choice = Math.random();
	choice = choice > 0.5 ? 1 : 0;
	return choice;
}

function randomize(bool, bound) {
	var limite = 400;
	limite -= bool? bound*canvas.gameStep : canvas.gameStep;
	var num = Math.floor(Math.random() * limite); // aleatorizar múltiplo de canvas.gameStep

	if(num%canvas.gameStep < (canvas.gameStep/2)) return num - num%canvas.gameStep;
	return num + (canvas.gameStep - num%canvas.gameStep);
}

function checkKeyPress(e){
	switch(e.keyCode) {
		case 37 :
			canvas.left();
			break;
		case 38 :
			canvas.up();
			break;
		case 39 :
			canvas.right();
			break;
		case 40 :
			canvas.down();
			break;
		default:
			break;
	}
}

function createRect(x, y, width, length, color){
	canvas.myCtx.fillStyle = color;
	canvas.myCtx.fillRect(x, y, width, length);
}

function clearRect(x, y, width, length){
	canvas.myCtx.clearRect(x, y, width, length);
}

function findObj(arr, X, Y){
	return arr.find((elem)=>{
		return elem.x == X && elem.y == Y;
	}) == null ? false : true;
}

function checkAvailablePosition(x, y, arr){
	if(arr.length == 0) return true;
	if(findObj(arr, x, y)) return false;
	return true;
}