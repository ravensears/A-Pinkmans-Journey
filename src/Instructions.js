class Instructions extends Phaser.Scene {

	constructor() {
		super({
			key: "Instructions",
		});
	}

    preload () {
        this.load.image("pinkman", "/sprites/new_pinkman.png");

    }

    create ()
    {
        this.add.image(
            660, 360, "pinkman")
            .setOrigin(0.5, 0.40).setScale(0.3);

        this.add.text(
            640, 
            360, 
            "Instructions", 
            {
                font: "80px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(0.5, 2.75);

        this.input.once('pointerup', function () {this.scene.start("Game")}, this);

        this.add.text(
            640, 
            360, 
            "Click to start", 
            {
                font: "40px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(0.5, -3.5);

        this.add.text(
            640,
            360,
            "Follow the clues and find them all within the time limit!",
            {
                font: "30px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(0.5, -1.5);

        this.add.text(
            640,
            360,
            "Movement: W A S D || Arrow keys",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(0.5, 4);

        this.add.text(
            640,
            360,
            "Interact: E",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(0.5, 2);
        
    };

}

export default Instructions;

