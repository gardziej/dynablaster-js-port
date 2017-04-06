define(['game/Tile', 'system/Canvas', 'system/Sprites', 'system/Sounds', 'system/Vector2', 'system/Rectangle', 'system/Animation'],
	function(Tile, Canvas, sprites, sounds, Vector2, Rectangle, Animation){

	function TileBomb (parent, type, position, coordinates, frame, player, life, area) {
		Tile.call(this, parent, type, position, coordinates, frame);
		this.parent = parent;
		this.player = player;
		this.position = position;
		this.parent.parent.player.bombs.left--;
		this.life = life;
		this.counter = 0;
		this.area = area;

		this.frameTimeExpMax = 3;
		this.frameExp = 3;
		this.frameTimeExp = 1;
		this.allowExp = [Infinity,Infinity,Infinity,Infinity, Infinity];
		this.frameReverse = false;
		this.exploded = false;
		this.animations.playing = new Animation (this, sprites.tiles[this.type], true, 0.2);
	}

	TileBomb.prototype = Object.create(Tile.prototype);

	TileBomb.prototype.draw = function () {
		Tile.prototype.draw.call(this);

		if (this.life === 0)
		{
			if (!this.exploded)
			{
				sounds.play('explosion');
			}
			this.explode();
		}
		else
		{
		this.life--;
		}
	}

	TileBomb.prototype.trigger = function () {
		if (!this.exploded)
			{
				this.explode();
				sounds.play('explosion');
			}
	}

	TileBomb.prototype.explode = function () {
		this.life = 0;
		this.exploded = true;

		if (this.allowExp[4])
			{
			this.parent.parent.makeFry(this.coordinates.x, this.coordinates.y);
			this.parent.parent.makeExploded(this.coordinates.x, this.coordinates.y);
			this.allowExp[4] = 0;
			}
		this.explodeDraw(24, this.parent.calculateTilePosition(this.coordinates.x, this.coordinates.y), this.frameExp);

		for (var i = 1; i <= this.area; i++)
		{
			if (i < this.allowExp[0])
			{
				if (this.parent.parent.isSolid(this.coordinates.x, this.coordinates.y-i))
				{
					this.parent.parent.makeExploded(this.coordinates.x, this.coordinates.y-i);
					this.allowExp[0] = i;
				}
				else
				{
					this.parent.parent.makeFry(this.coordinates.x, this.coordinates.y-i);
					if (i === this.area) this.explodeDraw(0, this.parent.calculateTilePosition(this.coordinates.x, this.coordinates.y-i), this.frameExp);
						else this.explodeDraw(16, this.parent.calculateTilePosition(this.coordinates.x, this.coordinates.y-i), this.frameExp);
				}
			}

			if (i < this.allowExp[1])
			{
				if (this.parent.parent.isSolid(this.coordinates.x+i, this.coordinates.y))
				{
					this.parent.parent.makeExploded(this.coordinates.x+i, this.coordinates.y);
					this.allowExp[1] = i;
				}
				else
				{
					this.parent.parent.makeFry(this.coordinates.x+i, this.coordinates.y);
					if (i === this.area) this.explodeDraw(4, this.parent.calculateTilePosition(this.coordinates.x+i, this.coordinates.y), this.frameExp);
						else this.explodeDraw(20, this.parent.calculateTilePosition(this.coordinates.x+i, this.coordinates.y), this.frameExp);
				}
			}

			if (i < this.allowExp[2])
			{
				if (this.parent.parent.isSolid(this.coordinates.x, this.coordinates.y+i))
				{
					this.parent.parent.makeExploded(this.coordinates.x, this.coordinates.y+i);
					this.allowExp[2] = i;
				}
				else
				{
					this.parent.parent.makeFry(this.coordinates.x, this.coordinates.y+i);
					if (i === this.area) this.explodeDraw(8, this.parent.calculateTilePosition(this.coordinates.x, this.coordinates.y+i), this.frameExp);
						else this.explodeDraw(16, this.parent.calculateTilePosition(this.coordinates.x, this.coordinates.y+i), this.frameExp);
				}
			}

			if (i < this.allowExp[3])
			{
				if (this.parent.parent.isSolid(this.coordinates.x-i, this.coordinates.y))
				{
					this.parent.parent.makeExploded(this.coordinates.x-i, this.coordinates.y);
					this.allowExp[3] = i;
				}
				else
				{
					this.parent.parent.makeFry(this.coordinates.x-i, this.coordinates.y);
					if (i === this.area) this.explodeDraw(12, this.parent.calculateTilePosition(this.coordinates.x-i, this.coordinates.y), this.frameExp);
						else this.explodeDraw(20, this.parent.calculateTilePosition(this.coordinates.x-i, this.coordinates.y), this.frameExp);
				}
			}

		}

		this.frameTimeExp--;
		if (this.frameTimeExp < 0)
			{
			this.frameTimeExp = this.frameTimeExpMax;

			if (this.frameExp <= 0)
				{
				this.frameReverse = true;
				}
			if (!this.frameReverse)
				{
				this.frameExp--;
				}
				else
				{
				this.frameExp++;
				}

			if (this.frameReverse === true && this.frameExp === 3)
				{
				this.parent.remove(this.coordinates.x, this.coordinates.y);
				this.parent.parent.player.bombs.left++;
				}
			}
	}

	TileBomb.prototype.explodeDraw = function (pos, position, frame) {
		canvas.drawImage(sprites.tiles.explosion, position, 0, Vector2.zero, new Rectangle((pos + frame) * Tile.size.width, 0, Tile.size.width, Tile.size.height));
	}

	return TileBomb;

});
