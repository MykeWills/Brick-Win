var Ball = function(stage, assetManager, paddle, ballMaxSpeed){
    "use strict";
    
    //================grab/Construct sprites for Ball and Paddle======================//
    
    // Grab paddle sprite from paddle class
    var paddleSprite =  paddle.getSprite();
    
    // Construct a ball Sprite
    var sprite = assetManager.getSprite("assets");
    
    // Construct a Ball Mover 
    var spriteMover = new Mover(sprite, stage); 
   
     //========================Get/Set Methods=============================//
    
    // Get This Sprite To Be Used with other Classes
    this.getSprite = function(){
        return sprite;
    };
    
    // Get This Mover Speed with other Classes
    this.getSpeed = function(){
        return spriteMover.getSpeed();
    };
    
    // Set This Mover Speed with other Classes
    this.setSpeed = function(){
        return spriteMover.setSpeed();
    };
    
     //========================Public Methods=============================//
    
    // Setup the Ball Sprite and Position and add to the Stage
    this.setupMe = function(){
        // random select speed
        spriteMover.setSpeed();
        sprite.x = 300;
        sprite.y = 540;
        sprite.gotoAndStop("ball");
        stage.addChild(sprite);
        
    };
    
    // Change the Mover Direction on Brick Hit
    this.brickHit = function(direction){

        spriteMover.brickHit();
    };
    
    // Allow the Ball Movement to Proceed
    this.releaseMe = function(){
    
        spriteMover.startBall();
        
    };
    
    // Stop all Ball and Sprite Movement
    this.stopMe = function(){
        sprite.stop()
        spriteMover.stopMe();
    };
    
    // Reset the Speed and Position of the Ball
    this.resetMe = function(){
        
        sprite.gotoAndPlay("ball");
        sprite.x = 300;
        sprite.y = 540;
        spriteMover.setSpeed(ballMaxSpeed);
    };
    
    // Set Position and Start the Movement of the Ball Sprite
    this.startMe = function(direction){
        
        sprite.gotoAndPlay("ball");
        spriteMover.setSpeed(ballMaxSpeed);
        spriteMover.setDirection(direction);
        
        if(!spriteMover.getMoving()){
            spriteMover.startMe();
        }
    };
    
    // Remove and Stop the Movement of the Ball Sprite
    this.removeMe = function(direction){
        
        sprite.gotoAndStop("ball");
        spriteMover.setSpeed(0);
        spriteMover.setDirection(direction);
        stage.removeChild(sprite);
        
        if(spriteMover.getMoving()){
            spriteMover.stopMe();
        }
    };
    
    // Collision with the Paddle Sprite on Tick
    this.updateMe = function(){
        
        spriteMover.update();
        var paddlePoint = paddleSprite.globalToLocal(sprite.x, sprite.y);
        
        // Collision Detection
        if(paddleSprite.hitTest(paddlePoint.x, paddlePoint.y)){
           createjs.Sound.play("bounce");
           spriteMover.paddleHit();
        
        }
    };
}



