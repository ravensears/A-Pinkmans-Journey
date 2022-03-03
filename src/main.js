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
	this.load.image("base_tiles", "/tiles/tileset.png");
	this.load.tilemapTiledJSON("tilemap", "/tiles/map.json");
	this.load.audio("bens_beautiful_song", "/audio/music_2.mp3");
	this.load.audio("beep", "/audio/beep.mp3");
	this.load.image("object", "/sprites/pinkman.png");
}

// ************CREATE****************
function create() {
	this.music = this.sound.add("bens_beautiful_song");

	var musicConfig = {
		mute: true,
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
	const tileset = map.addTilesetImage("tileset", "base_tiles");

	const layer1 = map.createStaticLayer("grass", tileset);
	const layer2 = map.createStaticLayer("walls", tileset);

	layer2.setCollisionByProperty({ collides: true });

	this.hero = this.physics.add.sprite(500, 500, "sadGuy").setScale(1.3);
	this.heroHand = this.physics.add.sprite(500, 530, "sadGuy").setScale(1.8);
	this.heroHand.visible = false;

	this.treasureTreeShape = this.add.rectangle(368, 192, 30, 63, "00FFFFFF");
	this.treasure = this.physics.add.existing(this.treasureTreeShape, 1);
	this.treasure.visible = false;

	score = 0;

	this.physics.add.collider(this.hero, layer2);

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

	// this.physics.add.collider(this.hero, this.hero2);

	scoreText = this.add.text(790, 0, `Treasures: ${score}`, {
		fontSize: "32px",
		fill: "#ffffff",
	});

	// Get key object

	// this.physics.add.collider(this.hero2, this.hero, () => {
	// 	if (this.keyObj.isDown) {
	// 		console.log("OUCH!");
	// 		score += 1;
	// 		sfx.play();
	// 	}
	// });

	const sfx = this.sound.add("beep");
	const findTreasure = () => {
		if (this.treasure.active === true) {
			if (this.treasure.body.embedded === true && this.keyObj.isDown) {
				console.log("You found the treasure!");
				score += 1;
				sfx.play();
				this.treasure.setActive(false);
			}
		}
	};
	this.physics.add.overlap(this.treasure, this.heroHand, findTreasure);

	setTimeout(() => {
		console.log(this.treasure.body.embedded);
	}, 5000);
}

// ************UPDATE****************
function update() {
	scoreText.setText(`Treasures: ${score}`);
	this.hero.setVelocity(0);
	this.heroHand.setVelocity(0);
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

	this.heroHand.x = this.hero.x;
	this.heroHand.y = this.hero.y;

	this.keyObj = this.input.keyboard.addKey("E");
}
