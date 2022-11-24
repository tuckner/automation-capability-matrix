export interface IBoard {
  id:string,
  name: string;
  columns: {
    id:string,
    name: string;
    tasks: {
      id:string,
      title: string;
      description: string;
      status: string;
      subtasks: {  id:string,
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
}

export interface IColumn {
  name: string;
  id:string,
  tasks: {
    id:string,
    title: string;
    description: string;
    status: string;
    subtasks: {
      id:string,
      title: string;
      isCompleted: boolean;
    }[];
  }[];
}

export interface ITask {
  id:string,
  title: string;
  description: string;
  status: string;
  subtasks: {
    id:string,
    title: string;
    isCompleted: boolean;
  }[];
}

export interface ISubTask {
  id:string,
  title: string;
  isCompleted: boolean;
}

type SliceState = {
  board: IBoard[];
  active: IBoard;
};
