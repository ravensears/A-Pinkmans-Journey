class GameComplete extends Phaser.Scene {
  constructor() {
    super({
      key: "GameComplete",
    });
  }

  preload() {
    this.load.image("earth", "/sprites/earth.gif");
  }

  create() {
    this.add
      .text(640, 360, "You Won!", {
        fontSize: "180px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 1.75);

    this.input.once(
      "pointerup",
      function () {
        this.scene.start("GameStart");
      },
      this
    );

    this.add
      .text(640, 360, "Click to return", {
        fontSize: "52px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, -3.5);

    this.add.image(640, 360, "earth").setOrigin(0.5, 0.5).setScale(2.5);
  }
}

export default GameComplete;
