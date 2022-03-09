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

    this.music.play(musicConfig);
    this.musicOn = true;

    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("space_tileset", "base_tiles");
    const floor = map.createStaticLayer("floor", tileset);
    const walls = map.createStaticLayer("walls", tileset);
    const stuff = map.createStaticLayer("stuff", tileset);
    const rect = new Phaser.Geom.Rectangle(1008, 50, 1480, 1180);
    const sfx = this.sound.add("beep");
    const keyObj = this.input.keyboard.addKey("E");
    const group = this.physics.add.group({
      key: "chicken",
      frameQuantity: 300,
    });
    const ui = this.add
      .rectangle(648, 732, 1200, 150, 0x002b36)
      .setStrokeStyle(4, 0xefc53f)
      .setScrollFactor(0);
    ui.alpha = 0.75;
    Phaser.Actions.RandomRectangle(group.getChildren(), rect);

    this.score = 0;
    this.temperatureIndex = 0;
    this.messageIndex = -1;
    this.initialTime = 500;
    this.wormholesfx = this.sound.add("wormhole");
    this.traps = new Trap(this, keyObj);

    walls.setCollisionByProperty({ collides: true });
    stuff.setCollisionByProperty({ collides: true });

    this.hero = new Player(this, 300, 2000, "sadGuy");
    this.heroHand = new Player(this, 1600, 1600, "sadGuy");

    this.heroHand.spriteObject.setScale(1.4);
    this.heroHand.spriteObject.visible = false;

    this.hero2 = this.physics.add.sprite(1650, 1650, "pinkman");

    this.treasureChicken = this.physics.add
      .staticSprite(1800, 500, "chicken")
      .setScale(1.3);
    this.cake = this.physics.add
      .staticSprite(1763, 2382, "eatMe")
      .setScale(1.7);
    this.drink = this.physics.add
      .staticSprite(355, 2715, "drinkMe")
      .setScale(1.4);

    this.heart = this.physics.add.staticSprite(238, 738, "heart").setScale(1.5);

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

    this.cameras.main.startFollow(this.hero.spriteObject, true);

    this.physics.add.collider(this.hero.spriteObject, stuff);
    this.physics.add.collider(this.hero.spriteObject, walls);
    this.physics.add.collider(this.hero.spriteObject, this.cake);
    this.physics.add.collider(this.hero.spriteObject, this.drink);
    this.physics.add.collider(this.hero.spriteObject, this.treasureChicken);
    this.physics.add.collider(this.hero.spriteObject, this.hero2);
    this.physics.add.collider(this.hero.spriteObject, group);
    this.physics.add.collider(this.hero.spriteObject, this.heart);
    this.physics.add.collider(this.hero2, walls);
    this.physics.add.collider(this.hero2, stuff);
    this.physics.add.collider(group, walls);

    this.treasureGroup = [
      new Treasure(
        1679,
        1418,
        80,
        80,
        "Found Treasure! Check in the couch over there"
      ),
      new Treasure(
        1011,
        1435,
        80,
        80,
        "Found Treasure! Check in the heart of the labyrinth"
      ),
      new Treasure(238, 738, 80, 80, "Found Treasure! Check in the black room"),
      new Treasure(
        498,
        3059,
        80,
        80,
        "Found Treasure! Check in the wishing well"
      ),
      new Treasure(
        1539,
        2766,
        80,
        80,
        "Found Treasure! Check under the treasure chicken"
      ),
      new Treasure(
        1800,
        500,
        80,
        80,
        "Found treasure! Check under a tree"
      ),
      new Treasure(
        600, 
        2530,
        80,
        80,
        "Found treasure! Check under the control desk"
      ),
      new Treasure(
        1369,
        1811,
        80,
        80,
        "You found the final treasure!!! Woooo!!"
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

    this.text = this.add
      .text(58, 733, "Cursors to move", {
        font: "16px Courier",
        fill: "#00ff00",
      })
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

    this.timerText = this.add
      .text(58, 705, "Countdown: " + formatTime(this.initialTime), {
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
        return "What's cooler than being cold? Ice cold!!";
      }
    };

    this.clueText = this.add
      .text(135, 660, this.treasureMessage(), {
        fontSize: "28px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    this.muteMan = this.add
      .image(85, 673, "muteMan")
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

    const wormholes = [
      { x: 1343, y: 2490, width: 70, height: 75 },
      { x: 1728, y: 2518, width: 70, height: 75 },
      { x: 1954, y: 2900, width: 70, height: 75 },
      { x: 1439, y: 3093, width: 70, height: 75 },
    ];

    wormholes.forEach((wormhole) =>
      this.traps.generateTrap(wormhole, this.traps.findWormHole)
    );

    this.traps.generateTrap(
      { x: 1700, y: 1700, width: 70, height: 75 },
      this.traps.goInvisible
    );
  }

  // ************UPDATE****************
  update() {
    this.traps.generateTrap(
      { x: 2100, y: 1900, width: 170, height: 1000 },
      this.traps.goZoomDown
    );

    this.traps.generateTrap(
      { x: 1993, y: 2025, width: 70, height: 70 },
      this.traps.goZoomRight
    );

    this.traps.generateTrap(
      { x: 2140, y: 1700, width: 70, height: 1000 },
      this.traps.goZoomUp
    );

    this.traps.generateTrap(
      { x: 2140, y: 1500, width: 70, height: 1000 },
      this.traps.goZoomLeft
    );

    this.traps.generateTrap(
      { x: 355, y: 2715, width: 70, height: 70 },
      this.traps.goTiny
    );

    this.traps.generateTrap(
      { x: 1763, y: 2382, width: 70, height: 70 },
      this.traps.goBig
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
      "hero x: " + this.hero.spriteObject.x.toFixed(0),
      "hero y: " + this.hero.spriteObject.y.toFixed(0),
      // "world x: " + this.input.mousePointer.worldX.toFixed(0),
      // "world y: " + this.input.mousePointer.worldY.toFixed(0),
      "Treasures: " + this.score,
      "Treasure Detector: " + treasureDetector(),
    ]);

    this.hero.updatePlayer();
    this.heroHand.updateHand(this.hero);

    this.clueText.setText(this.treasureMessage());
  }
}

export default Game;
