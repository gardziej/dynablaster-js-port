define(['system/myHelper'], function(myHelper){

	function Bonus (gamePlayer, needed) {

		if (typeof needed === "undefined") this.needed = 0; else this.needed = needed;

		this.bonuses = [
			{ name : "bomb", 		count : 1, minMap : 1, max : 7 },
			{ name : "bomb_pass", 	count : 1, minMap : 7, max : 1 },
			{ name : "detonator", 	count : 1, minMap : 3, max : 1 },
			{ name : "extra_life", 	count : 1, minMap : 1, max : 1 },
			{ name : "flames", 		count : 1, minMap : 1, max : 7 },
			{ name : "brick_pass", 	count : 1, minMap : 4, max : 1 }
		];

		this.gamePlayer = gamePlayer;

		this.bonusesOut = [];

		while(this.needed--)
			this.addRandom();

		this.init();
	}

	Bonus.prototype.addRandom = function () {
		var added = false;
		while(added === false)
		{
			var rand = myHelper.getRandomInt(0,this.bonuses.length-1);
			if (this.bonuses[rand].minMap <= this.gamePlayer.map && this.count(this.bonuses[rand].name) < this.bonuses[rand].max)
			{
				if (!(this.bonuses[rand].name === 'detonator' && this.gamePlayer.bonus.detonator) &&
					!(this.bonuses[rand].name === 'brick_pass' && this.gamePlayer.bonus.brick_pass) &&
					!(this.bonuses[rand].name === 'bomb_pass' && this.gamePlayer.bonus.bomb_pass) &&
					!(this.bonuses[rand].name === 'extra_life' && this.gamePlayer.lives > 8)
				)
				{
				this.bonusesOut.push(this.bonuses[rand].name);
				added = true;
				}
			}
		}
	};

	Bonus.prototype.getOne = function () {

		if (this.bonusesOut.length > 0)
			return this.bonusesOut.pop();
		else return false;
	};

	Object.defineProperty(Bonus.prototype, "left",
		{
			get: function () {
				return this.bonusesOut.length;
			}
		});

	Bonus.prototype.count = function (name) {
		var count = 0;
		for (var i in this.bonusesOut)
		{
			if (this.bonusesOut[i] === name) count ++;
		}
		return count;
	};


	Bonus.prototype.init = function () {

		if (this.gamePlayer.map % 5 === 0) this.bonusesOut.push('speed');
		this.bonusesOut.push('exit');

		this.bonusesOut = myHelper.shuffleArray(this.bonusesOut);
	};


	return Bonus;
});
