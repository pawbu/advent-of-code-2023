import * as fs from "fs";

const input = fs.readFileSync("src/day08/input").toString("utf-8").split("\n");

const instructions: string[] = input.shift().split("");
const re = /(?<currentNode>\w+) = \((?<leftNode>\w+), (?<rightNode>\w+)\)/;

const graph = new Map<string, Array<string>>();

input.forEach((line) => {
  let match = re.exec(line);
  if (match) {
    graph.set(match.groups.currentNode, [
      match.groups.leftNode,
      match.groups.rightNode,
    ]);
  }
});

let currentNode = "AAA";
let steps: number = 0;
while (currentNode !== "ZZZ") {
  instructions.forEach((instruction) => {
    if (instruction === "L") {
      currentNode = graph.get(currentNode)[0];
    } else if (instruction === "R") {
      currentNode = graph.get(currentNode)[1];
    }
    steps++;
  });
}

console.log("Part 1: " + steps);
