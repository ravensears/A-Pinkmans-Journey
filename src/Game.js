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
		this.musicOn = true;

		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("space_tileset", "base_tiles");
		const floor = map.createStaticLayer("floor", tileset);
		const walls = map.createStaticLayer("walls", tileset);
		const stuff = map.createStaticLayer("stuff", tileset);
    

		walls.setCollisionByProperty({ collides: true });
		stuff.setCollisionByProperty({ collides: true });

		this.hero = new Player(this, 1600, 1600, "sadGuy");
		this.heroHand = new Player(this, 1600, 1600, "sadGuy").setScale(1.4);
    this.hero2 = this.physics.add.sprite(1650, 1650, "pinkman");
    this.treasureChicken = this.physics.add.staticSprite(1800, 500, "chicken");
		this.heroHand.visible = false;

    const group = this.physics.add.group({ key: "chicken", frameQuantity: 300 });

    const rect = new Phaser.Geom.Rectangle(1008, 50, 1480, 1180);

    Phaser.Actions.RandomRectangle(group.getChildren(), rect);

		this.treasureIndex = 0;

		this.treasureGroup = [
      {},
			{
				x: 1011,
				y: 1435,
				width: 80,
				height: 80,
				message: "Found Treasure! Check in the wishing well",
			},
			{
				x: 1539,
				y: 2766,
				width: 80,
				height: 80,
				message:
					"Found Treasure! Check under a chicken",
			},
      {
        x: 1800, 
        y: 500,
        width: 80,
				height: 80,
				message: "Check in the tube seat looking room by the pipe",
      },
			{
				x: 50,
				y: 2350,
				width: 80,
				height: 80,
				message: "Check under the control desk",
			},
			{
				x: 1369,
				y: 1811,
				width: 80,
				height: 80,
				message: "Game over!!",
			},
		];

		function gameOver() {
			console.log(`nice work buddy!`);
		}

		const generateTreasure = (treasure) => {
			let treasureShape = this.add.rectangle(
				treasure.x,
				treasure.y,
				treasure.width,
				treasure.height,
				"00FFFFFF"
			);
			let treasureObj = this.physics.add.existing(treasureShape, 1);
			treasureObj.visible = false;
			treasureObj.setData({ message: treasure.message });
			this.physics.add.overlap(treasureObj, this.heroHand, findTreasure);
		  this.treasureIndex++;
			return treasureObj;
		};

		const generateNextTreasure = () => {
			generateTreasure(this.treasureGroup[this.treasureIndex]);
		}

		const sfx = this.sound.add("beep");
		const keyObj = this.input.keyboard.addKey("E");
		this.score = 0;

		const destroyMessage = (msg) => {
			setTimeout(() => {
				msg.destroy();
			}, 5000);
		};

		const nextTreasure = () => {
			this.treasureIndex === this.treasureGroup.length
				? gameOver()
				: generateNextTreasure();
		}

		const findTreasure = (treasure) => {
			if (treasure.active) {
				if (treasure.body.embedded && keyObj.isDown) {
					console.log(
						`You found the treasure at ${treasure.x}, ${treasure.y}!`
					);
					this.score++;
					sfx.play();
					let msg = this.add.text(
						treasure.x,
						treasure.y,
						treasure.data.list.message
					);
					destroyMessage(msg);
					treasure.setActive(false);
					nextTreasure();
				}
			}
		};

		this.treasure1 = generateTreasure({
			x: 1679,
			y: 1418,
			width: 30,
			height: 63,
			message: "Found Treasure! Check in the couch",
		});

		this.physics.add.overlap(this.treasure1, this.heroHand, findTreasure);

		this.cameras.main.startFollow(this.hero, true);

		this.muteMan = this.add
			.image(30, 20, "muteMan")
			.setInteractive()
			.setScale(2)
			.setScrollFactor(0);

		this.physics.add.collider(this.hero, stuff);
		this.physics.add.collider(this.hero2, stuff);
		this.physics.add.collider(this.hero, walls);
		this.physics.add.collider(this.hero2, walls);
    this.physics.add.collider(this.hero, this.treasureChicken);
    this.physics.add.collider(this.hero, group);
    this.physics.add.collider(group, walls)

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
    this.treasureDetector = () => {
      const treasureProximity = (distance) => { 
       return Math.abs(this.hero.x - this.treasureGroup[this.treasureIndex - 1].x) <= distance &&
        Math.abs(this.hero.y - this.treasureGroup[this.treasureIndex - 1].y) <= distance 
      };

			if (!this.treasure1.active) {
				if (
          treasureProximity(120)
				) {
					return "HOT!!!";
				} else if (
          treasureProximity(450)
				) {
					return "Getting hotter!";
				} else if (
          treasureProximity(750)
				) {
					return "Warm";
				} else if (
          treasureProximity(1200)
				) {
					return "warming up a little";
				} else if (
          treasureProximity(1500) 
        ) {
					return "Cold";
				} else {
          return "What's cooler than being cold? Ice cold!!"
        }
			} else {
        return 'Go to world coordinates 1676, 1411'
      }
		};

		this.text.setText([
			"screen x: " + this.input.x,
			"screen y: " + this.input.y,
			"world x: " + this.input.mousePointer.worldX.toFixed(0),
			"world y: " + this.input.mousePointer.worldY.toFixed(0),
			"hero x: " + this.hero.x.toFixed(0),
			"hero y: " + this.hero.y.toFixed(0),
      "Treasure Detector: " + this.treasureDetector(),
		]);

		this.scoreText.setText(`Treasures: ${this.score}`);

		this.hero.updatePlayer();
		this.heroHand.updateHand(this.hero);

		// this.playerBuilder.update();
	}
}

export default Game;
