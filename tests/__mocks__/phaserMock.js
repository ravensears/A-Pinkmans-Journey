import { Physics } from "phaser";

var noop = function() {};
class SpriteClassMock {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
}

const sceneMock = {
  add: {
    existing: noop
  },
  physics: {
    world: {
      enableBody: noop
    }
  },
  input: {
    keyboard: {
      addKey: noop,
      createCursorKeys: noop
    }
  }
}


export { SpriteClassMock, sceneMock };

