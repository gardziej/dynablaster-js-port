define(['system/Sounds'], function(sounds){

	function MapTimer (time, parent) {
		this.parent = parent;
		this.mapTime = time;
		this.leftTime = this.mapTime;
		this.working = false;
		this.alerts = {
			hurryup : false,
			time_out : false
		};
	}


	MapTimer.prototype.init = function () {
		this.working = true;
	};

	Object.defineProperty(MapTimer.prototype, "ending", {
	  get: function () {
	      return this.leftTime <= 10;
	  }
	});

	MapTimer.prototype.toString = function () {
		if (this.leftTime >= 0)
			{
			var minutes = Math.floor(this.leftTime / 60);
			var seconds = Math.floor(this.leftTime % 60);
			if (seconds < 10) seconds = "0" + seconds;
			return (minutes + ":" + seconds);
			}
			else
			{
			return "0:00";
			}
	};

	MapTimer.prototype.playSound = function (sound) {
		if (!this.alerts[sound])
			{
				sounds.play(sound);
				this.alerts[sound] = !this.alerts[sound];
			}
	};

	MapTimer.prototype.update = function (delta) {
		this.leftTime -= delta;

		if (this.working && Math.floor(this.leftTime) === 10)
			{
				this.playSound('time_out');
			}

		if (this.working && Math.floor(this.leftTime) === 0)
			{
				this.working = false;
				this.parent.timeIsOver();
				this.playSound('hurryup');
			}

		return Math.floor(this.leftTime);
	};

	return MapTimer;
});
