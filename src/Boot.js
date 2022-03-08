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
		this.load.image("base_tiles", "/tiles/space_tileset.png");
		this.load.tilemapTiledJSON("tilemap", "/tiles/space_map.json");
		this.load.audio("bens_beautiful_song", "/audio/music_2.mp3");
		this.load.audio("treasure_song", "/audio/treasure_hunting.mp3");
		this.load.audio("beep", "/audio/beep.mp3");
		this.load.image("object", "/sprites/pinkman.png");
		this.load.image("muteMan", "/sprites/muteMan.png");
		//tutorial
		this.load.atlas('tpOnline', '../sprites/spritesheetV2.png', '../sprites/spritesheetV2.json');
		// this.load.atlas('skeleton', '/sprites/skeleton.png', '/sprites/skeleton.json');
		this.enemy //tut
	}; //end preload

	create() {
		this.scene.start("Game");
	}
}

export default Boot;
