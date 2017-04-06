define(['game/Tile', 'system/Canvas', 'system/Sprites', 'system/Vector2'], function(Tile, Canvas, sprites, Vector2){

	function Grid (parent, cols, rows, mode, level)
	{
		if (typeof mode !== "undefined") this.mode = mode;
		if (typeof level === 'undefined')
			this.level = 0;
		else
			this.level = level;
		this.cols = cols;
		this.rows = rows;
		this.parent = parent;
		this.grid = new Array(cols * rows);
		this.tiles = new Array(cols * rows);
		this.count = 0;
	}

	Grid.prototype.calculateTilePosition = function(x,y) {
		var wx = this.parent.x + x * Tile.size.width;
		var wy = this.parent.y + y * Tile.size.height;
		return new Vector2(wx, wy);
	};

	Grid.prototype.add = function (x, y, frame) {
		if (!this.check(x,y))
		{
		this.frame = frame || 0;
		this.grid[y * this.cols + x] = 1;
		this.tiles[y * this.cols + x] = new Tile(this, this.type, this.calculateTilePosition(x,y), new Vector2(x,y), this.frame);
		this.count++;
		}
		this.addToPfGrid(x,y);
	};

	Grid.prototype.addToPfGrid = function (x, y) {
		if (this.level > 0) this.parent.pfGrid.setWalkableAt(x,y,'floor', false);
		if (this.level > 1) this.parent.pfGrid.setWalkableAt(x,y,'air', false);
	};

	Grid.prototype.removeFromPfGrid = function (x, y) {
		this.parent.pfGrid.setWalkableAt(x,y,'floor', true);
		this.parent.pfGrid.setWalkableAt(x,y,'air', true);
	};

	Grid.prototype.clearAll = function () {
		for (var i in this.tiles)
		{
			if (typeof this.tiles[i] !== "undefined") delete this.tiles[i];
		}
	};

	Grid.prototype.countActiv = function () {
		var count = 0;
		for (var i in this.tiles)
		{
			if (typeof this.tiles[i] !== "undefined" && this.tiles[i].exploded === false)
				{
					count++;
				}
		}
		return count;
	};

	Grid.prototype.remove = function (x,y) {
		this.grid[y * this.cols + x] = undefined;
		delete this.tiles[y * this.cols + x];
		this.count--;
		this.removeFromPfGrid(x,y);
	};

	Grid.prototype.check = function (x,y) {
		if (this.grid[y * this.cols + x] === 1)
			return true;
		return false;
	};

	Grid.prototype.fill = function () {

	};

	Grid.prototype.update = function (delta) {
		for (var i in this.tiles)
		{
			var y = Math.floor(i / this.cols);
			var x = i % this.cols;
			this.tiles[i].position = this.calculateTilePosition(x,y);
			this.tiles[i].update(delta);
		}
	};

	Grid.prototype.draw = function (delta) {
		for (var i in this.tiles)
		{
			this.tiles[i].draw(delta);
		}
	};

	return Grid;

});
