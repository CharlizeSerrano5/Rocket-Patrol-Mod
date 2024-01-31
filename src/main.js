//Charlize Serrano
//mod title (e.g. Rocket Patrol Reloaded IV: The Rocketing)
//12 hours
//the mods you chose from the list above, their point values, and, if necessary, an explanation of their implementation
    // Enemy Spaceship
    // Particle Emiter 

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let easyGameTimer = 60000
let hardGameTimer = 45000
//let subtracted = 5000