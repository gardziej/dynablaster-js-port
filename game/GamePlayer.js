define(['system/Sounds'], function(sounds){

	function GamePlayer () {
		this.pref = "dyna_";
		this.speedLevels = [3, 4, 6, 8];
		this.init();
	}

	Object.defineProperty(GamePlayer.prototype, "playerSpeed", {
	  get: function () {
	      return this.speedLevels[this.speed];
	  }
	});

	GamePlayer.prototype.saveUserName = function () {
		localStorage.setItem(this.pref + "name", this.name);
	};

	GamePlayer.prototype.sendScore = function () {
        $.ajax({
        	url: '../server/json.php',
        	data: {
            	callback : "?",
            	savePoints : "true",
            	gra : "dyna",
				mapa : this.map,
            	gracz : this.name,
            	punkty : this.score
           }
        });
	};

	GamePlayer.prototype.clearSaveGame = function () {
		localStorage.removeItem(this.pref + "savedGame");
	};

	GamePlayer.prototype.saveGame = function () {
		var obj = {
			map : this.map,
			score : this.score,
			lives : this.lives,
			speed : this.speed,
			bonus : this.bonus,
			bombs : this.bombs
		};
		localStorage.setItem(this.pref + "savedGame", JSON.stringify(obj));
	};

	GamePlayer.prototype.startValues = function () {
		this.map = 1;
		this.hiscore = 0;
		this.score = 0;
		this.lives = 3;
		this.speed = 0;
		this.time = 240;
		this.bonus = {
			brick_pass : false,
			bomb_pass : false,
			detonator : false,
			vest : false
		};
		this.bombs = {
			area : 2,
			count : 2,
			life : 60
		};
	};

	GamePlayer.prototype.loadSave = function () {
		var save = localStorage.getItem(this.pref + "savedGame");
		if (save)
			{
				var obj = JSON.parse(save);
				if (obj instanceof Object && obj.lives > 0)
					{
						for (var i in obj)
							{
								this[i] = obj[i];
							}
						this.bonus.vest = false;
						return true;
					}
			}
		return false;
	};

	GamePlayer.prototype.init = function () {

		this.startValues();

		this.hiscore = localStorage.getItem(this.pref + "hiscore") || 0;
		this.name = localStorage.getItem(this.pref + "name") || "";
		var soundsOn = localStorage.getItem(this.pref + "soundsOn") || true;
		soundsOn = soundsOn === "false" ? soundsOn = false : soundsOn = true;
		sounds.soundsSet(soundsOn);
	};

	GamePlayer.prototype.speedUp = function () {
		if (this.speed < this.speedLevels.length-1)
			{
			this.speed++;
			}
	};

	GamePlayer.prototype.setLives = function (val) {
		this.lives = val;
	};

	GamePlayer.prototype.updateSounds = function () {
		localStorage.setItem(this.pref + "soundsOn", sounds.soundsOn);
	};

	GamePlayer.prototype.updateScore = function (score) {
		this.score += score;
		if (this.score > this.hiscore) this.hiscore = this.score;
		localStorage.setItem(this.pref + "hiscore", this.hiscore);
	};

	GamePlayer.prototype.resetForDie = function (score) {
		this.lives--;

		this.bonus = {
			brick_pass : false,
			bomb_pass : false,
			detonator : false
		};

		this.bombs.area--;
		if (this.bombs.area < 2) this.bombs.area = 2;
		this.bombs.count--;
		if (this.bombs.count < 1) this.bombs.count = 1;
		this.speed--;
		if (this.speed < 0) this.speed = 0;
	};

	return GamePlayer;
});
