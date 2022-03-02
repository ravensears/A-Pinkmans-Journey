const config = {
  type: Phaser.AUTO,
  //width: 1080,
  //height: 720,
  //renderer: Phaser.AUTO,
  parent: 'phaser-game',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.DOM.FIT,
    width: window.innerWidth,
    height: window.innerHeight
  },
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

const game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet('pinkman', '/sprites/pinkman_run.png', { frameWidth: 32, frameHeight: 32 });
  this.load.image('base_tiles', '/tiles/tileset.png');
	this.load.tilemapTiledJSON('tilemap', '/tiles/map.json');
  this.load.audio('bens_beautiful_song', '/audio/music_2.mp3');
  this.load.image('object', '/sprites/pinkman.png')
}

function create() {
  this.music = this.sound.add("bens_beautiful_song");

  var musicConfig = {
    mute: false,
    volume: 0.3,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
  }

  this.music.play(musicConfig);

  // mute = game.add.sprite(game.world.centreX, game.word.centreY, 'greenie');
  // mute.anchor.set(0.5);
  // game.input.onDown.add(removeMusic, this)

  const map = this.make.tilemap({ key: 'tilemap' }); 
	const tileset = map.addTilesetImage('tileset', 'base_tiles');
  
  const layer1 = map.createStaticLayer('grass', tileset);
  const layer2 = map.createStaticLayer('walls', tileset);

  layer2.setCollisionByProperty({ collides: true });
  
  this.hero = this.physics.add.sprite(400, 300, 'pinkman');
  this.hero.setOrigin(0.5, 0.5);
  this.hero2 = this.physics.add.sprite(300, 200, 'pinkman');
  object = this.add.image(450, 350, 'object').setInteractive();

  score = 0;

  object.on('pointerdown', function (pointer) {
    score += 10

    console.log(`${score}`)

  });

  this.physics.add.collider(this.hero, layer2);
  this.physics.add.collider(this.hero2, layer2);

  this.cursors = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('pinkman', { start: 0, end: 11 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('pinkman', { start: 0, end: 11 }),
    frameRate: 10,
    repeat: -1    
  });

  this.physics.add.collider(this.hero, this.hero2);
}

function update() {
  this.hero.setVelocity(0)
  if (this.cursors.up.isDown) {
    this.hero.setVelocityY(-160);
    this.hero.anims.play('right', true);
  } else if (this.cursors.down.isDown) {
    this.hero.setVelocityY(160);
    this.hero.anims.play('right', true);
  } else if (this.cursors.right.isDown) {
    this.hero.setVelocityX(160);
    this.hero.anims.play('right', true);
  } else if (this.cursors.left.isDown) {
    this.hero.setVelocityX(-160);
    this.hero.anims.play('right', true);
  }

  scoreText = this.add.text(790, 0, `Treasures: ${score}`, {
		fontSize: "32px",
		fill: "#ffffff",
	});
}
