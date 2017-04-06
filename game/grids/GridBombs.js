define(['game/Grid', 'game/Tile', 'game/tiles/TileBomb', 'system/Canvas', 'system/Sprites', 'system/Vector2'],
	function(Grid, Tile, TileBomb, Canvas, sprites, Vector2){

	function GridBombs (parent, cols, rows, mode)
	{
		Grid.call(this, parent, cols, rows, mode);
		this.level = 1;
		this.type = "bomb";
	}

	GridBombs.prototype = Object.create(Grid.prototype);

	GridBombs.prototype.add = function (x, y, player, life, area) {
		if (!this.check(x,y))
		{
			if(typeof frame === "undefined") this.frame = 0;
			this.grid[y * this.cols + x] = 1;
			this.tiles[y * this.cols + x] = new TileBomb(this, this.type, this.calculateTilePosition(x,y), new Vector2(x,y), this.frame, player, life, area);
			this.count++;
		}
		this.addToPfGrid(x,y);
	}

	GridBombs.prototype.activateAll = function () {
		for (var i in this.tiles)
		{
			this.grid[i] = 0;
			this.tiles[i].trigger();
		}
	}

	GridBombs.prototype.explode = function (x,y) {
		this.tiles[y * this.cols + x].trigger();
	}

	return GridBombs;

});
