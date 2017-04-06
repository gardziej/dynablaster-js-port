define(['system/Rectangle', 'system/Canvas', 'system/Vector2', 'system/Sprites'],
    function(Rectangle, Canvas, Vector2, sprites){

  function Animation (parent, sprite, looping, frameTimeMax, onlyOneframe, range) {
    this.position = {};
    this.parent = parent;
    this.sprite = sprite;
    this.frameTimeMax = typeof frameTimeMax != 'undefined' ? frameTimeMax : 0.1;
    this.frameTime = this.frameTimeMax;
    this.frame = {
        start : 0,
        current : 0,
        end : 0
    };
    this.looping = looping;

    if (typeof onlyOneframe !== 'undefined' && onlyOneframe !== false && !isNaN(onlyOneframe))
        {
            this.frame.start = onlyOneframe;
            this.frame.end = onlyOneframe;
        }
        else if (typeof range !== 'undefined' && (range instanceof Array))
        {
            this.frame.start = range[0];
            this.frame.end = range[1];
        }
        else
        {
            this.frame.start = 0;
            this.frame.end = this.sprite.cols-1;
        }
    this.frame.current = this.frame.start;

    this.frameSize = {
        width : this.sprite.img.width / this.sprite.cols,
        height : this.sprite.img.height
    };
    this.ended = false;

    this.rectCorrect = [0,0,0,0];

  }

  Animation.prototype.update = function (delta, position, rectCorrect) {

    if (typeof position !== 'undefined')
        {
            this.position = position;
        }

    if (typeof rectCorrect !== 'undefined')
        {
            this.rectCorrect = rectCorrect;
        }

	if (this.frame.start !== this.frame.end)
    {

        this.frameTime -= delta;
        if (this.frameTime < 0)
            {
            this.frame.current++;
            this.frameTime = this.frameTimeMax;
            if (this.frame.current > this.frame.end)
                {
                if (this.looping)
                    {
                    this.frame.current = this.frame.start;
                    }
                    else
                    {
                    this.ended = true;
                    }
                }
            }
    }
  };

  Object.defineProperty(Animation.prototype, "isEnded", {
      get: function () {
          return this.ended;
      }
  });

  Animation.prototype.draw = function (delta) {
    canvas.drawImage(this.sprite,
        new Vector2(this.position.x, this.position.y),
        0,
        Vector2.zero,
        new Rectangle(
            this.frame.current * this.frameSize.width + this.rectCorrect[0],
            0 + this.rectCorrect[1],
            this.frameSize.width + this.rectCorrect[2],
            this.frameSize.height + this.rectCorrect[3]
            ));
  };


  return Animation;
});
