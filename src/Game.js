import Player from "./Player.js";
import Treasure from "./Treasure.js"

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

		this.score = 0;
		const sfx = this.sound.add("beep");

	

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
		this.heroHand = new Player(this, 1600, 1600, "sadGuy");
		this.heroHand.spriteObject.setScale(1.4)
		this.heroHand.spriteObject.visible = false;

		this.treasures = new Treasure(this)
		this.treasures.generateFirstTreasure()
		this.treasures.generateNextTreasure()

    this.hero2 = this.physics.add.sprite(1650, 1650, "pinkman");
    this.treasureChicken = this.physics.add.staticSprite(1800, 500, "chicken");

    const group = this.physics.add.group({ key: "chicken", frameQuantity: 300 });

    const rect = new Phaser.Geom.Rectangle(1008, 50, 1480, 1180);

    Phaser.Actions.RandomRectangle(group.getChildren(), rect);

		this.physics.add.overlap(this.treasure1, this.heroHand.spriteObject, findTreasure);

		this.cameras.main.startFollow(this.hero.spriteObject, true);

		this.muteMan = this.add
			.image(30, 20, "muteMan")
			.setInteractive()
			.setScale(2)
			.setScrollFactor(0);

		this.physics.add.collider(this.hero.spriteObject, stuff);
		this.physics.add.collider(this.hero2, stuff);
		this.physics.add.collider(this.hero.spriteObject, walls);
		this.physics.add.collider(this.hero2, walls);
    this.physics.add.collider(this.hero.spriteObject, this.treasureChicken);
    this.physics.add.collider(this.hero.spriteObject, group);
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

		this.physics.add.collider(this.hero.spriteObject, this.hero2);

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
		
		this.initialTime = 500;

		this.timerText = this.add
		.text(500, 10, "Countdown: " + formatTime(this.initialTime)).setScrollFactor(0);

		this.timedEvent = this.time.addEvent({
			delay: 1000,
			callback: onEvent,
			callbackScope: this,
			loop: true,
		});

		function formatTime(seconds) {
			var minutes = Math.floor(seconds / 60);
			var partInSeconds = seconds % 60;
			partInSeconds = partInSeconds.toString().padStart(2, "0");
			return `${minutes}:${partInSeconds}`;
		};
		function onEvent() {
			this.initialTime -= 1;
			if (this.initialTime >= 1){
			this.timerText.setText("Countdown: " + formatTime(this.initialTime));
			} else {
			this.scene.start("GameOver");
			};
		};
	}

	// ************UPDATE****************

	update() {
    this.treasureDetector = () => {
      const treasureProximity = (distance) => { 
       return Math.abs(this.hero.spriteObject.x - this.treasureGroup[this.treasureIndex - 1].x) <= distance &&
        Math.abs(this.hero.spriteObject.y - this.treasureGroup[this.treasureIndex - 1].y) <= distance 
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
			"hero x: " + this.hero.spriteObject.x.toFixed(0),
			"hero y: " + this.hero.spriteObject.y.toFixed(0),
      "Treasure Detector: " + this.treasureDetector(),
		]);

		this.scoreText.setText(`Treasures: ${this.score}`);
		this.hero.updatePlayer();
		this.heroHand.updateHand(this.hero);
	}
	
}

export default Game;
