/**
 *
 *
 *
 * @type {Object|void|*}
 */
game.CoinEntity = me.Entity.extend({

    init: function(x, y, settings){

        this._super(me.Entity, 'init', [x, y , settings]);

        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;



    },


    onCollision: function(response,other){
        switch(other.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:


                return true;


                break;
            case me.collision.types.PLAYER_OBJECT:
                me.audio.play("Coin", false);

                game.data.score += 250;

                this.body.setCollisionMask(me.collision.types.NO_OBJECT);
                //Remove the child from the world.
                me.game.world.removeChild(this);
                break;

        }
        return false;


    }


});


game.Level2Entity = me.Entity.extend({

    init: function(x, y, settings){

        this._super(me.Entity, 'init', [x, y , settings]);

        this.body.collisionType = me.collision.types.ACTION_OBJECT;





    },

    onCollision: function(response, other){

        switch(other.body.collisionType){
            case me.collision.types.WORLD_SHAPE:


                break;


            case me.collision.types.PLAYER_OBJECT:

                    me.audio.stop("01-super-mario-bros");

                        me.audio.playTrack("06-underground");
                        this.body.collisionType = me.collision.types.NO_OBJECT;
                        return true;





                        break;

        return true;


        }




    }





});

game.Level3Entity = me.Entity.extend({

    init: function(x, y, settings){

        this._super(me.Entity, 'init', [x, y , settings]);

        this.body.collisionType = me.collision.types.ACTION_OBJECT;





    },

    onCollision: function(response, other){

        switch(other.body.collisionType){
            case me.collision.types.WORLD_SHAPE:


                break;


            case me.collision.types.PLAYER_OBJECT:

                me.audio.stop("06-underground");


                me.audio.playTrack("08-castle");
                this.body.collisionType = me.collision.types.NO_OBJECT;




                break;

                return true;


        }




    }





});

game.Level4Entity = me.Entity.extend({

    init: function(x, y, settings){

        this._super(me.Entity, 'init', [x, y , settings]);

        this.body.collisionType = me.collision.types.ACTION_OBJECT;





    },

    onCollision: function(response, other){

        switch(other.body.collisionType){
            case me.collision.types.WORLD_SHAPE:


                break;


            case me.collision.types.PLAYER_OBJECT:

                me.audio.stop("08-castle");

                me.audio.playTrack("01-super-mario-bros");

                this.body.collisionType = me.collision.types.NO_OBJECT;

                break;

                return true;


        }




    }





});



/**
 *
 *
 *
 *
 * @type {Object|void|*}
 */
game.MushroomBoxEntity = me.Entity.extend({




    init: function(x, y, settings){

        this._super(me.Entity, "init", [x, y , settings]);

        this.renderable.addAnimation("animate", [0,1]);
        this.renderable.setCurrentAnimation("animate");
        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        this.anchorPoint.set(0.5, 1.0);

    },


    onCollision: function(response, other){



        switch(other.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:


                return true;


                break;
            case me.collision.types.PLAYER_OBJECT:
                if(!me.input.isKeyPressed("up") && (response.overlapV.y < 0)) {
                    var mushroom = me.pool.pull("mushroom", this.pos.x+10, this.pos.y-25);
                    me.game.world.addChild(mushroom);
                    me.audio.play("Powerup");
                    this.body.setCollisionMask(me.collision.types.NO_OBJECT);

                    me.game.world.removeChild(this);
                    return false;



                }else{
                    response.overlapV.x =0;
                    response.overlapV.y =0
                    return true;


                }
                break;
        }




    }


});

game.BoxEntity = me.Entity.extend({





});



game.MushroomEntity = me.Entity.extend({

   init: function(x, y, settings){
       this._super(me.Entity, 'init', [x,y,{
           image: "mushroom",
           width: 16,
           type: "mushroom",
           height: 16,
       }]);

        this.renderable.addAnimation("animate", [0,1,2]);
        this.renderable.setCurrentAnimation("animate");
       this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;

   },

    update: function(dt){
      //This should perform some movement.
        this.body.update(dt);

        me.collision.check(this);
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !==0 || this.body.vel.y !==0);


    },


   onCollision: function (response, other){

       switch(other.body.collisionType) {
           case me.collision.types.WORLD_SHAPE:


                return true;


               break;
           case me.collision.types.PLAYER_OBJECT:
               this.body.setCollisionMask(me.collision.types.NO_OBJECT);
               me.audio.play("1up");

               me.game.world.removeChild(this);
            break;

       }
        return false;

   }


});


game.PathEnemyEntity_Y = me.Entity.extend({
    init: function (x, y, settings) {

        var width = settings.width || settings.framewidth;

        settings.width = settings.framewidth;
        settings.height = settings.frameheight;

        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        this._super(me.Entity, "init", [x, y, settings]);

        y = this.pos.y;
        this.endY = y;
        this.startY = y + height - settings.frameheight;
        this.pos.y = y + height - settings.frameheight;


        this.body.gravity = settings.gravity || me.sys.gravity;

        this.walkLeft = false;

        this.body.setVelocity(settings.velX || 1, settings.velY || 1);

        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        this.alwaysUpdate = false;

        this.isMovingEnemy = true;


    },

    update: function (dt) {


        if (this.alive) {

            if(this.walkLeft && this.pos.y <= this.startY){
                this.body.vel.y = this.body.accel.y * me.timer.tick;
                this.walkLeft = false;


            }else if(!this.walkLeft && this.pos.y >= this.endY){
                this.body.vel.y = -this.body.accel.y * me.timer.tick;
                this.walkLeft = true;

            }

        }

        this.body.update(dt);

        me.collision.check(this);
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !==0 || this.body.vel.y !==0);


    },

    onCollision: function(response){

        if(this.alive && (response.overlapV.y > 0) && response.a.body.falling){
           response.overlapV.y=0;
           response.overlapV.x=0;
           return true;
        }


        return false;
    }

});


game.PathEnemyEntity = me.Entity.extend({

    init: function (x, y, settings) {

        var width = settings.width || settings.framewidth;

        settings.width = settings.framewidth;
        settings.height = settings.frameheight;

        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        this._super(me.Entity, "init", [x, y, settings]);

        x = this.pos.x;
        this.startX = x;
        this.endX = x + width - settings.framewidth;
        this.pos.x = x + width - settings.framewidth;


        this.body.gravity = settings.gravity || me.sys.gravity;

        this.walkLeft = false;

        this.body.setVelocity(settings.velX || 1, settings.velY || 6);

        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        this.alwaysUpdate = false;

        this.isMovingEnemy = true;


    },

    update: function (dt) {


        if (this.alive) {

            if(this.walkLeft && this.pos.x <= this.startX){
                this.body.vel.x = this.body.accel.x * me.timer.tick;
                this.walkLeft = false;
                this.renderable.flipX(true);


            }else if(!this.walkLeft && this.pos.x >= this.endX){
                this.body.vel.x = -this.body.accel.x * me.timer.tick;
                this.walkLeft = true;
                this.renderable.flipX(false);

            }

        }

        this.body.update(dt);

        me.collision.check(this);
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !==0 || this.body.vel.y !==0);


    },

    onCollision: function(response){

        if(this.alive && (response.overlapV.y > 0) && response.a.body.falling){

           this.alive = false;

           this.body.setCollisionMask(me.collision.types.NO_OBJECT);

            var self = this;
            this.renderable.flicker(750, function(){
               me.game.world.removeChild(self);
            });
            this.renderable.setCurrentAnimation("die");

            me.audio.play("Thwomp", false);
            game.data.score +=150;


        }


        return false;
    }



});

game.PiranhaEnemyMoving = me.Entity.extend({


    init: function(x, y, settings){

        this._super(me.Entity, "init", [x,y,{

            width:16,
            height:24,
            image:"piranha_plant",
            type:"piranha"

        }]);
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;


        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size

        this.renderable.addAnimation("walk", [0,1]);

        this.renderable.setCurrentAnimation("walk");

        this.anchorPoint.set(.5,.5);
        this.body.setVelocity(1,2);
    },

    update: function (dt) {



        this.body.update(dt);

        me.collision.check(this);
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);

    },

        onCollision: function(response, other){
            switch(other.body.collisionType) {
                case me.collision.types.WORLD_SHAPE:


                    return true;


                    break;
                case me.collision.types.PLAYER_OBJECT:
                    response.overlapV.y=0;
                    response.overlapV.x=0;
                    return true;
                    break;

            }
            return false;

        }




});


game.GumbaEnemyEntity = game.PathEnemyEntity.extend({


    init: function(x, y, settings){

        this._super(game.PathEnemyEntity, "init", [x,y,settings]);

        if(settings.animationspeed){
            this.renderable.animationspeed = settings.animationspeed;

        }
        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size

        this.renderable.addAnimation("walk", [0,1]);
        this.renderable.addAnimation("die", [2]);

        this.renderable.setCurrentAnimation("walk");

        this.anchorPoint.set(0.5, 1.0);
        this.body.setVelocity(1,2);
    }






});


/*
* This is the large version of Mario that appears
* when a person has struck the enlarging mushroom. If that mushroom is
* missed, we can then proceed on.
*
 */
game.MarioEntity = me.Entity.extend({

    init: function (x, y, settings){
        this._super(me.Entity, 'init', [x, y , {
            image:"mario_lg_anim",
            width:16,
            height:32

        }]);

        this.body.setVelocity(3, 12);
        this.body.setFriction(1,0);
        this.dying = false;
        this.multipleJump = 1;
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        this.alwaysUpdate = true;
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.DOWN, "down");
        this.renderable.addAnimation("walk", [0,1,2,3]);
        this.renderable.addAnimation("stand", [0]);
        this.renderable.addAnimation("jump",[5]);
        this.renderable.setCurrentAnimation("stand");


    },

    update: function(dt){
        if (me.input.isKeyPressed('left')){

            this.renderable.flipX(true);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;

            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");

            }


        } else if(me.input.isKeyPressed('right')){

            this.renderable.flipX(false);

            this.body.vel.x += this.body.accel.x * me.timer.tick;

            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");

            }


        }else if (!this.body.falling && !this.body.jumping) {
            this.multipleJump = 1;

            this.renderable.setCurrentAnimation("stand");

        }else if (this.body.falling && this.multipleJump < 2) {
            this.multipleJump = 2;

            this.renderable.setCurrentAnimation("stand");

        }else if(this.body.jumping == false) {
            this.body.vel.x = 0;
            this.renderable.setCurrentAnimation("stand");

        }else{
            this.renderable.setCurrentAnimation("jump");


        }

        if(me.input.isKeyPressed('jump')){

            if(!this.body.jumping && !this.body.falling) {
                if (this.multipleJump <=2) {

                    this.body.vel.y -= (this.body.maxVel.y * this.multipleJump++) * me.timer.tick;
                    this.renderable.setCurrentAnimation("jump");

                    me.audio.play("Jump");
                }
                this.body.jumping = true;




            }

        }

        if (!this.inViewport && (this.pos.y > me.video.renderer.getHeight())){
            this.body.vel.y -=this.body.maxVel.y * 1.6;
            me.game.world.removeChild(this);
            me.game.viewport.fadeIn("#000000",500, function(){

                me.game.world.addChild(new game.HUD.GameOver(me.video.renderer.getWidth()/2,me.video.renderer.getHeight()/2));
                me.audio.pauseTrack();
                me.audio.play("Die", false, function(){
                    game.data.lives--;
                    if(game.data.lives ===0){
                        me.audio.play("16-game-over", false, function(){
                            me.audio.stopTrack();



                        });


                    }else {
                        me.levelDirector.reloadLevel();

                        me.audio.resumeTrack();

                    }

                });


            });

            return true;
        }





        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);



    },

    onCollision: function(response, other){
        switch(other.body.collisionType){
            case me.collision.types.WORLD_SHAPE:
                // Simulate a platform object
                if (other.type === "platform") {
                    if (this.body.falling &&
                        !me.input.isKeyPressed("down") &&
                            // Shortest overlap would move the player upward
                        (response.overlapV.y > 0) &&
                            // The velocity is reasonably fast enough to have penetrated to the overlap depth
                        (~~this.body.vel.y >= ~~response.overlapV.y)
                    ) {
                        // Disable collision on the x axis
                        response.overlapV.x = 0;
                        // Repond to the platform (it is solid)
                        return true;
                    }
                    // Do not respond to the platform (pass through)
                    return false;
                }

                // Custom collision response for slopes
                else if (other.type === "slope") {
                    // Always adjust the collision response upward
                    response.overlapV.y = Math.abs(response.overlap);
                    response.overlapV.x = 0;

                    // Respond to the slope (it is solid)
                    return true;
                }
                break;




            case me.collision.types.ENEMY_OBJECT:

                if(!other.isMovingEnemy){
                    this.body.vel.y -= this.body.maxVel.y *me.timer.tick;
                    this.hurt();

                }else if(other.type==="piranha") {
                    this.hurt();

                    this.body.vel.y -=this.body.maxVel.y * 1.6;


                }else{

                    if((response.overlapV.y >0) && this.body.falling){

                        this.body.vel.y -=this.body.maxVel.y * 1.3;

                    }else if(response.overlapV.x >0 || response.overlapV.x <0){
                        this.body.vel.y -=this.body.maxVel.y * 1.1;


                    }else{
                        this.hurt();

                    }
                    return false;


                }


                break;
            case me.collision.types.COLLECTABLE_OBJECT:

                if(other.type === "mushroom"){
                    response.overlapV.x =0;
                    response.overlapV.y =0;
                    return true;

                }else{
                    return true;
                }


                break;
            default:
                return false;


        }


    },

    hurt: function(){

        if (!this.renderable.flickering){

            this.renderable.flicker(750);
            var marioSmall = me.pool.pull("mainPlayer", this.pos.x, this.pos.y);
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            me.game.world.removeChild(this);
            me.game.world.addChild(marioSmall);

            marioSmall.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
            marioSmall.renderable.flicker(1000, function () {
                var marioSmall2 = me.pool.pull("mainPlayer", marioSmall.pos.x, marioSmall.pos.y);
                marioSmall.body.setCollisionMask(me.collision.types.NO_OBJECT);
                me.game.world.removeChild(marioSmall);


                me.game.world.addChild(marioSmall2);

            }.bind(this));


            me.game.viewport.fadeIn("#FFFFFF", 75);
            me.audio.play("Break", false);



        }



    }


});




/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , {

            width:16,
            height:16,
            image:"mario_anim"

        }]);

        this.body.setVelocity(3, 12);
        this.body.setFriction(1,0);
        this.dying = false;
        this.multipleJump = 1;
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);


        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        this.alwaysUpdate = true;
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.DOWN, "down");
        this.renderable.addAnimation("walk", [0,1,2,3]);
        this.renderable.addAnimation("stand", [0]);
        this.renderable.addAnimation("jump",[5]);
        this.renderable.addAnimation("die", [6]);
        this.renderable.addAnimation("swim", [9,10,11,12,13]);
        this.renderable.setCurrentAnimation("stand");
    },

    /**
     * update the entity
     */
    update : function (dt) {

        if (me.input.isKeyPressed('left')){

            this.renderable.flipX(true);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;

            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");

            }


        } else if(me.input.isKeyPressed('right')){

            this.renderable.flipX(false);

            this.body.vel.x += this.body.accel.x * me.timer.tick;

            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");

            }


        }else if (!this.body.falling && !this.body.jumping) {
                this.multipleJump = 1;

            this.renderable.setCurrentAnimation("stand");

        }else if (this.body.falling && this.multipleJump < 2) {
                this.multipleJump = 2;

            this.renderable.setCurrentAnimation("stand");

        }else if(this.body.jumping == false) {
            this.body.vel.x = 0;
            this.renderable.setCurrentAnimation("stand");

        }else{
            this.renderable.setCurrentAnimation("jump");




        }

        if(me.input.isKeyPressed('jump')){

            if(!this.body.jumping && !this.body.falling) {
                 if (this.multipleJump <=2) {

                    this.body.vel.y -= (this.body.maxVel.y * this.multipleJump++) * me.timer.tick;
                     this.renderable.setCurrentAnimation("jump");

                     me.audio.play("Jump");
                }
                this.body.jumping = true;




            }

        }
        //Did we fall in a hole
        if (!this.inViewport && (this.pos.y > me.video.renderer.getHeight())){
            this.body.vel.y -=this.body.maxVel.y * 1.6;
            me.game.world.removeChild(this);

            me.game.viewport.fadeIn("#000000",500, function(){

                me.game.world.addChild(new game.HUD.GameOver(me.game.viewport.width/2,me.game.viewport.height/2));
                me.audio.pauseTrack();
                me.audio.play("Die", false, function(){
                    game.data.lives--;
                    if(game.data.lives ===0){
                        me.audio.play("16-game-over", false, function(){
                            me.audio.stopTrack();



                        });


                    }else {
                        me.levelDirector.reloadLevel();

                        me.audio.resumeTrack();

                    }

                });


            });
            return true;
        }



        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {

       switch(other.body.collisionType){
           case me.collision.types.WORLD_SHAPE:
               // Simulate a platform object
               if (other.type === "platform") {
                   if (this.body.falling &&
                       !me.input.isKeyPressed("down") &&
                           // Shortest overlap would move the player upward
                       (response.overlapV.y > 0) &&
                           // The velocity is reasonably fast enough to have penetrated to the overlap depth
                       (~~this.body.vel.y >= ~~response.overlapV.y)
                   ) {
                       // Disable collision on the x axis
                       response.overlapV.x = 0;
                       // Repond to the platform (it is solid)
                       return true;
                   }
               }
               // Custom collision response for slopes
               else if (other.type === "slope") {
                   // Always adjust the collision response upward
                   response.overlapV.y = Math.abs(response.overlap);
                   response.overlapV.x = 0;

                   // Respond to the slope (it is solid)
                   return true;
               }
               break;




           case me.collision.types.ENEMY_OBJECT:

               if(!other.isMovingEnemy && other.type !== "piranha"){
                    this.body.vel.y -= this.body.maxVel.y *me.timer.tick;
                   this.die();

               }else if (other.type==="piranha" && response.overlapV.y > 0 || other.type=="piranha" && response.overlapV.x >0 || other.type==="piranha" && response.overlapV.x <0) {
                    this.die();

               }else{

                       if((response.overlapV.y >0) || this.body.falling){

                           this.body.vel.y -=this.body.maxVel.y * 1.6;

                       }else if(response.overlapV.x >0 || response.overlapV.x <0){
                           this.die();

                       }else{
                           this.hurt();
                       }
                       return false;

               }

               break;

           case me.collision.types.COLLECTABLE_OBJECT:

               if(other.type === "mushroom"){

                   var marioLarge = me.pool.pull("marioLarge", this.pos.x, this.pos.y);
                   this.body.setCollisionMask(me.collision.types.NO_OBJECT);
                   me.game.world.removeChild(this);
                   me.game.world.addChild(marioLarge);

               }else{

                   return true;

               }



               break;
           case me.collision.types.PLAYER_OBJECT:
               return true;


               break;

           default:
               return false;


       }








        // Make all other objects solid
        return true;
    },


    hurt: function(){

      if (!this.renderable.flickering){

          this.renderable.flicker(750);

         // me.game.viewport.fadeIn("#FFFFFF", 75);
          me.audio.play("Bump", false);



      }



    },

    die: function(){

        if(!this.renderable.flickering){

            this.renderable.setCurrentAnimation("die");
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);

            this.body.vel.y -=this.body.maxVel.y * 1.8;



        }



    }



});
