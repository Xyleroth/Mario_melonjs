game.TitleScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

        var backgroundImage = new me.Sprite(me.game.viewport.width/2, me.game.viewport.height/2,
            {image:me.loader.getImage("title_2")});
       backgroundImage.scale(me.game.viewport.width / backgroundImage.width,1);

        me.game.world.addChild(backgroundImage,1);


        me.game.world.addChild(new(me.Renderable.extend({

            init:function() {
                this.font = new me.Font("Super_Mario_World", "9px", "#FFFFFF");

            },

            scrollover: function(){




            },

            update: function(dt){
                return true;



            },
            draw: function(renderer){

                this.font.draw(renderer, "Press Enter to",20,240);


            }





        })),2);

        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action,keycode, edge){

            if (action === "enter"){

                me.audio.play("Coin");
                me.state.change(me.state.PLAY);


            }
        });




    },




    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
    }
});
