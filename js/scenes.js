// JavaScript Document
/**
* Script Name
* Author: Team Tide <email@server.com>
* Date: November 2015
* Version: 0.0
* Description
*/



var baseScene = {
	processInput: function(gameContext, keyboard, mouse){},
	update: function(gameContext, deletaTime){},
	render: function(gameContext){},
}
var baseSceneButtons = {
	buttons: [ 
		{ x:100, y:125, w:200, h:30, c:null, text:"Start", onClick:function(){} },
	],
	processInput: function(gameContext, keyboard, mouse){
		for(var i=0; i<this.buttons.length; i++){
			if(checkBoxPointCollision(this.buttons[i], mouse.getMousePosition())){
				this.buttons[i].c = "#F00";
				if(mouse.getMouseDown()){//mouse has been pressed down right now and the color is hover
					this.buttons[i].onClick();
				}
			}else{
				this.buttons[i].c = "#0F0";
			}
		}
	},
	update: function(gameContext, deletaTime){},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		//draw the buttons
		for(var i=0; i<this.buttons.length; i++){
			//draw the box
			canvas.fillStyle = this.buttons[i].c;
			canvas.beginPath();
			canvas.rect(this.buttons[i].x, this.buttons[i].y, this.buttons[i].w, this.buttons[i].h);
			canvas.closePath();
			canvas.fill();
			//draw the text inside the buttons
			canvas.textAlign = "center";
			canvas.textBaseline = "top";
			canvas.font = "bold 15px Arial";
			canvas.fillStyle = "#00F";
			canvas.fillText(this.buttons[i].text, this.buttons[i].x+this.buttons[i].w/2, this.buttons[i].y, this.buttons[i].w);
		}
	},
}