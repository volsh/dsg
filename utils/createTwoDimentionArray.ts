function createTwoDimentionArray(arr: Array<any>, size: number) {
  const twoDimentionArr = [];
  for (let i = 0; i < arr.length; i += size) {
    twoDimentionArr.push(
      arr.slice(i, i + size > arr.length ? arr.length : i + size)
    );
  }
  return twoDimentionArr;
}

export default createTwoDimentionArray;
