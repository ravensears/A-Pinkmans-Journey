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
      .text(640, 360, "A Pinkman's Journey", {
        fontSize: "80px",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 1.75);

    this.input.once(
      "pointerup",
      function () {
        this.scene.start("Instructions");
      },
      this
    );

    this.add
      .text(640, 360, "Click for Instructions", {
        fontSize: "50px",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, -4.5);

    this.add.image(660, 360, "planet").setOrigin(0.5, 0.2).setScale(0.5);
  }
}

export default GameStart;
