var config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 720,
  renderer: Phaser.AUTO,
  backgroundColor: '#FD8379',
  
  scene: {
      preload: preload,
      create: create,
      update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  }
};

const Game = new Phaser.Game(config);

function preload() {
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true;
    // this.scene.backgroundColor = '#78828b';
    
    this.load.image('pinkman', '/sprites/pinkman.png');
    this.load.image('pubWoman', '/sprites/pub.jpeg')
    
}

function create () {

  this.pub = this.add.image(400, 300, 'pubWoman');
  this.hero = this.add.image(400, 300, 'pinkman');
  // this.physics.add.existing(this.hero)
  // this.hero.body.setCollideWorldBounds()

  this.cursors = this.input.keyboard.createCursorKeys();

  // this.aGrid = new AlignGrid({scene:this,rows:11,cols:11});
  // this.aGrid.showNumbers();
}

function update () {

  if (this.cursors.up.isDown) {
    console.log(this.hero.x);
    console.log(this.hero.y);
    this.hero.y -= 2;
  } else if (this.cursors.down.isDown) {
    this.hero.y += 2;
  } else if (this.cursors.right.isDown) {
    this.hero.x += 2;
  } else if (this.cursors.left.isDown) {
    this.hero.x -= 2;
  }
}

// export default Game;

    

// var config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   scene: {
//       preload: preload,
//       create: create,
//       update: update
//   }
// };




// var game = new Phaser.Game(config);

// function preload ()
// {
//   this.load.image('sky', '/assets/sky.png');
//   this.load.image('ground', 'assets/platform.png');
//   this.load.image('star', 'assets/star.png');
//   this.load.image('bomb', 'assets/bomb.png');
//   this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
// }

// function create ()
// {
//   this.add.image(400, 300, 'sky');
//   this.hero = this.add.image(400, 300, 'star');
//   this.cursors = this.input.keyboard.createCursorKeys();
// }

// function update ()
// {
//   if (this.cursors.up.isDown) {
//     console.log("move up");
//     this.hero.y -= 2;
//   } else if (this.cursors.down.isDown) {
//     this.hero.y += 2;
//   } else if (this.cursors.right.isDown) {
//     this.hero.x += 2;
//   } else if (this.cursors.left.isDown) {
//     this.hero.x -= 2;
//   }
// }