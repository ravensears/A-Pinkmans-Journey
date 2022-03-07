/**
 * @jest-environment jsdom
 */

import 'jest-canvas-mock';
// import Phaser from 'phaser';
import Player from '../src/Player.js';

class Phaser {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    scene.add.existing = (something) => {};
  }

  // add(){

  // }

  // existing() {
  //   return true
  // }
}

describe("Game class instance", () => {

  it("Phaser mock works", () => {
    const player = new Player("Game", 600, 600, "sadGuy", Phaser)
    expect(player).toBeInstanceOf(Player);
  });
});