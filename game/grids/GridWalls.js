define(['game/Grid', 'game/Tile', 'system/Canvas', 'system/Sprites', 'system/Vector2'], function(Grid, Tile, Canvas, sprites, Vector2){

	function GridWalls (parent, cols, rows, mode)
	{
		Grid.call(this, parent, cols, rows, mode);
		this.level = 2;
		this.type = "walls";
	}

	GridWalls.prototype = Object.create(Grid.prototype);

	GridWalls.prototype.fill = function ()
	{
		for(var j = 1; j < this.rows-1; j++)
		{
			if (j === 2 || (j === this.rows-4 && this.rows >=8))
				{
					this.add(0,j,6);
					this.add(0,j+1,7);
					this.add(this.cols-1, j, 8);
					this.add(this.cols-1, j+1, 9);
				}
			this.add(0, j, 0);

			this.add(this.cols-1, j, 4);
		}

		this.add(0,0,1);

		this.add(this.cols-1, 0, 3);

		for(var i = 0; i < this.cols; i++)
		{
			this.add(i, this.rows-1, 5);
		}

		for(var i = 1; i < this.cols-1; i++)
		{
		this.add(i, 0, 2);
		}

	}


	return GridWalls;

});
