/**
 * @jest-environment jsdom
 */

import 'jest-canvas-mock';
import Phaser from 'phaser';
import Player from '../src/Player.js';
// jest.mock('phaser');

jest.mock('phaser', () => {
  return jest.fn().mockImplementation(
    (scene, x, y, sprite) => {
      this. scene = scene;
      this.x = x;
      this.y = y;
      this.sprite = sprite;
    }
  )
})



describe("Game class instance", () => {
  beforeEach(() => {
    Phaser.mockClear();
  })

  it("Phaser mock works", () => {
    const player = new Player("Game", 600, 600, "sadGuy")
    expect(Phaser).toHaveBeenCalledTimes(1);
  });
});