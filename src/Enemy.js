import Entity from "./Entity.js"

class Enemy extends Entity{
    constructor(scene, x, y, textureKey, damage, type, speed){
        super(scene,x,y,textureKey,'Enemy')
    
        const anims = scene.anims
        console.log(scene.anims)
        const animFrameRate = 4
        this.textureKey = textureKey

        anims.create({
        key: 'enemy-left',
			frames: anims.generateFrameNames('this.textureKey', {
				prefix: 'walk-left-',
				suffix: '.png',
				start: 1,
				end: 3, 
				zeroPad: 2
			}),
			frameRate: animFrameRate,
			repeat: -1 
        })

        anims.create({
            key: 'enemy-right',
                frames: anims.generateFrameNames('this.textureKey', {
                    prefix: 'walk-right-',
                    suffix: '.png',
                    start: 1,
                    end: 3, 
                    zeroPad: 2
                }),
                frameRate: animFrameRate,
                repeat: -1 
            })
        anims.create({
            key: 'enemy-up',
                frames: anims.generateFrameNames('this.textureKey', {
                    prefix: 'walk-up-',
                    suffix: '.png',
                    start: 1,
                    end: 3, 
                    zeroPad: 2
                }),
                frameRate: animFrameRate,
                repeat: -1 
            })

        anims.create({
            key: 'enemy-down',
                frames: anims.generateFrameNames('this.textureKey', {
                    prefix: 'walk-down-',
                    suffix: '.png',
                    start: 1,
                    end: 3, 
                    zeroPad: 2
                }),
                frameRate: animFrameRate,
                repeat: -1 
            })
        this.anims.play('enemy-down')
    } //end constructor

    update(){

    }
} // end class

export default Enemy;