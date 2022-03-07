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
                fontSize: "200px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5);
    };

}

export default GameOver;
