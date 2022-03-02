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
      gravity: { y: 0 },
    }
  }
};

const Game = new Phaser.Game(config);

function preload() {
    
  this.load.image('pinkman', '/sprites/pinkman.png');
  this.load.image('pubWoman', '/sprites/pub.jpeg');
  this.load.image('base_tiles', '/tiles/tileset.png');
	this.load.tilemapTiledJSON('tilemap', '/tiles/map.json');
  this.load.audio('bens_beautiful_song', '/audio/music_2.mp3');
    
}

function create () {

  this.music = this.sound.add("bens_beautiful_song");

  var musicConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
  }

  this.music.play(config);

  const map = this.make.tilemap({ key: 'tilemap' });
	const tileset = map.addTilesetImage('tileset', 'base_tiles');
	
	const layer1 = map.createStaticLayer('grass', tileset);
	const layer2 = map.createStaticLayer('walls', tileset);
  // layer2.setCollisionByProperty({ collides: true });

  this.hero = this.physics.add.sprite(400, 300, 'pinkman');

  // this.physics.add.existing(this.hero);
  // this.physics.add.existing(layer2);
  // this.physics.add.collider(this.hero, layer2);
  
  this.hero.body.setCollideWorldBounds(true, 1, 1);

  this.cursors = this.input.keyboard.createCursorKeys();

}

function update () {

  if (this.cursors.up.isDown) {
    this.hero.y -= 2;
  } else if (this.cursors.down.isDown) {
    this.hero.y += 2;
  } else if (this.cursors.right.isDown) {
    this.hero.x += 2;
  } else if (this.cursors.left.isDown) {
    this.hero.x -= 2;
  }
}
