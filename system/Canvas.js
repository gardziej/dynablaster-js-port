define(['system/Vector2', 'system/Color', 'system/Rectangle', 'system/Sprites'], function(Vector2, Color, Rectangle, sprites){

	function Canvas (id, div, fullScreen)
	{
		this.id = id;
		this.div = document.getElementById(div);

		if (typeof fullScreen === "undefined")
			{
				this.fullScreen = false;
			}
			else
			{
				this.fullScreen = true;
			}

        this.resize();
	}

    Object.defineProperty(Canvas.prototype, "offset",
        {
            get: function () {
                return this.canvasOffset;
            }
        });

    Object.defineProperty(Canvas.prototype, "cursor",
        {
            get: function () {
                return this.canvas.style.cursor;
            }
        });

    Canvas.prototype.setCursor = function (type)
	{
		if (this.canvas.style.cursor !== type)
			{
				this.canvas.style.cursor = type;
			}
	}

    Canvas.prototype.resize = function ()
	{
		this.canvasOffset = Vector2.zero;

		if (typeof this.canvas === "undefined")
			{
				this.canvas = document.createElement('canvas');
				this.ctx = this.canvas.getContext("2d");
				this.canvas.setAttribute('id', this.id);
				this.div.appendChild(this.canvas);
			}

		if (this.fullScreen)
			{
		        this.canvas.width = window.innerWidth;
		        this.canvas.height = window.innerHeight;
			}
			else
			{
				this.canvas.width = this.div.getAttribute('width');
				this.canvas.height = this.div.getAttribute('height');

				this.canvasOffset.x = this.div.offsetLeft;
				this.canvasOffset.y = this.div.offsetTop;
			}



		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.canvas.style.cursor = "default";
    };

    Canvas.prototype.setSize = function (x, y)
	{
		this.width = this.canvas.width = x;
		this.height = this.canvas.height = y;
    };

    Canvas.prototype.clear = function ()
	{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    Canvas.prototype.drawCircle = function (position, radius, color, lineColor, lineWidth) {
        this.ctx.save();

		this.ctx.fillStyle = color || "none";
		this.ctx.strokeStyle = lineColor || "none";
		this.ctx.beginPath();
		this.ctx.arc(position.x, position.y, radius, 0, Math.PI*2);

		this.ctx.fill();
		if (typeof lineColor !== "undefined")
			{
				this.ctx.stroke();
			}
        this.ctx.restore();
    };

    Canvas.prototype.drawRectangle = function (x, y, width, height, color, lineColor, lineWidth, shadow) {
        this.ctx.save();
		this.ctx.rect(x, y, width, height);
		this.ctx.fillStyle = color || "transparent";
		if (shadow)
			{
				this.ctx.shadowColor = shadow.color;
				this.ctx.shadowBlur = shadow.blur;
				this.ctx.shadowOffsetX = shadow.offsetX;
				this.ctx.shadowOffsetY = shadow.offsetY;
			}
		this.ctx.fillRect(x, y, width, height);

		this.ctx.restore();
		this.ctx.save();
		if (lineColor)
			{
				this.ctx.strokeStyle = lineColor || "transparent";
				this.ctx.lineWidth = lineWidth || 0;
				this.ctx.strokeRect(x, y, width, height);
			}

        this.ctx.restore();
    };
	Canvas.prototype.drawImage = function (sprite, position, rotation, origin, sourceRect) {
		position = typeof position !== 'undefined' ? position : Vector2.zero;
		rotation = typeof rotation !== 'undefined' ? rotation : 0;
		origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
		sourceRect = typeof sourceRect !== 'undefined' ? sourceRect : new Rectangle(0, 0, sprite.img.width, sprite.img.height);

		this.ctx.save();
		this.ctx.translate(position.x, position.y);
		this.ctx.rotate(rotation);

		this.ctx.drawImage(sprite.img, sourceRect.x, sourceRect.y,
			sourceRect.width, sourceRect.height,
			-origin.x, -origin.y,
			sourceRect.width, sourceRect.height);

		this.ctx.restore();

	};

	Canvas.prototype.drawText = function (text, position, origin, color, textAlign, fontname, fontsize, textBaseline) {
		position = typeof position !== 'undefined' ? position : Vector2.zero;
		origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
		color = typeof color !== 'undefined' ? color : Color.black;
		textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
		fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
		fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
		textBaseline = typeof textBaseline !== 'undefined' ? textBaseline : "top";

		this.ctx.save();
		this.ctx.textBaseline = textBaseline;
		this.ctx.translate(position.x - origin.x, position.y - origin.y);
		this.ctx.font = fontsize + " " + fontname;
		this.ctx.fillStyle = color.toString();
		this.ctx.textAlign = textAlign;
		this.ctx.fillText(text, 0, 0);
		this.ctx.restore();
	};

	Canvas.prototype.measureText = function (text, fontname, fontsize) {
		fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
		fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

		this.ctx.save();
		this.ctx.font = fontsize + " " + fontname;
		var len = this.ctx.measureText(text);
		this.ctx.restore();
		return len;
	};

	Canvas.prototype.getImageData = function (a,b,c,d) {
		return this.ctx.getImageData(a,b,c,d);
	};

	return Canvas;
});
