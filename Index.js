function iniciar_jogo(){
	canvas.foodLength = 1;
	canvas.snakeLength = 5;	
	canvas.snakePieces = [];
	canvas.snakeStep = 2;
	canvas.food();	
	canvas.snake();	
	canvas.movement();
}

var canvas = {	
	myself : document.getElementById('campo'),	
	myCtx : document.getElementById('campo').getContext('2d'),	
	food : function (){		
		var x = randomize(0, this.foodLength);		
		var y = randomize(0, this.foodLength);
		this.myCtx.fillStyle = "white";		
		this.myCtx.fillRect(x, y, 5, 5);	
	},	
	snake: function(){		
		this.snakeDirection = randomizeBool(); // #t: X	
		this.snakeSense = -1 + (randomizeBool()*2); // #: left or up
		var x = randomize(this.snakeDirection, this.snakeLength);		
		var y = randomize(1-this.snakeDirection, this.snakeLength);

		this.myCtx.fillStyle = "yellow";

		for(var i = 0; i < this.snakeLength*5; i+=5){			
			this.myCtx.fillRect(x + i*this.snakeDirection, y + i*(1-this.snakeDirection), 5, 5);		
			this.snakePieces.push({x: x + i*this.snakeDirection, y: y + i*(1-this.snakeDirection)});		
		}	
	},	
	movement : function(){
		setInterval(()=>{
			for(var i = 0; i < this.snakeStep; i++){
				var firstx = this.snakePieces[0].x;
				var firsty = this.snakePieces[0].y;

				var lastx = this.snakePieces[this.snakePieces.length - 1].x;
				var lasty = this.snakePieces[this.snakePieces.length - 1].y;

				this.snakePieces.unshift({x : firstx + this.snakeSense*5*this.snakeDirection, y: firsty + this.snakeSense*5*(1 - this.snakeDirection)});
				this.myCtx.fillRect(firstx + this.snakeSense*5*this.snakeDirection, firsty + this.snakeSense*5*(1 - this.snakeDirection), 5, 5);

				this.myCtx.clearRect(lastx, lasty, 5, 5);
				this.snakePieces.pop();
			}
		},1000);	
	}
}

function up(){
	if (!canvas.snakeDirection) return;
	canvas.snakeDirection = 0;
	canvas.snakeSense = -1;
}

function down(){
	if (!canvas.snakeDirection) return;
	canvas.snakeDirection = 0;
	canvas.snakeSense = 1;
}

function left(){
	if (canvas.snakeDirection) return;
	canvas.snakeDirection = 1;
	canvas.snakeSense = -1;
}

function right(){
	if (canvas.snakeDirection) return;
	canvas.snakeDirection = 1;
	canvas.snakeSense = 1;
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