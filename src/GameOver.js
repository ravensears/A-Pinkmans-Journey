class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: "GameOver",
    });
  }

  preload() {
    this.load.image("run", "src/sprites/new_pinkman.png");
  }

  create() {
    this.add
      .text(640, 360, "Game Over!", {
        fontSize: "180px",
        fill: "#FFFFFF",
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
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, -3.5);

    this.add.image(660, 360, "run").setOrigin(0.5, 0.2).setScale(0.5);
  }
}

export default GameOver;
