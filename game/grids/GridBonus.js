define(['game/Grid', 'game/Tile', 'system/Canvas', 'system/Sprites', 'system/Vector2', 'game/tiles/TileBonus'],
	function(Grid, Tile, canvas, sprites, Vector2, TileBonus){

	function GridBonus (parent, cols, rows, mode)
	{
		Grid.call(this, parent, cols, rows, mode);
		this.level = 0;
		this.type = "bonus";
	}

	GridBonus.prototype = Object.create(Grid.prototype);

	GridBonus.prototype.typeOfBonus = function (x,y) {
		if (this.grid[y * this.cols + x] === 1 && typeof this.tiles[y * this.cols + x] !== "undefined")
		{
			return this.tiles[y * this.cols + x].bonus;
		}
	};

	GridBonus.prototype.bonusActiv = function (x,y) {
		if (this.grid[y * this.cols + x] === 1 && typeof this.tiles[y * this.cols + x] !== "undefined")
		{
			return this.tiles[y * this.cols + x].activ;
		}
		return false;
	};

	GridBonus.prototype.makeActiv = function (x,y) {
		if (this.grid[y * this.cols + x] === 1 && typeof this.tiles[y * this.cols + x] !== "undefined")
		{
			this.tiles[y * this.cols + x].activ = true;
		}
	};

	GridBonus.prototype.add = function (x, y, frame, bonus) {
		if (!this.check(x,y))
		{
		this.frame = frame || 0;
		this.grid[y * this.cols + x] = 1;
		this.tiles[y * this.cols + x] = new TileBonus(this, this.type, this.calculateTilePosition(x,y), new Vector2(x,y), this.frame, bonus);
		this.count++;
		}
	};

	GridBonus.prototype.makeAllActiv = function () {
		for (var i in this.tiles)
			{
				if (this.grid[i] === 1 && typeof this.tiles[i] !== "undefined")
					this.tiles[i].activ = true;
			}
			return false;
	};


	GridBonus.prototype.explode = function (x,y) {
		this.tiles[y * this.cols + x].trigger();
	};

	return GridBonus;

});
