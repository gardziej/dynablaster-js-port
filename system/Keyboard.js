define(['system/Key', 'system/ButtonState'], function(Key, ButtonState){

    function Keyboard_Singleton() {
        this.keyStates = [];
        for (var i = 0; i < 256; ++i)
            this.keyStates.push(new ButtonState());
        document.onkeydown = this.handleKeyDown.bind(this);
        document.onkeyup = this.handleKeyUp.bind(this);
    }

    Keyboard_Singleton.prototype.handleKeyDown = function (evt) {
        var code = evt.keyCode;
        if (code < 100) evt.preventDefault();
        if (code < 0 || code > 255)
            return;
        if (!this.keyStates[code].down)
            this.keyStates[code].pressed = true;
        this.keyStates[code].down = true;
    };

    Keyboard_Singleton.prototype.handleKeyUp = function (evt) {
        var code = evt.keyCode;
        if (code < 0 || code > 255)
            return;
        this.keyStates[code].down = false;
    };

    Keyboard_Singleton.prototype.reset = function () {
        for (var i = 0; i < 256; ++i)
            this.keyStates[i].pressed = false;
    };

    Keyboard_Singleton.prototype.getA = function () {
        for (var i = 0; i < 256; ++i)
            {
                if (this.keyStates[i].pressed && this.isAllowed(i)) return i;
            }
    };

    Keyboard_Singleton.prototype.isAllowed = function (code) {
        if ((code >= 48 && code <=57) || (code >= 65 && code <=90) || (code == 32))
            return true;
        return false;
    };

    Keyboard_Singleton.prototype.pressed = function (key) {
        return this.keyStates[key].pressed;
    };

    Keyboard_Singleton.prototype.down = function (key) {
        return this.keyStates[key].down;
    };

    var keyboard = new Keyboard_Singleton();
	return keyboard;
});
