import { hello } from "../src";

test("It should run", () => {
  expect(hello()).toBe("Hello world!");
});
