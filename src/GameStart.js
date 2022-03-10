class GameStart extends Phaser.Scene {
  constructor() {
    super({
      key: "GameStart",
    });
  }

  preload() {
    this.load.image("logo", "/sprites/logo.png");
  }

  create() {
    this.add.image(660, 360, "logo").setOrigin(.54, .50).setScale(3);

    // this.add
    //   .text(640, 360, "A Pinkman's Journey", {
    //     font: "80px Source Sans Pro",
    //     fill: "#FFFFFF",
    //   })
    //   .setOrigin(0.5, 2.75);

    this.input.once(
      "pointerup",
      function () {
        this.scene.start("Instructions");
      },
      this
    );

    this.add
      .text(640, 360, "Click for Instructions", {
        font: "40px Source Sans Pro",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, -5.5);
  }
}

export default GameStart;
