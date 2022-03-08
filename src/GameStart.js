class GameStart extends Phaser.Scene {
  constructor() {
    super({
      key: "GameStart",
    });
  }

  preload() {
    this.load.image("planet", "/sprites/earth.gif");
  }

  create() {
    this.add
      .text(640, 360, "Game Name", {
        fontSize: "180px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 1.75);

    this.input.once(
      "pointerup",
      function () {
        this.scene.start("Game");
      },
      this
    );

    this.add
      .text(640, 360, "Click to start", {
        fontSize: "52px",
        fill: "#ffffff",
      })
      .setOrigin(0.5, -3.5);

    this.add.image(640, 360, "planet").setScale(3);
  }
}

export default GameStart;
