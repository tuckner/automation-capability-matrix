import { createSlice } from "@reduxjs/toolkit";
import { IBoard, IColumn, ISubTask, ITask } from "types";
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
            (item: IBoard) => item.id === action.payload.id
          ),
        };
      }
    },
    deleteBoard: (state, action) => {
      const filteredBoard: IBoard[] = state.board.filter(
        (item: IBoard) => item.id !== action.payload.id
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
        (item: IBoard) => item.id === action.payload.id
      );
    },
    editBoard: (state, action) => {
      const updatedBoard: IBoard[] = state.board.map((item: IBoard) =>
        item.id === state.active.id ? { ...item, ...action.payload } : item
      );
      return {
        board: updatedBoard,
        active: updatedBoard.find(
          (item: IBoard) => item.id === action.payload.id
        ),
      };
    },
    addTask: (state, action) => {
      state.board.find((item: IBoard) =>
        item.id === state.active.id
          ? item.columns.find((o: IColumn) =>
              o.name === action.payload.updatedTasks.status
                ? o.tasks.splice(
                    action.payload.position,
                    0,
                    action.payload.updatedTasks
                  )
                : null
            )
          : null
      );
      state.active = state.board.find(
        (item: IBoard) => item.id === state.active.id
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
        (item: IBoard) => item.id === state.active.id
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
        (item: IBoard) => item.id === state.active.id
      );
    },
    isCompletedToggle: (state, action) => {
      state.board.find((item: IBoard) =>
        item.name === state.active.name
          ? item.columns.find((o: IColumn) =>
              o.name === action.payload.tasks.status
                ? o.tasks.map((s: ITask) =>
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
        (item: IBoard) => item.id === state.active.id
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
