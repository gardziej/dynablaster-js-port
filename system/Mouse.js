define(['system/Vector2', 'system/ButtonState'], function(Vector2, ButtonState){

    function handleMouseMove(evt) {
        if (typeof canvas === 'undefined' || typeof canvas.offset === 'undefined') return;
        var canvasOffset = canvas.offset;
        var mx = (evt.pageX - canvasOffset.x) ;
        var my = (evt.pageY - canvasOffset.y) ;
        mouse.position = new Vector2(mx, my);
        if (mouse.left.down) mouse.move = true;
    }

    function handleMouseWheel(evt) {
        mouse.wheel += evt.deltaY;
        //evt.preventDefault();
        //return false;
    }

    function handleMouseDown(evt) {
        handleMouseMove(evt);
        if (evt.which === 1)
            {
                if (!mouse.left.down) mouse.left.pressed = true;
                mouse.left.down = true;
            }
        else if (evt.which === 2)
            {
                if (!mouse.middle.down) mouse.middle.pressed = true;
                mouse.middle.down = true;
            }
        else if (evt.which === 3)
            {
                if (!mouse.right.down) mouse.right.pressed = true;
                mouse.right.down = true;
            }
    }

    function handleMouseUp(evt) {
        handleMouseMove(evt);

        if (evt.which === 1)
            mouse.left.down = false;
        else if (evt.which === 2)
            mouse.middle.down = false;
        else if (evt.which === 3)
            mouse.right.down = false;

        mouse.move = false;
    }

    function Mouse_Singleton() {
        this.position = Vector2.zero;
        this.wheel = 100;
        this.left = new ButtonState();
        this.middle = new ButtonState();
        this.right = new ButtonState();
        document.onmousemove = handleMouseMove;
        document.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;
        document.onwheel = handleMouseWheel;
    }

    Mouse_Singleton.prototype.reset = function () {
        this.left.pressed = false;
        this.middle.pressed = false;
        this.right.pressed = false;
    };

    Mouse_Singleton.prototype.containsMouseDown = function (rect) {
        return this.left.down && rect.contains(this.position);
    };

    Mouse_Singleton.prototype.containsMousePress = function (rect) {
        return this.left.pressed && rect.contains(this.position);
    };

    var mouse = new Mouse_Singleton();
	return mouse;
});
