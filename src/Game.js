import Player from "./Player.js";
import Trap from "./Trap.js";
import Treasure from "./Treasure.js";

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

		this.musicOn = false;

		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("space_tileset", "base_tiles");
		const floor = map.createStaticLayer("floor", tileset);
		const walls = map.createStaticLayer("walls", tileset);
		const stuff = map.createStaticLayer("stuff", tileset);
		const rect = new Phaser.Geom.Rectangle(1008, 50, 1480, 1180);
		const keyObj = this.input.keyboard.addKey("E");
		const group = this.physics.add.group({
			key: "ball1",
			frameQuantity: 250,
		});
		let array = group.getChildren();
		array.forEach((ball) => ball.setBounce(1, 1));
		array.forEach((ball) => this.physics.add.collider(group, ball));

		Phaser.Actions.RandomRectangle(group.getChildren(), rect);

		this.score = 0;
		this.temperatureIndex = 0;
		this.messageIndex = -1;
		this.initialTime = 500;
    const sfx = this.sound.add("beep");
		this.wormholesfx = this.sound.add("wormhole");
		this.tinySFX = this.sound.add("tiny");
		this.bigSFX = this.sound.add("big");
		this.invizSFX = this.sound.add("inviz");
		this.traps = new Trap(this, keyObj);

		walls.setCollisionByProperty({ collides: true });
		stuff.setCollisionByProperty({ collides: true });

		this.hero = new Player(this, 1500, 1600, "pinkmanHero");
		this.heroHand = new Player(this, 1500, 1600, "pinkmanHero");

		this.heroHand.spriteObject.setScale(1.4);
		this.heroHand.spriteObject.visible = false;

		this.hero2 = this.physics.add.sprite(1650, 1650, "pinkman").setScale(0.03);

		this.treasureChicken = this.physics.add
			.staticSprite(1800, 500, "ball1")
			.setScale(1.1);
		this.cake = this.physics.add
			.staticSprite(1763, 2382, "cake")
			.setScale(1.7);
			this.eatme = this.physics.add
			.staticSprite(1813, 2382, "eatme")
			.setScale(1.7);
		this.drink = this.physics.add
			.staticSprite(355, 2715, "potion")
			.setScale(1.4);
		this.drinkme = this.physics.add
			.staticSprite(405, 2715, "drinkme")
			.setScale(1.4);

		this.heart = this.physics.add.staticSprite(240, 760, "heart");
		this.treasure = this.physics.add.staticSprite(2404, 3080, "treasureChest");
		this.tree11 = this.physics.add.staticSprite(360, 2150, "tree1");
		this.tree12 = this.physics.add.staticSprite(490, 2470, "tree1");
		this.tree13 = this.physics.add.staticSprite(700, 2700, "tree1");
		this.tree14 = this.physics.add.staticSprite(920, 2100, "tree1");
		this.tree21 = this.physics.add.staticSprite(900, 2600, "tree2");
		this.tree22 = this.physics.add.staticSprite(279, 2200, "tree2");
		this.tree23 = this.physics.add.staticSprite(275, 2750, "tree2");
		this.tree24 = this.physics.add.staticSprite(630, 2400, "tree2");
		this.tree31 = this.physics.add.staticSprite(950, 2730, "tree3");
		this.treasureTree = this.physics.add.staticSprite(600, 2530, "tree3");
		this.tree32 = this.physics.add.staticSprite(830, 2316, "tree3");
		this.tree33 = this.physics.add.staticSprite(930, 2390, "tree3");

    this.wormholesfx.play();
    this.cameras.main.fadeIn(1000, 0, 0, 0);
		this.cameras.main.startFollow(this.hero.spriteObject, true);

		this.physics.add.collider(this.hero.spriteObject, stuff);
		this.physics.add.collider(this.hero.spriteObject, walls);
		this.physics.add.collider(this.hero.spriteObject, this.cake);
		this.physics.add.collider(this.hero.spriteObject, this.drink);
		this.physics.add.collider(this.hero.spriteObject, this.treasureChicken);
		this.physics.add.collider(this.hero.spriteObject, this.hero2);
		this.physics.add.collider(this.hero.spriteObject, group);
		this.physics.add.collider(this.hero.spriteObject, this.heart);
		this.physics.add.collider(this.hero.spriteObject, this.treasure);
		this.physics.add.collider(this.hero2, walls);
		this.physics.add.collider(this.hero2, stuff);
		this.physics.add.collider(group, walls);

		this.treasureGroup = [
			new Treasure(
				1679,
				1418,
				80,
				80,
				"Found Treasure! I think I lost one down the back\nof the couch."
			),
			new Treasure(
				1011,
				1435,
				80,
				80,
				"Can you hear the beating\nof the labyrinth's heart?"
			),
			new Treasure(238, 738, 80, 80, "Bottoms up! I think you should look\nin the dark room."),
			new Treasure(
				498,
				3059,
				80,
				80,
				"Throw some coins in the wishing well\nand you might find the next one."
			),
			new Treasure(
				1539,
				2766,
				80,
				80,
				"Check in the ballroom."
			),
			new Treasure(1800, 500, 80, 80, "Look in the arborotorium...\narbaterranium... the tree room."),
			new Treasure(
				600,
				2530,
				80,
				80,
				"Finally, take a trip on the travelators...\nIf you dare!!"
			),
			new Treasure(
				2404,
				3080,
				80,
				80,
				"You did it! Good work, little buddy."
			),
		];

		const addOverlap = (obj1, obj2, callback) => {
			this.physics.add.overlap(obj1, obj2, callback);
		};

		const generateTreasure = (treasure) => {
			let treasureShape = this.add.rectangle(
				treasure.x,
				treasure.y,
				treasure.width,
				treasure.height
			);
			let treasureObj = this.physics.add.existing(treasureShape, 1);
			treasureObj.visible = false;
			treasureObj.setData({ message: treasure.message });

			addOverlap(treasureObj, this.heroHand.spriteObject, findTreasure);

			this.temperatureIndex++;

			return treasureObj;
		};

		const generateNextTreasure = () => {
			generateTreasure(this.treasureGroup[this.temperatureIndex]);
		};

		const nextTreasure = () => {
			this.temperatureIndex === this.treasureGroup.length
				? this.scene.start("GameComplete")
				: generateNextTreasure();
		};

		const afterFindUpdate = () => {
			this.score++;
			this.messageIndex++;
			sfx.play();
			nextTreasure();
		};

		const findTreasure = (treasure) => {
			if (treasure.active) {
				if (treasure.body.embedded && keyObj.isDown) {
					console.log(
						`You found the treasure at ${treasure.x}, ${treasure.y}!`
					);
					treasure.setActive(false);
					afterFindUpdate();
				}
			}
		};

		this.treasureProximity = (distance) => {
			return (
				Math.abs(
					this.hero.spriteObject.x -
						this.treasureGroup[this.temperatureIndex - 1].x
				) <= distance &&
				Math.abs(
					this.hero.spriteObject.y -
						this.treasureGroup[this.temperatureIndex - 1].y
				) <= distance
			);
		};

		this.treasure1 = generateTreasure(this.treasureGroup[0]);

		addOverlap(this.treasure1, this.heroHand.spriteObject, findTreasure);

		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("pinkmanHero", { start: 8, end: 11 }),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("pinkmanHero", { start: 4, end: 7 }),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: "top",
			frames: this.anims.generateFrameNumbers("pinkmanHero", { start: 12, end: 15 }),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: "down",
			frames: this.anims.generateFrameNumbers("pinkmanHero", { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1,
		});

		const ui = this.add
			.rectangle(400, 520, 790, 150, 0x002b36)
			.setStrokeStyle(4, 0xefc53f)
			.setScrollFactor(0);
		ui.alpha = 0.75;

		this.timerText = this.add
			.text(555, 555, "Countdown: " + formatTime(this.initialTime), {
				font: "24px Courier",
				fill: "#00ff00",
			})
			.setScrollFactor(0);

		this.timedEvent = this.time.addEvent({
			delay: 1000,
			callback: onEvent,
			callbackScope: this,
			loop: true,
		});

		this.treasureMessage = () => {
			if (this.messageIndex < 0) {
				return "Check out your coordinates";
			} else {
				return this.treasureGroup[this.messageIndex].message;
			}
		};

		this.thermometer = () => {
			if (this.treasureProximity(120)) {
				return "HOT!!!";
			} else if (this.treasureProximity(450)) {
				return "Getting hotter!";
			} else if (this.treasureProximity(750)) {
				return "Warm";
			} else if (this.treasureProximity(1200)) {
				return "Warming up a little";
			} else if (this.treasureProximity(1500)) {
				return "Cold";
			} else {
				return "What's cooler than being cool? Ice cold!!";
			}
		};

		this.clueText = this.add
			.text(25, 460, this.treasureMessage(), {
				fontSize: "26px",
				fill: "#ffffff",
			})
			.setScrollFactor(0);

		this.muteMan = this.add
			.image(50, 25, "muteMan")
			.setInteractive()
			.setScale(2.2)
			.setScrollFactor(0);

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

		function formatTime(seconds) {
			var minutes = Math.floor(seconds / 60);
			var partInSeconds = seconds % 60;
			partInSeconds = partInSeconds.toString().padStart(2, "0");
			return `${minutes}:${partInSeconds}`;
		}
		function onEvent() {
			this.initialTime -= 1;
			if (this.initialTime >= 1) {
				this.timerText.setText("Countdown: " + formatTime(this.initialTime));
			} else {
				this.scene.start("GameOver");
			}
		}

    this.text = this.add
    .text(25, 530, "Cursors to move", {
      font: "16px Courier",
      fill: "#00ff00",
    })
    .setScrollFactor(0);

		const wormholes = [
			{ x: 1343, y: 2490, width: 70, height: 75 },
			{ x: 1728, y: 2518, width: 70, height: 75 },
			{ x: 1954, y: 2900, width: 70, height: 75 },
			{ x: 1439, y: 3093, width: 70, height: 75 },
			{ x: 223, y: 3070, width: 70, height: 75 },
		];

		wormholes.forEach((wormhole) =>
			this.traps.generateTrap(wormhole, this.traps.findWormHole)
		);

		this.traps.generateTrap(
			{ x: 360, y: 2150, width: 70, height: 70 },
			this.traps.goInvisible
		);

		this.traps.generateTrap(
			{ x: 700, y: 2700, width: 70, height: 70 },
			this.traps.goInvisible
		);

		this.traps.generateTrap(
			{ x: 900, y: 2600, width: 70, height: 70 },
			this.traps.goInvisible
		);

		this.traps.generateTrap(
			{ x: 630, y: 2400, width: 70, height: 70 },
			this.traps.goInvisible
		);

		this.traps.generateTrap(
			{ x: 830, y: 2316, width: 70, height: 70 },
			this.traps.goInvisible
		);

		this.traps.generateTrap(
			{ x: 355, y: 2715, width: 70, height: 70 },
			this.traps.goTiny
		);

		this.traps.generateTrap(
			{ x: 1763, y: 2382, width: 70, height: 70 },
			this.traps.goBig
		);
	}

	// ************UPDATE****************
	update() {
		this.traps.generateTrap(
			{ x: 2080, y: 1930, width: 140, height: 1150 },
			this.traps.goZoomDown
		);

		this.traps.generateTrap(
			{ x: 2160, y: 2500, width: 230, height: 100 },
			this.traps.goZoomRight
		);

		this.traps.generateTrap(
			{ x: 2240, y: 1930, width: 140, height: 1150 },
			this.traps.goZoomUp
		);

		this.traps.generateTrap(
			{ x: 2400, y: 1930, width: 140, height: 1150 },
			this.traps.goZoomDown
		);

		this.traps.generateTrap(
			{ x: 2320, y: 1460, width: 260, height: 100 },
			this.traps.goZoomRight
		);

		const treasureDetector = () => {
			if (!this.treasure1.active) {
				return this.thermometer();
			} else {
				return "Go to coordinates 1676, 1411";
			}
		};

		this.text.setText([
			// "screen x: " + this.input.x,
			// "screen y: " + this.input.y,
			// "world x: " + this.input.mousePointer.worldX.toFixed(0),
			// "world y: " + this.input.mousePointer.worldY.toFixed(0),
			"Treasure Detector: " + treasureDetector(),
			"Treasures: " + this.score,
			"Pinkman's Coordinates: " + this.hero.spriteObject.x.toFixed(0) + ", " +
			this.hero.spriteObject.y.toFixed(0),
		]);

		this.hero.updatePlayer();
		this.heroHand.updateHand(this.hero);

		this.clueText.setText(this.treasureMessage());
	}
}

export default Game;
