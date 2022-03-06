class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x , y, sprite);

    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }

  updatePlayer() {
    this.body.setVelocity(0);

    if (this.cursors.up.isDown || this.keyW.isDown) {
      this.moveUp()
    } else if (this.cursors.down.isDown || this.keyS.isDown) {
      this.moveDown()
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      this.moveRight()
    } else if (this.cursors.left.isDown || this.keyA.isDown) {
      this.moveLeft()
    } 
    
  }

  updateHand(player) {
    this.x = player.x
    this.y = player.y
  }

  moveUp() {
    this.body.setVelocityY(-160);
    this.play("top", true);
  }

  moveDown() {
    this.body.setVelocityY(160);
    this.play("down", true);
  }

  moveLeft() {
    this.body.setVelocityX(-160);
    this.play("left", true);
  }

  moveRight() {
      this.body.setVelocityX(160);
      this.play("right", true);
  }
}

export default Player;

