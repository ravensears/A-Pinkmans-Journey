const Phaser = require('phaser');

const Boot = require(`./Boot.js`);
const Game = require(`./Game.js`);

const config = {
	type: Phaser.AUTO,
	scale: {
		parent: "phaser-game",
		mode: Phaser.DOM.FIT,
		width: window.innerWidth,
		height: window.innerHeight,
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
		},
	},
	scene: [Boot, Game]
};

var text;

const game = new Phaser.Game(config);
musicOn = false;

// ************PRELOAD****************


// ************CREATE****************

