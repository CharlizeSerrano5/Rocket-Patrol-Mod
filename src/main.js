//Charlize Serrano
// Mod Title: 2 Player Mode 
// Roughly 13 hours
//the mods you chose from the list above, their point values, and, if necessary, an explanation of their implementation
    // Enemy Spaceship, 5 Point
        // The enemy spaceship was created by making a brand new file Mod_Spaceship.js this was created so that the variable of speed can easily be changed
        // The file essentially takes from the existing Spaceship.js file
        // Because it is a new spaceship, the placement of the spaceships were changed
    // Particle Emiter, 5 Point
        // The Particle Emitter is implemented through a particle emitter class and uses the first frame of the explosion pixel art
            // This class was found on a Phaser 3 Example: https://phaser.io/examples/v3/view/game-objects/particle-emitter/emit-at-pointer
    // 2 Player Mod, 5 Point
        // Two players will be controlling the same rocket
        // An integer value called Player in the Rocket constructor is kept at 1 or 2
        // Once either player resets their ship (after they shoot), the integer value will be changed to the alternate value
        // The value is checked inside of the play scene and will change the controls of keyFIRE, keyLEFT, and keyRIGHT
        // The value also determines the score that will be added on
            // Two variables in the play scene are kept for the score
        // Player 1 has controls: A + D for Left and Right Movement; W for Fire
        // Player 2 has controls: Left Arrow and Right Arrow for Left and Right Movement; Up Arrow for Fire
    // High Score, 1 Point
        // The High Score is kept with a global variable defined in main.js which then gets printed into Menu.js and Play.js
            // The High Score is printed in the same way the Score variable of player 1 and player 2 is kept
        // High Score can only be set by one of the players at a time
    // Optional Mouse Control Mod, 5 Point
        // Mouse Control is Implemented through an input function that checks for mouse input 
            // The function creation can be found in Phaser 3 Example: https://phaser.io/examples/v3/view/games/breakout/breakout
        // The Mouse Control is accessible to both player 1 and player 2 and will allow either to control the rocket after shooting
    // Subtract from Time and Add Time Per Hit, 5 Point
            // The source for this code is given in: https://photonstorm.github.io/phaser3-docs/Phaser.Time.TimerEvent.html
        // This code stores the remaining time in a temporary variable, it then removes the delayed callback on the timer then creates a new delayed call
        // This delayed call is created using the remaining time with Time Added or Subtracted
    // Display Time Remaining, 1 Point
        // For the code, a getRemaining() function is called inside of the update method and stored into a variable
        // This value then gets reformatted into seconds and has a Math.floor() function to remove the milliseconds
        // This value is then printed into the ScoreConfiguration
            // The value is default printed inside of the create() method but changed in the update loop every miss and hit
        // The code for getRemaining() is found on the same website for the Mod above, Subtract from Time and Add time Per Hit
            // Source for this code:  https://photonstorm.github.io/phaser3-docs/Phaser.Time.TimerEvent.html

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

