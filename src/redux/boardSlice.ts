import { createSlice } from "@reduxjs/toolkit";
import { IBoard, IColumn, ISubTask, ITask, SliceState } from "types";
import { loadState } from "utilis";
import type { RootState } from "./store";

const loadedBoard = loadState();
const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: loadedBoard.board,
    active: loadedBoard.active,
  },
  reducers: {
    activeItem: (state, action) => {
      if (action.type === "board/activeItem") {
        return {
          ...state,
          active: state.board.find(
            (item: IBoard, index: number) => item.name === action.payload.name
          ),
        };
      }
    },
    deleteBoard: (state, action) => {
      const filteredBoard: IBoard[] = state.board.filter(
        (item: any) => item.name !== action.payload.name
      );
      return {
        board: filteredBoard,
        active: filteredBoard.find(
          (item: IBoard, index: number) => index === 0
        ),
      };
    },
    addBoard: (state, action) => {
      state.board.push(action.payload);
      state.active = state.board.find(
        (item: IBoard, index: number) => item.name === action.payload.name
      );
    },
    editBoard: (state, action) => {
      const updatedBoard: IBoard[] = state.board.map((item: IBoard) =>
        item.name === state.active.name ? { ...item, ...action.payload } : item
      );
      return {
        board: updatedBoard,
        active: updatedBoard.find(
          (item: IBoard, index: number) => item.name === action.payload.name
        ),
      };
    },
    addTask: (state, action) => {
      state.board.find((item: IBoard) =>
        item.name === state.active.name
          ? item.columns.find((o: IColumn) =>
              o.name === action.payload.status
                ? o.tasks.push(action.payload)
                : null
            )
          : null
      );
      state.active = state.board.find(
        (item: IBoard, index: number) => item.name === state.active.name
      );
    },

    deleteTask: (state, action) => {
      state.board.find((item: IBoard) =>
        item.name === state.active.name
          ? item.columns.find((o: IColumn) =>
              o.name === action.payload.status
                ? (o.tasks = o.tasks.filter(
                    (s: any) => s.title !== action.payload.title
                  ))
                : null
            )
          : null
      );
      state.active = state.board.find(
        (item: IBoard, index: number) => item.name === state.active.name
      );
    },
    editTask: (state, action) => {
      state.board.find((item: IBoard) =>
        item.name === state.active.name
          ? item.columns.find((o: IColumn) =>
              o.name === action.payload.values.status
                ? o.tasks.find((s: ITask) =>
                    s.title === action.payload.tasks.title
                      ? ((s.title = action.payload.values.title),
                        (s.description = action.payload.values.description),
                        (s.status = action.payload.values.status),
                        (s.subtasks = action.payload.values.subtasks))
                      : s
                  )
                : null
            )
          : null
      );
      state.active = state.board.find(
        (item: IBoard, index: number) => item.name === state.active.name
      );
    },
    isCompletedToggle: (state, action) => {
      console.log(action.payload);
      state.board.find((item: IBoard) =>
        item.name === state.active.name
          ? item.columns.find((o: IColumn) =>
              o.name === action.payload.tasks.status
                ? o.tasks.find((s: ITask) =>
                    s.title === action.payload.tasks.title
                      ? s.subtasks.map((t: ISubTask, i: number) =>
                          i === action.payload.id
                            ? (t.isCompleted =
                                action.payload.updatedCheckedState[
                                  action.payload.id
                                ])
                            : t
                        )
                      : s
                  )
                : null
            )
          : null
      );
      state.active = state.board.find(
        (item: IBoard, index: number) => item.name === state.active.name
      );
    },
  },
});
export const {
  activeItem,
  isCompletedToggle,
  deleteBoard,
  editBoard,
  addBoard,
  editTask,
  addTask,
  deleteTask,
} = boardSlice.actions;
export const appData = (state: RootState) => state.board;
export default boardSlice.reducer;

// i learnt mutablilty and immutabilty of redux
// you can't use both. you are using return(regular) or Immer method
