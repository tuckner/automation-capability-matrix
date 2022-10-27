export interface IBoard {
  name: string;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
}

export interface IColumn {
  name: string;
  tasks: {
    title: string;
    description: string;
    status: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  }[];
}

export interface ITask {
  title: string;
  description: string;
  status: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
}
export interface ISubTask {
  title: string;
  isCompleted: boolean;
}

export interface AppContextType {
  board: IBoard[];
  platform: IBoard;
  marketing: IBoard;
  roadmap: IBoard;
}
