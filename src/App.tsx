import { useContext, useEffect, useState } from "react";
import Header from "components/Header";
import SideBar from "components/SideBar";
import Board from "components/Board";
import { MdVisibilityOff } from "react-icons/md";
import { AppContext } from "./context";
import { AppContextType, IBoard } from "./types";

function App() {
  const { board, active, setIsActive, getInitialState } = useContext(
    AppContext
  ) as AppContextType;

  const [show, setShow] = useState(true);


  
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
      

    getInitialState(active);
  }, [active]);

  return (
    <div className="w-full ">
      <Header title={active?.name} />
      <div className={`absolute top-[75px] overflow-auto w-full`}>
        <div
          className={`${
            !show && "-translate-x-72"
          } transition duration-500 ease-in-out h-[87vh]`}
        >
          <SideBar
            board={board}
            active={active}
            setIsActive={setIsActive}
            show={show}
            setShow={setShow}
          />
          <div className={`pt-4 pl-8 pl-80`}>
            <Board active={active} />
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setShow(true);
        }}
        className={` ${
          show ? "hidden" : "block"
        } cursor-pointer fixed bottom-10 rounded-r-full bg-primary p-4 w-12`}
      >
        {" "}
        <MdVisibilityOff />{" "}
      </button>
    </div>
  );
}

export default App;

// todo
// drag and drop
// refactor getinitial
// check the implication of using context, could props be used for this
// learn redux with this appllication
// use Animation where necessary
// responsiveness
// review codes and refactor were necessary
// review file structure
// Add confirmation popup for deleteorcancel
// how do you update your object
// work on view
