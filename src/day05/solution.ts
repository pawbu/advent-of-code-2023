import * as fs from "fs";

const input = fs
  .readFileSync("src/day05/input")
  .toString("utf-8")
  .split("\n");

const seeds = input[0].replace("seeds:", "").trim().split(" ")
  .map((number) => parseInt(number)).sort();

const seedToSoil : number[][] = getMapping("seed-to-soil map:");
const soilToFertilizer : number[][] = getMapping("soil-to-fertilizer map:");
const fertilizerToWater : number[][] = getMapping("fertilizer-to-water map:");
const waterToLight : number[][] = getMapping("water-to-light map:");
const lightToTemperature : number[][] = getMapping("light-to-temperature map:");
const temperatureToHumidity : number[][] = getMapping("temperature-to-humidity map:");
const humidityToLocation : number[][] = getMapping("humidity-to-location map:");

let lowestLocation = Math.min(...seeds.map((seed) => {
  let mapped = findDestinationCategory(seed, seedToSoil);
  console.log("seed to soil: " + seed + " -> " + mapped);
  return mapped;
}).map((item) => {
  let mapped = findDestinationCategory(item, soilToFertilizer);
  console.log("soil to fertilizer: " + item + " -> " + mapped);
  return mapped;
}).map((item) => {
  let mapped = findDestinationCategory(item, fertilizerToWater);
  console.log("fertilizer to water: " + item + " -> " + mapped);
  return mapped;
}).map((item) => {
  let mapped = findDestinationCategory(item, waterToLight);
  console.log("water to light: " + item + " -> " + mapped);
  return mapped;
}).map((item) => {
  let mapped = findDestinationCategory(item, lightToTemperature);
  console.log("light to temperature: " + item + " -> " + mapped);
  return mapped;
}).map((item) => {
  let mapped = findDestinationCategory(item, temperatureToHumidity);
  console.log("temperature to humidity: " + item + " -> " + mapped);
  return mapped;
}).map((item) => {
  let mapped = findDestinationCategory(item, humidityToLocation);
  console.log("humidity to location: " + item + " -> " + mapped);
  return mapped;
}));


function findDestinationCategory(sourceCategory: number, array: number[][]) {
  for (let i = 0; i < array.length; i++) {
    if (sourceCategory >= array[i][1] && sourceCategory < (array[i][1] + array[i][2])) {
      return array[i][0] + (sourceCategory - array[i][1]);
    }
  }
  return sourceCategory;
}

function getMapping(header: string): number[][] {  
  let array : number[][]= [];
  for (let i = 0; i < input.length; i++) {
    if (input[i].includes(header)) {
      let j = i + 1;
      while (j < input.length && input[j].trim() !== "") {
        array.push(input[j].trim().split(" ").map((number) => parseInt(number)));
        j++;
      }
      break;
    }
  }
  array.sort((a, b) => a[1] - b[1]);
  return array;
}


console.log("Part 1: " + lowestLocation);