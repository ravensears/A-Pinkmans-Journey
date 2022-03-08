import { Scene } from 'phaser';
import Game from '../src/Game.js';

describe("Game", () => {
  describe('create', function() {
    it('should call Phaser.Sprite', function() {
      spyOn(Phaser.Sprite, 'call');

      var player = new Player();

      expect(Phaser.Sprite.call).toHaveBeenCalledWith(player);
    });
  });
});
