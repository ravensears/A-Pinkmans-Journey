class GameOver extends Phaser.Scene {

	constructor() {
		super({
			key: "GameOver",
		});
	}

    create ()
    {
        this.add.text(
            640, 
            360, 
            "Game Over!", 
            {
                fontSize: "180px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5, 1.75);

        this.input.once('pointerup', function () {this.scene.start("GameStart")}, this);

        this.add.text(
            640, 
            360, 
            "Click to return", 
            {
                fontSize: "52px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5, -3.5);
    };

}

export default GameOver;
