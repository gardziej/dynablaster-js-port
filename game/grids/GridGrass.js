define(['game/Grid', 'game/Tile', 'system/Canvas', 'system/Sprites', 'system/Vector2'], function(Grid, Tile, canvas, sprites, Vector2){

	function GridGrass (parent, cols, rows, mode)
	{
		Grid.call(this, parent, cols, rows, mode);
		this.level = 0;
		this.type = "grass";
	}

	GridGrass.prototype = Object.create(Grid.prototype);

	GridGrass.prototype.fill = function ()
	{
		for(var i = 0, len = this.cols * this.rows; i < len; i++)
		{
			this.grid[i] = 1;
			var y = Math.floor(i / this.cols);
			var x = i % this.cols;
			this.tiles[i] = new Tile(this, this.type, this.calculateTilePosition(x,y), new Vector2(x,y));
		}
		this.count = this.cols * this.rows;
	}



	return GridGrass;

});
