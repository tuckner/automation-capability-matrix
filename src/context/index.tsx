import { createContext, ReactNode, useState } from "react";
import {IBoard, AppContextType,ThemeContextType, Theme } from "types";
import { boards } from "data";
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [board, setBoard] = useState<IBoard[]>(boards);
  const [platform, setPlatform] = useState<IBoard>(boards[0]);
  const [marketing, setMarketing] = useState<IBoard>(boards[1]);
  const [roadmap, setroadmap] = useState<IBoard>(boards[2]);

  return (
    <AppContext.Provider value={{ board, platform, marketing, roadmap }}>
      {children}
    </AppContext.Provider>
  );
};

// add theme here too
