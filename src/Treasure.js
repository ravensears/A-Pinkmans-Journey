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

		this.addOverlap(
			treasureObj,
			this.scene.heroHand.spriteObject,
			this.findTreasure
		);

		this.temperatureIndex++;

		return treasureObj;
	}

	generateNextTreasure() {
		generateTreasure(this.treasureGroup[this.temperatureIndex]);
	}

	findTreasure(treasure) {
		if (treasure.active) {
			console.log(`printing: ${this.keyObject}`);
			if (treasure.body.embedded && this.keyObject.isDown) {
				console.log(`You found the treasure at ${treasure.x}, ${treasure.y}!`);
				treasure.setActive(false);
				this.afterFindUpdate();
			}
		}
	}

	addOverlap(obj1, obj2, callback) {
		this.scene.physics.add.overlap(obj1, obj2, callback);
	}

	nextTreasure() {
		this.temperatureIndex === this.treasureGroup.length
			? this.scene.start("GameComplete")
			: this.generateNextTreasure();
	}

	afterFindUpdate() {
		this.scene.score++;
		this.messageIndex++;
		this.nextTreasure();
	}
}

export default Treasure;
