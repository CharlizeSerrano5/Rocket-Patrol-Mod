class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0)
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        // add rocket (p1)
            // PREVIOUS
        //this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.2, 0)
        // the game will use the same rocket 
        
        // define keys

        // For Firing I will be using https://phaser.io/examples/v2/input/mouse-buttons
        //keyFIRE = this.input.keyboard.addKey(Phaser.Input.Mouse)
        
        
        //keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        // // change to up

        // TURNING OFF TEMPORARILY
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)

        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)


        // Got Code for Mouse Control Event from https://phaser.io/examples/v3/view/games/breakout/breakout
            // the code only takes the pointer functions and the math.clamp method
            // the code reinputs the methods from rocket and gives the player optional pointer usage
        this.input.on('pointermove', function (pointer)
        {

            //  Keep the paddle within the game
            this.p1Rocket.x = Phaser.Math.Clamp(pointer.x, 52, 748);

            // if (this.ball.getData('onPaddle'))
            // {
            //     this.ball.x = this.paddle.x;
            // }

        }, this);

        this.input.on('pointerup', function (pointer)
        {
            if(!this.p1Rocket.isFiring)  {
            this.p1Rocket.isFiring = true
            this.p1Rocket.sfxShot.play()
            console.log("go up")
            }
        }, this);


        // MOD - add rocket (p2)
                // define keys
        

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*9, 'spaceship', 0, 30).setOrigin(0, 0) //  9 was originally 4 
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*7 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0) // 7 used to be 5
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*11, 'spaceship', 0, 10).setOrigin(0,0) // 11 used to be 4
        
        // add mod spaceship using separate file
        this.modship01 = new Mod_Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'mod_spaceship', 0, 60).setOrigin(0,0)
        // creating a modded ship using the default spaceship
        this.modship02 = new Mod_Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'mod_spaceship', 0, 50).setOrigin(0,0)

        

        //initialize score
        // PREVIOUS SCORE CODE
        this.p1Score = 0



        this.p2Score = 0


        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }


        
        this.scoreLeft1 = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        this.scoreLeft2 = this.add.text(borderUISize*15.2 + borderPadding, borderUISize + borderPadding*2,  this.p2Score, scoreConfig)

        // this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        //Game OVER flag
        this.gameOver = false
        
        //this.playing = this.add.text(game.config.width/2, borderUISize + borderPadding*2, 'P1', scoreConfig).setOrigin(0.5,0)

        // 60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)
        
        topScore = this.add.text(game.config.width/2, borderUISize + borderPadding*2, highScore, highScoreConfig).setOrigin(0.5)
        this.currentPlayer = this.add.text(borderUISize*13, borderUISize + borderPadding*2, 'P' + this.p1Rocket.player, scoreConfig).setOrigin(0.5)


    }

    update() {        
        if (this.gameOver == true){
            // make sure menu uses the left key 
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        }
        
        
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            
            this.highScore()
            this.scene.restart()
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.highScore()
            this.scene.start("menuScene")
        }
        this.starfield.tilePositionX -= 4
        if (!this.gameOver){
            this.p1Rocket.update()  // update rocket sprite
            this.ship01.update()    // update spaceships(x3)
            this.ship02.update()
            this.ship03.update()


            // MOD UPDATE - Creating Spaceships
            this.modship01.update() // update mod spaceship
            this.modship02.update()
        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset()
            //this.shipExplode(this.ship03)
            this.shipExplode(this.p1Rocket, this.ship03)
            // checking if time will decrease
            /*
            game.settings.gameTimer -= subtracted;
            console.log(subtracted +" subtracted, time remaining:" + this.time.getOverallRemaining());
            */

            /*
            // checking if time will be added
            this.time.update(game.settings.gameTimer, 5000);
            console.log("time" + game.settings.gameTimer);
            */
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset()
            //this.shipExplode(this.ship02)
            this.shipExplode(this.p1Rocket, this.ship02)


            // checking if time will decrease
            /*
            game.settings.gameTimer -= subtracted;
            console.log(subtracted +" subtracted, time remaining:" + this.time.getOverallRemaining());
            */
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            //this.shipExplode(this.ship01)
            this.shipExplode(this.p1Rocket, this.ship01)

            // checking if time will decrease
            /*
            game.settings.gameTimer -= subtracted;
            console.log(subtracted +" subtracted, time remaining:" + this.time.getOverallRemaining());
            */
        }

        if (this.checkCollision(this.p1Rocket, this.modship01)){
            this.p1Rocket.reset()
            //this.shipExplode(this.modship01)
            this.shipExplode(this.p1Rocket, this.modship01)

        }
        
        if (this.checkCollision(this.p1Rocket, this.modship02)){
            this.p1Rocket.reset()
            // this.shipExplode(this.modship02)
            this.shipExplode(this.p1Rocket, this.modship02)

        }


        //---PLAYER SWAPPING
        if(this.p1Rocket.player == 1){
            // if the rocket is firing then swap to the next player
            // testing
            
            keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

            //this.p1Rocket.player = 2;
            // implementing player swapping
            this.currentPlayer.text = 'P1'

            //this.playing.text = 'P2'

        }
        if(this.p1Rocket.player == 2){
            // if the rocket is firing then swap to the next player
            // testing
            this.currentPlayer.text = 'P2'
            keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
            
            // implementing player swapping
            //this.p1Rocket.player = 1;
            //this.playing.text = 'P1'
        }



        //--Fire Input
        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.p1Rocket.isFiring){

        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }
    
    shipExplode(player, ship) {

    // shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        // https://phaser.io/examples/v3/view/game-objects/particle-emitter/emit-at-pointer
        const emitter = this.add.particles(0,0, 'explosion', {
            //frame: ['explode', 'exlode', 'explode'],
            frame: ['0', '0', '0'],
            lifespan: 4000,
            speed: {min: 200, max: 350 },
            scale: { start: 0.4, end: 2},
            rotate: {start: 0, end: 360},
            gravityY: 200,
            emitting: false
        });
        // Creating emitting particles
        // MOD WORK - Creating emitting particles
        //https://phaser.io/examples/v3/view/game-objects/particle-emitter/emit-at-pointer
        emitter.emitParticleAt(ship.x, ship.y, ship.points/2); // 4 particles emitted
        //console.log(ship.points) // TESTING
        ship.reset()
        ship.alpha = 1  

        // previous work
        // let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        // boom.anims.play('explode')             // play explode animation
        // boom.on('animationcomplete', () => {    // callback after anim completes
        //     ship.reset()                        // reset ship position
        //     ship.alpha = 1                      // make ship visible again
        //     boom.destroy()                      // remove explosion sprite
        // })
        // score add and text update
        // end of previous work


        
        
        if (this.p1Rocket.player == 2){
            // if statement works
            this.p1Score += ship.points
            this.scoreLeft1.text = this.p1Score
            // score works
        }
        else if (this.p1Rocket.player == 1){
            // implement player 2 functionality
            // logic is if the player fires anything then swap 
            // use the .isFiring property
            this.p2Score += ship.points
            this.scoreLeft2.text =  this.p2Score
        }
        this.sound.play('sfx-explosion')

        //PREVIOUS WORK
        // this.p1Score += ship.points
        // this.scoreLeft1.text = this.p1Score
        // this.sound.play('sfx-explosion')
    }


    highScore(){
        // checks if one player score is higher than the other
        if (this.p2Score > highScore){
            highScore = this.p2Score
        }

        else if (this.p1Score > highScore){
            highScore= this.p1Score
        }
        console.log(highScore)
    }
}