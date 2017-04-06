define([], function(){

	function GameObjectList (parent)
	{
		this.parent = parent;
		this.gameObjects = [];
	}

	Object.defineProperty(GameObjectList.prototype, "length", {
	  get: function () {
	      return this.gameObjects.length;
	  }
	});

	Object.defineProperty(GameObjectList.prototype, "count", {
	  get: function () {
	      return this.gameObjects.length;
	  }
	});

	GameObjectList.prototype.add = function (gameobject) {
	  this.gameObjects.push(gameobject);
	  gameobject.parent = this;
	};

	GameObjectList.prototype.remove = function (gameobject) {
	  	for (var i = 0, len = this.gameObjects.length; i<len; i++)
		{
			if (gameobject === this.gameObjects[i])
	    		{
	    		this.gameObjects.splice(i, 1);
	    		gameobject.parent = null;
				delete (gameobject);
				return;
				}
		};
	};


	GameObjectList.prototype.at = function (index) {
	  if (index < 0 || index >= this.gameObjects.length)
	      return null;
	  return this.gameObjects[index];
	};

	GameObjectList.prototype.clear = function () {
	  for (var i = 0, len = this.gameObjects.length; i<len; i++)
	      this.gameObjects[i].parent = null;
	  this.gameObjects = [];
	};

	GameObjectList.prototype.find = function (id) {
	  for (var i = 0, len = this.gameObjects.length; i<len; i++)
	  {
		  if (this.gameObjects[i].id === id)
	          return this.gameObjects[i];
	  }
	  return null;
	};

	GameObjectList.prototype.update = function (delta) {
	  for (var i = 0, len = this.gameObjects.length; i<len; i++)
	      if (typeof this.gameObjects[i] !== "undefined") this.gameObjects[i].update(delta);
	};

	GameObjectList.prototype.draw = function () {
	  for (var i = 0, len = this.gameObjects.length; i<len; i++)
	      if (typeof this.gameObjects[i] !== "undefined") this.gameObjects[i].draw();
	};

	GameObjectList.prototype.reset = function () {
	  	for (var i = 0, len = this.gameObjects.length; i<len; i++)
	    	this.gameObjects[i].reset();
	};

	return GameObjectList;

});
