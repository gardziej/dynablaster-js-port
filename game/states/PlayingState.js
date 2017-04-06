define(['system/myHelper', 'game/GamePlayer', 'game/Bonus', 'game/DashBoard', 'game/Map', 'game/Enemy', 'system/Keyboard', 'system/Key',
        'system/Sprites', 'system/Canvas', 'system/Vector2', 'system/Rectangle'],
    function (myHelper, GamePlayer, Bonus, DashBoard, Map, Enemy, keyboard, Key,
        sprites, Canvas, Vector2, Rectangle) {

    function PlayingState(parent) {
        this.game = parent;
    }

    PlayingState.prototype.initialize = function () {
    };

    PlayingState.prototype.handleInput = function (delta) {
    };

    PlayingState.prototype.update = function (delta) {
        this.game.dashboard.update(delta);
        this.game.map.update(delta);
    };

    PlayingState.prototype.draw = function () {
        canvas.drawImage(sprites.background, Vector2.zero, 0, Vector2.zero, new Rectangle(0, 0, canvas.width, canvas.height));
        this.game.map.draw();
        this.game.dashboard.draw(this.game.map.timer.toString(), this.game.gamePlayer.hiscore, this.game.gamePlayer.score, this.game.gamePlayer.lives, this.game.map.timer.ending);
    };

    PlayingState.prototype.reset = function () {

    };

    return PlayingState;
});
