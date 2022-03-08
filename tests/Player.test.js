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

   describe("#updatePlayer if key is pressed", () => {
    it('If up key pressed calls the moveUp function', () => {
      
      const player = new Player(sceneMock, 600, 600, "sadGuy", SpriteClassMock)
      const moveUpSpy = jest.spyOn(Player.prototype, 'moveUp');
      moveUpSpy.mockImplementation(() => {})
      player.keyW.isDown = true;
      player.updatePlayer();
      
      expect(moveUpSpy).toHaveBeenCalled();
    })

    it('If down key pressed calls the moveUp function', () => {
      
      const player = new Player(sceneMock, 600, 600, "sadGuy", SpriteClassMock)
      const moveDownSpy = jest.spyOn(Player.prototype, 'moveDown');
      moveDownSpy.mockImplementation(() => {})
      player.keyS.isDown = true;
      player.updatePlayer();
      
      expect(moveDownSpy).toHaveBeenCalled();
    })

    it('If left key pressed calls the moveLeft function', () => {
      
      const player = new Player(sceneMock, 600, 600, "sadGuy", SpriteClassMock)
      const moveLeftSpy = jest.spyOn(Player.prototype, 'moveLeft');
      moveLeftSpy.mockImplementation(() => {})
      player.keyA.isDown = true;
      player.updatePlayer();
      
      expect(moveLeftSpy).toHaveBeenCalled();
    })

    it('If right key pressed calls the moveRigth function', () => {
    
      const player = new Player(sceneMock, 600, 600, "sadGuy", SpriteClassMock)
      const moveRightSpy = jest.spyOn(Player.prototype, 'moveRight');
      moveRightSpy.mockImplementation(() => {})
      player.keyD.isDown = true;
      player.updatePlayer();
      
      expect(moveRightSpy).toHaveBeenCalled();
    })
  })

});

