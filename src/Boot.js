// import Phaser from 'phaser';

class Boot extends Phaser.Scene {
	constructor() {
		super({
			key: "Boot",
		});
	}

	preload = () => {
		this.load.spritesheet("pinkman", "/sprites/pinkman_run.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
		this.load.spritesheet("sadGuy", "/sprites/cat.png", {
			frameWidth: 32,
			frameHeight: 32,
		});

		this.load.image("chicken", "/sprites/chicken.png");
		this.load.image("base_tiles", "/tiles/space_tileset.png");
		this.load.image("muteMan", "/sprites/muteMan.png");
		this.load.tilemapTiledJSON("tilemap", "/tiles/space_map.json");
		this.load.audio("bens_beautiful_song", "/audio/music_2.mp3");
		this.load.audio("treasure_song", "/audio/treasure_hunting.mp3");
		this.load.audio("beep", "/audio/beep.mp3");

		this.gameWidth = this.sys.game.canvas.width
    	this.gameHeight = this.sys.game.canvas.height
	};

	create() {
		this.scene.start("GameStart");
	}
}

export default Boot;
