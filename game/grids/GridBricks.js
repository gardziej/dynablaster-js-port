define(['game/Grid', 'game/Tile', 'game/tiles/TileBrick', 'system/Canvas', 'system/Sprites', 'system/Vector2'],
	function(Grid, Tile, TileBrick, Canvas, sprites, Vector2){

	function GridBricks (parent, cols, rows, mode)
	{
		Grid.call(this, parent, cols, rows, mode);
		this.level = 1;
		this.type = "brick";
	}

	GridBricks.prototype = Object.create(Grid.prototype);

	GridBricks.prototype.makeSparky = function () {
		for (var i in this.tiles)
		{
			if (this.tiles[i].onBonus)
				{
					if (!this.tiles[i].onExit)
						this.tiles[i].sparky = true;
				}
		}
	};

	GridBricks.prototype.add = function (x, y) {
		var gameobject = null;
		if (!this.check(x,y))
		{
		gameobject = new TileBrick(this, this.type, this.calculateTilePosition(x,y), new Vector2(x,y));
		if(typeof frame === "undefined") this.frame = 0;
		this.grid[y * this.cols + x] = 1;
		this.tiles[y * this.cols + x] = gameobject;
		this.count++;
		}
		this.addToPfGrid(x,y);
		return gameobject;
	};

	GridBricks.prototype.explode = function (x,y) {
		this.tiles[y * this.cols + x].trigger();
	};

	return GridBricks;

});
