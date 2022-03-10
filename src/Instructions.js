class Instructions extends Phaser.Scene {

	constructor() {
		super({
			key: "Instructions",
		});
	}

    preload () {
        this.load.image("newPinkman", "/sprites/new_pinkman.png");

    }

    create ()
    {
        this.add.image(
            660, 360, "newPinkman")
            .setOrigin(1.5, 0.40).setScale(0.35);

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
                font: "45px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(0.5, -5.5);

        this.add.text(
            640,
            360,
            "Follow the clues",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(-0.89, 3.5);

        this.add.text(
            640,
            360,
            "Find them all within the time limit",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(0.09, 0);

        this.add.text(
            640,
            360,
            "Move using: W A S D  ||  Arrow keys",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(0.09, -3.5);

        this.add.text(
            640,
            360,
            "Pick up treasure: E",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(-0.67, -7.5);
        
    };

}

export default Instructions;

