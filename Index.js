function iniciar_jogo(){
	canvas.foodLength = 1;
	canvas.snakeLength = 5;	
	canvas.snakePosition = [];	
	canvas.snakeStep = 2; 	
	canvas.snakeDirection = 1; // x	
	canvas.snakeSense = 1; // up or left	
	canvas.food();	
	canvas.snake();	
	//canvas.movement();
}

var canvas = {	
	myself :  document.getElementById('campo'),	
	myCtx : document.getElementById('campo').getContext('2d'),	
	food : function (){		
		var x = randomize(0, this.foodLength);		
		var y = randomize(0, this.foodLength);
		this.myCtx.fillStyle = "white";		
		this.myCtx.fillRect(x, y, 5, 5);	
	},	
	snake: function(){		
		var XorY = randomizeBool();		
		var x = randomize(XorY, this.snakeLength);		
		var y = randomize(1-XorY, this.snakeLength);
		this.myCtx.fillStyle = "yellow";		
		for(var i = 0; i < this.snakeLength*5; i+=5){			
			this.myCtx.fillRect(x + i*XorY, y + i*(1-XorY), 5, 5);			
			this.snakePosition.push({x: x + i*XorY, y: y + i*(1-XorY)});		
		}	
	} //,	
	/*movement : function(){		
		setInterval(()=>{			
			if(this.snakeDirection){				
				snakePosition.unshift({x : })			
			} 		
		},1000);	
	}*/
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