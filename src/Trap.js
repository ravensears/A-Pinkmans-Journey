class Trap {
	constructor(scene, keyObj) {
		this.scene = scene;
		this.keyObj = keyObj;
	}

	trapMessage(text) {
		let msg;
		msg = this.scene.add
			.text(340, 710, text, {
				fontSize: "28px",
				fill: "#ffffff",
			})
			.setScrollFactor(0);
		setTimeout(() => {
			msg.destroy();
		}, 6000);
	}

	findWormHole = (wormHole) => {
		if (wormHole.body.embedded && this.keyObj.isDown) {
			console.log(`You fell in a wormhole at: ${wormHole.x}, ${wormHole.y}!`);
			this.scene.wormholesfx.play();
			this.scene.cameras.main.fadeOut(1000, 0, 0, 0);
			this.scene.cameras.main.shake(700);
			this.scene.cameras.main.fadeIn(2000, 0, 0, 0);
			this.scene.hero.spriteObject.x = Math.random() * 2400;
			this.scene.hero.spriteObject.y = Math.random() * 3000;
			this.trapMessage("Oh no!! You fell in a wormhole!!");
		}
	};

	goTiny = (trap) => {
		if (trap.body.embedded && this.keyObj.isDown) {
			console.log(`You got tiny at: ${trap.x}, ${trap.y}!`);
			this.scene.tinySFX.play();
			this.scene.hero.spriteObject.setScale(0.4);
			this.trapMessage("Whoa, you shrunk!!");
		}
	};

	goBig = (trap) => {
		if (trap.body.embedded && this.keyObj.isDown) {
			console.log(`You got big at: ${trap.x}, ${trap.y}!`);
			this.scene.bigSFX.play();
			this.scene.hero.spriteObject.setScale(1);
			this.trapMessage("You're big again!!");
		}
	};

	goVisible = () => {
		this.scene.hero.spriteObject.visible = true;
		this.trapMessage("There you are!!");
	};

	goInvisible = (trap) => {
		if (trap.body.embedded && this.keyObj.isDown) {
			console.log(`You went invisible at: ${trap.x}, ${trap.y}!`);
			this.scene.invizSFX.play();
			this.scene.hero.spriteObject.visible = false;
			setTimeout(this.goVisible, 10000);
			this.trapMessage("Hey, where did you go??");
		}
	};

	goZoomDown = (trap) => {
		if (trap.body.embedded) {
			console.log(`You zoomed at: ${trap.x}, ${trap.y}!`);
			this.scene.hero.spriteObject.body.setVelocityY(800, 800);
			this.trapMessage("You're on the travelator!!");
		}
	};

	goZoomUp = (trap) => {
		if (trap.body.embedded) {
			console.log(`You zoomed at: ${trap.x}, ${trap.y}!`);
			this.scene.hero.spriteObject.body.setVelocityY(-800, 800);
			this.trapMessage("You're on the travelator!!");
		}
	};

	goZoomLeft = (trap) => {
		if (trap.body.embedded) {
			console.log(`You zoomed at: ${trap.x}, ${trap.y}!`);
			this.scene.hero.spriteObject.body.setVelocityX(-800, 800);
			this.trapMessage("You're on the travelator!!");
		}
	};

	goZoomRight = (trap) => {
		if (trap.body.embedded) {
			console.log(`You zoomed at: ${trap.x}, ${trap.y}!`);
			this.scene.hero.spriteObject.body.setVelocityX(800, 800);
			this.trapMessage("You're on the travelator!!");
		}
	};

	generateTrap = (trap, callback) => {
		let trapShape = this.scene.add.rectangle(
			trap.x,
			trap.y,
			trap.width,
			trap.height,
			"00FFFFFF"
		);
		let trapObj = this.scene.physics.add.existing(trapShape, 1);
		trapObj.visible = false;
		this.scene.physics.add.overlap(
			trapObj,
			this.scene.heroHand.spriteObject,
			callback
		);
		return trapObj;
	};
}

export default Trap;
