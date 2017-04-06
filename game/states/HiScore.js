define(['system/Sprites', 'system/Vector2', 'system/Canvas', 'system/Rectangle', 'system/Keyboard', 'system/Key', 'system/Sounds'],
    function (sprites, Vector2, Canvas, Rectangle, keyboard, Key, sounds) {

    function HiScore(parent) {
      this.game = parent;
      this.hiscores = null;
    }

    HiScore.prototype.initialize = function () {
    };

    HiScore.prototype.handleInput = function (delta) {

    };

    HiScore.prototype.update = function (delta) {
    };

    HiScore.prototype.draw = function () {
        canvas.drawRectangle(0, 0, canvas.width, canvas.height, "black");
        canvas.drawText("hiscore", new Vector2(canvas.width/2,50), Vector2.zero, "white", "center", "Press Start 2P", "30px" );

        var k = 1;
        var pos = 100;

        canvas.drawText("lp", new Vector2(pos, 120), Vector2.zero, "yellow", "left", "Verdana", "12px" );
        pos += 60;
        canvas.drawText("player", new Vector2(pos, 120), Vector2.zero, "yellow", "left", "Verdana", "12px" );
        pos += 330;
        canvas.drawText("hiscore", new Vector2(pos, 120), Vector2.zero, "yellow", "right", "Verdana", "12px" );
        pos += 100;
        canvas.drawText("map", new Vector2(pos, 120), Vector2.zero, "yellow", "right", "Verdana", "12px" );
        pos += 70;
        canvas.drawText("date", new Vector2(pos, 120), Vector2.zero, "yellow", "left", "Verdana", "12px" );


      if (this.hiscores !== null)
        {
            for (var i in this.hiscores)
            {
                pos = 100;
                canvas.drawText(k + ".", new Vector2(pos, i * 40 + 150), Vector2.zero, "white", "left", "Verdana", "16px" );
                pos += 60;
                canvas.drawText(this.hiscores[i].gracz, new Vector2(pos, i * 40 + 150), Vector2.zero, "white", "left", "Verdana", "20px" );
                pos += 330;
                canvas.drawText(this.hiscores[i].punkty, new Vector2(pos, i * 40 + 150), Vector2.zero, "yellow", "right", "Verdana", "20px" );
                pos += 100;
                canvas.drawText(this.hiscores[i].mapa, new Vector2(pos, i * 40 + 150), Vector2.zero, "white", "right", "Verdana", "20px" );
                pos += 70;
                canvas.drawText(this.hiscores[i].dodano, new Vector2(pos, i * 40 + 150), Vector2.zero, "white", "left", "Verdana", "20px" );
                k++;
            }
        }
    };

    HiScore.prototype.reset = function () {
        $.ajax({
        	url: '../server/json.php',
			dataType: "json",
			context: this,
			success : function (response) {
				this.hiscores = response;
			},
        	data: {
            	callback : "?",
            	getHiScore : "true",
            	gra : "dyna"
           }
        });
    };

    return HiScore;
});
