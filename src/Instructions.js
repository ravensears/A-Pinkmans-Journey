class Instructions extends Phaser.Scene {

	constructor() {
		super({
			key: "Instructions",
		});
	}

    preload () {
        this.load.image("newPinkman", "/sprites/new_pinkman.png");
        this.load.audio("wormhole", "/audio/wormholefx.mp3");
    }

    create ()
    {   
        this.wormholesfx = this.sound.add("wormhole");

        this.wormholesfx.play();
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.add.image(
            400, 300, "newPinkman")
            .setOrigin(0.0, 0.40).setScale(0.35);

        this.add.text(
            400, 
            300, 
            "Instructions",
            {
                font: "80px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(0.5, 2.75);

        this.input.once('pointerup', function () {this.scene.start("Game")}, this);

        this.add.text(
            400, 
            250, 
            "Click to start", 
            {
                font: "45px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(0.5, -5.5);

        this.add.text(
            400,
            300,
            "Follow the clues",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(2.5, 3.5);

        this.add.text(
            400,
            300,
            "Find them all within the time limit",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(1.20, 1);

        this.add.text(
            400,
            300,
            "Move using: W A S D  ||  Arrow keys",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(1.21, -1.5);

        this.add.text(
            400,
            300,
            "Pick up treasure: E",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(2.2, -4);

        this.add.text(
            400,
            300,
            "Watch out for traps!!",
            {
                font: "20px Source Sans Pro",
                fill: "#FFFFFF",
            }
        ).setOrigin(2, -6.5);
        
    };

}

export default Instructions;

