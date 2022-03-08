/**
 * @jest-environment jsdom
 */

import 'jest-canvas-mock';
import * as Phaser from 'phaser';
import { SpriteClassMock, sceneMock } from './__mocks__/phaserMock.js';
import Player from '../src/Player.js';


describe("Player class instance", () => {

  it("returns Phaser object", () => {
    expect(Phaser).toBeInstanceOf(Object)
  });

  describe("Creates Player in a Scene", () => {
    const player = new Player(sceneMock, 600, 600, "sadGuy", SpriteClassMock)

    it("creates Sprite Object", () => {
      expect(player.createPlayer()).toBeInstanceOf(SpriteClassMock)
    });

    it("creates Player object", () => {
      expect(player).toBeInstanceOf(Player)
    });
  });

  

  // describe("#updatePlayer", () => {
  //   it('calls the moveUp function', () => {
      
  //     const player = new Player(sceneMock, 600, 600, "sadGuy", SpriteClassMock)
  //     const moveUp = jest.spyOn(player, 'moveUp');
  //     player.forceUpdate()
  //     player.updatePlayer();
  //     expect(moveUp).toHaveBeenCalledTimes(1)
  //   })
  // })

   describe("#updatePlayer if key is pressed", () => {
    it('If up key pressed calls the moveUp function', () => {
      
      const player = new Player(sceneMock, 600, 600, "sadGuy", SpriteClassMock)
      // player.updatePlayer();
      player.keyW.isDown = false;
      expect(player.updatePlayer()).toEqual(player.moveUp())

      // this.spriteObject.body.setVelocityY(-180);
      // this.spriteObject.play("top", true);
    })
  })

  // describe("#updatePlayer", () => {
  //   it('calls the moveUp function', () => {
      
  //     const player = new Player(sceneMock, 600, 600, "sadGuy", SpriteClassMock)
  //     player.updatePlayer();
  //     expect(player.moveUp()).toHaveBeenCalledTimes(1)
  //   })
  // })

});

