define(['system/myHelper', 'system/GameStateManager', 'system/Canvas', 'system/Sprites', 'system/Sounds', 'game/Map', 'system/Vector2', 'system/Keyboard', 'system/Key', 'game/GamePlayer',
		'game/DashBoard', 'system/Rectangle', 'game/Bonus',
		'game/states/PlayingState', 'game/states/TitlePageState', 'game/states/GameOverState',
		'game/states/StageNumberState', 'game/states/PauseState', 'game/states/HiScore'],
	function(myHelper, GameStateManager, Canvas, sprites, sounds, Map, Vector2, keyboard, Key, GamePlayer,
			DashBoard, Rectangle, Bonus,
			PlayingState, TitlePageState, GameOverState,
			StageNumberState, PauseState, HiScore
			){

function Game ()
	{
		this.spritesStillLoading = 0;
		this.totalSprites = 0;
		this.loadFontHack();
		this.loadSprites();
		this.loadSounds();
		this.assetLoadingLoop();
		this.ID = {};
		this.source = null;
	}

Game.prototype.loadFontHack = function () {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'http://fonts.googleapis.com/css?family=Press+Start+2P';
	document.getElementsByTagName('head')[0].appendChild(link);
	var image = new Image();
	image.src = link.href;
	image.onerror = function() {
		canvas.ctx.font = '22px "Press Start 2P"';
		canvas.ctx.textBaseline = 'top';
		canvas.ctx.fillText('Hello!', 10, 10);
	};
};

Game.prototype.loadSprites = function () {
	sprites.background						 		= this.prepareSprite('assets/sprites/background.png');
	sprites.dashboard						 		= this.prepareSprite('assets/sprites/dashboard.png');
	sprites.start_panel						 		= this.prepareSprite('assets/sprites/start_panel.png');
	sprites.keyboard							 	= this.prepareSprite('assets/sprites/keyboard.png');
	sprites.game_over						 		= this.prepareSprite('assets/sprites/game_over.png');

	sprites.tiles = {};
	sprites.tiles.grass						 		= this.prepareSprite('assets/sprites/map/grass@2.png');
	sprites.tiles.walls 					 		= this.prepareSprite('assets/sprites/map/walls@10.png');
	sprites.tiles.steel 					 		= this.prepareSprite('assets/sprites/map/steel.png');
	sprites.tiles.brick 							= this.prepareSprite('assets/sprites/map/brick.png');
	sprites.tiles.player_idle						= this.prepareSprite('assets/sprites/player/idle@4.png');
	sprites.tiles.player_walking 					= this.prepareSprite('assets/sprites/player/walking@16.png');
	sprites.tiles.player_die 						= this.prepareSprite('assets/sprites/player/die@11.png');
	sprites.tiles.player_stars 						= this.prepareSprite('assets/sprites/player/stars@2.png');
	sprites.tiles.bomb 						 		= this.prepareSprite('assets/sprites/bomb@4.png');
	sprites.tiles.explosion							= this.prepareSprite('assets/sprites/explosion@29.png');
	sprites.tiles.brick_explosion					= this.prepareSprite('assets/sprites/map/brick_explosion@7.png');
	sprites.tiles.brick_sparky						= this.prepareSprite('assets/sprites/map/brick_sparky@2.png');

	sprites.player = {};
	sprites.player.idle								= this.prepareSprite('assets/sprites/player/idle@4.png');
	sprites.player.walking 							= this.prepareSprite('assets/sprites/player/walking@16.png');
	sprites.player.die 								= this.prepareSprite('assets/sprites/player/die@11.png');
	sprites.player.stars 							= this.prepareSprite('assets/sprites/player/stars@2.png');
	sprites.player.white 							= this.prepareSprite('assets/sprites/player/white@4.png');

	sprites.bonus = {};
	sprites.bonus.exit 						 		= this.prepareSprite('assets/sprites/exit@2.png');
	sprites.bonus.bomb						 		= this.prepareSprite('assets/sprites/bonus/bonus_bomb@2.png');
	sprites.bonus.bomb_pass							= this.prepareSprite('assets/sprites/bonus/bonus_bomb_pass@2.png');
	sprites.bonus.detonator							= this.prepareSprite('assets/sprites/bonus/bonus_detonator@2.png');
	sprites.bonus.extra_life						= this.prepareSprite('assets/sprites/bonus/bonus_extra_life@2.png');
	sprites.bonus.flames							= this.prepareSprite('assets/sprites/bonus/bonus_flames@2.png');
	sprites.bonus.speed						 		= this.prepareSprite('assets/sprites/bonus/bonus_speed@2.png');
	sprites.bonus.brick_pass						= this.prepareSprite('assets/sprites/bonus/bonus_brick_pass@2.png');
	sprites.bonus.vest								= this.prepareSprite('assets/sprites/bonus/bonus_vest@2.png');
	sprites.bonus.explosion							= this.prepareSprite('assets/sprites/bonus/bonus_explosion@7.png');

	sprites.enemy = {};
	sprites.enemy.priest 					 		= this.prepareSprite('assets/sprites/enemy/priest@3.png');
	sprites.enemy.priest_die						= this.prepareSprite('assets/sprites/enemy/priest_die@5.png');
	sprites.enemy.frog 					 			= this.prepareSprite('assets/sprites/enemy/frog@3.png');
	sprites.enemy.frog_die							= this.prepareSprite('assets/sprites/enemy/frog_die@7.png');
	sprites.enemy.bear 					 			= this.prepareSprite('assets/sprites/enemy/bear@3.png');
	sprites.enemy.bear_die							= this.prepareSprite('assets/sprites/enemy/bear_die@5.png');
	sprites.enemy.diamond 			 				= this.prepareSprite('assets/sprites/enemy/diamond@4.png');
	sprites.enemy.diamond_die						= this.prepareSprite('assets/sprites/enemy/diamond_die@5.png');
	sprites.enemy.broom 					 		= this.prepareSprite('assets/sprites/enemy/broom@4.png');
	sprites.enemy.broom_die							= this.prepareSprite('assets/sprites/enemy/broom_die@7.png');
	sprites.enemy.drop 					 			= this.prepareSprite('assets/sprites/enemy/drop@4.png');
	sprites.enemy.drop_die							= this.prepareSprite('assets/sprites/enemy/drop_die@7.png');
	sprites.enemy.droplet 							= this.prepareSprite('assets/sprites/enemy/droplet@4.png');
	sprites.enemy.droplet_die						= this.prepareSprite('assets/sprites/enemy/droplet_die@5.png');
	sprites.enemy.fire 					 			= this.prepareSprite('assets/sprites/enemy/fire@4.png');
	sprites.enemy.fire_die							= this.prepareSprite('assets/sprites/enemy/fire_die@7.png');
	sprites.enemy.ghost 					 		= this.prepareSprite('assets/sprites/enemy/ghost@4.png');
	sprites.enemy.ghost_die							= this.prepareSprite('assets/sprites/enemy/ghost_die@7.png');
};

Game.prototype.loadSounds = function () {
	sounds.load('explosion', 	0.4, new Audio("assets/sounds/bomb.wav"));
	sounds.load('player_die', 	0.8, new Audio("assets/sounds/dying.wav"));
	sounds.load('bonus', 		0.6, new Audio("assets/sounds/bonus.wav"));
	sounds.load('hurryup', 		1.0, new Audio("assets/sounds/hurryup.wav"));
	sounds.load('stage_start', 	0.1, new Audio("assets/sounds/stage_start.wav"));
	sounds.load('player_win', 	0.4, new Audio("assets/sounds/win.wav"));
	sounds.load('time_out', 	0.4, new Audio("assets/sounds/time_out_10.wav"));
};

Game.prototype.prepareSprite = function (imageName) {
	var pathSplit = imageName.split('/');
	var fileName = pathSplit[pathSplit.length - 1];
	var fileSplit = fileName.split("/")[0].split(".")[0].split("@");
	var colRow = fileSplit[fileSplit.length - 1].split("x");
	var sheetRows = 1;
	var sheetColumns = parseInt(colRow[0]);
	if (isNaN(sheetColumns)) sheetColumns = 1;
    if (colRow.length === 2) sheetRows = parseInt(colRow[1]);

	return {
		img : this.loadSprite(imageName),
		cols : sheetColumns,
		rows : sheetRows
	};
};

Game.prototype.loadSprite = function (imageName) {
	var image = new Image();
	image.src = imageName;
	this.spritesStillLoading += 1;
	this.totalSprites += 1;
	image.onload = function () {
		this.spritesStillLoading -= 1;
	}.bind(this);
	return image;
};

Game.prototype.assetLoadingLoop = function () {
	canvas.clear();
	canvas.drawText('loading: ' + Math.round((this.totalSprites - this.spritesStillLoading) /
	this.totalSprites * 100) + "%", new Vector2(50,50));
	if (this.spritesStillLoading > 0)
		requestAnimationFrame(this.assetLoadingLoop.bind(this));
	else {
		this.initialize();
	}
};

Game.prototype.initialize = function () {
	this.gameStateManager = new GameStateManager();
	this.gameStateManager.add('game_title_page', 	new TitlePageState(this), true);
	this.gameStateManager.add('stage_number', 		new StageNumberState(this));
	this.gameStateManager.add('game_state_playing', new PlayingState(this), true);
	this.gameStateManager.add('game_over',			new GameOverState(this));
	this.gameStateManager.add('game_pause',			new PauseState(this));
	this.gameStateManager.add('hi_score',			new HiScore(this));
	this.gameStateManager.switchTo('game_title_page').reset();
	requestAnimationFrame(this.mainLoop.bind(this));
	};


Game.prototype.restartMap = function (type) {
	if (type === 'die')
		this.gamePlayer.resetForDie();
	else if (type === 'map')
		this.gamePlayer.map++;
	if (this.gamePlayer.lives >= 0)
		{
			this.gameStateManager.switchTo('stage_number').reset();
		}
		else
		{
			this.gameStateManager.switchTo('game_over');
		}
	};

	Game.prototype.handleInput = function (type) {
		if (keyboard.pressed(Key.S))
			{
				sounds.soundsChange();
				this.gamePlayer.updateSounds();
			}

		if (keyboard.pressed(Key.H))
			{
			this.gameStateManager.switchTo("hi_score").reset();
			}
		//
		if (keyboard.pressed(Key.P) && this.gameStateManager.getLastMasterStateId() === "game_state_playing")
			{
			this.gameStateManager.switchTo('game_pause');
			}

		if (keyboard.pressed(Key.Q) && this.gameStateManager.getLastMasterStateId() === "game_state_playing")
			{
			this.gameStateManager.switchTo('game_over').reset();
			}

		if (keyboard.pressed(Key.escape))
			{
			this.gameStateManager.escape();
			}


	};

	Game.prototype.mainLoop = function () {
		var delta = 1 / 60;
		if (this.gameStateManager.getCurrentGameStateId() !== "game_over")
			{
				this.handleInput();
			}
		this.gameStateManager.handleInput(delta);
		this.gameStateManager.update(delta);
		canvas.clear();
		this.gameStateManager.draw();
		keyboard.reset();
		requestAnimationFrame(this.mainLoop.bind(this));
	};



	return Game;

});
