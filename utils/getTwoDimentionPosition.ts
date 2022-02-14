function getTwoDimentionPosition(position: number, size: number) {
  return { row: Math.floor(position / size), col: position % size };
}

export default getTwoDimentionPosition;
