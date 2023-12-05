import * as fs from "fs";

const scratchcards = fs
  .readFileSync("src/day04/input")
  .toString("utf-8")
  .split("\n")
  .map((line) =>line.split(":")[1])
  .map((line) => {
    let winning = line.split("|")[0].split(" ").filter((number) => number !== "").map((number) => parseInt(number));
    let numbers = line.split("|")[1].split(" ").filter((number) => number !== "").map((number) => parseInt(number));
    let winningNumbers = numbers.filter((number) => {
      if (winning.includes(number)) {
        return number;
      }
    })    
    return Math.floor(Math.pow(2, winningNumbers.length - 1));
  }).reduce((a, b) => a + b, 0);


console.log("Part 1: " + scratchcards);