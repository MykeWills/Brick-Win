Paddle = function(stage, assetManager, paddleMaxSpeed){
    
    "use strict";
    
    //================grab/Construct sprites for Paddle======================//

    // Construct Paddle Sprite
    var sprite = assetManager.getSprite("assets");
    
    // Construct Paddle Mover
    var spriteMover = new Mover(sprite, stage);
    
    // Fixed Debug Problem with sound on Initializing
    sprite.x = 300
    sprite.y = 545
    
    //========================Get/Set Methods=============================//
    
    // Get This Sprite To Be Used with other Classes
    this.getSprite = function(){
        
        return sprite;
    };
    
    // Get This Mover Speed with other Classes
    this.getSpeed = function(){
        
        return spriteMover.getSpeed(paddleMaxSpeed);
    };
    
    // Set This Mover Speed with other Classes
    this.setSpeed = function(){
        
        return spriteMover.setSpeed(paddleMaxSpeed);
    };
    
    //========================Public Methods=============================//
    
    // Setup the Paddle Sprite and Position and add to the Stage
    this.setupMe = function(){
        
        sprite.x = 300;
        sprite.y = 550;
        sprite.gotoAndStop("paddle")
        spriteMover.setSpeed(paddleMaxSpeed);
        stage.addChild(sprite);
    };
    
    // Set Position and Start the Movement of the Paddle Sprite
    this.startMe = function(direction){
        
        sprite.gotoAndPlay("paddle");
        spriteMover.setSpeed(paddleMaxSpeed);
        spriteMover.setDirection(direction);
        
        if(!spriteMover.getMoving()){
            
            spriteMover.startMe();
        }
    };
    
    // Remove and Stop the Animation of the Paddle Sprite
    this.removeMe = function(){
        
        sprite.gotoAndStop("paddle");
        spriteMover.setSpeed(0);
        stage.removeChild(sprite)
        
        if(spriteMover.getMoving()){
            
            spriteMover.stopMe();
        }
    };
    
    // Stop all Paddle Sprite Movement
    this.stopMe = function(){
        
        spriteMover.stopMe();
    };
    
    // Reset the Speed and Position of the Paddle
    this.resetMe = function(){

        sprite.x = 300;
        sprite.y = 550;
        spriteMover.setSpeed(paddleMaxSpeed);
    };

    // Update the Movement on Tick
    this.updateMe = function(){
        
        spriteMover.update(); 
    };

}