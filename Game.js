(function() {
    "use strict";
    
    window.addEventListener("load", onInit);
    
    // Window Variables
    var stage = null;
    var canvas = null;
    
    //Brick Variables
    var brickMax = 18;
    var brickPool = [];
    var redBrickMax = 18;
    var redBrickPool = [];
    var greenBrickMax = 18;
    var greenBrickPool = [];
    
    // Game Variables
    var frameRate = 26;
    var rightKey = false;
    var rightKeyBall = false;
    var leftKey = false;
    var leftKeyBall = false;
    var moveWithPaddle = true;
    var livesTaken = 9;
    var score = 0;
    var paddleMaxSpeed = 8
    var ballMaxSpeed = 8
    
    // Game Objects
    var assetManager;
    var background = null;
    var title = null;
    var winscreen = null;
    var playAgain = null;
    var paddle = null;
    var ball = null;
    var brick = null;
    var userInterface = null;
    var gameover = null;
    var btnRestart = null;
    
    
    //================Event Handlers======================//
    
    // Initialize the Game
    function onInit() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("stage");
        // set canvas to as wide/high as the browser window
        canvas.width = 600;
        canvas.height = 600;
        // create stage object
        stage = new createjs.Stage(canvas);

        // construct preloader object to load spritesheet and sound assets
        assetManager = new AssetManager(stage);
        stage.addEventListener("onAllAssetsLoaded", onSetup);
        // load the assets
        assetManager.loadAssets(manifest);
        
        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);
        
        stage.enableMouseOver();
    }
    
    // Setup the Game
    function onSetup() {
        // Remove Asset Load Event Listener
        stage.removeEventListener("onAllAssetsLoaded", onSetup);
        
        // Set Lives and Score
        livesTaken = 9;
        score = 0;
        
        // Construct and Add the Background
        background = assetManager.getSprite("assets");
        background.gotoAndStop("background");
        stage.addChild(background);
        
        // Construct and add the Title Screen
        title = assetManager.getSprite("assets");
        title.gotoAndStop("title");
        title.x = 0;
        title.y = 0;
        stage.addChild(title);
        
        // Construct the WinScreen
        winscreen = assetManager.getSprite("assets");
        winscreen.gotoAndStop("winscreen");
        winscreen.x = 0;
        winscreen.y = 0;
        
        // Construct the Button Helper Restart Button
        btnRestart = assetManager.getSprite("assets");
        btnRestart.x = 0;
        btnRestart.y = 300;
        btnRestart.buttonHelper = new createjs.ButtonHelper(btnRestart, "btnrestart_up", "btnrestart_up", "btnrestart_over");
        
        // Construct the GameOver
        gameover = assetManager.getSprite("assets");
        gameover.gotoAndStop("gameover");
        
        // Construct the Paddle Class
        paddle = new Paddle(stage, assetManager, paddleMaxSpeed);
        
        // Construct the UserInterface Class
        userInterface = new UserInterface(stage, assetManager);
        
        // Construct the ball Class
        ball = new Ball(stage, assetManager, paddle, ballMaxSpeed);
       
        // Construct the Green Brick Class
        for(var n=0; n<greenBrickMax; n++){
            greenBrickPool.push(new GreenBrick(stage, assetManager, ball));
        }
        
        // Construct the Red Brick Class
        for(var n=0; n<redBrickMax; n++){
            redBrickPool.push(new RedBrick(stage, assetManager, ball));
        }
        
        // Construct the Blue Brick Class
        for(var n=0; n<brickMax; n++){
            brickPool.push(new Brick(stage, assetManager, ball));
        }
        
        // Setup Event Listeners for Click Start and Lives
        stage.addEventListener("onLivesTaken", onLivesTaken, true);
        background.addEventListener("click", onStartGame);	
        
        // Intro Music
        createjs.Sound.play("startMusic");

    }
    
    //================Brick Functions======================//
    
    // --------------------------------------Add The Bricks
    // Create and Loop Blue Bricks In Pool
    function onAddBrickBlue(e){
         
        var addBricksx = 60;
        var addBricksy = 80;
        for(var n=0; n<=brickPool.length; n++){
            var newBrick = brickPool[n];
            newBrick.setActive(true);
            newBrick.setupMe(addBricksx, addBricksy);
            addBricksx = addBricksx + 95;
            if (addBricksx >= 545){
             addBricksy += 50;
             addBricksx = 60;
            }
            if (addBricksy >= 129 && addBricksx >= 545){
                 addBricksy += 50;
                 addBricksx = 60;
            }
        } 
    }
    
    // Create and Loop Red Bricks In Pool
    function onAddBrickRed(e){
         
        var addRedBricksx = 60;
        var addRedBricksy = 80;
        for(var n=0; n<=brickPool.length; n++){
            var newRedBrick = redBrickPool[n];
            newRedBrick.setActive(true);
            newRedBrick.setupMe(addRedBricksx, addRedBricksy);
            addRedBricksx = addRedBricksx + 95;
            if (addRedBricksx >= 545){
             addRedBricksy += 50;
             addRedBricksx = 60;
            }
            if (addRedBricksy >= 129 && addRedBricksx >= 545){
                 addRedBricksy += 50;
                 addRedBricksx = 60;
            }
        } 
    }
    
    //Create and Loop Green Bricks In Pool
    function onAddBrickGreen(e){
         
        var addGreenBricksx = 60;
        var addGreenBricksy = 80;
        for(var n=0; n<=brickPool.length; n++){
            var newGreenBrick = greenBrickPool[n];
            newGreenBrick.setActive(true);
            newGreenBrick.setupMe(addGreenBricksx, addGreenBricksy);
            addGreenBricksx = addGreenBricksx + 95;
            if (addGreenBricksx >= 545){
             addGreenBricksy += 50;
             addGreenBricksx = 60;
            }
            if (addGreenBricksy >= 129 && addGreenBricksx >= 545){
                 addGreenBricksy += 50;
                 addGreenBricksx = 60;
            }
        } 
    }
    
    // --------------------------------------Hit The Bricks
    // When Ball hits the Blue Brick
    function onBrickHit(){
        // Reverse the Movement of the Ball
        ball.brickHit();
        // Add Points to the score
        score += 1000;
        // Set Points to the Score
        userInterface.setScoreAdded(score);
        // if All bricks are hit and Points are Met
        if(score >= 18000){
            // Stop Level One Music
            createjs.Sound.stop("gameMusic");
            // Load Level 2
            onLevelTwo();
        }
    }
    
    // When Ball hits the Red Brick   
    function onRedBrickHit(){
        // Reverse the Movement of the Ball
        ball.brickHit();
        // Add Points to the score
        score += 2000;
        // Set Points to the Score
        userInterface.setScoreAdded(score);
         // if All bricks are hit and Points are Met
        if(score >= 54000){
            // Stop Level 2 Music
            createjs.Sound.stop("gameMusic2");
            // Load Level 3
            onLevelThree();
        }
    }
    
    // When Ball hits the Green Brick
    function onGreenBrickHit(){
        // Reverse the Movement of the Ball
        ball.brickHit();
        // Set Points to the Score
        score += 3000;
        // Set Points to the Score
        userInterface.setScoreAdded(score);
        // if All bricks are hit and Points are Met
        if(score >= 108000){
            // Stop Level 3 Music
            createjs.Sound.stop("gameMusic3");
            // Load Win the Game Screen
            onWinTheGame();
        }
    }
    
    //================Level Functions======================//
    
    // Setup of the first Level 
    function onStartGame(e){
         // Setup Listener for hitting the Brick
         stage.addEventListener("onBrickHit", onBrickHit, true);
        
         // Play and Stop Sounds
         createjs.Sound.stop("startMusic");
         createjs.Sound.play("Levelup");
         createjs.Sound.play("gameMusic");
        
         // Remove the title Screen
         stage.removeChild(title);
        
         // Setup the Game Objects
         ball.setupMe();
         paddle.setupMe();
         userInterface.setupMe();
         
         // Setup the Game Variables
         moveWithPaddle = true;
         rightKey = false;
         leftKey = false;
         leftKeyBall = false;
         rightKeyBall = false;
         
         // Remove previous Listenrs and Add Click to shoot Ball
         background.removeEventListener("click", onStartGame);
         background.addEventListener("click", onMakeBallMove);
         document.addEventListener("keydown", onKeyDown);
         document.addEventListener("keyup", onKeyUp);
        
         // Add the Blue Bricks to the Stage
         onAddBrickBlue();
    }
    
    // When Level Two Is Loaded
    function onLevelTwo(){
        // Level Two Music and Level Up Sound
        createjs.Sound.play("gameMusic2");
        createjs.Sound.play("Levelup");
        
        // Remove Previous Blue Brick Event Listener
        stage.removeEventListener("onBrickHit", onBrickHit, true);
        
        // Add Listener for Ball hitting Red Brick 
        stage.addEventListener("onRedBrickHit", onRedBrickHit, true);
        
        // Click the Make the Ball Move
        background.addEventListener("click", onMakeBallMove);
        
        // Setup Game Objects for Level 2
        ball.setupMe();
        paddle.setupMe();
        paddle.reset
        userInterface.setupMe();
        
        // Setup Game Variables
        moveWithPaddle = true;
        rightKey = false;
        leftKey = false;
        leftKeyBall = false;
        rightKeyBall = false;
        
        // Load the Red Bricks
        onAddBrickRed();
    }
    
    // When Level Three Is Loaded
    function onLevelThree(){
        // Level Three Music and Level Up Sound
        createjs.Sound.play("Levelup");
        createjs.Sound.play("gameMusic3");
        
        // Remove Previous Red Brick Event Listener
        stage.removeEventListener("onRedBrickHit", onRedBrickHit, true);
        
        // Add Listener for Ball hitting Green Brick 
        stage.addEventListener("onGreenBrickHit", onGreenBrickHit, true);
        
        // Click the Make the Ball Move
        background.addEventListener("click", onMakeBallMove);
        
        // Setup Game Objects for Level 3
        ball.setupMe();
        paddle.setupMe();
        paddle.reset
        userInterface.setupMe();
        
        // Setup Game Variables
        moveWithPaddle = true;
        rightKey = false;
        leftKey = false;
        leftKeyBall = false;
        rightKeyBall = false;
        
        // Load the Red Bricks
        onAddBrickGreen();
    }
    
    // When Player Wins The Game
    function onWinTheGame(){
        
        // Shut off Music for Level 3 and Play Win Music
        createjs.Sound.play("Levelup");
        createjs.Sound.stop("gameMusic3");
        createjs.Sound.play("gamewin");
        
        // Add Listener for Ball hitting Green Brick 
        stage.removeEventListener("onGreenBrickHit", onGreenBrickHit, true);
        
        // Set the listener for the blue bricks again on reset
        stage.addEventListener("onBrickHit", onBrickHit, true);
        
        // remove the game object
        paddle.removeMe();
        ball.removeMe();
        userInterface.removeMe();
        stage.addChild(winscreen);
        
        // Click Event to reset 
        background.addEventListener("click", onReset);
    }
    
     //================Game Functions======================//
    
    // Making the Ball Move Toward the Bricks
    function onMakeBallMove(e){
        
        // Play Ball Launch Sound
        createjs.Sound.play("launch");
        // Click to Shoot ball
        background.removeEventListener("click", onMakeBallMove);
        // Stop Moving Ball with Paddle
        moveWithPaddle = false;
        // Start Ball Movment Upwards Release off Paddle
        ball.startMe();
        ball.releaseMe();
    }
    
    // When Player Paddle Misses The Ball
    function onLivesTaken(){
        // Play Death Sound
        createjs.Sound.play("death");
        // Ball is Moving with the paddle
        moveWithPaddle = true;
        // Remove A Life 
        livesTaken--;
        // reset Paddle Position
        paddle.resetMe();
        // Click Even to Move the Ball
        background.addEventListener("click", onMakeBallMove);
        // Set the Lives to the Interface
        userInterface.setLivesTaken(livesTaken);
        // When Player has No Lives Left
        if (livesTaken <= 0){
            // Add the Restart Button
            stage.addChild(btnRestart);
            //Add the Game over Screen
            stage.addChild(gameover);
            //Remove the Game Objects
            paddle.removeMe();
            ball.removeMe();
            userInterface.removeMe();
            // Click Even to reset the Game
            btnRestart.addEventListener("click", onReset);
            
        }
    }
    
    // When Player Resets the Game
    function onReset(){
        //Stop all Music and Add Level 1 Music
        createjs.Sound.stop("gameMusic");
        createjs.Sound.stop("gamewin");
        createjs.Sound.play("gameMusic");
        
        // Remove the Win Scree
        stage.removeChild(winscreen);
        
        // Remove Reset Click Events
        background.removeEventListener("click", onReset);
        btnRestart.removeEventListener("click", onReset);
        
        // Click to Make the Ball Move
        background.addEventListener("click", onMakeBallMove);
        
        // Remove the Game over Screen and Restart Button
        stage.removeChild(btnRestart);
        stage.removeChild(gameover);
        
        // Reset the Score and Lives
        score = 0;
        livesTaken = 9;
        
        // Reset the Game Objects
        ball.setupMe();
        paddle.setupMe();
        paddle.reset
        userInterface.setupMe();
        
        // Reset the Game Variables
        moveWithPaddle = true;
        rightKey = false;
        leftKey = false;
        leftKeyBall = false;
        rightKeyBall = false;
        
        // Register the the Reset Lives to Interface
        userInterface.setScoreAdded(score);
        
        // add the Blue Bricks
        onAddBrickBlue();
    }
    
    // when player presses keys
    function onKeyDown(e){
        
        if(e.keyCode == 37){
    
            leftKey = true;
            leftKeyBall = true;
        }
        
        else if(e.keyCode == 39){
            
            rightKey = true;
            rightKeyBall = true;
        } 
    }
    
    // when player isnt touching the keys
    function onKeyUp(e){
        
        if(e.keyCode == 37){
            leftKey = false;
            leftKeyBall = false;
        } 
        
        else if(e.keyCode == 39){
            rightKey = false;
            rightKeyBall = false;
        }
    }
    
    // Update the Essentials in the Game
    function onTick(e) {
        
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
         // when Ball is attached to the Paddle
         if (moveWithPaddle){
             
             if(leftKeyBall){
                 
                ball.startMe(MoverDirection.LEFT);
             }
             
             else if (rightKeyBall){
                 
                ball.startMe(MoverDirection.RIGHT);
             }
            
             else{
                 ball.stopMe();
                
             }
         }
        // Move Paddle Left
        if(leftKey){
            
            paddle.startMe(MoverDirection.LEFT);
        }
        // Move Paddle Right
        else if(rightKey){
            
            paddle.startMe(MoverDirection.RIGHT)
        }

        // If paddle isnt moving left or right
        else{
            
            paddle.stopMe();
        }
        // Update The Blue Bricks to be added to the Stage
        for (var n=0; n<brickPool.length; n++){
            
            if (brickPool[n].getActive()) brickPool[n].updateMe();
        }
        // Update The Red Bricks to be added to the Stage
        for (var n=0; n<redBrickPool.length; n++){
            
            if (redBrickPool[n].getActive()) redBrickPool[n].updateMe();
        }
        // Update The Green Bricks to be added to the Stage
        for (var n=0; n<greenBrickPool.length; n++){
             
            if (greenBrickPool[n].getActive()) greenBrickPool[n].updateMe();
        }
        
        // Update the movement of the ball and paddle
        ball.updateMe();
        paddle.updateMe();
        
        // Updating the stage
        stage.update();
    }

})(); 