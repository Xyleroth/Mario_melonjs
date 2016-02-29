/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(10, 5));
        this.addChild(new game.HUD.LifeItem(300, 5));
       this.addChild(new game.HUD.TimerItem(150,5));
    }
});


/*
* A Basic HUD Item displaying the number of lives.
*
 */
game.HUD.LifeItem = me.Renderable.extend({

    init: function(x, y){

        this._super(me.Renderable, 'init', [x,y,10,10]);
        this.font = new me.Font("Super_Mario_World", "9pt", "#FFFFFF");

        this.lives = 0;

    },

    update: function(){

        if(this.lives !== game.data.lives){
            this.lives = game.data.lives;
        }

        if(game.data.lives ===0){
            me.game.world.addChild(new game.HUD.GameOver(180,120));


           // me.state.pause();
            setTimeout(function(){


                me.game.world.removeChild(game.HUD);


                me.state.change(me.state.MENU);

            },3000);
            return false;
        }

        return true;

    },

    draw: function(context){

      this.font.draw(context,"LIVES: "+ game.data.lives, this.pos.x, this.pos.y);

    }





});

game.HUD.GameOver = me.Renderable.extend({


    init:function(x,y) {
        this._super(me.Renderable, 'init', [x,y,10,10]);

        this.font = new me.Font("Super_Mario_World", "9pt", "#FFFFFF");

    },


    update: function(dt){
        return true;



    },
    draw: function(renderer){

        this.font.draw(renderer, "GAME OVER",this.pos.x, this.pos.y);


    }



});

game.HUD.TimerItem = me.Renderable.extend({


    init: function(x,y){


        this._super(me.Renderable, 'init', [x,y,10,10]);

        this.timer = 5 * 60;
        this.tick =0;
        this.font= new me.Font("Super_Mario_World", "9pt", "#FFFFFF");




    },

    update: function(){

        this.tick += (me.timer.tick);
        if(this.tick >=60){
            this.timer--;
            this.tick=0;

        }
        game.data.timer = this.timer;

        if(this.timer <=100){
            me.audio.stopTrack();
            me.audio.playTrack("03-hurry-super-mario-bros");


        }




    },


    draw : function (context) {

        this.font.draw(context, "TIMER: " + game.data.timer, this.pos.x, this.pos.y);

    }










});

/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10,10 ]);
        this.font = new me.Font("Super_Mario_World", "9pt", "#FFFFFF");
        // local copy of the global score
        this.score = -1;
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (context) {

        this.font.draw(context, "SCORE: " + game.data.score, this.pos.x, this.pos.y);

    }

});




