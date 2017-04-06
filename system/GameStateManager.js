define(['system/Keyboard', 'system/Key'],
	function(keyboard, Key){

    function GameStateManager(game) {
		this.game = game;
        this.gameStates = {};
        this.currentGameState = null;
		this.lastGameStateId = 0;
		this.currentGameStateId = 0;
		this.lastMasterStateId = 0;
    }

    GameStateManager.prototype.add = function (id, gamestate, master) {
        this.gameStates[id] = {state : gamestate};
		if (typeof master !== "undefined" && master === true)
			{
				this.gameStates[id].type = 'master';
			}
        this.currentGameState = gamestate;
		this.currentGameStateId = id;
    };

    GameStateManager.prototype.switchTo = function (id) {
        if (typeof this.gameStates[id] !== "undefined")
			{
        	this.currentGameState = this.gameStates[id].state;
			if (this.currentGameStateId !== id)
			{
				this.lastGameStateId = this.currentGameStateId;
			}
			this.currentGameStateId = id;
			if (this.gameStates[id].type === "master")
				{
					this.lastMasterStateId = id;
				}
			return this;
			}
    };

    GameStateManager.prototype.escape = function () {
        if (this.lastMasterStateId !== null)
            this.switchTo(this.lastMasterStateId);
    };

    GameStateManager.prototype.getCurrentGameStateId = function () {
        if (this.currentGameStateId !== null)
            return this.currentGameStateId;
		return false;
    };

	GameStateManager.prototype.getLastMasterStateId = function () {
		if (this.lastMasterStateId !== null)
			return this.lastMasterStateId;
		return false;
	};

    GameStateManager.prototype.handleInput = function (delta) {
        if (this.currentGameState !== null)
            this.currentGameState.handleInput(delta);
    };

    GameStateManager.prototype.update = function (delta) {
        if (this.currentGameState !== null)
            this.currentGameState.update(delta);
    };

    GameStateManager.prototype.draw = function () {
        if (this.currentGameState !== null)
            this.currentGameState.draw();
    };

    GameStateManager.prototype.reset = function () {
        if (this.currentGameState !== null)
            this.currentGameState.reset();
    };


    return GameStateManager;

});
