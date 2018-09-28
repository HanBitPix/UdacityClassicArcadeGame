'use strict';

//****** Updated all to ES6 standard. *******/ 

// Score
let score = 0;
document.getElementById('playerScore').innerHTML = score;

// Enemies our player must avoid
class Enemy {
  constructor(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when enemy reaches end, resets to start.
    if (this.x > 550) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 500);
    }
	
    // Checks for collision between player and enemies
    if (player.x < this.x + 60 &&
					player.x + 37 > this.x &&
					player.y < this.y + 25 &&
					30 + player.y > this.y) {
      player.x = 200;
      player.y = 380;
      // When collision happens, alerts and score resets
      if (score > 0){
        score = 0;
        document.getElementById('playerScore').innerHTML = score;
        alert('Darn! You got runover! Try again! Score Restarted');
			} 
			else {
				alert('Darn! You got runover!');
			}
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
  }

  update() {
    // Prevents player from moving beyond the boundary
    if (this.y > 380) {
      this.y = 380;
    }

    if (this.x > 400) {
      this.x = 400;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    // Checks for player when reaching the water!
    if (this.y < 0) {
      this.x = 200;
      this.y = 380;
      // Score earned when reaching the water! Keeps score and alerts you!
      score++;
      document.getElementById('playerScore').innerHTML = score;
      alert('One Point Earned!');
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
	// The 
  handleInput(keyPress) {
    switch (keyPress) {
    case 'left':
      this.x -= this.speed + 50;
      break;
    case 'up':
      this.y -= this.speed + 30;
      break;
    case 'right':
      this.x += this.speed + 50;
      break;
    case 'down':
      this.y += this.speed + 30;
      break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

// Position "y" where the enemies will are created
const enemyPosition = [60, 140, 220];
const player = new Player(200, 380, 50);
let enemy;

enemyPosition.forEach(posY => {
  enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 500));
  allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});