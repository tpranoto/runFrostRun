// JavaScript Document
/**
* Script Name
* Author: Team Tide <email@server.com>
* Date: November 2015
* Version: 0.0
* Description
*/




/*******************************************************
 ********************* SCENES **************************
 *******************************************************/
 /*var button = {
	 text, talign,
	 x, y, w, h
	 sx, sy, c, img,
	 sdx, sdy, cd
	 shx, shy, ch
	 onclick,
 }*/
 function updateButton(button, mouse){
	 if(checkBoxPointCollision(button, mouse.getMousePosition())){
		 if(button.onClick!=null && mouse.getMouseDown()){
			 button.onClick();
		 }
		 button.sx = button.shx;
		 button.sy = button.shy;
		 button.c = button.ch;
	 }else{
		 button.sx = button.sdx;
		 button.sy = button.sdy;
		 button.c = button.cd;
	 }
 }
 function drawButton(button, canvas){
	 //draw the box
	if(button.c){
		canvas.fillStyle = button.c;
		canvas.fillRect(button.x, button.y, button.w, button.h);
	}
	//draw the box
	if(typeof button.sx!=="undefined" && typeof button.sy!=="undefined"){
		canvas.drawImage(game.images.menuButtons, button.sx, button.sy, button.w, button.h, button.x, button.y, button.w, button.h);
	}
	//draw the text inside the buttons
	canvas.textBaseline = "top";
	canvas.font = "normal 36px Tahoma";
	canvas.fillStyle = "#FFF";
	canvas.textAlign = "left";
	if(button.text){
		canvas.fillText(button.text, button.x+50, button.y, button.w);
	}
 }
 
 var sprites = [
	 null, 
	 { desc:"WALK_HAND", next:1, len:7, lx:0, ly:0, speed:200 },
	 { desc:"ATTACK_HAND", next:1, len:2, lx:7, ly:0, speed:300 },
	 { desc:"WALK_BAT", next:3, len:7, lx:0, ly:1, speed:200 },
	 { desc:"ATTACK_BAT", next:3, len:2, lx:7, ly:1, speed:300 },
	 { desc:"WALK_POSTOL", next:5, len:7, lx:0, ly:2, speed:200 },
	 { desc:"WALK_SMG", next:6, len:7, lx:0, ly:3, speed:200 },
	 { desc:"IDLE", next:7, len:2, lx:0, ly:4, speed:700 },
	 { desc:"DAMAGE", next:8, len:1, lx:2, ly:4, speed:200 },
	 { desc:"CROUCHING", next:10, len:2, lx:3, ly:4, speed:300 },
	 { desc:"CROUCH", next:10, len:2, lx:5, ly:4, speed:300 },
	 { desc:"LADDER", next:11, len:2, lx:0, ly:5, speed:300 },
	 { desc:"ROPE", next:12, len:3, lx:2, ly:5, speed:300 },
	 { desc:"JUMPING", next:14, len:2, lx:5, ly:5, speed:500 },
	 { desc:"JUMP", next:14, len:1, lx:7, ly:5, speed:200 },
	 { desc:"SPECIAL", next:15, len:9, lx:0, ly:6, speed:200 },
 ];

//Image Loading Scent
var loadingScene = {
	processInput: function(gameContext, keyboard, mouse){},//Nothing to do here!
	update: function(gameContext, deltaTime){},//Nothing to do here!
	render: function(gameContext){
		var gameImageManager = gameContext.images;
		var gameAudioManager = gameContext.audios;
		if(gameImageManager.loaded==gameImageManager.length && gameAudioManager.loaded==gameAudioManager.length){//check whether all images are loaded
			gameContext.currentScene = menuScene;//All images loaded! Go to the menu!
		}else{
			//write the progress
			var canvas = gameContext.canvasContext;
			canvas.clearRect(0, 0, 1280, 720);
			canvas.font = "normal 36px Tahoma";
			canvas.fillText("Downloading images: " + gameImageManager.loaded + "/" + gameImageManager.length, 50, 50);
			canvas.fillText("Downloading audios: " + gameAudioManager.downloaded + "/" + gameAudioManager.length, 50, 100);
			canvas.fillText("Decoding audios: " + gameAudioManager.loaded + "/" + gameAudioManager.length, 50, 150);
		}
	}
};

//Menu
var menuScene = {
	buttons: [ 
		{ x:157, y:204, w:430, h:50, sdx:703, sdy:436, shx:702, shy:486, onClick:function(){
			if(menuScene.backgroundMusic!=null){ menuScene.backgroundMusic.stop(0); menuScene.backgroundMusic = null;};
			if(localStorage["Autosave"]){gameScene.loadSaveGame(JSON.parse(localStorage["Autosave"]));}else{gameScene.loadLevel(levelTutorial);}
			 game.currentScene = gameScene; } },//start
		{ x:158, y:289, w:430, h:50, sdx:704, sdy:636, shx:704, shy:686, onClick:function(){ game.currentScene = levelSelectScene; } },//Select level
		{ x:158, y:371, w:430, h:50, sdx:703, sdy:536, shx:703, shy:586, onClick:function(){ game.currentScene = saveSelectScene; } },//Select save
		{ x:158, y:458, w:430, h:50, sdx:0, sdy:770, shx:432, shy:770, onClick:function(){ game.currentScene = scoreboardScene; } },//Scoreboard
		{ x:158, y:542, w:430, h:50, sdx:0, sdy:820, shx:432, shy:821, onClick:function(){ if(menuScene.backgroundMusic!=null){ menuScene.backgroundMusic.stop(0); menuScene.backgroundMusic = null;}; game.currentScene = creditsScene; } },//Credits
	],
	backgroundMusic: null,
	processInput: function(gameContext, keyboard, mouse){
		for(var i=0; i<this.buttons.length; i++){
			updateButton(this.buttons[i], mouse);
		}
	},
	update: function(gameContext, deletaTime){
		if(this.backgroundMusic==null){
			this.backgroundMusic = gameContext.audios.play("menu");
		}
	},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		canvas.drawImage(gameContext.images.menuMain, 0, 0/*, 1280, 720*/);
		//draw the buttons
		for(var i=0; i<this.buttons.length; i++){
			drawButton(this.buttons[i], canvas);
		}
	}
};
var levelTutorialInstructionScene = {
	mainWindow: { x:1280/2-720/2, y:720/2-400/2, w:720, h:400 },
	alertInfo: null,
	buttons: [
		{ x:1280/2-430/2, y:(720/2-400/2)-50/2+55+300, w:430, h:50, sdx:0, sdy:870, shx:432, shy:871, text:"OK!", onClick:function(){ game.currentScene = gameScene; } },//Back Button
	],
	processInput: function(gameContext, keyboard, mouse){
		if(keyboard.getKeyDown(" ")){//pause
			gameContext.currentScene = gameScene;
		}
		for(var i=0; i<this.buttons.length; i++){
			updateButton(this.buttons[i], mouse);
		}
		gameScene.processInput(gameContext, keyboard, mouse);//avoid lost keyUp
	},
	update: function(gameContext, deltaTime){
	},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		//print the game in background
		gameScene.render(gameContext);
		//turn the game in the blackground darker by drawind a non-opaque black square on the canvas
		canvas.fillStyle = "rgba(0, 0, 0, 0.8)";
		canvas.fillRect(0, 0, 1280, 720);
		//draw the main window
		canvas.fillStyle = "rgba(71,77,119,0.8)";
		canvas.strokeStyle = "rgba(101,106,137,0.8)";
		canvas.lineWidth=3;
		canvas.fillRect(this.mainWindow.x, this.mainWindow.y, this.mainWindow.w, this.mainWindow.h);
		canvas.strokeRect(this.mainWindow.x, this.mainWindow.y, this.mainWindow.w, this.mainWindow.h);
		//Draw Window title
		canvas.textAlign = "left";
		canvas.textBaseline = "top";
		canvas.font = "normal 36px Tahoma";
		canvas.fillStyle = "#FFF";
		canvas.fillText(this.alertInfo.title, this.mainWindow.x+10, this.mainWindow.y, this.mainWindow.w);
		//Draw window image
		canvas.drawImage(game.images.levelTalerts, 0, this.alertInfo.imgIdx*200, 680, 200, this.mainWindow.x+20, this.mainWindow.y+45, 680, 200);
		//Draw Window instructions
		canvas.font = "normal 24px Tahoma";
		var strs = this.alertInfo.text.split(/\n/g);
		for(var i=0; i<strs.length; i++){
			canvas.fillText(strs[i], this.mainWindow.x+10, this.mainWindow.y+50+200+i*30, this.mainWindow.w-20);
		}
		//draw the buttons
		for(var i=0; i<this.buttons.length; i++){
			drawButton(this.buttons[i], canvas);
		}
	}
};
var levelEndScene = {
	mainWindow: { x:1280/2-720/2, y:720/2-400/2, w:720, h:400 },
	nextLevel: null,
	buttonNextLevel: { x:1280/2-430/2, y:(720/2-400/2)-50/2+55+300, w:430, h:50, sdx:0, sdy:870, shx:432, shy:871, text:"Next Level!", onClick:function(){ gameScene.loadLevel(levelEndScene.nextLevel); game.currentScene = gameScene; } },//next level
	buttonEnd: { x:1280/2-430/2, y:(720/2-400/2)-50/2+55+300, w:430, h:50, sdx:0, sdy:870, shx:432, shy:871, text:"The End!", onClick:function(){ gameScene.backgroundMusic.stop(0); gameScene.backgroundMusic = null; game.currentScene = creditsScene; } },//next level
	buttons: [],
	processInput: function(gameContext, keyboard, mouse){
		if(this.nextLevel!=null){
			this.buttons[0] = this.buttonNextLevel;
		}else{
			this.buttons[0] = this.buttonEnd;
		}
		if(keyboard.getKeyDown(" ")){//pause
			this.buttons[0].onClick();
		}
		updateButton(this.buttons[0], mouse);
		gameScene.processInput(gameContext, keyboard, mouse);//avoid lost keyUp
	},
	update: function(gameContext, deltaTime){
	},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		//print the game in background
		gameScene.render(gameContext);
		//turn the game in the blackground darker by drawind a non-opaque black square on the canvas
		canvas.fillStyle = "rgba(0, 0, 0, 0.8)";
		canvas.fillRect(0, 0, 1280, 720);
		//draw the main window
		canvas.fillStyle = "rgba(71,77,119,0.8)";
		canvas.strokeStyle = "rgba(101,106,137,0.8)";
		canvas.lineWidth=3;
		canvas.fillRect(this.mainWindow.x, this.mainWindow.y, this.mainWindow.w, this.mainWindow.h);
		canvas.strokeRect(this.mainWindow.x, this.mainWindow.y, this.mainWindow.w, this.mainWindow.h);
		//Draw Window title
		canvas.textAlign = "left";
		canvas.textBaseline = "top";
		canvas.font = "normal 36px Tahoma";
		canvas.fillStyle = "#FFF";
		canvas.fillText("Congratulations!", this.mainWindow.x+10, this.mainWindow.y, this.mainWindow.w);
		//Draw window image
		canvas.drawImage(game.images.coin, this.mainWindow.x+95, this.mainWindow.y+55, 150, 150);
		canvas.drawImage(game.images.coin, this.mainWindow.x+295, this.mainWindow.y+55, 150, 150);
		canvas.drawImage(game.images.coin, this.mainWindow.x+495, this.mainWindow.y+55, 150, 150);
		//Draw Window instructions
		canvas.font = "normal 24px Tahoma";
		canvas.fillText("You have reached the end of the level!", this.mainWindow.x+10, this.mainWindow.y+50+200, this.mainWindow.w-20);
		//draw the buttons
		for(var i=0; i<this.buttons.length; i++){
			drawButton(this.buttons[i], canvas);
		}
	}
};
var gamePauseScene = {
	mainWindow: { x:1280/2-500/2, y:720/2-300/2, w:500, h:300 },
	buttons: [
		{ x:1280/2-430/2, y:720/2-50/2-50, w:430, h:50, sdx:0, sdy:870, shx:432, shy:871, text:"Unpause", onClick:function(){ game.currentScene = gameScene; } },//Back Button
		{ x:1280/2-430/2, y:720/2-50/2+20, w:430, h:50, sdx:0, sdy:870, shx:432, shy:871, text:"Save", onClick:function(){ game.currentScene = gameSaveScene; } },//Save Button
		{ x:1280/2-430/2, y:720/2-50/2+90, w:430, h:50, sdx:0, sdy:870, shx:432, shy:871, text:"Main Menu", onClick:function(){ gameScene.backgroundMusic.stop(0); gameScene.backgroundMusic = null; game.currentScene = menuScene; } },//Menu Button
	],
	processInput: function(gameContext, keyboard, mouse){
		if(keyboard.getKeyDown("p")){//pause
			gameContext.currentScene = gameScene;
		}
		for(var i=0; i<this.buttons.length; i++){
			updateButton(this.buttons[i], mouse);
		}
	},
	update: function(gameContext, deltaTime){
	},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		//print the game in background
		gameScene.render(gameContext);
		//turn the game in the blackground darker by drawind a non-opaque black square on the canvas
		canvas.fillStyle = "rgba(0, 0, 0, 0.8)";
		canvas.fillRect(0, 0, 1280, 720);
		//draw the main window
		canvas.fillStyle = "rgba(71,77,119,0.8)";
		canvas.strokeStyle = "rgba(101,106,137,0.8)";
		canvas.lineWidth=3;
		canvas.fillRect(this.mainWindow.x, this.mainWindow.y, this.mainWindow.w, this.mainWindow.h);
		canvas.strokeRect(this.mainWindow.x, this.mainWindow.y, this.mainWindow.w, this.mainWindow.h);
		//Draw Window title
		canvas.textAlign = "left";
		canvas.textBaseline = "top";
		canvas.font = "normal 36px Tahoma";
		canvas.fillStyle = "#FFF";
		canvas.fillText("Pause Menu", this.mainWindow.x+10, this.mainWindow.y, this.mainWindow.w);
		//draw the buttons
		for(var i=0; i<this.buttons.length; i++){
			drawButton(this.buttons[i], canvas);
		}
	}
}

var gameSaveScene = {
	mainWindow: { x:1280/2-1050/2, y:720/2-560/2, w:1050, h:560 },
	buttons: [ 
		{ x:157, y:542, w:430, h:50, sdx:0, sdy:870, shx:432, shy:871, text:"Cancel", onClick:function(){ game.currentScene = gamePauseScene; } },//MainMenu
		//{ x:157, y:171, w:914, h:49, sdx:0, sdy:0, shx:0, shy:0, onClick:function(){ alert("Nanana"); }, saveName:"Autosave" },//Slot0
		{ x:157, y:227, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ gameSaveScene.saveButtonClick("Slot 1"); }, saveName:"Slot 1" },//Slot1
		{ x:157, y:283, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ gameSaveScene.saveButtonClick("Slot 2"); }, saveName:"Slot 2" },//Slot2
		{ x:157, y:339, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ gameSaveScene.saveButtonClick("Slot 3"); }, saveName:"Slot 3" },//Slot3
		{ x:157, y:395, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ gameSaveScene.saveButtonClick("Slot 4"); }, saveName:"Slot 4" },//Slot4
		{ x:157, y:451, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ gameSaveScene.saveButtonClick("Slot 5"); }, saveName:"Slot 5" },//Slot5
	],
	saveButtonClick: function(slotName){
		localStorage[slotName] = JSON.stringify(gameScene.createSaveGame());
		game.currentScene = gamePauseScene;
	},
	processInput: function(gameContext, keyboard, mouse){
		for(var i=0; i<this.buttons.length; i++){
			updateButton(this.buttons[i], mouse);
		}
	},
	update: function(gameContext, deltaTime){
	},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		//print the game in background
		gameScene.render(gameContext);
		//turn the game in the blackground darker by drawind a non-opaque black square on the canvas
		canvas.fillStyle = "rgba(0, 0, 0, 0.8)";
		canvas.fillRect(0, 0, 1280, 720);
		//draw the main window
		canvas.fillStyle = "rgba(71,77,119,0.8)";
		canvas.strokeStyle = "rgba(101,106,137,0.8)";
		canvas.lineWidth=3;
		canvas.fillRect(this.mainWindow.x, this.mainWindow.y, this.mainWindow.w, this.mainWindow.h);
		canvas.strokeRect(this.mainWindow.x, this.mainWindow.y, this.mainWindow.w, this.mainWindow.h);
		//Draw Window title
		canvas.textAlign = "left";
		canvas.textBaseline = "top";
		canvas.font = "normal 36px Tahoma";
		canvas.fillStyle = "#FFF";
		canvas.fillText("Save Menu", this.mainWindow.x+10, this.mainWindow.y, this.mainWindow.w);
		//draw the buttons
		for(var i=0; i<this.buttons.length; i++){
			if(this.buttons[i].saveName){
				var saveName = this.buttons[i].saveName;
				this.buttons[i].text = saveName + ": ";
				if(localStorage[saveName]){
					var saveContent = JSON.parse(localStorage[saveName]);
					var sdate = new Date(saveContent.date);
					this.buttons[i].text += saveContent.levelName + " - " + sdate.getFullYear() + "." + (sdate.getMonth()+1) + "." + sdate.getDate() + " @ " + sdate.getHours() + ":" + sdate.getMinutes() + ":" + sdate.getSeconds() + " - " + saveContent.pts;
				}else{
					this.buttons[i].text  += "Empty Slot";
				}
			}
			drawButton(this.buttons[i], canvas);
		}
	}
}


//Game
var gameScene = {
	gravity: { x:0, y:0.3 },
	mainCharacter: {
		position: { x:NaN, y:NaN },
		size: { w:30, h:45 },
		speed: { x:NaN, y:NaN },
		acceleration: { x:NaN, y:NaN },
		points: NaN,
		timeStart: NaN,
		lifes: NaN,
		jumpRequested: false,
		crouching: false,
		spritePosition: { x:NaN, y:NaN },
		spriteChangeTime: NaN,
		lookingDirection: +1,
	},
	enemy: [],
	checkpoints: [],
	checkpointsLocation: [],
	nextCheckpointIndex: NaN,
	mainCamera: {
		position: { x:NaN, y:NaN },
		zoomRatio: NaN,
		differential: { x:NaN, y:NaN },
	},
	platforms: [],//ok
	surfaces: [],//ok
	ropes: [],//ok
	ladders_pipes: [],//ok
	poles: [],//todo
	billboards: [],//ok
	coinWidth: 20,
	coins: [],
	other_objects: [],
	levelImages: {
		background: null,
		platformsBack: null,
		platformsFront: null,
	},
	levelName: null,
	levelProcessInput: null,
	levelUpdate: null,
	levelRender: null,
	levelEnd: null,
	levelNext: null,
	levelExtras: {},
	gameTime: 0,
	backgroundMusic: null,
	createCheckpoint: function(){
		this.checkpoints.unshift({
			mainCharacter: JSON.stringify(this.mainCharacter),
			mainCamera: JSON.stringify(this.mainCamera),
			coins: JSON.stringify(this.coins),
			enemy: JSON.stringify(this.enemy)
		});
	},
	restoreCheckpoint: function(i){
		i = i || 0;
		if(i>=this.checkpoints.length)return false;
		this.mainCharacter = JSON.parse(this.checkpoints[i].mainCharacter);
		this.mainCharacter.speed.x = 0;
		this.mainCamera = JSON.parse(this.checkpoints[i].mainCamera);
		this.coins = JSON.parse(this.checkpoints[i].coins);
		this.enemy = JSON.parse(this.checkpoints[i].enemy);
		return true;
	},
	loadSaveGame: function(saveContent){
		var level = getLevelByName(saveContent.levelName)
		gameScene.loadLevel(level);
		gameScene.checkpoints[0].mainCharacter = JSON.stringify(saveContent.data.mainCharacter);
		gameScene.checkpoints[0].mainCamera = JSON.stringify(saveContent.data.mainCamera);
		gameScene.checkpoints[0].coins = JSON.stringify(saveContent.data.coins);
		gameScene.checkpoints[0].enemy = JSON.stringify(saveContent.data.enemy);
		gameScene.restoreCheckpoint(0);
	},
	createSaveGame: function(saveContent){
		return {
			levelName: gameScene.levelName,
			date: new Date().getTime(),
			pts: gameScene.mainCharacter.points,
			data: {
				mainCharacter: gameScene.mainCharacter,
				mainCamera: gameScene.mainCamera,
				coins: gameScene.coins,
				enemy: gameScene.enemy
			}
		}
	},
	loadLevel : function(newLevel){
		this.levelName = newLevel.name;
		this.levelImages = {
			background: game.images[newLevel.imgNameBackground],
			platformsBack: game.images[newLevel.imgNamePlatformsBack],
			platformsFront: game.images[newLevel.imgNamePlatformsFront],
		};
		//Copy Character
		this.mainCharacter.position = JSON.parse(JSON.stringify(newLevel.mainCharacter.position));
		this.mainCharacter.speed = { x:0, y:0 };
		this.mainCharacter.acceleration = { x:0, y:0 };
		this.mainCharacter.points = 0;
		this.mainCharacter.timeStart = new Date().getTime();
		this.mainCharacter.lifes = 3;
		this.mainCharacter.lookingDirection = +1;
		this.mainCharacter.spritePosition = { x:0, y:0 };
		this.mainCharacter.spriteChangeTime = new Date().getTimezoneOffset();
		//Copy Camera
		this.mainCamera.position = JSON.parse(JSON.stringify(newLevel.mainCamera.position));
		this.mainCamera.zoomRatio = newLevel.mainCamera.zoomRatio;
		this.mainCamera.differential = { x:0, y:0 };
		//Copy Objects(platforms, ropes, ladders, pipes, poles, billboards, coins)
		this.platforms = JSON.parse(JSON.stringify(newLevel.platforms));
		this.ropes = JSON.parse(JSON.stringify(newLevel.ropes));
		this.surfaces = JSON.parse(JSON.stringify(newLevel.surfaces));
		this.ladders_pipes = JSON.parse(JSON.stringify(newLevel.ladders_pipes));
		this.poles = JSON.parse(JSON.stringify(newLevel.poles));
		this.billboards = JSON.parse(JSON.stringify(newLevel.billboards));
		this.coins = JSON.parse(JSON.stringify(newLevel.coins));
		this.enemy = JSON.parse(JSON.stringify(newLevel.enemy));
		this.other_objects = [];
		//Reset and create an inicial checkpoint
		this.checkpoints = [];
		this.checkpointsLocation = JSON.parse(JSON.stringify(newLevel.checkpoints));
		this.nextCheckpointIndex = 0;
		//copy extra stuff
		this.levelProcessInput = newLevel.extraProcessInput;
		this.levelUpdate = newLevel.extraUpdate;
		this.levelRender = newLevel.extraRender;
		this.levelEnd = newLevel.levelEnd;
		this.levelNext = newLevel.levelNext;
		this.levelExtras = JSON.parse(JSON.stringify(newLevel.extras)),
		//
		this.gameTime = 0;
		//
		this.createCheckpoint();
	},
	processInput: function(gameContext, keyboard, mouse){
		var runSpeed = 4;
		this.mainCharacter.jumpRequested = keyboard.getKeyDown("w");
		if(keyboard.getKeyDown("a")){//run left, start
			this.mainCharacter.speed.x -= runSpeed;
			this.mainCharacter.lookingDirection = -1;
		}
		if(keyboard.getKeyUp("a")){//run left, end
			this.mainCharacter.speed.x += runSpeed;
		}
		if(keyboard.getKeyDown("d")){//run right, start
			this.mainCharacter.speed.x += runSpeed;
			this.mainCharacter.lookingDirection = +1;
		}
		if(keyboard.getKeyUp("d")){//run right, end
			this.mainCharacter.speed.x -= runSpeed;
		}
		if(keyboard.getKeyDown(" ")){//gun
			game.audios.play("gunshot");
			this.other_objects.push({
				boundBox: { x:this.mainCharacter.position.x+(this.mainCharacter.lookingDirection>0?this.mainCharacter.size.w:0), y:this.mainCharacter.position.y+this.mainCharacter.size.h/2, w:10, h:5 },
				accX: this.mainCharacter.lookingDirection,
				update: function(gameContext, deltaTime, parentScene){
					this.boundBox.x += this.accX*10;
					for(var i=0; i<parentScene.platforms.length; i++){
						if(checkBoxBoxCollision(this.boundBox, parentScene.platforms[i])){
							return false;
						}
					}
					//check for enemy collision
					for(var i=0; i<gameScene.enemy.length; i++){
						var enemyBB = { x:gameScene.enemy[i].position.x, y:gameScene.enemy[i].position.y, w:gameScene.enemy[i].size.w, h:gameScene.enemy[i].size.h };
						if(checkBoxBoxCollision(this.boundBox, enemyBB)){
							gameScene.enemy.splice(i, 1); 
							game.audios.play("damage");
							return false;
						}
					}
					return true;
				},
				render: function(gameContext, parentScene){
					var canvas = gameContext.canvasContext;
					var bullet = gameContext.images.bullet;
					//draw background
					canvas.drawImage(bullet, this.boundBox.x, this.boundBox.y, this.boundBox.w, this.boundBox.h);
				}
			});
		}
		if(keyboard.getKeyDown("p") || (mouse.getMouseDown() && checkBoxPointCollision({x:5,y:110,w:23,h:23}, mouse.getMousePosition()))){//pause
			gameContext.currentScene = gamePauseScene;
		}
		if(this.levelProcessInput){
			this.levelProcessInput(gameContext, keyboard, mouse, this);
		}
	},
	update: function(gameContext, deltaTime){
		this.gameTime += deltaTime;
		if(this.backgroundMusic==null){
			this.backgroundMusic = gameContext.audios.play("playing");
		}
		{//Update main Character
			var jumpAcceleration = 5;
			//update mainCharacter.speed: discrete integrate acceleration and gravity
			this.mainCharacter.speed.x += this.mainCharacter.acceleration.x + this.gravity.x;
			this.mainCharacter.speed.y += this.mainCharacter.acceleration.y + this.gravity.y;
			if(this.mainCharacter.speed.y>5)this.mainCharacter.speed.y=5;//limit falling speed
			//get new position: discrete integrate speed
			var newPosition = { x:this.mainCharacter.position.x, y:this.mainCharacter.position.y };
			var oldPosition = { x:this.mainCharacter.position.x, y:this.mainCharacter.position.y };
			var overrideSpeed = false;
			var spriteAnimation = 0;
			//check for ropes,ladders,pipes and update position
			for(var i=0; i<this.ropes.length; i++){
				var mainCharacterBoundingBox = { x:this.mainCharacter.position.x+this.mainCharacter.size.w/4, y:this.mainCharacter.position.y, w:this.mainCharacter.size.w/2, h:this.mainCharacter.size.h/4 };
				var rlp = this.ropes[i];
				if(checkBoxLineSegmentIntersections(mainCharacterBoundingBox, rlp).length>0){
					overrideSpeed = true;
					var vectl = { x:rlp.x1-rlp.x0, y:rlp.y1-rlp.y0 };
					var modv = Math.sqrt(vectl.x*vectl.x+vectl.y*vectl.y);
					var nvectl = { x:vectl.x/modv*this.mainCharacter.speed.x/2, y:vectl.y/modv*this.mainCharacter.speed.x/2 };
					this.mainCharacter.speed.y = 0;
					newPosition.x += nvectl.x;
					newPosition.y += nvectl.y;
					spriteAnimation = 12;
				}
			}
			for(var i=0; i<this.ladders_pipes.length; i++){
				var mainCharacterBoundingBox = { x:this.mainCharacter.position.x, y:this.mainCharacter.position.y, w:this.mainCharacter.size.w, h:this.mainCharacter.size.h };
				var rlp = this.ladders_pipes[i];
				if(checkBoxLineSegmentIntersections(mainCharacterBoundingBox, rlp).length>0){
					overrideSpeed = true;
					var vectl = { x:rlp.x1-rlp.x0, y:rlp.y1-rlp.y0 };
					var modv = Math.sqrt(vectl.x*vectl.x+vectl.y*vectl.y);
					var nvectl = { x:vectl.x/modv*this.mainCharacter.speed.x/2, y:vectl.y/modv*this.mainCharacter.speed.x/2 };
					this.mainCharacter.speed.y = 0;
					newPosition.x += nvectl.x;
					newPosition.y += nvectl.y;
					spriteAnimation = 11;
				}
			}
			for(var i=0; i<this.poles.length; i++){
				var mainCharacterBoundingBox = { x:this.mainCharacter.position.x, y:this.mainCharacter.position.y, w:this.mainCharacter.size.w, h:10 };
				var p = this.poles[i];
				if(checkBoxPointCollision(mainCharacterBoundingBox, p)){
					this.mainCharacter.speed.y = Math.min(0, this.mainCharacter.speed.y);
					spriteAnimation = 14;
					if(this.mainCharacter.jumpRequested){
						//spriteAnimation = 13;
						this.mainCharacter.speed.y -= jumpAcceleration;
						game.audios.play("jump");
					}
				}
			}
			if(overrideSpeed==false){
				newPosition.x += this.mainCharacter.speed.x;
				newPosition.y += this.mainCharacter.speed.y;
			};
			//Check for platform collision and fix newPosition
			for(var i=0; i<this.surfaces.length; i++){
				var rls = this.surfaces[i];
				var characterMBO = { x:oldPosition.x+this.mainCharacter.size.w/2, y:oldPosition.y+this.mainCharacter.size.h };
				var characterMBN = { x:newPosition.x+this.mainCharacter.size.w/2, y:newPosition.y+this.mainCharacter.size.h };
				var m=(rls.y1-rls.y0)/(rls.x1-rls.x0), b=-(rls.x0*m-rls.y0);
				var opy=m*characterMBO.x+b, npy=m*characterMBN.x+b;
				if(Math.min(rls.x0, rls.x1)<=characterMBN.x+5 && characterMBN.x-5<=Math.max(rls.x0, rls.x1) && characterMBO.y-opy<=0 && characterMBN.y-npy>=0){
					newPosition.y = npy-this.mainCharacter.size.h-1;
					spriteAnimation = 1;
					if(this.mainCharacter.jumpRequested){
						//spriteAnimation = 13;
						this.mainCharacter.speed.y = Math.min(this.mainCharacter.speed.y, 0)-jumpAcceleration;
						game.audios.play("jump");
					}
				}
			}
			for(var i=0; i<this.platforms.length; i++){
				var platform = this.platforms[i];
				if(newPosition.y+this.mainCharacter.size.h>=platform.y && platform.y+platform.h>=newPosition.y){
					if(oldPosition.x<newPosition.x && oldPosition.x+this.mainCharacter.size.w<=platform.x && newPosition.x+this.mainCharacter.size.w>platform.x){//going right, check for collision on left side
						newPosition.x = platform.x-this.mainCharacter.size.w;//limit the move
						this.mainCharacter.speed.y -= this.gravity.y/2;//slide/climb the wall, reduce the gravity by half
					}else if(oldPosition.x>newPosition.x && oldPosition.x>=platform.x+platform.w && newPosition.x<platform.x+platform.w){//going left, check for collision on right side
						newPosition.x = platform.x+platform.w;//limit the move
						this.mainCharacter.speed.y -= this.gravity.y/2;//slide/climb the wall, reduce the gravity by half
					}
				}
				if(newPosition.x+this.mainCharacter.size.w>=platform.x && platform.x+platform.w>=newPosition.x){
					if(oldPosition.y<newPosition.y && oldPosition.y+this.mainCharacter.size.h<=platform.y && newPosition.y+this.mainCharacter.size.h>platform.y){//going down, check for collision on top side
						newPosition.y = platform.y-this.mainCharacter.size.h;//limit the move
						this.mainCharacter.speed.y = 0;
						spriteAnimation = 1;
						if(this.mainCharacter.jumpRequested){
							//spriteAnimation = 13;
							this.mainCharacter.speed.y -= jumpAcceleration;
							game.audios.play("jump");
						}
					}else if(oldPosition.y>newPosition.y && oldPosition.y>=platform.y+platform.h && newPosition.y<platform.y+platform.h){//going up, check for collision on bottom side
						newPosition.y = platform.y+platform.h;//limit the move
						this.mainCharacter.speed.y = 0;
					}
				}
			}
			//check for billboards and update speed
			for(var i=0; i<this.billboards.length; i++){
				var mainCharacterBoundingBox = { x:newPosition.x, y:newPosition.y, w:this.mainCharacter.size.w, h:this.mainCharacter.size.h };
				if(checkBoxBoxCollision(mainCharacterBoundingBox, this.billboards[i])){
					this.mainCharacter.speed.y -= this.gravity.y/2;
					spriteAnimation = 14;
				}
			}
			if(spriteAnimation==1 && this.mainCharacter.speed.x==0){
				spriteAnimation = 7;
			}
			if(spriteAnimation==0){
				spriteAnimation = 14;
			}
			if(sprites[spriteAnimation].ly==this.mainCharacter.spritePosition.y && sprites[spriteAnimation].lx<=this.mainCharacter.spritePosition.x && this.mainCharacter.spritePosition.x<sprites[spriteAnimation].lx+sprites[spriteAnimation].len){//same sprite
				if(new Date().getTime()-this.mainCharacter.spriteTime>sprites[spriteAnimation].speed){
					this.mainCharacter.spritePosition.x++;
					if(this.mainCharacter.spritePosition.x>=sprites[spriteAnimation].lx+sprites[spriteAnimation].len){
						var ne = sprites[spriteAnimation].next;
						this.mainCharacter.spritePosition.x = sprites[ne].lx;
						this.mainCharacter.spritePosition.y = sprites[ne].ly;
					}
					this.mainCharacter.spriteTime = new Date().getTime();
					if(spriteAnimation==1 || spriteAnimation==3 || spriteAnimation==5 || spriteAnimation==6){
						game.audios.play("run");
					}
				}
			}else{//changing sprite
				this.mainCharacter.spritePosition.x = sprites[spriteAnimation].lx;
				this.mainCharacter.spritePosition.y = sprites[spriteAnimation].ly;
				this.mainCharacter.spriteTime = new Date().getTime();
			}
			
			//update mainCharacter.position
			this.mainCharacter.position.x = newPosition.x;
			this.mainCharacter.position.y = newPosition.y;
		};
		for(var i=0; i<this.enemy.length; i++){//Update main Character
			if(this.enemy[i].position.y>1000)continue;
			var enemyAcc = { x:0, y:0 };
			var distEnemyMainCharacter = Math.abs((this.enemy[i].position.x+this.enemy[i].size.w/2)-(this.mainCharacter.position.x+this.mainCharacter.size.w/2));
			if(this.enemy[i].position.x+this.enemy[i].size.w/2<this.mainCharacter.position.x+this.mainCharacter.size.w/2){//enemy is before character, enemy look right
				this.enemy[i].lookingDirection = +1;
			}else{
				this.enemy[i].lookingDirection = -1;
			}
			if(100<distEnemyMainCharacter && distEnemyMainCharacter<300){
				enemyAcc.x = this.enemy[i].lookingDirection*1;
			}else{
				enemyAcc.x = 0;
			}
			if(distEnemyMainCharacter<200 && Math.random()<0.05 && new Date().getTime()-this.enemy[i].lastFireTime>500){
				this.enemy[i].lastFireTime = new Date().getTime();
				if(this.enemy[i].gun==0){
					game.audios.play("gunshot");
					var mainCharacterHA = { x:this.mainCharacter.position.x-20, y:this.mainCharacter.position.y-20, w:this.mainCharacter.size.w+20, h:this.mainCharacter.size.h+20 };
					var bulletBox = { x:this.enemy[i].position.x+(this.enemy[i].lookingDirection>0?this.enemy[i].size.w+10:-10), y:this.enemy[i].position.y+6, w:10, h:10 };
					if(checkBoxBoxCollision(bulletBox, mainCharacterHA)){
						if(Math.floor(this.mainCharacter.lifes-0.001)!=Math.floor(this.mainCharacter.lifes-0.6)){
							game.currentScene = gamePlayerDieScene;
							var audioName = "dying" + ((Math.random()*3<<0)%3).toString();
							game.audios.play(audioName);
						}else{
							this.mainCharacter.lifes -= 0.6;
							game.audios.play("damage");
						}
					}
				}else if(this.enemy[i].gun==1){
					game.audios.play("gunshot");
					this.other_objects.push({
						boundBox: { x:this.enemy[i].position.x+(this.enemy[i].lookingDirection>0?this.enemy[i].size.w+10:-10), y:this.enemy[i].position.y+6, w:10, h:10 },
						accX: this.enemy[i].lookingDirection,
						update: function(gameContext, deltaTime, parentScene){
							this.boundBox.x += this.accX*5;
							for(var i=0; i<parentScene.platforms.length; i++){
								if(checkBoxBoxCollision(this.boundBox, parentScene.platforms[i])){
									return false;
								}
							}
							var mainCharacterBB = { x:parentScene.mainCharacter.position.x, y:parentScene.mainCharacter.position.y, w:parentScene.mainCharacter.size.w, h:parentScene.mainCharacter.size.h };
							if(checkBoxBoxCollision(this.boundBox, mainCharacterBB)){
								if(Math.floor(parentScene.mainCharacter.lifes-0.001)!=Math.floor(parentScene.mainCharacter.lifes-0.3)){
									game.currentScene = gamePlayerDieScene;
									var audioName = "dying" + ((Math.random()*3<<0)%3).toString();
									game.audios.play(audioName);
								}else{
									parentScene.mainCharacter.lifes -= 0.3;
									game.audios.play("damage");
								}
								return false;
							}
							for(var i=0; i<parentScene.enemy.length; i++){
								var enemyBB = { x:parentScene.enemy[i].position.x, y:parentScene.enemy[i].position.y, w:parentScene.enemy[i].size.w, h:parentScene.enemy[i].size.h };
								if(checkBoxBoxCollision(this.boundBox, enemyBB)){
									parentScene.enemy.splice(i, 1); 
									game.audios.play("damage");
									return false;
								}
							}
							//check for enemy collision
							return true;
						},
						render: function(gameContext, parentScene){
							var canvas = gameContext.canvasContext;
							var bullet = gameContext.images.bullet;
							//draw background
							canvas.drawImage(bullet, this.boundBox.x, this.boundBox.y, this.boundBox.w, this.boundBox.h);
						}
					});
				}
			}
			//update mainCharacter.speed: discrete integrate acceleration and gravity
			this.enemy[i].speed.x += enemyAcc.x + this.gravity.x;
			this.enemy[i].speed.y += enemyAcc.y + this.gravity.y;
			if(this.enemy[i].speed.y>5)this.enemy[i].speed.y=5;//limit falling speed
			if(this.enemy[i].speed.x>2)this.enemy[i].speed.x=2;
			if(this.enemy[i].speed.x<-2)this.enemy[i].speed.x=-2;
			//get new position: discrete integrate speed
			var newEnemyPosition = { x:this.enemy[i].position.x+this.enemy[i].speed.x, y:this.enemy[i].position.y+this.enemy[i].speed.y };
			var oldEnemyPosition = { x:this.enemy[i].position.x, y:this.enemy[i].position.y };
			//Check for platform collision and fix newEnemyPosition
			for(var j=0; j<this.platforms.length; j++){
				var platform = this.platforms[j];
				if(newEnemyPosition.y+this.enemy[i].size.h>=platform.y && platform.y+platform.h>=newEnemyPosition.y){
					if(oldEnemyPosition.x<newEnemyPosition.x && oldEnemyPosition.x+this.enemy[i].size.w<=platform.x && newEnemyPosition.x+this.enemy[i].size.w>platform.x){//going right, check for collision on left side
						newEnemyPosition.x = platform.x-this.enemy[i].size.w;//limit the move
						this.enemy[i].speed.y -= this.gravity.y/2;//slide/climb the wall, reduce the gravity by half
					}else if(oldEnemyPosition.x>newEnemyPosition.x && oldEnemyPosition.x>=platform.x+platform.w && newEnemyPosition.x<platform.x+platform.w){//going left, check for collision on right side
						newEnemyPosition.x = platform.x+platform.w;//limit the move
						this.enemy[i].speed.y -= this.gravity.y/2;//slide/climb the wall, reduce the gravity by half
					}
				}
				if(newEnemyPosition.x+this.enemy[i].size.w>=platform.x && platform.x+platform.w>=newEnemyPosition.x){
					if(oldEnemyPosition.y<newEnemyPosition.y && oldEnemyPosition.y+this.enemy[i].size.h<=platform.y && newEnemyPosition.y+this.enemy[i].size.h>platform.y){//going down, check for collision on top side
						newEnemyPosition.y = platform.y-this.enemy[i].size.h;//limit the move
						this.enemy[i].speed.y = 0;
					}else if(oldEnemyPosition.y>newEnemyPosition.y && oldEnemyPosition.y>=platform.y+platform.h && newEnemyPosition.y<platform.y+platform.h){//going up, check for collision on bottom side
						newEnemyPosition.y = platform.y+platform.h;//limit the move
						this.enemy[i].speed.y = 0;
					}
				}
			}
			//update mainCharacter.position
			this.enemy[i].position.x = newEnemyPosition.x;
			this.enemy[i].position.y = newEnemyPosition.y;
		};
		//check level
		if(this.mainCharacter.position.x>=this.levelEnd){
			levelEndScene.nextLevel = this.levelNext;
			gameContext.currentScene = levelEndScene;
			game.audios.play("win");
		}
		if(this.mainCharacter.position.y>720){
			game.currentScene = gamePlayerDieScene;
			var audioName = "dying" + ((Math.random()*3<<0)%3).toString();
			game.audios.play(audioName);
		}
		if(this.mainCharacter.lifes<=0){
			game.currentScene = menuScene;
		}
		{//update camera
			var defaultZoom = 1.5;
			var mainCharacterSpeedVectorLength = Math.sqrt(this.mainCharacter.speed.x*this.mainCharacter.speed.x+this.mainCharacter.speed.y*this.mainCharacter.speed.y);
			this.mainCamera.differential.x = (7*this.mainCamera.differential.x+1*this.mainCharacter.speed.x)/8;
			this.mainCamera.differential.y = (7*this.mainCamera.differential.y+1*this.mainCharacter.speed.y)/8;
			this.mainCamera.zoomRatio = (3*(this.mainCamera.zoomRatio)+1*(defaultZoom-mainCharacterSpeedVectorLength/30))/4;
			this.mainCamera.position.x = 200-(this.mainCharacter.position.x-this.mainCharacter.size.w/2)*this.mainCamera.zoomRatio-5*this.mainCamera.differential.x;
			this.mainCamera.position.y = 720/2-(this.mainCharacter.position.y-this.mainCharacter.size.h/2)*this.mainCamera.zoomRatio-5*this.mainCamera.differential.y;
			var cameraMinY = 720*(1-this.mainCamera.zoomRatio);
			if(this.mainCamera.position.y<cameraMinY)this.mainCamera.position.y=cameraMinY;
		}
		{//Check for coins
			for(var i=0; i<this.coins.length; i++){
				var mainCharacterBoundingBox = { x:newPosition.x, y:newPosition.y, w:this.mainCharacter.size.w, h:this.mainCharacter.size.h };
				var coinBoundingBox = { x:this.coins[i].x-this.coinWidth/2, y:this.coins[i].y-this.coinWidth/2, w:this.coinWidth, h:this.coinWidth };
				if(checkBoxBoxCollision(mainCharacterBoundingBox, coinBoundingBox)){
					this.coins.splice(i, 1);
					i--;
					game.audios.play("coin");
					this.mainCharacter.points++;
				}
			};
		}
		//check for checkpoints
		if(this.nextCheckpointIndex<this.checkpointsLocation.length && newPosition.x>=this.checkpointsLocation[this.nextCheckpointIndex]){
			this.nextCheckpointIndex++;
			this.createCheckpoint();
			localStorage["Autosave"] = JSON.stringify(this.createSaveGame());
		}
		//update extra objects
		for(var i=0; i<this.other_objects.length; i++){
			if(this.other_objects[i].update(gameContext, deltaTime, this)==false){
				this.other_objects.splice(i, 1); 
				i--;
			}
		}
		//update level extra
		if(this.levelUpdate){
			this.levelUpdate(gameContext, deltaTime, this);
		}
	},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		var characterImg = gameContext.images.spritesheet;
		var coinImg = gameContext.images.coin;
		//draw background
		canvas.drawImage(this.levelImages.background, 0, 0);
		//move camera
		canvas.save();
			canvas.translate(this.mainCamera.position.x, this.mainCamera.position.y);
			canvas.scale(this.mainCamera.zoomRatio, this.mainCamera.zoomRatio);
			/*
			//DEBUG: Draw Platforms
			canvas.fillStyle = "#000";
			canvas.strokeStyle = "#F00";
			for(var i=0; i<this.platforms.length; i++){
				canvas.strokeRect(this.platforms[i].x, this.platforms[i].y, this.platforms[i].w, this.platforms[i].h);
				canvas.fillRect(this.platforms[i].x, this.platforms[i].y, this.platforms[i].w, this.platforms[i].h);
			}
			//DEBUG: Draw Ropes,Ladders,Pipes
			canvas.strokeStyle = "#00F";
			for(var i=0; i<this.surfaces.length; i++){
				canvas.beginPath();
				var m=(this.surfaces[i].y1-this.surfaces[i].y0)/(this.surfaces[i].x1-this.surfaces[i].x0), b=-(this.surfaces[i].x0*m-this.surfaces[i].y0);
				var x0=0, x1=10000;
				var y0=m*x0+b, y1=m*x1+b;
				canvas.moveTo(x0, y0);
				canvas.lineTo(x1, y1);
				//canvas.moveTo(this.surfaces[i].x0, this.surfaces[i].y0);
				//canvas.lineTo(this.surfaces[i].x1, this.surfaces[i].y1);
				canvas.closePath();
				canvas.stroke();
			}
			for(var i=0; i<this.ladders_pipes.length; i++){
				canvas.beginPath();
				canvas.moveTo(this.ladders_pipes[i].x0, this.ladders_pipes[i].y0);
				canvas.lineTo(this.ladders_pipes[i].x1, this.ladders_pipes[i].y1);
				canvas.closePath();
				canvas.stroke();
			}
			for(var i=0; i<this.ropes.length; i++){
				canvas.beginPath();
				canvas.moveTo(this.ropes[i].x0, this.ropes[i].y0);
				canvas.lineTo(this.ropes[i].x1, this.ropes[i].y1);
				canvas.closePath();
				canvas.stroke();
			}
			//DEBUG: Draw Poles
			canvas.fillStyle = "#000";
			for(var i=0; i<this.poles.length; i++){
				canvas.beginPath();
				canvas.arc(this.poles[i].x, this.poles[i].y, 5, 0, 2*Math.PI);
				canvas.closePath();
				canvas.stroke();
			}
			//DEBUG: Draw Character
			canvas.fillStyle = "#FFF";
			canvas.fillRect(this.mainCharacter.position.x, this.mainCharacter.position.y, this.mainCharacter.size.w, this.mainCharacter.size.h);
			//DEBUG: Draw enemy
			canvas.fillStyle = "#CCC";
			for(var i=0; i<this.enemy.length; i++){
				canvas.fillRect(this.enemy[i].position.x, this.enemy[i].position.y, this.enemy[i].size.w, this.enemy[i].size.h);
			}
			*/
			//Draw Rooftops
			canvas.drawImage(this.levelImages.platformsBack, 0, 0, this.levelImages.platformsBack.width, this.levelImages.platformsBack.height);
			//Draw Coins
			for(var i=0; i<this.coins.length; i++){
				canvas.drawImage(coinImg, this.coins[i].x-this.coinWidth/2, this.coins[i].y-this.coinWidth/2, this.coinWidth, this.coinWidth);
			}
			//Draw main character
			var spriteX = this.mainCharacter.lookingDirection<0?this.mainCharacter.spritePosition.x:characterImg.width/300-1-this.mainCharacter.spritePosition.x;
			canvas.drawImage(characterImg, spriteX*300, this.mainCharacter.spritePosition.y*450, 300, 450, this.mainCharacter.position.x, this.mainCharacter.position.y, this.mainCharacter.size.w, this.mainCharacter.size.h);//draw main character
			//Draw enemies
			for(var i=0; i<this.enemy.length; i++){
				var spx = Math.floor(new Date().getTime()/800)%3, spy=this.enemy[i].gun;
				spx = this.enemy[i].lookingDirection<0?spx:game.images.enemy.width/417-1-spx;
				canvas.drawImage(game.images.enemy, 417*spx, 592*spy, 417, 592, this.enemy[i].position.x, this.enemy[i].position.y, this.enemy[i].size.w, this.enemy[i].size.h);
			}
			//draw extra objects
			for(var i=0; i<this.other_objects.length; i++){
				this.other_objects[i].render(gameContext, this)
			}
		canvas.restore();
		//Draw HUD
		canvas.textAlign = "left";
		canvas.textBaseline = "top";
		canvas.font = "normal 24px Tahoma";
		canvas.fillStyle = "#FFF";
		//Draw hearts
		for(var i=0; i<this.mainCharacter.lifes; i++){
			var healthp = Math.min(this.mainCharacter.lifes-i, 1);
			canvas.drawImage(game.images.heart, 0, (1-healthp)*game.images.heart.height, game.images.heart.width, healthp*game.images.heart.height, 5+i*35, 10+(1-healthp)*30, 30, healthp*30);
		}
		//Draw Coins
		canvas.drawImage(game.images.coin, 0, 0, game.images.coin.width, game.images.coin.height, 5, 47, 30, 30);
		canvas.fillText(" X " + this.mainCharacter.points, 40, 47);
		//Draw Time
		canvas.fillText((this.gameTime/1000).toFixed(2), 5, 80);
		//draw Pause
		canvas.drawImage(game.images.menuButtons, 1264, 0, 23, 23, 5, 110, 23, 23);
		//Level extra render
		if(this.levelRender){
			this.levelRender(gameContext, this);
		}
	}
};
var gamePlayerDieScene = {
	t0: 0,
	dt: 0,
	processInput: function(gameContext, keyboard, mouse){
	},
	update: function(gameContext, deltaTime){
		var nt = new Date().getTime();
		this.dt = nt-this.t0;
		if(this.dt>5000){
			this.t0 = nt;
			this.dt = 0;
			var newCharacterLife = Math.ceil(gameScene.mainCharacter.lifes-1);
			if(newCharacterLife<=0){
				game.audios.play("gameover");
			}
		}
		if(this.dt>3000){
			gameScene.restoreCheckpoint();
			gameScene.mainCharacter.lifes = Math.ceil(gameScene.mainCharacter.lifes-1);
			gameScene.createCheckpoint();
			if(gameScene.mainCharacter.lifes>0){
				game.currentScene = gameScene;
			}else{
				game.currentScene = menuScene;
				if(gameScene.backgroundMusic==null){
					gameScene.backgroundMusic.stop(0);
					gameScene.backgroundMusic = null;
				}
			}
		}
	},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		if(this.dt<1000){
			//print the game in background
			gameScene.render(gameContext);
			//turn the game in the blackground darker by drawind a non-opaque black square on the canvas
			canvas.fillStyle = "rgba(0, 0, 0, "+((this.dt-0)/1000)+")";
			canvas.fillRect(0, 0, 1280, 720);
		}else{
			//
			canvas.fillStyle = "#000";
			canvas.fillRect(0, 0, 1280, 720);
			//draw the text inside the button
			canvas.textAlign = "center";
			canvas.textBaseline = "middle";
			canvas.font = "normal 42px Tahoma";
			canvas.fillStyle = "#FFF";
			var text = "";
			var newCharacterLife = Math.ceil(gameScene.mainCharacter.lifes-1);
			if(newCharacterLife>0){
				text = newCharacterLife + " hearts";
			}else{
				text = "GAME OVER";
			}
			canvas.fillText(text, 1280/2, 720/2);
		}
	}
}
var levelSelectScene = {
	buttons: [ 
		{ x:114, y:572, w:430, h:47, sdx:871, sdy:769, shx:871, shy:821, onClick:function(){ game.currentScene = menuScene; } },//MainMenu
		{ x:111, y:190, w:350, h:334, sdx:0, sdy:102, shx:351, shy:102, onClick:function(){ if(menuScene.backgroundMusic!=null){ menuScene.backgroundMusic.stop(0); menuScene.backgroundMusic = null; }; gameScene.loadLevel(levelTutorial); game.currentScene = gameScene;}, level:levelTutorial },//Level Tutorial
		{ x:482, y:190, w:350, h:334, sdx:701, sdy:102, shx:1052, shy:102, onClick:function(){ if(menuScene.backgroundMusic!=null){ menuScene.backgroundMusic.stop(0); menuScene.backgroundMusic = null; }; gameScene.loadLevel(level1); game.currentScene = gameScene;}, level:level1  },//Level1
		{ x:838, y:190, w:350, h:334, sdx:0, sdy:437, shx:353, shy:436, onClick:function(){ alert("TODO"); }, level:null  },//Level2
	],
	processInput: function(gameContext, keyboard, mouse){
		for(var i=0; i<this.buttons.length; i++){
			updateButton(this.buttons[i], mouse);
		}
	},
	update: function(gameContext, deletaTime){
	},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		canvas.drawImage(gameContext.images.menuLevel, 0, 0/*, 1280, 720*/);
		//draw the buttons
		for(var i=0; i<this.buttons.length; i++){
			drawButton(this.buttons[i], canvas);
			if(this.buttons[i].level){
				var imgBackground=game.images[this.buttons[i].level.imgNameBackground];
				var imgPlatforms=game.images[this.buttons[i].level.imgNamePlatformsBack];
				var sic = Math.min(imgBackground.width, imgBackground.height);
				//draw the level
				canvas.drawImage(imgBackground, 0, 0, sic, sic, this.buttons[i].x+50, this.buttons[i].y+25, this.buttons[i].w-100, this.buttons[i].h-100);
				canvas.drawImage(imgPlatforms, 0, 0, sic, sic,  this.buttons[i].x+50, this.buttons[i].y+25, this.buttons[i].w-100, this.buttons[i].h-100);
			}
		}
	}
}
var saveSelectScene = {
	buttons: [ 
		{ x:157, y:572, w:430, h:47, sdx:871, sdy:769, shx:871, shy:821, onClick:function(){ game.currentScene = menuScene; } },//MainMenu
		{ x:157, y:191, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ saveSelectScene.loadButtonClick("Autosave"); }, saveName:"Autosave" },//Slot0
		{ x:157, y:247, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ saveSelectScene.loadButtonClick("Slot 1"); }, saveName:"Slot 1" },//Slot1
		{ x:157, y:303, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ saveSelectScene.loadButtonClick("Slot 2"); }, saveName:"Slot 2" },//Slot2
		{ x:157, y:359, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ saveSelectScene.loadButtonClick("Slot 3"); }, saveName:"Slot 3" },//Slot3
		{ x:157, y:415, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ saveSelectScene.loadButtonClick("Slot 4"); }, saveName:"Slot 4" },//Slot4
		{ x:157, y:471, w:914, h:49, sdx:0, sdy:0, shx:0, shy:50, onClick:function(){ saveSelectScene.loadButtonClick("Slot 5"); }, saveName:"Slot 5" },//Slot5
	],
	loadButtonClick: function(saveName){
		var saveContentStr = localStorage[saveName];
		if(saveContentStr){
			var saveContent = JSON.parse(saveContentStr);
			gameScene.loadSaveGame(saveContent);
			game.currentScene = gameScene;
			if(menuScene.backgroundMusic!=null){
				menuScene.backgroundMusic.stop(0);
				menuScene.backgroundMusic = null;
			}
		}
	},
	processInput: function(gameContext, keyboard, mouse){
		for(var i=0; i<this.buttons.length; i++){
			updateButton(this.buttons[i], mouse);
		}		
	},
	update: function(gameContext, deletaTime){},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		canvas.drawImage(gameContext.images.menuSave, 0, 0/*, 1280, 720*/);
		//draw the buttons
		for(var i=0; i<this.buttons.length; i++){
			drawButton(this.buttons[i], canvas);
			if(this.buttons[i].saveName){
				var saveName = this.buttons[i].saveName;
				var slotStr = saveName + ": ";
				if(localStorage[saveName]){
					var saveContent = JSON.parse(localStorage[saveName]);
					var sdate = new Date(saveContent.date);
					slotStr += saveContent.levelName + " - " + sdate.getFullYear() + "." + (sdate.getMonth()+1) + "." + sdate.getDate() + " @ " + sdate.getHours() + ":" + sdate.getMinutes() + ":" + sdate.getSeconds() + " - " + saveContent.pts;
				}else{
					slotStr += "Empty Slot";
				}
				canvas.textAlign = "left";
				canvas.textBaseline = "top";
				canvas.font = "normal 36px Tahoma";
				canvas.fillStyle = "#FFF";
				canvas.fillText(slotStr, this.buttons[i].x+50, this.buttons[i].y);
			}
		}		
	},
}
var scoreboardScene = {
	buttons: [ 
		//1089,49
		{ x:157, y:572, w:430, h:47, sdx:871, sdy:769, shx:871, shy:821, onClick:function(){ game.currentScene = menuScene; } },//MainMenu
		{ x:748, y:571, w:166, h:49, sdx:923, sdy:0, shx:1092, shy:0, onClick:function(){ scoreboardScene.currentPage = Math.max(scoreboardScene.currentPage-1, 0); } },//<<
		{ x:899, y:571, w:166, h:49, sdx:915, sdy:52, shx:1086, shy:52, onClick:function(){ scoreboardScene.currentPage = Math.min(scoreboardScene.currentPage+1, Math.ceil(scoreboardScene.scoreData.length/6)-1); } },//>>
		{ x:157, y:191, w:914, h:49, sdx:0, sdy:0, shx:0, shy:0, isScore:true },//Slot0
		{ x:157, y:247, w:914, h:49, sdx:0, sdy:0, shx:0, shy:0, isScore:true },//Slot1
		{ x:157, y:303, w:914, h:49, sdx:0, sdy:0, shx:0, shy:0, isScore:true },//Slot2
		{ x:157, y:359, w:914, h:49, sdx:0, sdy:0, shx:0, shy:0, isScore:true },//Slot3
		{ x:157, y:415, w:914, h:49, sdx:0, sdy:0, shx:0, shy:0, isScore:true },//Slot4
		{ x:157, y:471, w:914, h:49, sdx:0, sdy:0, shx:0, shy:0, isScore:true },//Slot5
	],
	scoreData: undefined,
	currentPage: 0, 
	processInput: function(gameContext, keyboard, mouse){
		for(var i=0; i<this.buttons.length; i++){
			updateButton(this.buttons[i], mouse);
		}		
	},
	update: function(gameContext, deletaTime){
		if(this.scoreData==undefined){
			this.scoreData = null;
			setTimeout(function(){
				scoreboardScene.scoreData = [
					{ playerName:"A", score:0 },
					{ playerName:"B", score:0 },
					{ playerName:"C", score:0 },
					{ playerName:"D", score:0 },
					{ playerName:"E", score:0 },
					{ playerName:"F", score:0 },
					{ playerName:"G", score:0 },
					{ playerName:"H", score:0 },
					{ playerName:"I", score:0 },
					{ playerName:"J", score:0 },
					{ playerName:"K", score:0 },
					{ playerName:"L", score:0 },
					{ playerName:"M", score:0 },
					{ playerName:"N", score:0 },
					{ playerName:"O", score:0 },
					{ playerName:"P", score:0 },
					{ playerName:"Q", score:0 },
					{ playerName:"R", score:0 },
					{ playerName:"S", score:0 },
					{ playerName:"T", score:0 },
					{ playerName:"U", score:0 },
					{ playerName:"V", score:0 },
					{ playerName:"W", score:0 },
					{ playerName:"X", score:0 },
					{ playerName:"Y", score:0 },
					{ playerName:"Z", score:0 },
				];
				scoreboardScene.currentPage = 0;
			}, 700);
		}
	},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		canvas.drawImage(gameContext.images.menuScore, 0, 0/*, 1280, 720*/);
		//draw the buttons
		for(var i=0, btp=0; i<this.buttons.length; i++){
			drawButton(this.buttons[i], canvas);
			if(this.buttons[i].isScore){
				var buttonStr = "Loading...";
				if(this.scoreData){
					var scoreDataEntry = this.scoreData[this.currentPage*6+btp++];
					if(scoreDataEntry){
						buttonStr = "Player Name: " + scoreDataEntry.playerName + "         " + "Score: " + scoreDataEntry.score;
					}else{
						buttonStr = "";
					}
				}
				//loading
				canvas.textAlign = "left";
				canvas.textBaseline = "top";
				canvas.font = "normal 36px Tahoma";
				canvas.fillStyle = "#FFF";
				canvas.fillText(buttonStr, this.buttons[i].x+50, this.buttons[i].y);
			}
		}
	}
}
var creditsScene = {
	t0: 0,
	dt: 0,
	backgroundMusic: null,
	creditsText: "TEAM TIDE\n\n\nDamon An\n\nFlavio Bayer\n\nRyan Caigoy\n\nTsz Hang Ng\n\nTimothy Pranoto",
	processInput: function(gameContext, keyboard, mouse){
	},
	update: function(gameContext, deltaTime){
		if(this.backgroundMusic==null){
			this.backgroundMusic = game.audios.play("credits");
		}
		var nt = new Date().getTime();
		this.dt = nt-this.t0;
		if(this.dt>16000){
			this.t0 = nt;
			this.dt = 0;
		}
		if(this.dt>15000){
			this.backgroundMusic.stop(0);
			this.backgroundMusic = null;
			game.currentScene = menuScene;
		}
	},
	render: function(gameContext){
		var canvas = gameContext.canvasContext;
		//draw background
		canvas.fillStyle = "#000";
		canvas.fillRect(0, 0, 1280, 720);
		//draw text
		canvas.textAlign = "center";
		canvas.textBaseline = "top";
		canvas.font = "bold 24px Arial";
		canvas.fillStyle = "#FFF";
		var creditsTextsLines = this.creditsText.split(/\n/g);
		for(var i=0; i<creditsTextsLines.length; i++){
			canvas.fillText(creditsTextsLines[i].trim(), 1280/2, 720-this.dt/8+i*40, 600);
		}
	}
}


/*******************************************************
 ********************** SETUP **************************
 *******************************************************/

document.addEventListener("DOMContentLoaded", function(){
	var canvasElement = document.getElementById("game");
	//init input
	keyboard.init(window);
	mouse.init(canvasElement);
	//game init
	game.init(canvasElement);
	//load images(async: the image image may not be loaded after call load)
	game.images.load("menuMain", "img/Menu.Main.png");
	game.images.load("menuLevel", "img/Menu.LoadLevel.png");
	game.images.load("menuSave", "img/Menu.LoadGame.png");
	game.images.load("menuScore", "img/Menu.Scoreboard.png");
	game.images.load("menuButtons", "img/MenuButtons.png");
	game.images.load("levelTplatforms", "img/levelT.platforms.png");
	game.images.load("levelTalerts", "img/levelT.Alerts.png");
	game.images.load("level1background", "img/level1.background.png");
	game.images.load("level1platforms", "img/level1.platforms.png");
	game.images.load("spritesheet", "img/Sheets.png");
	game.images.load("enemy", "img/Enemy.png");
	game.images.load("coin", "img/1Real.png");
	game.images.load("bullet", "img/bullet.png");
	game.images.load("heart", "img/heart.png");
	//load audios(async: the audio may not be loaded after call load)
	if(window.location.protocol=="file:"){
		alert("You are using file:! Audio will be disabled!")
	}else{
		game.audios.load("menu", "audio/run_forest_run2.mp3");
		game.audios.load("playing", "audio/Run_forest_run.mp3");
		game.audios.load("credits", "audio/RunForestRun4.m4a");
		game.audios.load("test", "audio/SoundTest.m4a");
		game.audios.load("coin", "audio/Coins.m4a");
		game.audios.load("damage", "audio/EnemyDying.m4a");
		game.audios.load("dying0", "audio/FallingNo.m4a");
		game.audios.load("dying1", "audio/FallingR1.m4a");
		game.audios.load("dying2", "audio/FallingR2.m4a");
		game.audios.load("BatSwing", "audio/BatSwing.m4a");
		game.audios.load("BatHit", "audio/BatHit.m4a");
		game.audios.load("gunshot", "audio/Gunshot.m4a");
		game.audios.load("gameover", "audio/Gameover.m4a");
		game.audios.load("jump", "audio/Jump.m4a");
		game.audios.load("ow", "audio/Ow.m4a");
		game.audios.load("run", "audio/Running.m4a");
		game.audios.load("win", "audio/Win.m4a");
	}
	//set scene as loading image scene and start the loop
	game.currentScene = loadingScene;
	//game.currentScene = collisionTestScene;
	game.keepMainLoopRunning = true;//keep drawing
	game.mainLoop();
	//dispatch resize and scale the game
	window.dispatchEvent(new Event('resize'));
});

window.addEventListener("resize", function(e){
	var canvasElement = document.getElementById("game");
	var sx = document.body.clientWidth/canvasElement.width;
	var sy = document.body.clientHeight/canvasElement.height;
	var s = Math.min(sx, sy);
	canvasElement.style.transform = "scale("+s.toString()+")";
	mouseScale = s;	
});


