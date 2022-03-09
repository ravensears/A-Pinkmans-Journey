class Instructions extends Phaser.Scene {

	constructor() {
		super({
			key: "Instructions",
		});
	}

    preload () {
        this.load.image("planet", "/sprites/pinkman_run.png");

    }

    create ()
    {
        this.add.text(
            640, 
            360, 
            "Instructions", 
            {
                fontSize: "180px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5, 1.75);

        this.input.once('pointerup', function () {this.scene.start("Game")}, this);

        this.add.text(
            640, 
            360, 
            "Click to start", 
            {
                fontSize: "52px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5, -3.5);

        this.add.text(
            640,
            360,
            "Movement: W A S D || Arrow keys",
            {
                fontSize: "28px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5, 4);

        this.add.text(
            640,
            360,
            "Interact: E",
            {
                fontSize: "28px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5, 2);

        this.add.text(
            640,
            360,
            "Follow the clues and find them all within the time limit!",
            {
                fontSize: "36px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5, -1.5);

        // this.add.image(
        //     640, 360, "planet")
        //     .setOrigin(0.5, 0.5)
        //     .setScale(5);

        };

}

export default Instructions;

