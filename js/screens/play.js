game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        me.audio.playTrack("01-super-mario-bros");
        game.data.score = 0;
        game.data.lives = 3;
        me.levelDirector.loadLevel("level01", function(){

            game.player = me.game.world.getChildByName("player")[0];



        });        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        me.audio.stopTrack();
    }
});
