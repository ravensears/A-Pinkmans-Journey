import Boot from "./Boot.js";
import Game from "./Game.js";

const config = {
	type: Phaser.AUTO,
	scale: {
		parent: "phaser-game",
		mode: Phaser.DOM.FIT,
		width: window.innerWidth,
		height: window.innerHeight,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		},
	},
	scene: [Boot, Game],
};

const game = new Phaser.Game(config);