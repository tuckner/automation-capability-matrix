export interface IBoard {
  id:string,
  name: string;
  columns: {
    id:string,
    name: string;
    tasks: {
      id:string,
      name: string;
      description: string;
      category: string;
      stats: IStat[];
      techniques: string[];
      subtasks: {  id:string,
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
}

export interface IStat {
  name: string;
  value: string;
}

export interface IColumn {
  name: string;
  id:string,
  tasks: {
    id:string,
    name: string;
    description: string;
    category: string;
    stats: IStat[];
    techniques: string[];
    subtasks: {
      id:string,
      title: string;
      isCompleted: boolean;
    }[];
  }[];
}

export interface ITask {
  id:string,
  name: string;
  description: string;
  category: string;
  stats: IStat[];
  techniques: string[];
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
