class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('mod_spaceship', './assets/temp_spaceship.png')
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })
        
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // display menu text

            // MODIFIED DISPLAY MENU TEXT
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, '2 PLAYER ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (UP) to fire', menuConfig).setOrigin(0.5)
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Use (A) + (D) to move & (W) to fire', menuConfig).setOrigin(0.5)


        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + 2*borderUISize + 2*borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)
        
        // define keys  
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // should keep these keys for menu selection
        

        //  Implementation of High Score
        topScore = this.add.text(game.config.width/2, borderUISize, 'High Score: ' + highScore, highScoreConfig).setOrigin(0.5)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                modspaceshipSpeed: 5,
                // added mod spaceship
                spaceshipSpeed: 3,
                gameTimer: easyGameTimer
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                modspaceshipSpeed: 7,
                // added mod spaceship
                spaceshipSpeed: 4,
                gameTimer: hardGameTimer
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }

    


}