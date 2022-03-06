const config = {
	type: Phaser.AUTO,
	scale: {
		parent: "phaser-game",
		mode: Phaser.DOM.FIT,
		width: window.innerWidth,
		height: window.innerHeight,
	},
	scene: [Game],
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
		},
	}
};

const game = new Phaser.Game(config);
window.game = game;