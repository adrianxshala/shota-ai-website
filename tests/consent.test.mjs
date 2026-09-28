import assert from "node:assert/strict";
import test from "node:test";
import { CONSENT_MAX_AGE, ESSENTIAL_ONLY, parseConsent, serializeConsent } from "../app/components/consent.ts";

const now = 1_800_000_000_000;

test("accept, reject and granular choices round-trip without changing permissions", () => {
  for (const analytics of [false, true]) {
    for (const marketing of [false, true]) {
      const choice = { necessary: true, analytics, marketing };
      assert.deepEqual(parseConsent(serializeConsent(choice, now), now), choice);
    }
  }
});

test("missing and malformed data never grant optional consent", () => {
  for (const value of ["", "%broken", "null", "[]", "{}", "true", "undefined"]) {
    assert.equal(parseConsent(value, now), null);
  }
});

test("consent expires at 180 days and future timestamps are rejected", () => {
  const value = serializeConsent(ESSENTIAL_ONLY, now);
  assert.deepEqual(parseConsent(value, now + CONSENT_MAX_AGE * 1000 - 1), ESSENTIAL_ONLY);
  assert.equal(parseConsent(value, now + CONSENT_MAX_AGE * 1000), null);
  assert.equal(parseConsent(value, now - 1), null);
});

test("unsupported versions and invalid category values require a new choice", () => {
  const valid = JSON.parse(decodeURIComponent(serializeConsent(ESSENTIAL_ONLY, now)));
  for (const change of [{ version: 0 }, { necessary: false }, { analytics: "true" }, { marketing: 1 }, { savedAt: null }, { savedAt: "1800000000000" }]) {
    assert.equal(parseConsent(encodeURIComponent(JSON.stringify({ ...valid, ...change })), now), null);
  }
});
