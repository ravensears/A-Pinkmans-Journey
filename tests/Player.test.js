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
    this.keyboard = {addKey: "A"}
  }
}

describe("Player class instance", () => {

  // it("Phaser mock works", () => {
    
  //   const player = new Player("Game", 600, 600, "sadGuy", Phaser)
  //   expect(player).toBeInstanceOf(Player);
  // });
  
  it("returns Phaser object", () => {
    expect(Phaser).toBeInstanceOf(Object)
  });

  describe("#createPlayer", () => {
    const player = new Player("Game", 600, 600, "sadGuy", Phaser)
    it("returns spriteObject", () => {
      expect(player.createObject).toEqual("this.spriteObject")
    });

    it("returns Phaser object", () => {
      expect(player).toBeInstanceOf(Player)
    });
});
});