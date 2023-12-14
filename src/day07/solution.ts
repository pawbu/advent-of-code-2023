import * as fs from "fs";

const hands = fs.readFileSync("src/day07/input").toString("utf-8").split("\n");

hands.sort((a, b) => {
  let strengthA = calculateStrength(a.substring(0, 5));
  let strengthB = calculateStrength(b.substring(0, 5));
  if (strengthA === strengthB) {
    // console.log(
    //   "equal strength: " +
    //     strengthA +
    //     "a:" +
    //     a.substring(0, 5) +
    //     ", b:" +
    //     b.substring(0, 5)
    // );
    for (let i = 0; i < a.length; i++) {
      let result = compareCards(a[i], b[i]);
      // console.log("i: " + i + ", result: " + result);
      if (result !== 0) {
        return result;
      }
    }
  }
  return strengthA - strengthB;
});
let totalWinnings = hands
  .map((hand) => {
    console.log(hand);
    return parseInt(hand.split(" ")[1]);
  })
  .map((bid, index) => bid * (index + 1))
  .reduce((a, b) => a + b, 0);

console.log("Part 1: " + totalWinnings);

function calculateStrength(hand: string) {
  const cards = hand.split("");
  console.log(cards);
  const cards_set = new Set(cards);
  console.log(cards_set);
  // high card
  if (cards_set.size === 5) {
    return 1;
  }
  // five of a kind
  if (cards_set.size === 1) {
    return 7;
  }
  //one pair
  if (cards_set.size === 4) {
    return 2;
  }
  if (cards_set.size === 3) {
    let count = [];
    for (let card of cards_set) {
      count.push(cards.filter((c) => c === card).length);
    }
    // console.log(count);
    if (count.includes(3)) {
      // three of a kind
      return 4;
    } else {
      // two pair
      return 3;
    }
  }
  if (cards_set.size === 2) {
    let count = [];
    for (let card of cards_set) {
      count.push(cards.filter((c) => c === card).length);
    }
    if (count.includes(4)) {
      // four of a kind
      return 6;
    } else {
      // full house
      return 5;
    }
  }
}
function compareCards(a: string, b: string): number {
  if (a === b) {
    return 0;
  }
  if (isNaN(parseInt(a)) && !isNaN(parseInt(b))) {
    return 1;
  }
  if (!isNaN(parseInt(a)) && isNaN(parseInt(b))) {
    return -1;
  }
  if (isNaN(parseInt(a)) && isNaN(parseInt(b))) {
    if (a === "A" && b !== "A") {
      return 1;
    }
    if (b === "A" && a !== "A") {
      return -1;
    }
    if (a === "K" && b !== "K") {
      return 1;
    }
    if (b === "K" && a !== "K") {
      return -1;
    }
    if (a === "Q" && b !== "Q") {
      return 1;
    }
    if (b === "Q" && a !== "Q") {
      return -1;
    }
    if (a === "J" && b !== "J") {
      return 1;
    }
    if (b === "J" && a !== "J") {
      return -1;
    }
    if (a === "T" && b !== "T") {
      return 1;
    }
    if (b === "T" && a !== "T") {
      return -1;
    }
    throw "shouldn't get here";
  } else {
    return parseInt(a) - parseInt(b);
  }
}
