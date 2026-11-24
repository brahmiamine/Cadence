import test from "node:test";
import assert from "node:assert/strict";
import { allowAttempt, clientIp } from "../src/lib/rate-limit.ts";

test("bloque après la limite puis reprend après expiration", () => {
  const t = 1_000_000;
  for (let i = 0; i < 3; i++) assert.equal(allowAttempt("k", 3, 1000, t), true);
  assert.equal(allowAttempt("k", 3, 1000, t), false);
  assert.equal(allowAttempt("k", 3, 1000, t + 1001), true);
});
test("clientIp prend la dernière valeur de X-Forwarded-For", () => {
  assert.equal(clientIp(new Headers({ "x-forwarded-for": "6.6.6.6, 1.2.3.4" })), "1.2.3.4");
  assert.equal(clientIp(undefined), "unknown");
});
