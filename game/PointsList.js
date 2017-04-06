define(['system/GameObjectList', 'game/Points'], function(GameObjectList, Points){

  function PointsList(parent) {
		GameObjectList.call(this, parent);
    this.parent = parent;
  }

	PointsList.prototype = Object.create(GameObjectList.prototype);

  PointsList.prototype.add = function (position, val, map) {
      var gameobject = new Points(position, val, map);
      this.gameObjects.push(gameobject);
      gameobject.parent = this;
  };


  return PointsList;

});
