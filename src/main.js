const config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 720,
  renderer: Phaser.AUTO,
  parent: null,
  // scale: {
  //   parent: 'phaser-example',
  //   mode: Phaser.DOM.FIT,
  //   width: '100%',
  //   height: '100%'
  // },
  scene: {
      preload: preload,
      create: create,
      update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
};

const Game = new Phaser.Game(config);

// ************PRELOAD****************
function preload() {
    this.load.spritesheet('pinkman', '/sprites/pinkman_run.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('sadGuy', '/sprites/pien.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('base_tiles', '/tiles/tileset.png');
	  this.load.tilemapTiledJSON('tilemap', '/tiles/map.json');
    this.load.audio('bens_beautiful_song', '/audio/music_2.mp3');
}

// ************CREATE****************
function create () {
  this.music = this.sound.add("bens_beautiful_song");

  var musicConfig = {
    mute: false,
    volume: 0.5,
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

  layer2.setCollisionByProperty({ collides: true });

  this.hero = this.physics.add.sprite(400, 300, 'sadGuy').setScale(1.5);
  this.hero.setOrigin(0.5, 0.5);
  this.hero2 = this.physics.add.sprite(300, 200, 'pinkman');

  this.physics.add.collider(this.hero, layer2);
  this.physics.add.collider(this.hero2, layer2);

  this.cursors = this.input.keyboard.createCursorKeys();

  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('sadGuy', { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('sadGuy', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'top',
    frames: this.anims.generateFrameNumbers('sadGuy', { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('sadGuy', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'idle',
    frames: [ { key: 'sadGuy', frame: 1 } ],
    frameRate: 10
  });

  this.physics.add.collider(this.hero, this.hero2);
}

// ************UPDATE****************
function update () {
  this.hero.setVelocity(0)
  if (this.cursors.up.isDown || keyW.isDown) {
    this.hero.setVelocityY(-160);
    this.hero.anims.play('top', true);
  } else if (this.cursors.down.isDown || keyS.isDown) {
    this.hero.setVelocityY(160);
    this.hero.anims.play('down', true);
  } else if (this.cursors.right.isDown || keyD.isDown) {
    this.hero.setVelocityX(160);
    this.hero.anims.play('right', true);
  } else if (this.cursors.left.isDown || keyA.isDown) {
    this.hero.setVelocityX(-160);
    this.hero.anims.play('left', true);
  } else {
    this.hero.setVelocity(0)
    this.hero.anims.play('idle', true);
  }
}
