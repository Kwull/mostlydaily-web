// Run: node tools/sim.test.js   Checks the "Miss a day" rules (the same as the app's MostlyCore engine).
const assert = require("assert");
const { evaluate } = require("../assets/site.js");
const week = (s) => s.split("").map((c) => ({ d: "done", m: "miss", r: "rest" })[c]);
let r = evaluate(week("ddddddd"));
assert.deepStrictEqual([r.score, r.level, r.run, r.streak], [100, 3, 67, 67]);
r = evaluate(week("dddmddd"));
assert.deepStrictEqual([r.level, r.run, r.streak], [3, 67, 3]);          // one miss: still Mostly, the run keeps going
r = evaluate(week("ddmmddd"));
assert.deepStrictEqual([r.run, r.streak], [3, 3]);                       // two in a row end the run
r = evaluate(week("dddrddd"));
assert.deepStrictEqual([r.score, r.misses, r.rests, r.run], [100, 0, 1, 67]);  // rest is not a miss
console.log("sim ok", evaluate(week("dddmddd")));
