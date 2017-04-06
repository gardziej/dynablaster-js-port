define(['system/Sprites', 'system/Vector2', 'system/Canvas', 'system/Rectangle', 'system/Keyboard', 'system/Key', 'system/Sounds'],
    function (sprites, Vector2, Canvas, Rectangle, keyboard, Key, sounds) {

    function PauseState(parent) {
      this.game = parent;
      this.time = this.duration = 2;
    }

    PauseState.prototype.initialize = function () {
    };

    PauseState.prototype.handleInput = function (delta) {

    };

    PauseState.prototype.update = function (delta) {

    };

    PauseState.prototype.draw = function () {
      canvas.drawRectangle(0, 0, canvas.width, canvas.height, "black");
      canvas.drawText("pause", new Vector2(canvas.width/2,200), Vector2.zero, "white", "center", "Press Start 2P", "30px" );
      canvas.drawImage(sprites.keyboard, Vector2.zero, 0, Vector2.zero, new Rectangle(0, 0, canvas.width, canvas.height));
    };

    PauseState.prototype.reset = function () {

    };

    return PauseState;
});
