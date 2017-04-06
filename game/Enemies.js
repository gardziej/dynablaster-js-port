define(['system/myHelper', 'system/GameObjectList', 'game/Enemy'], function(myHelper, GameObjectList, Enemy){

  function Enemies(parent) {
	GameObjectList.call(this, parent);
    this.parent = parent;
    this.exitExplodedTrigger = this.exitExplodedTriggerTime = .6;
    this.makeExitExploded = false;
    this.exitPosition = null;
  }

	Enemies.prototype = Object.create(GameObjectList.prototype);

  Enemies.prototype.isOnTile = function (x,y) {
    for (var i in this.gameObjects)
    {
      if (typeof this.gameObjects[i] !== "undefined" && this.gameObjects[i].checkImpact(x,y) && this.gameObjects[i].stage === 'playing')
      {
        return true;
      }
    }
    return false;
  }

  Enemies.prototype.exitExploded = function (exitPosition) {
      this.exitPosition = exitPosition;
      this.makeExitExploded = true;
  };

  Enemies.prototype.exitExplodedMake = function (exitPosition) {
    var i = 12;
    while(i)
      {
        var x = this.exitPosition.x;
        var y = this.exitPosition.y;
        var newPosition = {
            x : myHelper.getRandomInt(this.exitPosition.x-3, this.exitPosition.x+3),
            y : myHelper.getRandomInt(this.exitPosition.y-3, this.exitPosition.y+3)
        };
        if (!this.parent.isSolid(newPosition.x, newPosition.y))
            {
            var enemy = new Enemy(newPosition, this.parent, 'fire');
            enemy.bonus.goForPlayer = false;
            enemy.delayedGoForPlayer(5);
            enemy.speed = 6;
            this.add(enemy);
            i--;
            }
      }
    this.exitExplodedTrigger = this.exitExplodedTriggerTime;
    this.makeExitExploded = false;
};



  Enemies.prototype.update = function (delta) {

    if (this.makeExitExploded)
      {
        this.exitExplodedTrigger -= delta;
      }

    if (this.exitExplodedTrigger <= 0)
      {
        this.exitExplodedMake();
      }

    for (var i in this.gameObjects)
        this.gameObjects[i].update(delta);
  };

  Object.defineProperty(Enemies.prototype, "countAlive", {
      get: function () {
          var alives = 0;
          for (var i in this.gameObjects)
              {
                if (this.gameObjects[i].stage === 'playing') alives++;
              }
          return alives;
      }
  });

	Enemies.prototype.checkImpact = function (x,y) {
    for (var i in this.gameObjects)
    {
      if (typeof this.gameObjects[i] !== "undefined" && this.gameObjects[i].checkImpact(x,y) && this.gameObjects[i].stage === 'playing')
      {
        this.gameObjects[i].die();
      }
    }
  }

  return Enemies;

});
