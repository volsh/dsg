function createNumbersArray(n: number) {
  return Array.from(Array(n).keys(), (x: number) => x + 1);
}

export default createNumbersArray;
