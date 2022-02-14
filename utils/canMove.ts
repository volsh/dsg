type positionType = { row: number; col: number };

function canMove(startPosition: positionType, endPosition: positionType) {
  const { row: startRow, col: startCol } = startPosition;
  const { row: endRow, col: endCol } = endPosition;
  return (
    (endRow == startRow &&
      (endCol == startCol - 1 || endCol == startCol + 1)) ||
    (endCol == startCol && (endRow == startRow - 1 || endRow == startRow + 1))
  );
}

export default canMove;
