define(['system/Canvas', 'system/Sprites', 'system/Vector2'], function(Canvas, sprites, Vector2){

	function DashBoard () {
		this.blink = false;
		this.blinkCounter = 0;
	}

	DashBoard.prototype.drawSteadyText = function (val, position) {
		canvas.drawText(val, position, Vector2.zero, "white", "right", "Press Start 2P", "30px" );
	};

	DashBoard.prototype.drawBlinkingText = function (val, position) {
		if (this.blink)
			{
				canvas.drawText(val, position, Vector2.zero, "white", "right", "Press Start 2P", "30px" );
			}
	};

	DashBoard.prototype.update = function (delta) {
		this.blinkCounter += delta;
		if (this.blinkCounter > 0.2)
			{
				this.blink = !this.blink;
				this.blinkCounter = 0;
			}
	};

	DashBoard.prototype.draw = function (time, hiscore, score, lives, ending) {
		canvas.drawImage (sprites.dashboard, Vector2.zero);
		this.drawSteadyText(score, new Vector2(300,25));
		if (ending) this.drawBlinkingText(time, new Vector2(470,25));
			else this.drawSteadyText(time, new Vector2(470,25));
		this.drawSteadyText(lives, new Vector2(560,25));
		this.drawSteadyText(hiscore, new Vector2(867,25));
	};

	return DashBoard;
});
