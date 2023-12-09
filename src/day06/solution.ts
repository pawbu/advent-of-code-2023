import * as fs from "fs";

const input = fs.readFileSync("src/day06/input").toString("utf-8").split("\n");

const times = input[0]
  .replace("Time: ", "")
  .replaceAll(" ", ",")
  .split(",")
  .filter((number) => number !== "")
  .map((number) => parseInt(number));

const distance = input[1]
  .replace("Distance: ", "")
  .replaceAll(" ", ",")
  .split(",")
  .filter((number) => number !== "")
  .map((number) => parseInt(number));

const part1 = times
  .map((time, i) => {
    let timeRange = Array.from(
      { length: time - 1 },
      (_value, index) => index + 1
    );
    let currentTime = time;
    let currentDistance = distance[i];
    let canWin = timeRange
      .map((time) => {
        let timeLeft = currentTime - time;
        let speed = time;
        let distance = timeLeft * speed;
        if (distance > currentDistance) {
          return true;
        } else return false;
      })
      .filter((value) => value === true).length;
    return canWin;
  })
  .reduce((a, b) => a * b, 1);

console.log("Part 1: " + part1);
