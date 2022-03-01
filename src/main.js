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
    
  this.load.image('pinkman', '/sprites/pinkman.png');
  this.load.image('pubWoman', '/sprites/pub.jpeg');
  this.load.image('base_tiles', '/tiles/tileset.png')
	this.load.tilemapTiledJSON('tilemap', '/tiles/map_01.json')
    
}

function create () {

  this.pub = this.add.image(400, 300, 'pubWoman');
  this.hero = this.add.image(400, 300, 'pinkman');

  this.cursors = this.input.keyboard.createCursorKeys();
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
