var UserInterface = function(stage, assetManager, maxSpeed) {
    
    "use strict";
    
    //================grab sprites for UserInterface======================//
    
    //  Paddle Sprite Icon
    var lifesprite = assetManager.getSprite("assets");
    
    // Score Sprite Icon
    var scoresprite = assetManager.getSprite("assets");
    
    // Number Text Sprite for Score
    var txtScore = new createjs.BitmapText("0", assetManager.getSpriteSheet("assets"));
    // Number Text Sprite for Lives
    var txtLives = new createjs.BitmapText("0", assetManager.getSpriteSheet("assets"));

    //========================Get/Set Methods=============================//
    // Set the Value to the Lives
    this.setLivesTaken = function(value) {
        txtLives.text = String(value);
    };
    
    // Set the Value to the score
    this.setScoreAdded = function(value){
        txtScore.text = String(value);
    };
    
    //========================Public Methods=============================//
    
    // Setup and add sprites to the Stage
    this.setupMe = function() {
        
        // Setup the Lives to the Stage
        this.setLivesTaken(9);
        txtLives.x = 550;
        txtLives.y = 23;
        txtLives.letterSpacing = 2;
        stage.addChild(txtLives);
        
        // Setup the Score to the stage
        txtScore.x = 135;
        txtScore.y = 23;
        txtScore.letterSpacing = 2;
        stage.addChild(txtScore);
        
        // Setup the score icon
        scoresprite.gotoAndStop("score");
        scoresprite.x = 49;
        scoresprite.y = 20;
        stage.addChild(scoresprite);
    
        // Setup the life icon
        lifesprite.gotoAndStop("lives");
        lifesprite.x = 430;
        lifesprite.y = 20;
        stage.addChild(lifesprite);

    };
    
    // Remove all UI Sprites from the Stage
    this.removeMe = function(direction){
        
        
        stage.removeChild(txtLives);
        stage.removeChild(txtScore);
        stage.removeChild(scoresprite);
        stage.removeChild(lifesprite);
    };
};
