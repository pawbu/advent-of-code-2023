import * as fs from "fs";

const calibrationValues = fs
  .readFileSync("src/day01/input")
  .toString("utf-8")
  .split("\n")
  .map((line) => {
    console.log(line);
    if (line) {
      const digits = line.match(/\d/g);

      if (digits) {
        let firstDigit = parseInt(digits[0]);
        let lastDigit = parseInt(digits[digits.length - 1]);
        console.log(firstDigit, lastDigit);
        return firstDigit * 10 + lastDigit;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  })
  .reduce((a, b) => a + b, 0);

console.log("Part 1: " + calibrationValues);
