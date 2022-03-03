const config = {
	type: Phaser.AUTO,
	//width: 1080,
	//height: 720,
	//renderer: Phaser.AUTO,
	parent: "phaser-game",
	scale: {
		parent: "phaser-game",
		mode: Phaser.DOM.FIT,
		width: window.innerWidth,
		height: window.innerHeight,
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
		},
	},
};

const game = new Phaser.Game(config);

score = 0;
musicOn = true;

// ************PRELOAD****************
function preload() {
	this.load.spritesheet("pinkman", "/sprites/pinkman_run.png", {
		frameWidth: 32,
		frameHeight: 32,
	});
	this.load.spritesheet("sadGuy", "/sprites/pien.png", {
		frameWidth: 32,
		frameHeight: 32,
	});
	this.load.image("base_tiles", "/tiles/space_tileset.png");
	this.load.tilemapTiledJSON("tilemap", "/tiles/space_map.json");
	this.load.audio("bens_beautiful_song", "/audio/music_2.mp3");
	this.load.image("object", "/sprites/pinkman.png");
  this.load.image("muteMan", "/sprites/muteMan.png");
}

// ************CREATE****************
function create() {
	this.music = this.sound.add("bens_beautiful_song");

	var musicConfig = {
		mute: false,
		volume: 0.3,
		rate: 1,
		detune: 0,
		seek: 0,
		loop: true,
		delay: 0,
	};

	this.music.play(musicConfig);

	// mute = game.add.sprite(game.world.centreX, game.word.centreY, 'greenie');
	// mute.anchor.set(0.5);
	// game.input.onDown.add(removeMusic, this)

	const map = this.make.tilemap({ key: "tilemap" });
	const tileset = map.addTilesetImage("space_tileset", "base_tiles");

	const floor = map.createStaticLayer("floor", tileset);
	const walls = map.createStaticLayer("walls", tileset);
	const stuff = map.createStaticLayer("stuff", tileset);

	walls.setCollisionByProperty({ collides: true });
	stuff.setCollisionByProperty({ collides: true });

	this.hero = this.physics.add.sprite(1600, 1600, "sadGuy").setScale(1);
	this.hero.setOrigin(0.5, 0.5);
	this.cameras.main.startFollow(this.hero, true)
	this.hero2 = this.physics.add.sprite(1650, 1650, "pinkman");
	object = this.add.image(450, 350, "object").setInteractive();
  muteMan = this.add.image(30, 20, "muteMan").setInteractive().setScale(2);

	this.physics.add.collider(this.hero, stuff);
	this.physics.add.collider(this.hero2, stuff);
	this.physics.add.collider(this.hero, walls);
	this.physics.add.collider(this.hero2, walls);

	this.cursors = this.input.keyboard.createCursorKeys();

	keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

	this.anims.create({
		key: "right",
		frames: this.anims.generateFrameNumbers("sadGuy", { start: 6, end: 8 }),
		frameRate: 10,
		repeat: -1,
	});
	this.anims.create({
		key: "left",
		frames: this.anims.generateFrameNumbers("sadGuy", { start: 3, end: 5 }),
		frameRate: 10,
		repeat: -1,
	});
	this.anims.create({
		key: "top",
		frames: this.anims.generateFrameNumbers("sadGuy", { start: 9, end: 11 }),
		frameRate: 10,
		repeat: -1,
	});
	this.anims.create({
		key: "down",
		frames: this.anims.generateFrameNumbers("sadGuy", { start: 0, end: 2 }),
		frameRate: 10,
		repeat: -1,
	});
	this.anims.create({
		key: "idle",
		frames: [{ key: "sadGuy", frame: 1 }],
		frameRate: 10,
	});

	this.physics.add.collider(this.hero, this.hero2);

	object.on("pointerdown", () => {
		score++;
		console.log(score);
	});

  mute = muteMan.on("pointerdown", () => {
    if(musicOn === true) {
      this.music.stop();
      musicOn = false;
    } else {
      this.music.play(musicConfig);
      musicOn = true;
    }
		console.log('muteMan in action!');
	});

	scoreText = this.add.text(790, 0, `Treasures: ${score}`, {
		fontSize: "32px",
		fill: "#ffffff",
	});
}

// ************UPDATE****************

function update() {
	scoreText.setText(`Treasures: ${score}`);


	this.hero.setVelocity(0);
	if (this.cursors.up.isDown || keyW.isDown) {
		this.hero.setVelocityY(-160);
		this.hero.anims.play("top", true);
	} else if (this.cursors.down.isDown || keyS.isDown) {
		this.hero.setVelocityY(160);
		this.hero.anims.play("down", true);
	} else if (this.cursors.right.isDown || keyD.isDown) {
		this.hero.setVelocityX(160);
		this.hero.anims.play("right", true);
	} else if (this.cursors.left.isDown || keyA.isDown) {
		this.hero.setVelocityX(-160);
		this.hero.anims.play("left", true);
	} else {
		this.hero.setVelocity(0);
		this.hero.anims.play("idle", true);
	}

	// scoreText = this.add.text(790, 0, `Treasures: ${score}`, {
	// 	fontSize: "32px",
	// 	fill: "#ffffff",
	// });
}
