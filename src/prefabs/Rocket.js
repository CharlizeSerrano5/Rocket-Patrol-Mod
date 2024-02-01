// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        
        scene.add.existing(this) // add object to existing scene
        this.isFiring = false    // track rocket's firing status
        this.moveSpeed = 2       // rocket speed in pixels/frame
        this.sfxShot = scene.sound.add('sfx-shot')
        //this.Score = 0

        // Implementing Time
        this.miss = false;
        // Implementing Player Swap
        this.player = 1;
    }

    update()  {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring)  {
            this.isFiring = true
            this.sfxShot.play()
            
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding){
            // this.isFiring = false
            // this.y = game.config.height - borderUISize - borderPadding
            this.miss = true
            this.reset()


            /*
            game.settings.gameTimer -= 10000;
            let seconds = game.settings.gameTimer;
            console.log("miss" + seconds + "left");
            // CHANGED TO GAMETIMER BEING SUBTRACTED
            */
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding

        if (this.player == 1){
            this.player = 2
            console.log("p1 swap to 2")
        }

        else if (this.player == 2){
            this.player = 1
            console.log("p2 swap to 1")
        }
    }

}