import TreasureGroup from './data/treasureData.js'

class Treasure {
  constructor(scene) {
    this.scene = scene;
    this.treasureList = TreasureGroup
    this.treasureIndex = 0;
    this.keyObj = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  destroyMessage(msg){
		setTimeout(() => {
			msg.destroy();
		}, 5000);
	};
  
  nextTreasure(){
		this.treasureIndex === this.treasureGroup.length
			? gameOver()
		  : generateNextTreasure();
	}

  findTreasure(treasure){
    if (treasure.active) {
      if (treasure.body.embedded && keyObj.isDown) {

        this.scene.score++;
        this.scene.sfx.play();
        let msg = this.scene.add.text(
          treasure.x,
          treasure.y,
          treasure.data.list.message
        );
        destroyMessage(msg);
        treasure.setActive(false);
        nextTreasure();
      }
    }
  };

		gameOver() {
			console.log('All Treasures Found');
		}


  generateFirstTreasure(){
    let treasureShape = this.scene.add.rectangle(
      1679,
      1418,
      30,
      63,
      "00FFFFFF"
    );
    
    let treasureObj = this.scene.physics.add.existing(treasureShape, 1);
    treasureObj.visible = false;
    treasureObj.setData({ message: "Found Treasure! Check in the couch" });
    this.scene.physics.add.overlap(treasureObj, this.scene.heroHand.spriteObject, findTreasure());
    this.scene.treasureIndex++;
    return treasureObj;
  }

  generateTreasure(x, y, width, height, message) {
    let treasureShape = this.scene.add.rectangle(
      x,
      y,
      width,
      height,
      "00FFFFFF"
    );
    
    let treasureObj = this.scene.physics.add.existing(treasureShape, 1);
    treasureObj.visible = false;
    treasureObj.setData({ message: message });
    this.scene.physics.add.overlap(treasureObj, this.heroHand.spriteObject, findTreasure);
    this.scene.treasureIndex++;
    return treasureObj;
  };

  
		generateNextTreasure = () => {
			generateTreasure(this.treasureGroup[this.treasureIndex]);
		}

    // this.scene.treasure1 = this.generateTreasure({
		// 	x: 1679,
		// 	y: 1418,
		// 	width: 30,
		// 	height: 63,
		// 	message: "Found Treasure! Check in the couch",
		// });
  
}

export default Treasure;