class Wormhole {
	constructor(scene, keyObj) {
		this.scene = scene;
		this.keyObj = keyObj;
	}

	findWormHole = (wormHole) => {
		if (wormHole.active) {
			if (wormHole.body.embedded && this.keyObj.isDown) {
				console.log(`You fell in a wormhole at: ${wormHole.x}, ${wormHole.y}!`);
				this.scene.wormholesfx.play();
				this.scene.cameras.main.fadeOut(1000, 0, 0, 0);
				this.scene.cameras.main.shake(700);
				this.scene.cameras.main.fadeIn(2000, 0, 0, 0);
				this.scene.hero.spriteObject.x = Math.random() * 3000;
				this.scene.hero.spriteObject.y = Math.random() * 3000;
			}
		}
	};

	generateWormhole = (wormHole) => {
		let wormHoleShape = this.scene.add.rectangle(
			wormHole.x,
			wormHole.y,
			wormHole.width,
			wormHole.height,
			"00FFFFFF"
		);
		let wormHoleObj = this.scene.physics.add.existing(wormHoleShape, 1);
		wormHoleObj.visible = false;
		this.scene.physics.add.overlap(
			wormHoleObj,
			this.scene.heroHand.spriteObject,
			this.findWormHole
		);
		return wormHoleObj;
	};
}

export default Wormhole;
