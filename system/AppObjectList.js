define([], function(){

	function AppObjectList (parent)
	{
		this.parent = parent;
		this.grid = [];
	}

	Object.defineProperty(AppObjectList.prototype, "length", {
	  get: function () {
	      return this.grid.length;
	  }
	});

	Object.defineProperty(AppObjectList.prototype, "count", {
	  get: function () {
	      return this.grid.length;
	  }
	});

	AppObjectList.prototype.checkMouse = function () {
		var test = false;
		for (var i = 0, len = this.grid.length; i<len; i++)
			{
				test = this.grid[i].checkMouse();
				if (test)
					{
						return this.grid[i];
					}
			}
		return test;
	};

	AppObjectList.prototype.moveToEnd = function (obj) {
		for (var i = 0, len = this.grid.length; i<len; i++)
			{
				if (this.grid[i] === obj)
				 	{
						this.grid.push(this.grid.splice(i, 1)[0]);
						return true;
					}
			}
	}

	AppObjectList.prototype.last = function () {
		return this.grid[this.grid.length-1];
	}

	AppObjectList.prototype.add = function (obj) {
	  this.grid.push(obj);
	  obj.parent = this;
	};

	AppObjectList.prototype.remove = function (obj) {
	  	for (var i = 0, len = this.grid.length; i<len; i++)
		{
			if (obj === this.grid[i])
	    		{
	    		this.grid.splice(i, 1);
	    		obj.parent = null;
				delete (obj);
				return;
				}
		};
	};


	AppObjectList.prototype.at = function (index) {
	  if (index < 0 || index >= this.grid.length)
	      return null;
	  return this.grid[index];
	};

	AppObjectList.prototype.clear = function () {
	  for (var i = 0, len = this.grid.length; i<len; i++)
	      this.grid[i].parent = null;
	  this.grid = [];
	};

	AppObjectList.prototype.find = function (id) {
	  for (var i = 0, len = this.grid.length; i<len; i++)
	  {
		  if (this.grid[i].id === id)
	          return this.grid[i];
	  }
	  return null;
	};

	AppObjectList.prototype.update = function (delta) {
	  for (var i = 0, len = this.grid.length; i<len; i++)
	      if (typeof this.grid[i] !== "undefined") this.grid[i].update(delta);
	};

	AppObjectList.prototype.draw = function () {
	  for (var i = 0, len = this.grid.length; i<len; i++)
	      if (typeof this.grid[i] !== "undefined") this.grid[i].draw();
	};

	AppObjectList.prototype.reset = function () {
	  	for (var i = 0, len = this.grid.length; i<len; i++)
	    	if (typeof this.grid[i] !== "undefined") this.grid[i].reset();
	};

	return AppObjectList;

});
