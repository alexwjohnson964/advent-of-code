const test = (result: any, expected: any) => {
  if (result === expected) {
    console.log("(✔)");
  } else {
    console.log(`(X)\n  Expected: ${expected}\n  Received: ${result} `);
  }
};

import * as fs from "fs";

/**
 * Finds the maximum joltage for a bank of batteries,
 * defined as the maximum two-digit integer that can be
 * formed by concatenating two in-order digits of the input.
 * @param bank the batteries for which to compute joltage
 */
function getMaxJoltage(bank: string): number {
  let start = 0;
  let end = 1;
  let maxLastDigit = -1;

  while (end < bank.length) {
    const firstDigit = Number(bank[start]);
    const lastDigit = Number(bank[end]);
    if (lastDigit > firstDigit && end < bank.length - 1) {
      start = end;
      end = start + 1;
      maxLastDigit = Number(bank[end]); // Reset max when start pointer moves
      continue;
    }
    if (lastDigit > maxLastDigit) {
      maxLastDigit = lastDigit;
    }
    end++;
  }
  return Number(bank[start] + maxLastDigit);
}

/**
 * Finds the maximum joltage for a bank of batteries
 * in emergency mode, where joltage is a 12-digit integer
 * @param bank the batteries for which to compute joltage
 */
function getEmergencyMaxJoltage(bank: string): number {
  let maxStartDigit = -1;
  let startIndex = -1;
  let start = 0;
  let excessBatteries = bank.length - 12;

  while (start < excessBatteries) {
    let digit = Number(bank[start]);
    if (digit > maxStartDigit) {
      maxStartDigit = digit;
      startIndex = start;
    }
    start++;
  }
  let adjustedBank = bank.slice(startIndex);
  excessBatteries -= startIndex
  while (excessBatteries > 0) {
    let c = 0;
    let n = c + 1;
    let removed = false;
    while (n < adjustedBank.length && excessBatteries > 0) {
      const current = Number(adjustedBank[c]);
      const next = Number(adjustedBank[n]);
      if (next > current) {
        adjustedBank = adjustedBank.slice(0, c) + adjustedBank.slice(c + 1);
        excessBatteries--;
        removed = true;
        break;
      }
      c++; n++;
    }
    if (!removed) {
      adjustedBank = adjustedBank.slice(0, n - 1);
      excessBatteries--;
    }
  }

  return Number(adjustedBank);
}

function partOne(lines: Array<string>) {
  console.log('Part One\n Total:', lines.reduce((a,c) => {
    return getMaxJoltage(c) + a;
  }, 0))
}

function partTwo(lines: Array<string>) {
    console.log('Part Two\n Total:', lines.reduce((a,c) => {
    return getEmergencyMaxJoltage(c) + a;
  }, 0))
}

const file = fs.readFileSync("input3.txt", "utf-8");
const lines = file.split("\n");
partOne(lines);
partTwo(lines);
