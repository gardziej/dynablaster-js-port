define(['jquery', 'game/MapPathFinder', 'game/Tile', 'game/tiles/TileBomb', 'system/Canvas', 'system/Sprites', 'system/Sounds', 'system/Vector2', 'system/myHelper', 'game/Player', 'game/Enemies', 'game/Enemy',
		'game/Grid', 'game/grids/GridGrass', 'game/grids/GridWalls', 'game/grids/GridSteel', 'game/grids/GridBricks', 'game/grids/GridBombs', 'game/Levels', 'game/MapTimer',
		'game/grids/GridBonus', 'game/PointsList'],
	function($, MapPathFinder, Tile, TileBomb, Canvas, sprites, sounds, Vector2, myHelper, Player, Enemies, Enemy,
			 Grid, GridGrass, GridWalls, GridSteel, GridBricks, GridBombs, levels, MapTimer,
			 GridBonus, PointsList) {

	function Map (w,h, bricksCount, enemiesList, parent)
	{
		this.parent = parent;
		this.bricksCount = bricksCount;
		this.enemiesList = enemiesList;
		this.w = w; if (this.w % 2 === 0) this.w++;
		this.h = h; if (this.h % 2 === 0) this.h++;

		this.stage = 1;
		this.grid = {};
		this.enemies = new Enemies();
		this.pointsList = new PointsList();
		this.level = levels[0].map;
		this.black = 1;

		this.grid.size = {
				width : this.w,
				height: this.h
		};


		this.width = this.grid.size.width * Tile.size.width;
		this.height = this.grid.size.height * Tile.size.height;

		this.mapBigerThenCanvas = {
			x : this.width > canvas.width,
			y : this.height > canvas.height - 70
		};

		this.exitWasJustExploded = 0;

		this.init();
	}

	Map.prototype.init = function () {
		this.timer = new MapTimer(this.parent.gamePlayer.time, this);
		this.makePFs();
		this.makeGrass();
		this.makeWalls();
		this.makeBonus();
		this.makeBombs();
		this.makeSteel();
		this.makeBrick(this.bricksCount);
		this.makePlayer();
		this.makeEnemies();
		this.timer.init();
	};

	Map.prototype.makePFs = function () {
		this.pfGrid = new MapPathFinder(this, this.w, this.h);
	};

	Map.prototype.makeGrass = function () {
		this.grid.grass = new GridGrass(this, this.grid.size.width, this.grid.size.height);
		this.grid.grass.fill();
	};

	Map.prototype.makeWalls = function () {
		this.grid.walls = new GridWalls(this, this.grid.size.width, this.grid.size.height);
		this.grid.walls.fill();
	};

	Map.prototype.makeBonus = function () {
		this.grid.bonus = new GridBonus(this, this.grid.size.width, this.grid.size.height);
	};

	Map.prototype.makeBombs = function () {
		this.grid.bombs = new GridBombs(this, this.grid.size.width, this.grid.size.height);
	};

	Map.prototype.makeSteel = function () {
		this.grid.steel = new GridSteel(this, this.grid.size.width, this.grid.size.height, this.mode);
		this.grid.steel.fill();
	};

	Map.prototype.makeBrick = function (count) {
		this.grid.brick = new GridBricks(this, this.grid.size.width, this.grid.size.height);
		var x = 0;
		var y = 0;
		if (count < this.parent.bonus.left) count = this.parent.bonus.left;
		while (this.grid.brick.count < count)
		{
			x = myHelper.getRandomInt(1, this.grid.size.width-2);
			y = myHelper.getRandomInt(1, this.grid.size.height-2);
			if (!this.isSolid(x,y) && x+y >3)
				{
				var gameobject = this.grid.brick.add(x,y);
				var bonus = this.parent.bonus.getOne();
				if (bonus)
					{
						this.grid.bonus.add(x,y,2,bonus);
						gameobject.onBonus = true;
						if (bonus === 'exit') gameobject.onExit = true;
					}
				}
		}

	};

	Map.prototype.die = function (type) {
		this.parent.restartMap(type);
	};

	Map.prototype.makePlayer = function () {
		this.player = new Player(new Vector2(1,1), this, this.parent.gamePlayer);
	};

	Map.prototype.makeEnemies = function () {
		this.enemies = new Enemies(this);
		this.count = this.enemiesList.length;
		var x = 0;
		var y = 0;
		while (this.enemies.count < this.count)
		{
			x = myHelper.getRandomInt(1, this.grid.size.width-2);
			y = myHelper.getRandomInt(1, this.grid.size.height-2);
			if (!this.isSolid(x,y) && x+y >6)
				{
					this.enemies.add(new Enemy(new Vector2(x,y), this, this.enemiesList[0]));
					this.enemiesList.shift();
				}
		}
	};

	Map.prototype.addBomb = function (x,y, player, life, area) {
		if (!this.isSolid(x,y))
		{
			this.grid.bombs.add(x,y, player, life, area);
		}
	};

	Map.prototype.addPoints = function (position, val) {
		position = {
			x : position.x + Tile.size.width/2,
			y : position.y + Tile.size.height/2 -10
		};
		this.parent.gamePlayer.updateScore(val);
		this.pointsList.add(position, val, this);
	};

	Map.prototype.tileInMap = function (x,y) {
		return x > 0 && y > 0 && x < this.grid.size.width && y < this.grid.size.height;
	}

	Map.prototype.isSolid = function (x,y) {
		return !this.tileInMap(x,y) ||
			this.grid.walls.check(x,y) ||
			this.grid.steel.check(x,y) ||
			this.grid.brick.check(x,y) ||
			this.grid.bombs.check(x,y);
	};

	Map.prototype.checkTile = function (x,y) {
		var test = {
			walls : this.grid.walls.check(x,y) || false,
			steel : this.grid.steel.check(x,y),
			brick : this.grid.brick.check(x,y),
			bomb  : this.grid.bombs.check(x,y),
			bonus  : this.grid.bonus.check(x,y)
		};
		if (test.bonus)
			{
				test.bonusType = this.grid.bonus.typeOfBonus(x,y);
				test.bonusActiv = this.grid.bonus.bonusActiv(x,y);
			}
		if (test.walls || test.steel || test.brick || test.bomb) test.isSolid = true;
		return test;
	};

	Map.prototype.checkForEnemies = function(x,y)
	{
		if (this.enemies.isOnTile(x,y) && this.player.stage === "playing")
		{
			this.stage = 9;
			this.player.die();
		}
	};

	Map.prototype.findRoadtoPlayer = function(x,y, level)
	{
		var road = {
			arr : this.pfGrid.findWay(new Vector2(x,y),
									   new Vector2(this.player.tilePosition.xTile,this.player.tilePosition.yTile), level),
			inLine : false,
			inView : false
		};

		if (x === this.player.tilePosition.xTile || y === this.player.tilePosition.yTile)
			road.inLine = true;
		var test = { x: true, y : true};
		for (var i = 1, j = road.arr.length; i < j; i++)
			{
				if (road.arr[i][0] != road.arr[i-1][0]) test.x = false;
				if (road.arr[i][1] != road.arr[i-1][1]) test.y = false;
			}
		if (test.x || test.y) road.inView = true;
		return road;
	};

	Map.prototype.checkBonus = function (x,y) {
		var checkTile = this.checkTile(x,y);
		if (checkTile.bonus && checkTile.bonusActiv && !checkTile.brick)
			{
				switch (checkTile.bonusType) {
					case "bomb":
						this.player.increaseNrOfBombs();
						sounds.play('bonus');
						this.grid.bonus.remove(x,y);
						break;
					case "flames":
						sounds.play('bonus');
						this.grid.bonus.remove(x,y);
						this.player.increaseFlames();
						break;
					case "speed":
						sounds.play('bonus');
						this.grid.bonus.remove(x,y);
						this.player.increaseSpeed();
						break;
					case "detonator":
						sounds.play('bonus');
						this.grid.bonus.remove(x,y);
						this.player.activateDetonator();
						break;
					case "extra_life":
						sounds.play('bonus');
						this.grid.bonus.remove(x,y);
						this.player.increaseLives();
						this.parent.gamePlayer.setLives(this.player.lives);
						break;
					case "bomb_pass":
						sounds.play('bonus');
						this.grid.bonus.remove(x,y);
						this.player.activateBombPass();
						break;
					case "brick_pass":
						sounds.play('bonus');
						this.grid.bonus.remove(x,y);
						this.player.activateBrickPass();
						break;
					case "vest":
						sounds.play('bonus');
						this.grid.bonus.remove(x,y);
						this.player.activateVest();
						break;
					case "exit":
						this.player.win();
						this.stage = 9;
						break;
					default:
						result = "Nie wiem";
						break;
				}
			}
	};

	Map.prototype.timeIsOver = function () {
		var enemyPoints = [new Vector2(1, 1), new Vector2(this.w - 2, 1), new Vector2(1, this.h - 2), new Vector2(this.w - 2, this.h - 2)];
		var i = enemyPoints.length;
		while(i--)
			{
				var enemy = new Enemy(enemyPoints[i], this, 'diamond');
				this.enemies.add(enemy);
				enemy.bonus.goForPlayer = true;
			}
	};

	Map.prototype.activateBombs = function () {
		this.grid.bombs.activateAll();
	};

	Map.prototype.makeExploded = function (x,y) {
		var checkTile = this.checkTile(x,y);
		if (checkTile.bomb)
			{
			this.grid.bombs.explode(x,y);
			}
		if (checkTile.brick)
			{
			this.grid.brick.explode(x,y);
			if (checkTile.bonusType != 'exit' || this.enemies.countAlive === 0)
				{
					this.grid.bonus.makeActiv(x,y);
				}

			}
	};

	Map.prototype.makeFry = function (x,y) {
		var checkTile = this.checkTile(x,y);
		if (this.player.checkImpact(x,y) && this.player.stage === "playing"  && !this.player.bonus.vest)
		{
			this.stage = 9;
			this.player.die();
		}
		if (checkTile.bonus && checkTile.bonusType != 'exit' && checkTile.bonusActiv)
			{
				this.grid.bonus.explode(x,y);
			}
		if (checkTile.bonus && checkTile.bonusType === 'exit' && this.player.stage === "playing")
			{
				this.enemies.exitExploded(new Vector2(x,y));
			}
		this.enemies.checkImpact(x,y);
	};

	Map.prototype.followPlayer = function () {
		if (this.mapBigerThenCanvas.x || this.mapBigerThenCanvas.y)
			{
				if (this.player.origin.x> canvas.width / 2)
				{
					this.x = -1 * (this.player.origin.x - canvas.width / 2);
				}
				if (this.player.origin.y + 70  > canvas.height / 2)
				{
					this.y = -1 * (this.player.origin.y - canvas.height / 2);
				}
				if (this.player.origin.x <= canvas.width / 2)
				{
					this.x = 0;
				}
				if (this.player.origin.y + 70  <= canvas.height / 2)
				{
					this.y = 70;
				}
			}
	};

	Map.prototype.keepInCanvas = function () {
		if (this.mapBigerThenCanvas.x)
			{
				if (this.x < -1 * (this.width - canvas.width)) this.x = -1 * (this.width - canvas.width);
				if (this.x > 0) this.x = 0;
			}
		else
			{
				this.x = (canvas.width - this.width) /2;
			}
		if (this.mapBigerThenCanvas.y)
			{
				if (this.y < -1 * (this.height - canvas.height)) this.y = -1 * (this.height - canvas.height);
				if (this.y > 70) this.y = 70;
			}
			else
			{
				this.y = (canvas.height - this.height) /2 + 70/2;
			}
	};

	Map.prototype.update = function (delta) {

		this.grid.grass.update(delta);
		this.grid.walls.update(delta);
		this.grid.steel.update(delta);
		this.grid.bombs.update(delta);
		this.grid.bonus.update(delta);
		this.grid.brick.update(delta);

		this.enemies.update(delta);
		this.pointsList.update(delta);

		if (this.enemies.countAlive === 0)
			{
				this.grid.bonus.makeAllActiv();
				this.grid.brick.makeSparky();
			}

		this.followPlayer();
		this.keepInCanvas();

		this.player.update(delta);

		var timer = this.timer.update(delta);
	};


	Map.prototype.draw = function () {
		this.grid.grass.draw();
		this.grid.walls.draw();
		this.grid.steel.draw();
		this.grid.bombs.draw();
		this.grid.bonus.draw();
		this.grid.brick.draw();

		this.player.draw();
		this.enemies.draw();
		this.pointsList.draw();

		if (this.stage === 1)
		{
			canvas.drawRectangle(0, 70, canvas.width, canvas.height, "rgba(0,0,0,"+this.black+")");
			if (this.black > 0)
			{
				this.black -= 0.01;
			}
			else
			{
				this.stage = 5;
			}
		}

		if (this.stage === 9)
		{
			canvas.drawRectangle(0, 70, canvas.width, canvas.height, "rgba(0,0,0,"+this.black+")");
			if (this.black < 1)
				{
					this.black += 0.005;
				}
				else
				{
					this.die("map");
				}
		}



	};

	return Map;

});
