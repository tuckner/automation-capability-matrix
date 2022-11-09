import { createContext, ReactNode, useEffect, useState } from "react";
import { IBoard, AppContextType, IColumn, ITask } from "types";
import { boards } from "data";
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [board, setBoard] = useState<IBoard[]>([]);
  const [active, setIsActive] = useState<IBoard | any>([]);

  useEffect(() => {
    getInitialState();
  }, []);

  function getInitialState(currentItem?: IBoard) {
    if (localStorage.getItem("board") === null) {
      localStorage.setItem("board", JSON.stringify(boards));
    }
    const items = JSON.parse(localStorage.getItem("board") || "");
    setBoard(items);
    if (currentItem) {
      setIsActive(currentItem);
    } else {
      const initialitem = items.find(
        (item: IBoard, index: number) => index === 0
      );
      setIsActive(initialitem);
    }
  }

  return (
    <AppContext.Provider
      value={{ board, setBoard, active, setIsActive, getInitialState }}
    >
      {children}
    </AppContext.Provider>
  );
};
