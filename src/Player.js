class Player {
  constructor(scene, x, y, sprite, phaserObject = Phaser.GameObjects.Sprite) {
    this.spriteObject = new phaserObject(scene, x, y, sprite);

    scene.add.existing(this.spriteObject);
    scene.physics.world.enableBody(this.spriteObject);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }

  createPlayer() {
    return this.spriteObject;
  }

  updatePlayer() {
    this.spriteObject.body.setVelocity(0);

    if (this.cursors.up.isDown || this.keyW.isDown) {
      this.moveUp();
    } else if (this.cursors.down.isDown || this.keyS.isDown) {
      this.moveDown();
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      this.moveRight();
    } else if (this.cursors.left.isDown || this.keyA.isDown) {
      this.moveLeft();
    } else {
      this.spriteObject.anims.stop();
    }
  }

  updateHand(player) {
    this.spriteObject.x = player.spriteObject.x;
    this.spriteObject.y = player.spriteObject.y;
  }

  moveUp() {
    this.spriteObject.body.setVelocityY(-180);
    this.spriteObject.play("top", true);
  }

  moveDown() {
    this.spriteObject.body.setVelocityY(180);
    this.spriteObject.play("down", true);
  }

  moveLeft() {
    this.spriteObject.body.setVelocityX(-180);
    this.spriteObject.play("left", true);
  }

  moveRight() {
    this.spriteObject.body.setVelocityX(180);
    this.spriteObject.play("right", true);
  }
}

export default Player;
