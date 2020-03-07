function iniciar_jogo(){
	canvas.foodLength = 1;
	canvas.foodPosition = [];
	canvas.snakeLength = 5;	
	canvas.snakePieces = [];
	canvas.snakeStep = 1;
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

		createRect(x, y, 5, 5, "white");
		this.foodPosition.push({x: x, y: y});	
	},	
	snake: function(){		
		this.snakeDirection = randomizeBool(); // #t: X	
		this.snakeSense = -1 + (randomizeBool()*2); // #: left or up
		this.cmdDirection = this.snakeDirection;
		this.cmdSense = this.snakeSense;

		var x = randomize(this.snakeDirection, this.snakeLength);		
		var y = randomize(1-this.snakeDirection, this.snakeLength);

		for(var i = 0; i < this.snakeLength*5; i+=5){			
			createRect(x + i*this.snakeDirection, y + i*(1-this.snakeDirection), 5, 5, "yellow");		
			this.snakePieces.push({x: x + i*this.snakeDirection, y: y + i*(1-this.snakeDirection)});		
		}	
	},	
	movement : function(){
		setInterval(()=>{
			this.snakeDirection = this.cmdDirection;
			this.snakeSense = this.cmdSense;
			for(var i = 0; i < this.snakeStep; i++){
				var firstx = this.snakePieces[0].x;
				var firsty = this.snakePieces[0].y;

				var lastx = this.snakePieces[this.snakePieces.length - 1].x;
				var lasty = this.snakePieces[this.snakePieces.length - 1].y;

				createRect(firstx + this.snakeSense*5*this.snakeDirection, firsty + this.snakeSense*5*(1 - this.snakeDirection), 5, 5, "yellow");
				this.snakePieces.unshift({x : firstx + this.snakeSense*5*this.snakeDirection, y: firsty + this.snakeSense*5*(1 - this.snakeDirection)});

				clearRect(lastx, lasty, 5, 5);
				this.snakePieces.pop();
			}
			if(firstx == this.foodPosition[0].x && firsty == this.foodPosition[0].y) this.food();
			//else if(lastx == this.foodPosition[0].x && lasty == this.foodPosition[0].y){
			//	createRect(lastx + this.snakeSense*5*this.snakeDirection, lasty + this.snakeSense*5*(1 - this.snakeDirection), 5, 5, "yellow");
			//	this.foodPosition.shift();
			//}
		},1000);	
	}
}

function up(){
	if (!canvas.snakeDirection) return;
	canvas.cmdDirection = 0;
	canvas.cmdSense = -1;
}

function down(){
	if (!canvas.snakeDirection) return;
	canvas.cmdDirection = 0;
	canvas.cmdSense = 1;
}

function left(){
	if (canvas.snakeDirection) return;
	canvas.cmdDirection = 1;
	canvas.cmdSense = -1;
}

function right(){
	if (canvas.snakeDirection) return;
	canvas.cmdDirection = 1;
	canvas.cmdSense = 1;
}

function randomizeBool() {	
	var choice = Math.random();	
	choice = choice > 0.5 ? 1 : 0;	
	return choice;
}

function randomize(bool, bound) {	
	var limite = 400;	
	limite -= bool? bound*5 : 5;
	var num = Math.floor(Math.random() * limite); // aleatorizar múltiplo de cinco	

	if(num%5 < 3) return num - num%5;	
	return num + (5 - num%5);
}

function checkKeyPress(e){
	switch(e.keyCode) {
		case 37 : 
			left();
			break;
		case 38 : 
			up();
			break;
		case 39 : 
			right();
			break;
		case 40 : 
			down();
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