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
	this.load.tilemapTiledJSON('tilemap', '/tiles/map.json')
    
}

function create () {

  const map = this.make.tilemap({ key: 'tilemap' })
	const tileset = map.addTilesetImage('tileset', 'base_tiles')
	
	this.layer1 = map.createStaticLayer('grass', tileset)
	this.layer2 = map.createStaticLayer('walls', tileset)
  
  map.setCollisionBetween(1, 999, true, 'walls'); 

  this.hero = this.add.image(400, 300, 'pinkman');
  this.physics.add.existing(this.hero);
  this.hero.body.setCollideWorldBounds(true, 1, 1);

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
