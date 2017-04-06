define(['system/Canvas', 'system/Vector2'], function(Canvas, Vector2){

  function Points(position, val, map) {
    this.val = val;
    this.position = position;
    this.map = map;
    this.delay = 0;
    this.life = 2;
    this.visible = false;
    }

  Points.prototype.update = function (delta) {
    this.delay -= delta;
    if (this.delay <= 0)
      {
      this.life -= delta;
      this.visible = true;
      }
    if (this.life <= 0) { this.parent.remove(this); }
  };

  Points.prototype.draw = function () {
    if (this.visible)
      canvas.drawText(this.val, new Vector2 (this.map.x + this.position.x, this.map.y + this.position.y), Vector2.zero, "white", "center", "Verdana", "22px bold");
  };

  return Points;

});
