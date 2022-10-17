var Mover = function(sprite, stage) {
    "use strict";
    
    // private property variables
    var speed = 2;
    var direction = MoverDirection.LEFT;
    var moving = false;
    var xDisplace = -1;
    var yDisplace = -1;
    
    
    // construct custom event object for object moving off stage
    var eventLivesTaken = new createjs.Event("onLivesTaken", true)
    
    
    function randomMe(low, high){
        return Math.round(Math.random() * (high - low)) + low;
    }
    // --------------------------------------------------- get/set methods
    this.setSpeed = function(value) {
        speed = value;
    };
    this.getSpeed = function() {
        return speed;
    };
    
    this.setDirection = function(value) {
        direction = value;
    };

    this.getMoving = function(){
        return moving;   
    };
    
    this.startMe = function() {

            sprite.play();
            moving = true;
    };

    this.stopMe = function() {
        
        sprite.stop();
        moving = false;
    };
    
    this.startBall = function(){
        direction = MoverDirection.UP;

    };
    this.brickHit = function(){
        if (randomMe(1,3) == 1){
            direction = MoverDirection.DOWNLEFT;
        }
        else if (randomMe(1,3) == 2){
            direction = MoverDirection.DOWNRIGHT;
        }
        else{
            direction = MoverDirection.DOWN;
        }
    };
    this.paddleHit = function(){
        if (randomMe(1,3) == 1){
            direction = MoverDirection.UPLEFT;
        }
        else if (randomMe(1,3) == 2){
            direction = MoverDirection.UPRIGHT;
        }
        else{
            direction = MoverDirection.UP;
        }
    };
    
    this.update = function() {
        if (moving) {
            // get current width of sprite on this frame
            // we only need to concern ourselves with width in terms of off stage since we rotate sprite up, down, left, and right
            var width = sprite.getBounds().width;

             //========================Left=============================//
            
            if (direction == MoverDirection.LEFT) {
                
                sprite.scaleX = 1;
                sprite.rotation = 0;
                sprite.x = sprite.x - speed;
                
                // Clamp the X Position
                if (sprite.x < 60) {
                    
                    //createjs.Sound.play("bounce");
                    sprite.x = 60;
                    sprite.dispatchEvent(eventOffStage);
                }
            } 
            
            //========================Right=============================//
            
            else if (direction == MoverDirection.RIGHT) {
                
                sprite.scaleX = -1;
                sprite.rotation = 0;
                sprite.x = sprite.x + speed;
                
                // Clamp the X Position
                if (sprite.x > 540) {
                    
                    //createjs.Sound.play("bounce");
                    sprite.x = 540;
                }

            } 
            
            //========================Up=============================//
            
            else if (direction == MoverDirection.UP) {
                
                sprite.scaleX = 1;
                sprite.rotation = 0;
                sprite.y = sprite.y - speed;
                
                // Clamp the Y Position
                if (sprite.y < 60) {
                    
                    createjs.Sound.play("bounce");
                    direction = MoverDirection.DOWN;
                }              
            } 
            
            //========================Down=============================//
            
            else if (direction == MoverDirection.DOWN) {
                
                // moving down
                sprite.scaleX = 1;
                sprite.rotation = 0;
                sprite.y = sprite.y + speed;
                
                // Clamp the Y Position
                if (sprite.y >= (stage.canvas.height + width)) {
                    
                    sprite.x = 300;
                    sprite.y = 540;
                    sprite.stop();
                    moving = false;
                    sprite.dispatchEvent(eventLivesTaken);
                }
            }
            
            //========================Up Right=============================//
            
            else if (direction == MoverDirection.UPRIGHT){
                
                sprite.scaleX = -1;
                sprite.rotation = 0;
                sprite.x = sprite.x + speed;
                sprite.y = sprite.y - speed;
                
                // Clamp the X Position
                if (sprite.x > 590) {
                    
                    createjs.Sound.play("bounce");
                   direction = MoverDirection.UPLEFT;
                }
                
                // Clamp the Y Position
                else if(sprite.y <= 60) {
                    
                    createjs.Sound.play("bounce");
                    direction = MoverDirection.DOWNRIGHT;
                }
            }
            
            //========================Up Left=============================//
            
            else if (direction == MoverDirection.UPLEFT){
                
                sprite.scaleX = 1;
                sprite.rotation = 0;
                sprite.x = sprite.x - speed;
                sprite.y = sprite.y - speed;
                
                // Clamp the X Position
                if (sprite.x < 10) {
                    
                    createjs.Sound.play("bounce");
                    direction = MoverDirection.UPRIGHT;
                }
                
                // Clamp the Y Position
                else if(sprite.y <= 60) {
                    
                    createjs.Sound.play("bounce");
                    direction = MoverDirection.DOWNLEFT;
                }
                
            }
            
            //========================Down Right=============================//
            
            else if (direction == MoverDirection.DOWNRIGHT){
                
                sprite.scaleX = -1;
                sprite.rotation = 0;
                sprite.x = sprite.x + speed;
                sprite.y = sprite.y + speed;
                
                // Clamp the X Position
                if (sprite.x > 590) {
                    
                    createjs.Sound.play("bounce");
                   direction = MoverDirection.DOWNLEFT;
                }
                
                // Clamp The Y Position
                else if (sprite.y > (stage.canvas.height + width)) {
                    
                    sprite.x = 300;
                    sprite.y = 540;
                    sprite.stop();
                    moving = false;
                    sprite.dispatchEvent(eventLivesTaken);           
                }
            }
            
            //========================Down Left=============================//
            
            else if (direction == MoverDirection.DOWNLEFT){
                
                sprite.scaleX = 1;
                sprite.rotation = 0;
                sprite.x = sprite.x - speed;
                sprite.y = sprite.y + speed;
                
                // Clamp the X Position
                if (sprite.x < 10) {
                    
                    createjs.Sound.play("bounce");
                    direction = MoverDirection.DOWNRIGHT;
                }
                // Clamp the Y Position
                else if (sprite.y >= (stage.canvas.height + width)) {
                    
                    sprite.x = 300;
                    sprite.y = 540;
                    sprite.stop();
                    moving = false;
                    sprite.dispatchEvent(eventLivesTaken);
                }
                
            }
        }
    };
}

// static constant hacking by adding them on as properties of a generic object
var MoverDirection = {
    "LEFT":1,
    "RIGHT":2,
    "UP":3,
    "DOWN":4,
    "UPRIGHT":5,
    "UPLEFT":6,
    "DOWNRIGHT": 7,
    "DOWNLEFT":8
};   
