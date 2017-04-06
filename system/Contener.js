define([], function(){

	function Contener ()
	{
		this.tiles = [];
	}

	Object.defineProperty(Contener.prototype, "length", {
		get: function () {
	    	return this.tiles.length;
		}
	});

	Object.defineProperty(Contener.prototype, "count", {
		get: function () {
	    	return this.tiles.length;
		}
	});

	Contener.prototype.val = function (k) {
		return this.tiles[k];
	};

	Contener.prototype.add = function (i) {
		if (!this.exists(i)) this.tiles.push(i);
	};

	Contener.prototype.exists = function (i) {
		if (this.tiles.indexOf(i) !== -1)
			{
				return true;
			}
		return false;
	};

	Contener.prototype.remove = function (i) {
		var index = this.tiles.indexOf(i);
		if (index > -1)
			{
			    this.tiles.splice(index, 1);
			}

	};

	return Contener;

});
