function iniciar_jogo(){
	canvas.foodLength = 1;
	canvas.snakeLength = 5;	
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
		var X = randomize(this.snakeDirection, this.snakeLength);		
		var Y = randomize(1-this.snakeDirection, this.snakeLength);

		var width = this.snakeDirection ? this.snakeLength : 1;
		var height = this.snakeDirection ? 1 : this.snakeLength;
		
		this.myCtx.fillStyle = "yellow";
		this.myCtx.fillRect(X, Y, 5*width, 5*height);			
		this.snakePosition = {x: X, y: Y};		
	},	
	movement : function(){
		return setInterval(()=>{
			var X = this.snakePosition.x;
			var Y = this.snakePosition.y;

			var width = this.snakeDirection ? this.snakeLength : 1;
			var height = this.snakeDirection ? 1 : this.snakeLength;

			this.myCtx.clearRect(X, Y, 5*width, 5*height);
			this.myCtx.fillRect(X - (this.snakeDirection)*5*this.snakeStep, Y - (1 - this.snakeDirection)*5*this.snakeStep, 5*width, 5*height);

			this.snakePosition = {x: X - (this.snakeDirection)*5*this.snakeStep, y: Y - (1 - this.snakeDirection)*5*this.snakeStep};

			//if(this.snakePosition.x == 0 || this.snakePosition.y == 0)
		},1000);
	}
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