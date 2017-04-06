define(['pathfinding', 'system/Canvas', 'system/Vector2', 'game/Tile'],
	function(PF, canvas, Vector2, Tile) {


  function MapPathFinder (parent, w,h)
  {
    this.w = w;
    this.h = h;
		this.parent = parent;
    this.pfGrid = {
      floor : new PF.Grid(this.w, this.h),
      air : new PF.Grid(this.w, this.h)
    };
  }

	MapPathFinder.prototype.findWay = function (a, b, level) {
		var finder = new PF.AStarFinder();
		var grid = this.pfGrid[level].clone();
		var path = finder.findPath(a.x, a.y, b.x, b.y, grid);
		if (path.length > 0)
			return path;
		else return false;
	}


  MapPathFinder.prototype.setWalkableAt = function (x, y, level, type) {
    if (typeof type === "undefined") type = false;
    this.pfGrid[level].setWalkableAt(x, y, type);
  }

  MapPathFinder.prototype.draw = function (level) {
    /*
		for(var i = 0; i < this.w; i++)
    {
      for(var j = 0; j < this.h; j++)
      {
				if (this.pfGrid[level].isWalkableAt(i,j))
        	canvas.drawRectangle(this.parent.x + i * Tile.size.width, this.parent.y + j * Tile.size.height, Tile.size.width, Tile.size.height, "yellow");
      }
    }

		var path = this.findWay(new Vector2(1,1), new Vector2(17,9), level);
		if (path) for (var v in path)
			{
				canvas.drawRectangle(this.parent.x + path[v][0] * Tile.size.width, this.parent.y + path[v][1] * Tile.size.height, Tile.size.width, Tile.size.height, "rgba(255,0,0,0.5)");
			}
		*/
  }


  return MapPathFinder;

});
