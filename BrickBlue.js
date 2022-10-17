var Brick = function(stage, assetManager, ball){
    
    "use strict";
    
    // Event listenr for when this brick is hit by ball
    var eventBrickHit = new createjs.Event("onBrickHit", true);

    //================grab/Construct sprites for Ball and Brick======================//
    
    // Construct a Brick Sprite
    var sprite = assetManager.getSprite("assets");
    
    // Grab Ball sprite from Ball class
    var ballSprite = ball.getSprite();
    
    // Boolean for Brick Activation
    var active = false;
    
    //========================Get/Set Methods=============================//
    
    // Get This Active boolean Status
    this.getActive = function(){
        
        return active;
    };
    
    // Set This Boolean Active Status
    this.setActive = function(value){
        
        active = value;
    };
    
    // Get This Sprite To Be Used with other Classes
    this.getSprite = function(){
        
        return sprite;
    };

    //========================Public Methods=============================//
    
    // Setup the Brick Sprite to Position and add to the Stage
    this.setupMe = function(startX,startY){
        
        sprite.gotoAndStop("brickblue");
        sprite.x = startX;
        sprite.y = startY;
        stage.addChild(sprite);
    };
    
    // Remove and Stop Animation of the Ball Sprite
    this.removeMe = function(){
        
        sprite.gotoAndStop("brickblue");
        stage.removeChild(sprite);
    };
    
    // Collision with the Ball Sprite on Tick
    this.updateMe = function(){
        
        var a = ballSprite.x - sprite.x;
        var b = ballSprite.y - sprite.y;
        var c = Math.sqrt((a * a) + (b * b));
        
        if (c <= 55){
            
            createjs.Sound.play("brickhit");
            sprite.dispatchEvent(eventBrickHit);
            onDestroyed();
           
        }
    };
    
    //========================Private Functions=============================//
    
    // Destroy the brick Sprite
    function onDestroyed(){
        
        sprite.removeAllEventListeners();
        stage.removeChild(sprite);
        active = false;
    }
}