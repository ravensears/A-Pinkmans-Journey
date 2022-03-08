class Trap {
	constructor(scene, keyObj) {
		this.scene = scene;
		this.keyObj = keyObj;
	}
	//stop

	findWormHole = (wormHole) => {
		if (wormHole.body.embedded && this.keyObj.isDown) {
			console.log(`You fell in a wormhole at: ${wormHole.x}, ${wormHole.y}!`);
			this.scene.wormholesfx.play();
			this.scene.cameras.main.fadeOut(1000, 0, 0, 0);
			this.scene.cameras.main.shake(700);
			this.scene.cameras.main.fadeIn(2000, 0, 0, 0);
			this.scene.hero.spriteObject.x = Math.random() * 3000;
			this.scene.hero.spriteObject.y = Math.random() * 3000;
		}
	};

	goTiny = (trap) => {
		if (trap.body.embedded && this.keyObj.isDown) {
			console.log(`You got tiny at: ${trap.x}, ${trap.y}!`);
			this.scene.hero.spriteObject.setScale(0.4);
		}
	};

	goBig = (trap) => {
		if (trap.body.embedded && this.keyObj.isDown) {
			console.log(`You got big at: ${trap.x}, ${trap.y}!`);
			this.scene.hero.spriteObject.setScale(1);
		}
	};

	goVisible = () => {
		this.scene.hero.spriteObject.visible = true;
	};

	goInvisible = (trap) => {
		if (trap.body.embedded && this.keyObj.isDown) {
			console.log(`You went invisible at: ${trap.x}, ${trap.y}!`);
			this.scene.hero.spriteObject.visible = false;
			setTimeout(this.goVisible, 10000);
		}
	};

	goZoomDown = (trap) => {
		if (trap.body.embedded) {
			console.log(`You zoomed at: ${trap.x}, ${trap.y}!`);
			this.scene.hero.spriteObject.body.setVelocityY(1000, 1000);
		}
	};

	goZoomUp = (trap) => {
		if (trap.body.embedded) {
			console.log(`You zoomed at: ${trap.x}, ${trap.y}!`);
			this.scene.hero.spriteObject.body.setVelocityY(-1000, 1000);
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
