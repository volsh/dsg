import { useMemo, useState } from "react";
import shuffleArray from "../../utils/shuffleArray";
import createNumbersArray from "../../utils/createNumbersArray";
import createTwoDimentionArray from "../../utils/createTwoDimentionArray";

import styles from "./styles.module.scss";
import Block from "../Block/Block";
import getTwoDimentionPosition from "../../utils/getTwoDimentionPosition";
import canMove from "../../utils/canMove";

const initialArr = createNumbersArray(9);

const Puzzle = () => {
  const [blocks, setBlocks] = useState(shuffleArray(initialArr));

  const twoDimBlocks = useMemo(() => {
    return createTwoDimentionArray(blocks, 3);
  }, [blocks]);
  const checkComplete = useMemo(() => {
    return blocks.every((value, index) => value === index + 1);
  }, [blocks]);
  const emptyPosition = useMemo(() => {
    const positionInArray = blocks.findIndex((block) => block == 9);
    return getTwoDimentionPosition(positionInArray, 3);
  }, [blocks]);

  const shuffleBlocks = () => {
    setBlocks(shuffleArray(initialArr));
  };

  const onDragStart = (ev: DragEvent, rowIndex: number, colIndex: number) => {
    ev.dataTransfer?.setData("position", JSON.stringify([rowIndex, colIndex]));
  };

  const onClick = (ev: DragEvent, rowIndex: number, colIndex: number) => {
    const { row, col } = emptyPosition;
    if (canMove({ row: rowIndex, col: colIndex }, emptyPosition)) {
      const oldIndex = row * 3 + col;
      const newIndex = rowIndex * 3 + colIndex;
      const updatedBlocks = [...blocks];
      const temp = updatedBlocks[oldIndex];
      updatedBlocks[oldIndex] = updatedBlocks[newIndex];
      updatedBlocks[newIndex] = temp;

      setBlocks(updatedBlocks);
    }
  };

  const onDrop = (ev: DragEvent) => {
    let position = ev.dataTransfer?.getData("position");
    if (position) {
      try {
        const positionArr = JSON.parse(position);
        const { row, col } = emptyPosition;
        if (
          canMove({ row: positionArr[0], col: positionArr[1] }, emptyPosition)
        ) {
          const oldIndex = row * 3 + col;
          const newIndex = positionArr[0] * 3 + positionArr[1];
          const updatedBlocks = [...blocks];
          const temp = updatedBlocks[oldIndex];
          updatedBlocks[oldIndex] = updatedBlocks[newIndex];
          updatedBlocks[newIndex] = temp;

          setBlocks(updatedBlocks);
        }
      } catch (err) {}
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.puzzle}>
        {twoDimBlocks.map((row, rowIndex) => {
          return (
            <div key={rowIndex.toString()} className={styles["block-row"]}>
              {row.map((number: number, colIndex: number) => {
                return (
                  <Block
                    key={number.toString()}
                    number={number}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    onClick={onClick}
                    onDragStart={onDragStart}
                    onDrop={onDrop}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <button onClick={shuffleBlocks}>shuffle</button>
      {checkComplete && <p className={styles.complete}>Complete!</p>}
    </div>
  );
};

export default Puzzle;
