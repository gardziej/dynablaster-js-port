define(['game/Grid', 'game/Tile', 'system/Canvas', 'system/Sprites', 'system/Vector2', 'system/Rectangle'],
	function(Grid, Tile, Canvas, sprites, Vector2, Rectangle){

	function GridSteel (parent, cols, rows, mode)
	{
		Grid.call(this, parent, cols, rows, mode);
		this.level = 2;
		this.type = "steel";
	}

	GridSteel.prototype = Object.create(Grid.prototype);

	GridSteel.prototype.draw = function () {
		Grid.prototype.draw.call(this);

		for (var i in this.tiles)
		{
			var x = i % this.cols;
			var y = Math.floor(i / this.cols);
			var shadowPosition = this.calculateTilePosition(x,y+1);
			canvas.drawImage(sprites.tiles.grass, shadowPosition, 0, Vector2.zero, new Rectangle(48, 0, Tile.size.width, Tile.size.height));
		}

	};

	GridSteel.prototype.fill = function ()
	{

		for(var i = 1; i < this.cols-1; i++)
		{
			for(var j = 1; j < this.rows-1; j++)
			{
				if (i % 2 === 0 && j % 2 === 0)
				{
					this.add(i,j);
				}
			}
		}

	};

	return GridSteel;

});
