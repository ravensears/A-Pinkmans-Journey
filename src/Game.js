import Player from "./Player.js";

class Game extends Phaser.Scene {
	constructor() {
		super({
			key: "Game",
		});
	}

	create() {
		this.music = this.sound.add("treasure_song");

		const musicConfig = {
			mute: false,
			volume: 0.6,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,
		};

		this.music.play(musicConfig);

		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("space_tileset", "base_tiles");

		const floor = map.createStaticLayer("floor", tileset);
		const walls = map.createStaticLayer("walls", tileset);
		const stuff = map.createStaticLayer("stuff", tileset);

		walls.setCollisionByProperty({ collides: true });
		stuff.setCollisionByProperty({ collides: true });

		this.hero = new Player(this, 1600, 1600, "sadGuy");
		this.heroHand = new Player(this, 1600, 1600, "sadGuy").setScale(1.4);
		this.heroHand.visible = false;

		const generateTreasure = (x, y, width, height, message) => {
			let treasureShape = this.add.rectangle(x, y, width, height, "00FFFFFF");
			let treasure = this.physics.add.existing(treasureShape, 1);
			treasure.visible = false;
			treasure.setData({ message: message });
			return treasure;
		};

		this.treasure1 = generateTreasure(
			1011,
			1435,
			30,
			63,
			"Found Treasure! Check under the control desk"
		);

		this.treasure2 = generateTreasure(1369, 1811, 30, 63, "Game over!");

		const sfx = this.sound.add("beep");
		const keyObj = this.input.keyboard.addKey("E");
		this.score = 0;

		const findTreasure = (treasure) => {
			if (treasure.active) {
				if (treasure.body.embedded && keyObj.isDown) {
					console.log(
						`You found the treasure at ${treasure.x}, ${treasure.y}!`
					);
					this.score += 1;
					sfx.play();
					msg = this.add.text(
						treasure.x,
						treasure.y,
						treasure.data.list.message
					);
					setTimeout(() => {
						msg.destroy();
					}, 5000);
					treasure.setActive(false);
				}
			}
		};

		this.physics.add.overlap(this.treasure1, this.heroHand, findTreasure);
		this.physics.add.overlap(this.treasure2, this.heroHand, findTreasure);

		this.cameras.main.startFollow(this.hero, true);

		this.hero2 = this.physics.add.sprite(1650, 1650, "pinkman");
		this.muteMan = this.add
			.image(30, 20, "muteMan")
			.setInteractive()
			.setScale(2)
			.setScrollFactor(0);

		this.physics.add.collider(this.hero, stuff);
		this.physics.add.collider(this.hero2, stuff);
		this.physics.add.collider(this.hero, walls);
		this.physics.add.collider(this.hero2, walls);

		this.text = this.add
			.text(5, 40, "Cursors to move", { font: "16px Courier", fill: "#00ff00" })
			.setScrollFactor(0);

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
			key: "turn",
			frames: [{ key: "sadGuy", frame: 4 }],
			frameRate: 20,
		});

		this.physics.add.collider(this.hero, this.hero2);

		this.mute = this.muteMan.on("pointerdown", () => {
			if (this.musicOn === true) {
				this.music.stop();
				this.musicOn = false;
			} else {
				this.music.play(musicConfig);
				this.musicOn = true;
			}
			console.log("muteMan in action!");
		});

		this.scoreText = this.add
			.text(1000, 0, `Treasures: ${this.score}`, {
				fontSize: "32px",
				fill: "#ffffff",
			})
			.setScrollFactor(0);
	}

	// ************UPDATE****************

	update() {
		this.text.setText([
			"screen x: " + this.input.x,
			"screen y: " + this.input.y,
			"world x: " + this.input.mousePointer.worldX.toFixed(0),
			"world y: " + this.input.mousePointer.worldY.toFixed(0),
			"hero x: " + this.hero.x.toFixed(0),
			"hero y: " + this.hero.y.toFixed(0),
		]);

		this.scoreText.setText(`Treasures: ${this.score}`);

		this.hero.updatePlayer();
		this.heroHand.updateHand(this.hero);

		// this.playerBuilder.update();
	}
}

export default Game;
