import data from "data";
import { IBoard, ITask } from "types";

export const loadState = () => {
  const initialState = {
    board: data,
    active: data.find((item: IBoard, index: number) => index === 0),
  };
  try {
    const serializedState = localStorage.getItem("boarddata");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState).board;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializesState = JSON.stringify(state);
    localStorage.setItem("boarddata", serializesState);
  } catch (err) {}
};

export const checkDuplicatesBoard = (values: IBoard, board: IBoard[]) => {
  return board.some((el: IBoard) => el.name === values.name);
};

export const checkDuplicatesTask = (values: ITask, active: IBoard) => {
  let foundTask;

  active.columns.find((item) =>
    item.name === values.status
      ? item.tasks.find((t: ITask) =>
          t.title === values.title ? (foundTask = t) : null
        )
      : null
  );
  return foundTask !== undefined ? true : false;
};

export const randomColor = () => {
  const randomNumber = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomNumber}`;
};
