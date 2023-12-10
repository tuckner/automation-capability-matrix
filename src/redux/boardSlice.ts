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
              o.name === action.payload.updatedTasks.category
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
      // Update the board by mapping over each board item
      state.board = state.board.map((boardItem: IBoard) => {
        // Check if the board item is the active one
        if (boardItem.name === state.active.name) {
          // Return a new board item with the updated columns
          return {
            ...boardItem,
            columns: boardItem.columns.map((column: IColumn) => {
              // Check if the column is the one where the task needs to be deleted
              if (column.name === action.payload.category) {
                // Return a new column with the task filtered out
                return {
                  ...column,
                  tasks: column.tasks.filter((task: ITask) => task.name !== action.payload.name)
                };
              }
              // Return the column unchanged if it's not the target column
              return column;
            })
          };
        }
        // Return the board item unchanged if it's not the active one
        return boardItem;
      });
    
      // Update the active state
      state.active = state.board.find(
        (item: IBoard) => item.id === state.active.id
      );
    },
    editTask: (state, action) => {
      // Create a new board array by mapping over each board item
      state.board = state.board.map((boardItem: IBoard) => {
        // Check if the board item is the active one
        if (boardItem.name === state.active.name) {
          // Return a new board item with updated columns
          return {
            ...boardItem,
            columns: boardItem.columns.map((column: IColumn) => {
              // Check if the column is the one containing the task to edit
              if (column.name === action.payload.values.category) {
                // Return a new column with updated tasks
                return {
                  ...column,
                  tasks: column.tasks.map((task: ITask) => {
                    // Check if the task is the one to edit
                    if (task.name === action.payload.tasks.name) {
                      // Return the updated task
                      return {
                        ...task,
                        name: action.payload.values.name,
                        description: action.payload.values.description,
                        category: action.payload.values.category,
                        subtasks: action.payload.values.subtasks,
                      };
                    }
                    // Return the task unchanged if it's not the one to edit
                    return task;
                  })
                };
              }
              // Return the column unchanged if it's not the target column
              return column;
            })
          };
        }
        // Return the board item unchanged if it's not the active one
        return boardItem;
      });
    
      // Update the active state to reflect the current state of the active board
      state.active = state.board.find(
        (item: IBoard) => item.id === state.active.id
      );
    },
    isCompletedToggle: (state, action) => {
      state.board.find((item: IBoard) =>
        item.name === state.active.name
          ? item.columns.find((o: IColumn) =>
              o.name === action.payload.tasks.category
                ? o.tasks.map((s: ITask) =>
                    s.name === action.payload.tasks.name
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
