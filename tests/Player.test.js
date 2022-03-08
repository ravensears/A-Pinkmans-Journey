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

  describe("#createPlayer", () => {
    const player = new Player(sceneMock, 600, 600, "sadGuy", SpriteClassMock)

    it("creates Sprite Object", () => {
      expect(player.createPlayer()).toBeInstanceOf(SpriteClassMock)
    });

    it("creates Player object", () => {
      expect(player).toBeInstanceOf(Player)
    });
});
});