import { FC } from "react";
import styles from "./styles.module.scss";

type blockProps = {
  number: number;
  rowIndex: number;
  colIndex: number;
  onDragStart: Function;
  onDrop: Function;
};

const Block: FC<blockProps> = ({
  number,
  rowIndex,
  colIndex,
  onDragStart,
  onDrop,
}) => {
  return (
    <div
      className={`${styles.block} ${number === 9 ? styles.empty : ""}`}
      draggable={number < 9}
      onDragStart={(ev) => onDragStart(ev, rowIndex, colIndex)}
      onDragOver={(ev) => {
        number < 9 ? null : ev.preventDefault();
      }}
      onDrop={(ev) => onDrop(ev, rowIndex, colIndex)}
    >
      {number < 9 ? number : ""}
    </div>
  );
};

export default Block;
