class Mod_Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this) // add to existing scene
        this.points = pointValue // store pointValue
        this.moveSpeed = game.settings.modspaceshipSpeed    // spaceship speed in pixels/frame
    }
    

    update() {
        // move spaceship left
        this.x -= this.moveSpeed

        // wrap from left to right edge
        if(this.x <= 0 + this.width/2) {
            this.x = game.config.width
        }
    }

    // reset position
    reset() {
        this.x = game.config.width
    }
}