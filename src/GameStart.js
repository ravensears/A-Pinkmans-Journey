class GameStart extends Phaser.Scene {
  constructor() {
    super({
      key: "GameStart",
    });
  }

  preload() {
    this.load.image("logo", "/sprites/logo.png");
    this.load.audio("song", "/audio/music.mp3");
  }

  create() {
    this.add.image(400, 300, "logo").setScale(2);

    this.music = this.sound.add("song");

		const musicConfig = {
			mute: false,
			volume: 0.6,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,
		};

		this.music.play(musicConfig);
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

    this.input.once(
      "pointerup", 
      function () {
        this.music.stop()
      }, 
      this
    );

    this.add
      .text(400, 300, "Click for Instructions", {
        font: "40px Source Sans Pro",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, -5.5);
  }
}

export default GameStart;
