// JavaScript Document
/**
* Script Name
* Author: Team Tide <email@server.com>
* Date: November 2015
* Version: 0.0
* Description
*/


/*******************************************************
 ****************** LEVEL TUTORIAL *********************
 *******************************************************
 */
var levelTutorial = {
	name: "Tutorial",
	imgNameBackground: "level1background",
	imgNamePlatformsBack: "levelTplatforms",
	imgNamePlatformsFront: "",
	levelEnd: 4112,
	levelNext: level1,
	mainCharacter: {
		position: { x:10, y:100 },
	},
	enemy: [
		{
			position: { x:3900, y:100 },
			size: { w:30, h:45 },
			speed: { x:0, y:0 },
			lifes: 1.0,
			lastFireTime: 0,
			lookingDirection: +1,
			gun: 0,
		}
	],
	mainCamera: {
		position: { x:10, y:0 },
		zoomRatio: 1.,
	},
	checkpoints: [ 700, 1059, 1276, 1800, 2210, 2650, 3170, 3540, 3700 ],
	platforms: [
		{ x:0, y:168, w:254, h:552 },
		{ x:254, y:126, w:259, h:594 },
		{ x:598, y:133, w:254, h:607 },
		{ x:937, y:238, w:257, h:482 },
		{ x:1194, y:169, w:256, h:551 },
		{ x:1597, y:229, w:256, h:491 },
		{ x:2078, y:368, w:257, h:352 },
		{ x:2535, y:360, w:245, h:360 },
		{ x:2757, y:267, w:251, h:453 },
		{ x:3008, y:170, w:254, h:550 },
		{ x:3466, y:170, w:774, h:550 },
	],
	surfaces: [
		{ x0:1416, y0:167, x1:1600, y1:230 },//rope
	],
	ropes: [
		{ x0:1826, y0:168, x1:2100, y1:308 },//rope
	],
	ladders_pipes: [
		{ x0:2722, y0:362, x1:2758, y1:259 },//ladder
		{ x0:3001, y0:265, x1:3001, y1:167 }//pipe
	],
	poles: [
		{ x:3370, y:128 }
	],
	billboards: [
		{ x:2318, y:296, w:219, h:86 }
	],
	coins: [
		{ x:3600, y:150 },
		{ x:3610, y:150 },
		{ x:3605, y:145 }
	],
	extras: {
		lastTutorialAlert: -1,
		tutorialAlerts: [
			{ imgIdx:0, posX:0, title:"Welcome", text:"Welcome to the game!\nThis is the tutorial!" },
			{ imgIdx:1, posX:0, title:"First steps", text:"Your Health indicator, Coin counter and Running Time\nare on the top left corner" },
			{ imgIdx:2, posX:0, title:"Running", text:"Press D or A to run!" },
			{ imgIdx:3, posX:92, title:"Jumping", text:"Press W to jump!" },
			{ imgIdx:4, posX:1070, title:"Climbing", text:"Hold the runing key and press the jump key to climb!" },
			{ imgIdx:5, posX:1700, title:"Rope", text:"Jump on the rope and use the runnning keys to move!" },
			{ imgIdx:6, posX:2150, title:"Billboard", text:"Hold the runing key and the jump key to run on billboards.\nIt allows you to go further!" },
			{ imgIdx:7, posX:2600, title:"Ladder and pipe", text:"Use the running key to use the ladder or the pipe!" },
			{ imgIdx:8, posX:3100, title:"Pole", text:"Jump on the pole and it will hold you!\nJump again to leave." },
			{ imgIdx:9, posX:3500, title:"Coins", text:"Collect coins for extra points" },
			{ imgIdx:10, posX:3700, title:"Enemy", text:"Avoid enemies or attack them using the Space Key" },
			{ imgIdx:11, posX:4111, title:"The End", text:"You have completed the tutorial!" },
		]
	},
	extraProcessInput: function(gameContext, keyboard, mouse, parentScene){},
	extraUpdate: function(gameContext, deltaTime, parentScene){
		if(parentScene.levelExtras.lastTutorialAlert+1<parentScene.levelExtras.tutorialAlerts.length && parentScene.mainCharacter.position.x>=parentScene.levelExtras.tutorialAlerts[parentScene.levelExtras.lastTutorialAlert+1].posX){
			parentScene.levelExtras.lastTutorialAlert++;
			levelTutorialInstructionScene.alertInfo = parentScene.levelExtras.tutorialAlerts[parentScene.levelExtras.lastTutorialAlert];
			gameContext.currentScene = levelTutorialInstructionScene;
		}
	},
	extraRender: function(gameContext, parentScene){},
};



/*******************************************************
 ********************** LEVEL 1 ************************
 *******************************************************
 */
var level1 = {
	name: "Level 1",
	imgNameBackground: "level1background",
	imgNamePlatformsBack: "level1platforms",
	imgNamePlatformsFront: "",
	levelEnd: 18650,
	levelNext: null,
	mainCharacter: {
		position: { x:10, y:450 },
	},
	mainCamera: {
		position: { x:10, y:0 },
		zoomRatio: 1.,
	},
	checkpoints: [ 1607, 3200, 5160, 7516, 10320, 13000, 15000, 16500 ],
	enemy: [
		{
			position: { x:1000, y:500 },
			size: { w:30, h:45 },
			speed: { x:0, y:0 },
			lifes: 1.0,
			lastFireTime: 0,
			lookingDirection: +1,
			gun: 1,
		}
	],
	platforms: [//ok
		{ x:0, y:515, w:673, h:201 },
		{ x:676, y:559, w:694, h:158 },
		{ x:1530, y:450, w:345, h:268 },
		{ x:1934, y:411, w:713, h:42 },
		{ x:2716, y:412, w:332, h:304 },
		{ x:3046, y:299, w:372, h:420 },
		{ x:3456, y:341, w:334, h:379 },
		{ x:4008, y:267, w:343, h:458 },
		{ x:4405, y:264, w:365, h:20 },
		{ x:4789, y:220, w:419, h:500 },//#10
		{ x:5249, y:203, w:711, h:44 },
		{ x:6062, y:291, w:455, h:428 },
		{ x:6497, y:409, w:124, h:20 },
		{ x:6751, y:550, w:362, h:15 },
		{ x:6498, y:706, w:870, h:5 },
		{ x:7363, y:684, w:33, h:36 },
		{ x:7395, y:658, w:34, h:62 },
		{ x:7427, y:632, w:33, h:87 },
		{ x:7363, y:684, w:33, h:36 },
		{ x:7459, y:615, w:632, h:9 },//#20
		{ x:8243, y:696, w:66, h:9 },
		{ x:8597, y:615, w:1015, h:77 },
		{ x:10097, y:675, w:762, h:44 },
		{ x:10861, y:693, w:38, h:14 },//#24
		{ x:10894, y:664, w:38, h:14 },//#25
		{ x:10931, y:635, w:38, h:14 },//#26
		{ x:10965, y:605, w:38, h:14 },//#27
		{ x:11001, y:575, w:14, h:14 },//#28
		//{ x:11014, y:441, w:22, h:155 },//#29
		{ x:11035, y:557, w:652, h:55 },
		//{ x:11685, y:442, w:22, h:155 },
		{ x:11706, y:557, w:652, h:55 },//#32
		//{ x:12356, y:441, w:22, h:155 },
		{ x:12378, y:577, w:12, h:13 },
		{ x:12384, y:606, w:38, h:14 },//#35
		{ x:12419, y:636, w:38, h:14 },
		{ x:12456, y:665, w:38, h:14 },
		{ x:12490, y:693, w:38, h:14 },
		{ x:12534, y:677, w:1254, h:42 },
		{ x:13787, y:699, w:796, h:19 },//#40
		{ x:14585, y:706, w:957, h:13 },
		{ x:14583, y:2, w:21, h:623 },
		//{ x:15026, y:645, w:94, h:18 },//#43
		{ x:14895, y:498, w:20, h:111 },
		{ x:14915, y:592, w:92, h:17 },//#45
		{ x:15144, y:592, w:94, h:16 },
		{ x:15235, y:498, w:21, h:111 },
		{ x:15254, y:567, w:93, h:17 },
		{ x:15375, y:646, w:92, h:18 },
		{ x:15541, y:216, w:34, h:502 },//#50
		{ x:14602, y:468, w:868, h:32 },
		{ x:15236, y:248, w:19, h:111 },
		{ x:14650, y:418, w:91, h:15 },
		{ x:14659, y:216, w:882, h:32 },
		{ x:15540, y:16, w:15, h:110 },//#55
		{ x:15651, y:217, w:862, h:31 },
		{ x:15575, y:469, w:938, h:31 },
		{ x:15867, y:249, w:19, h:112 },
		{ x:16207, y:248, w:19, h:112 },
		{ x:16512, y:3, w:20, h:358 },//#60
		{ x:16514, y:469, w:17, h:249 },//#62
		{ x:16654, y:148, w:140, h:12 },
		{ x:16839, y:147, w:140, h:12 },
		{ x:16654, y:247, w:140, h:12 },//#65
		{ x:16839, y:247, w:140, h:12 },
		{ x:16656, y:349, w:140, h:12 },
		{ x:16839, y:349, w:140, h:12 },
		{ x:16655, y:445, w:140, h:12 },
		{ x:16840, y:445, w:140, h:12 },//#70
		{ x:16656, y:546, w:140, h:12 },
		{ x:16840, y:546, w:140, h:12 },
		{ x:17029, y:174, w:188, h:7 },//#73
		{ x:17030, y:295, w:188, h:7 },
		{ x:17030, y:395, w:188, h:7 },
		{ x:17030, y:498, w:188, h:7 },
		{ x:17276, y:148, w:140, h:12 },//#77
		{ x:17461, y:148, w:140, h:12 },
		{ x:17277, y:248, w:140, h:12 },
		{ x:17461, y:247, w:140, h:12 },//#80
		{ x:17275, y:348, w:140, h:12 },
		{ x:17461, y:349, w:140, h:12 },
		{ x:17276, y:446, w:140, h:12 },
		{ x:17461, y:446, w:140, h:12 },
		{ x:17277, y:547, w:140, h:12 },//#85
		{ x:17461, y:546, w:140, h:12 },
		{ x:17661, y:174, w:188, h:7 },//#87
		{ x:17661, y:295, w:188, h:7 },
		{ x:17661, y:395, w:188, h:7 },
		{ x:17661, y:499, w:188, h:7 },//#90
		{ x:17892, y:148, w:140, h:12 },
		{ x:18077, y:148, w:140, h:12 },
		{ x:17891, y:247, w:140, h:12 },
		{ x:18077, y:247, w:140, h:12 },
		{ x:17891, y:350, w:140, h:12 },//#95
		{ x:18077, y:349, w:140, h:12 },
		{ x:17891, y:445, w:140, h:12 },
		{ x:18075, y:445, w:140, h:12 },
		{ x:17892, y:546, w:140, h:12 },
		{ x:18075, y:546, w:140, h:12 },//#100
		{ x:18368, y:546, w:582, h:172 },

		{ x:3448, y:1, w:366, h:255 },//#61
		{ x:9660, y:692, w:43, h:1 },//woods after ship
		{ x:9787, y:692, w:43, h:1 },//woods after ship
		{ x:9920, y:692, w:43, h:1 },//woods after ship
	],
	surfaces: [
		{ x0:2964, y0:300, x1:3005, y1:273 },
		{ x0:3005, y0:273, x1:3046, y1:299 },
		{ x0:3786, y0:344, x1:4036, y1:250 },
		{ x0:8347, y0:692, x1:8597, y1:610 },//rope at ship
		{ x0:10000, y0:718, x1:10097, y1:670 },//rope at the sand
		{ x0:15510, y0:375, x1:15540, y1:375 },//ladder on right brick
	],
	ropes: [//ok
		{ x0:1359, y0:510, x1:1559, y1:389 },
	],
	ladders_pipes: [//ok
		{ x0:2964, y0:400, x1:2964, y1:300 },
		{ x0:15525, y0:643, x1:15527, y1:375 },//ladder on right brick
		{ x0:14616, y0:378, x1:14618, y1:133 },//ladder on left brick
	],
	poles: [
	],
	billboards: [//ok
	],
	coins: [
	],
	extras: {},
	extraProcessInput: function(gameContext, keyboard, mouse, parentScene){},
	extraUpdate: function(gameContext, deltaTime, parentScene){},
	extraRender: function(gameContext, parentScene){},
};

//set up the next level;(the levels are not defined when they are parsed, so we need to set them after the level parse)
levelTutorial.levelNext = level1;
level1.levelNext = null;

function getLevelByName(levelName){
	var levels = [ levelTutorial, level1 ];
	for(var i=0; i<levels.length; i++){
		if(levels[i].name==levelName)return levels[i];
	}
	return null;
}