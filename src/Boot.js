// import Phaser from 'phaser';

class Boot extends Phaser.Scene {
	constructor() {
		super({
			key: "Boot",
		});
	}

	preload = () => {
		this.load.spritesheet("run", "/sprites/run.gif", {
			frameWidth: 32,
			frameHeight: 32,
		});
		this.load.spritesheet("sadGuy", "/sprites/cat.png", {
			frameWidth: 32,
			frameHeight: 32,
		});

    this.load.image("logo", "/sprites/logo.ping");
		this.load.image("ball1", "/sprites/balls/ball1.png");
		this.load.image("base_tiles", "/tiles/space_tileset.png");
		this.load.image("muteMan", "/sprites/muteMan.png");
		this.load.image("eatMe", "/sprites/cake.png");
		this.load.image("drinkMe", "/sprites/drink.png");
		this.load.image("tree", "/sprites/tree.png");
    this.load.image("newPinkman", "/sprites/new_pinkman.png");
    this.load.image("pinkman", "/sprites/new_pinkman.gif");
		this.load.image("tree1", "/sprites/trees/tree1.png");
		this.load.image("tree2", "/sprites/trees/tree2.png");
		this.load.image("tree3", "/sprites/trees/tree5.png");
		this.load.image("tree4", "/sprites/trees/tree7.png");
		this.load.image("heart", "/sprites/heart.png");
		this.load.image("ball1", "/sprites/balls/ball1.png");
		this.load.image("treasureChest", "/sprites/treasure.png");
		this.load.tilemapTiledJSON("tilemap", "/tiles/space_map.json");
		this.load.audio("bens_beautiful_song", "/audio/music_2.mp3");
		this.load.audio("treasure_song", "/audio/treasure_hunting.mp3");
		this.load.audio("beep", "/audio/beep.mp3");
		this.load.audio("wormhole", "/audio/wormholefx.mp3");
		this.load.audio("inviz", "/audio/InvisibleSFX.mp3");
		this.load.audio("tiny", "/audio/TinySFX.mp3");
		this.load.audio("big", "/audio/BigSFX.mp3");


		this.gameWidth = this.sys.game.canvas.width;
		this.gameHeight = this.sys.game.canvas.height;
	};

	create() {
		this.scene.start("GameStart");
	}
}

export default Boot;
