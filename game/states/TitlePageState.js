define(['system/Sprites', 'system/Vector2', 'system/Canvas', 'system/Rectangle', 'system/Keyboard', 'system/Key', 'game/GamePlayer', 'system/Sounds'],
    function (sprites, Vector2, Canvas, Rectangle, keyboard, Key, GamePlayer, sounds) {

    function TitlePageState(parent) {
      this.game = parent;
    }

    TitlePageState.prototype.initialize = function () {
    };

    TitlePageState.prototype.handleInput = function (delta) {
        if (keyboard.pressed(Key.space))
            {
            this.game.gameStateManager.switchTo('stage_number').reset();
            }
        if (keyboard.pressed(Key.L))
            {
            if (this.game.gamePlayer.loadSave())
                {
                this.game.gamePlayer.clearSaveGame();
                this.game.gameStateManager.switchTo('stage_number').reset();
                }
                else
                {
                sounds.play('time_out');
                }
            }
    };

    TitlePageState.prototype.update = function (delta) {

    };

    TitlePageState.prototype.draw = function () {
        canvas.drawImage(sprites.start_panel, Vector2.zero, 0, Vector2.zero, new Rectangle(0, 0, canvas.width, canvas.height));
        canvas.drawImage(sprites.keyboard, Vector2.zero, 0, Vector2.zero, new Rectangle(0, 0, canvas.width, canvas.height));
    };

    TitlePageState.prototype.reset = function () {
        this.game.gamePlayer = new GamePlayer('new');
    };

    return TitlePageState;
});
