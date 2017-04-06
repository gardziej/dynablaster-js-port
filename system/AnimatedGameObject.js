define([],
	function(){

    function AnimatedGameObject(layer, id) {
        this.animations = {};
        this.current = null;
        this.time = 0;
    }

    AnimatedGameObject.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

    AnimatedGameObject.prototype.loadAnimation = function (animname, id, looping, frametime) {
        this.animations[id] = new powerupjs.Animation(animname, looping, frametime);
    };

    AnimatedGameObject.prototype.playAnimation = function (id) {
        if (this.current === this.animations[id])
            return;
        this.sheetIndex = 0;
        this.time = 0;
        this.current = this.animations[id];
        this.sprite = this.current.sprite;
    };

    AnimatedGameObject.prototype.animationEnded = function () {
        return !this.current.looping && this.sheetIndex >= this.sprite.nrSheetElements - 1;
    };

    AnimatedGameObject.prototype.update = function (delta) {
        this.time += delta;
        while (this.time > this.current.frameTime) {
            this.time -= this.current.frameTime;
            this.sheetIndex++;
            if (this.sheetIndex > this.sprite.nrSheetElements - 1)
                if (this.current.looping)
                    this.sheetIndex = 0;
                else
                    this.sheetIndex = this.sprite.nrSheetElements - 1;
        }
        powerupjs.SpriteGameObject.prototype.update.call(this, delta);
    };

    powerupjs.AnimatedGameObject = AnimatedGameObject;
    return powerupjs;

})(powerupjs || {});
