var noop = function() {};

class SpriteClassMock {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.body = {
      setVelocity: noop,
      setVelocityY: noop,
      setVelocityX: noop,
    }
    this.play = noop;
    this.anims = {
      stop: noop
    }
  }

  setVelocityY() { return noop };
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
      addKey: () => { return { isDown: false }},
      createCursorKeys: () => { return {
        up: {
          isDown: false
        },
        right: {
          isDown: false
        },
        down: {
          isDown: false
        },
        left: {
          isDown: false
        },
      }}
    }
  }
}


export { SpriteClassMock, sceneMock };

