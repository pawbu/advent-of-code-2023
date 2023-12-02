import * as fs from "fs";

const max_red: number = 12;
const max_green: number = 13;
const max_blue: number = 14;

const sumOfIds = fs
  .readFileSync("src/day02/input")
  .toString("utf-8")
  .split("\n")
  .map((line) => {
    let game_id = parseInt(line.split(":")[0].split(" ")[1]);
    let sets = line.split(":")[1].split(";");
    let possible = sets.every(set => {
      let pairs = set.split(",");
      return pairs.every(pair => {
        let number = pair.trimStart().split(" ")[0];
        let color = pair.trimStart().split(" ")[1];
        if (color === "red" && parseInt(number) > max_red) {
          return false;
        } else if (color === "green" && parseInt(number) > max_green) {
          return false;
        } else if (color === "blue" && parseInt(number) > max_blue) {
          return false;
        } else {
          return true;
        }
      });
    });
    if (!possible) {
      return 0;
    }
    return game_id;    
  })
  .reduce((a, b) => a + b, 0);

console.log("Part 1: " + sumOfIds);
