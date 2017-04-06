define([], function(){

	function Sounds_Singleton () {
		this.sounds = {};
		this.soundsOn = true;
	}

	Sounds_Singleton.prototype.soundsSet = function (state) {
		this.soundsOn = state;
	};

	Sounds_Singleton.prototype.soundsChange = function () {
		this.soundsOn = !this.soundsOn;
	};

	Sounds_Singleton.prototype.load = function (name, vol, obj) {
		this.sounds[name] = obj;
		this.sounds[name].volume = vol;
		this.sounds[name].load();
	};

	Sounds_Singleton.prototype.play = function (name) {
		if (this.soundsOn === true)
			{
				if (!this.sounds[name].ended)
					{
						var ss = this.sounds[name].cloneNode();
						ss.volume = this.sounds[name].volume;
						ss.play();
					}
				this.sounds[name].play();
			}
	};

	var sounds = new Sounds_Singleton();

	return sounds;

});
