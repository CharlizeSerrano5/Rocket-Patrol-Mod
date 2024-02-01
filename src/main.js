//Charlize Serrano
//mod title (e.g. Rocket Patrol Reloaded IV: The Rocketing)
//12 hours
//the mods you chose from the list above, their point values, and, if necessary, an explanation of their implementation
    // Enemy Spaceship, 5 Point
    // Particle Emiter, 5 Point
    // 2 Player Mod, 5 Point
    // High Score, 1 Point
    // Optional Mouse Control Mod, 5 Point

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

let highScoreConfig = {
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

let topScore
// stores the string for the highScore

let highScore = 0
//let subtracted = 5000

