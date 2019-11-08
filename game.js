// Create our only scene called mainScene, in the game.js file
class mainScene {
  // The 3 methods currently empty

  preload() {
    // This method is called once at the beginning
    // It will load all the assets, like sprites and sounds  
      
      // Parameters: name of the sprite, path of the image
      this.load.image('player', 'assets/player.png');
      this.load.image('coin', 'assets/coin.png');
  }
    
    
  create() {
    // This method is called once, just after preload()
    // It will initialize our scene, like the positions of the sprites
      
      // Parameters: x position, y position, name of the sprite
      this.player = this.physics.add.sprite(100, 100, 'player');
      this.coin = this.physics.add.sprite(300, 300, 'coin');

      // Store the score in a variable, initialized at 0
this.score = 0;

// The style of the text 
// A lot of options are available, these are the most important ones
let style = { font: '20px Arial', fill: '#1E1E26' };

// Display the score in the top left corner
// Parameters: x position, y position, text, style
this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
      
      this.arrow = this.input.keyboard.createCursorKeys();

  }
    
  
hit() {
  // Change the position x and y of the coin randomly
  this.coin.x = Phaser.Math.Between(100, 600);
  this.coin.y = Phaser.Math.Between(100, 300);

  // Increment the score by 10
  this.score += 10;

  // Display the updated score on the screen
  this.scoreText.setText('score: ' + this.score);
    
// Create a new tween 
this.tweens.add({
  targets: this.player, // on the player 
  duration: 200, // for 200ms 
  scaleX: 1.2, // that scale vertically by 20% 
  scaleY: 1.2, // and scale horizontally by 20% 
  yoyo: true, // at the end, go back to original scale 
});
    
}
    
    
  update() {
    // This method is called 60 times per second after create() 
    // It will handle all the game's logic, like movements
      
      // If the player is overlapping with the coin
if (this.physics.overlap(this.player, this.coin)) {
  // Call the new hit() method
  this.hit();
}      
      
      // Handle horizontal movements
if (this.arrow.right.isDown) {
  // If the right arrow is pressed, move to the right
  this.player.x += 3;
} else if (this.arrow.left.isDown) {
  // If the left arrow is pressed, move to the left
  this.player.x -= 3;
}
      // Do the same for vertical movements
if (this.arrow.down.isDown) {
  this.player.y += 3;
} else if (this.arrow.up.isDown) {
  this.player.y -= 3;
}      
  }
}

new Phaser.Game({
  width: 700 , // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#39AF8E', // The background color 
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});