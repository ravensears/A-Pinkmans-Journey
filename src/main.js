import Boot from "./Boot.js";
import Game from "./Game.js";
import GameOver from "./GameOver.js";
import GameStart from "./GameStart.js";
import GameComplete from "./GameComplete.js";

const config = {
	type: Phaser.AUTO,
	backgroundColor: '#002b36',
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
	scene: [Boot, GameStart, Game, GameOver, GameComplete],
};

const game = new Phaser.Game(config);

export default config;
