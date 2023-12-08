import * as fs from "fs";

const input = fs.readFileSync("src/day05/input").toString("utf-8").split("\n");

const seeds = input[0]
  .replace("seeds:", "")
  .trim()
  .split(" ")
  .map((number) => parseInt(number))
  .sort();

const seedsPart2 = input[0]
  .replace("seeds:", "")
  .trim()
  .split(" ")
  .map((number) => parseInt(number));

const seedToSoil: number[][] = getMapping("seed-to-soil map:");
const soilToFertilizer: number[][] = getMapping("soil-to-fertilizer map:");
const fertilizerToWater: number[][] = getMapping("fertilizer-to-water map:");
const waterToLight: number[][] = getMapping("water-to-light map:");
const lightToTemperature: number[][] = getMapping("light-to-temperature map:");
const temperatureToHumidity: number[][] = getMapping(
  "temperature-to-humidity map:"
);
const humidityToLocation: number[][] = getMapping("humidity-to-location map:");

function getLocation(seed: number) {
  return Array.of(seed)
    .map((seed) => {
      let mapped = findDestinationCategory(seed, seedToSoil);
      return mapped;
    })
    .map((item) => {
      let mapped = findDestinationCategory(item, soilToFertilizer);
      return mapped;
    })
    .map((item) => {
      let mapped = findDestinationCategory(item, fertilizerToWater);
      return mapped;
    })
    .map((item) => {
      let mapped = findDestinationCategory(item, waterToLight);
      return mapped;
    })
    .map((item) => {
      let mapped = findDestinationCategory(item, lightToTemperature);
      return mapped;
    })
    .map((item) => {
      let mapped = findDestinationCategory(item, temperatureToHumidity);
      return mapped;
    })
    .map((item) => {
      let mapped = findDestinationCategory(item, humidityToLocation);
      return mapped;
    });
}

function getLocations(seeds: number[]) {
  return seeds.map((seed) => getLocation(seed)[0]);
}

function findDestinationCategory(sourceCategory: number, array: number[][]) {
  for (let i = 0; i < array.length; i++) {
    if (
      sourceCategory >= array[i][1] &&
      sourceCategory < array[i][1] + array[i][2]
    ) {
      return array[i][0] + (sourceCategory - array[i][1]);
    }
  }
  return sourceCategory;
}

function getMapping(header: string): number[][] {
  let array: number[][] = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i].includes(header)) {
      let j = i + 1;
      while (j < input.length && input[j].trim() !== "") {
        array.push(
          input[j]
            .trim()
            .split(" ")
            .map((number) => parseInt(number))
        );
        j++;
      }
      break;
    }
  }
  array.sort((a, b) => a[1] - b[1]);
  return array;
}

let locationsPart1 = getLocations(seeds);
console.log("Part 1: " + Math.min(...locationsPart1));

// let lowestLocationPart2: number;
// for (let i = 0; i < seedsPart2.length; i += 2) {
//   let start = seedsPart2[i];
//   let range = seedsPart2[i + 1];
//   console.log("start: " + start + ", range: " + range);
//   let currentLocation;
//   for (let j = 0; j < range; j++) {
//     let seed = start + j;
//     currentLocation = getLocation(seed);
//     if (lowestLocationPart2 === undefined) {
//       lowestLocationPart2 = currentLocation;
//     }
//     if (currentLocation < lowestLocationPart2) {
//       lowestLocationPart2 = currentLocation;
//     }
//     if (j % 1000000 === 0) {
//       console.log("seed: " + seed + ", location: " + currentLocation);
//     }
//   }
// }
// console.log("Part 2: " + lowestLocationPart2);
