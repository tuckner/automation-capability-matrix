import data from "data";
import { IBoard, ITask } from "types";
import { v4 as uuidv4 } from "uuid";

export const loadState = () => {
  const initialState = {
    board: data,
    active: data.find((item: IBoard, index: number) => index === 0),
  };
  try {
    const serializedState = localStorage.getItem("boarddata");
    // const serializedState = null;
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState).board;
  } catch (err) {
    return undefined;
  }
};

export const resetBoard = () => {
  try {
    localStorage.removeItem("boarddata");
    location.reload();
  } catch (err) {
    console.error("Error resetting local storage:", err);
  }
};

export const exportConfig = () => {
  try {
    const boardData = localStorage.getItem("boarddata");
    if (boardData) {
      const raw = JSON.parse(boardData).board
      const config = {"schema": 1, "config": raw}
      const acmexport = JSON.stringify(config, null, 2)
      const blob = new Blob([acmexport], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = uuidv4() + ".json";
      link.click();
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    console.error("Error saving state to JSON file:", err);
  }
};

export const importConfig = (file: File) => {
  try {
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = event.target?.result as string;
      const parsedData = JSON.parse(jsonData);
      localStorage.setItem("boarddata", JSON.stringify(parsedData));
    };
    reader.readAsText(file);
  } catch (err) {
    console.error("Error loading JSON file:", err);
  }
};

export const saveState = (state: any) => {
  try {
    const serializesState = JSON.stringify(state);
    localStorage.setItem("boarddata", serializesState);
  } catch (err) {
    return err
  }
};

export const  checkDuplicatedBoard = (values: IBoard, board: IBoard[]) => {
  return board.some((el: IBoard) => el.name === values.name);
};

export const checkDuplicatedTask = (values: ITask, active: IBoard) => {
  let foundTask;

  active.columns.find((item) =>
    item.name === values.name
      ? item.tasks.find((t: ITask) =>
          t.name === values.name ? (foundTask = t) : null
        )
      : null
  );
  return foundTask !== undefined ? true : false;
};

export const randomColor = () => {
  const randomNumber = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomNumber}`;
};
