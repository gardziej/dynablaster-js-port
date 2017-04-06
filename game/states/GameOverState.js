define(['jquery', 'system/Sprites', 'system/Vector2', 'system/Canvas', 'system/Rectangle', 'system/Keyboard', 'system/Key'],
    function ($, sprites, Vector2, Canvas, Rectangle, keyboard, Key) {

    function GameOverState(parent) {
      this.game = parent;
    }

    GameOverState.prototype.initialize = function () {
    };

    GameOverState.prototype.handleInput = function (delta) {
      if (keyboard.pressed(Key.enter)) {
        this.game.gamePlayer.saveUserName();
        this.game.gamePlayer.sendScore();
        if (this.game.gamePlayer.lives > 0) this.game.gamePlayer.saveGame();
        this.game.gameStateManager.switchTo('game_title_page').reset();
      }

      if (this.game.gamePlayer.name.length < 16) {
          var code = keyboard.getA(code);
          if (typeof code !== "undefined")
            this.game.gamePlayer.name = this.game.gamePlayer.name + String.fromCharCode(code);
      }

      if (this.game.gamePlayer.name.length > 0 && keyboard.pressed(Key.back)) {
        this.game.gamePlayer.name = this.game.gamePlayer.name.slice(0, - 1);
      }

    };

    GameOverState.prototype.update = function (delta) {

    };

    GameOverState.prototype.draw = function () {
        canvas.drawImage(sprites.game_over, Vector2.zero, 0, Vector2.zero, new Rectangle(0, 0, canvas.width, canvas.height));
        canvas.drawText("enter your name and press enter", new Vector2(canvas.width/2, 100), Vector2.zero, "yellow", "center", "Press Start 2P", "30px" );
        canvas.drawText(this.game.gamePlayer.name, new Vector2(canvas.width/2, 150), Vector2.zero, "yellow", "center", "Press Start 2P", "30px" );
        canvas.drawRectangle(263, 183, 370, 2, "yellow");
  		canvas.drawText("your score: " + this.game.gamePlayer.score, new Vector2(100,470), Vector2.zero, "white", "left", "Press Start 2P", "30px" );
  		canvas.drawText("your best score: " + this.game.gamePlayer.hiscore, new Vector2(100,520), Vector2.zero, "white", "left", "Press Start 2P", "30px" );
    };

    GameOverState.prototype.reset = function () {
		keyboard.reset();
    };

    return GameOverState;
});
