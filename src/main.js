import Boot from "./Boot.js";
import Game from "./Game.js";
import GameOver from "./GameOver.js";
//
// import Enemy from "./Enemy.js";
// import Entity from "./Entity.js";
//tut check

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
			debug: false,
		},
	},
	scene: [Boot, Game, GameOver],
};

const game = new Phaser.Game(config);