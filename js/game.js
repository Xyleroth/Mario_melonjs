
/* Game namespace */

var game = {

    // an object where to store game information
    data : {
        // score
        score : 0,
        lives: 1,
        timer:0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(640, 240, {wrapper : "screen", scale : "auto", scaleMethod : "flex-width"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            me.debug.renderHitBox = true;

            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("GumbaEntity", game.GumbaEnemyEntity);
        me.pool.register("piranha_moving", game.PiranhaEnemyMoving);
        me.pool.register('mushroomBox', game.MushroomBoxEntity);
        me.pool.register('coin', game.CoinEntity);
        me.pool.register("mushroom", game.MushroomEntity, true);
        me.pool.register("marioLarge", game.MarioEntity);
        me.pool.register("level2mark", game.Level2Entity);
        me.pool.register("level3mark", game.Level3Entity);
        me.pool.register("level4mark", game.Level4Entity);
        // Start the game.
        me.state.change(me.state.MENU);
    }
};
