class Treasure {
	constructor(scene, keyObject, treasureGroup) {
		this.scene = scene;
		this.keyObject = keyObject;
		this.messageIndex = -1;
		this.temperatureIndex = 0;
		this.treasureGroup = treasureGroup;
	}

	generateTreasure(treasure, msg) {
		let treasureShape = this.scene.add.rectangle(
			treasure.x,
			treasure.y,
			treasure.width,
			treasure.height
		);

		let treasureObj = this.scene.physics.add.existing(treasureShape, 1);
		treasureObj.visible = false;
		treasureObj.setData({ message: msg });

		const findTreasure = (treasure) => {
			if (treasure.active && this.keyObject.isDown) {
				console.log(`printing: ${this.keyObject}`);
				if (treasure.body.embedded) {
					console.log(`You found the treasure at ${treasure.x}, ${treasure.y}!`);
					treasure.setActive(false);
					this.scene.score++;
					this.messageIndex++;
					this.temperatureIndex === this.treasureGroup.length
					? this.scene.start("GameComplete")
					: this.generateNextTreasure();
				}
			}
		}
		
		this.scene.physics.add.overlap(treasureObj, this.scene.heroHand.spriteObject, findTreasure)

		this.temperatureIndex++;

		return treasureObj;
	}

	generateNextTreasure() {
		this.generateTreasure(this.treasureGroup[this.temperatureIndex]);
	}
}

export default Treasure;
