/**
 * @jest-environment jsdom
 */

import "jest-canvas-mock";
import * as Phaser from "phaser";
import { SpriteClassMock, sceneMock } from "./__mocks__/phaserMock.js";
import Trap from "../src/Trap.js";

const player = {
	scene: sceneMock,
	x: 600,
	y: 600,
	sprite: "sadGuy",
	phaserObject: SpriteClassMock,
};

describe("Trap", () => {
	it("returns Trap object", () => {
		expect(Trap).toBeInstanceOf(Object);
	});
});
