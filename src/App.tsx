import { useEffect, useState } from "react";
import Header from "components/Header";
import SideBar from "components/SideBar";
import Board from "components/Board";
import { MdVisibilityOff } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from "@chakra-ui/react";
import { motion } from "framer-motion"

function App() {
  const [show, setShow] = useState<boolean>(true);

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
  }, []);

  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });

  return (
    <>
      <div className="w-full ">
        <Header />
        <div className={`absolute top-[75px] overflow-auto w-full`}>
          <div className={`transition duration-500 ease-in-out h-[87vh]`}>
            {isMobile && (
              <Collapse in={show} animateOpacity>
                <div
                  className={` h-screen fixed w-72  ${
                    show ? "block" : "hidden"
                  }`}
                >
                  <SideBar setShow={setShow} />
                </div>
              </Collapse>
            )}

            <div
              style={{
                marginLeft:
                  show && isMobile
                    ? "clamp(300px, 10vw, 500px)"
                    : "0px",
              }}
              className={` h-[33rem] py-4 mb-8 pr-8 transition duration-700 ${
                isMobile ? "pl-8" : "pl-8"
              }`}
            >
              <Board />
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
    </>
  );
}

export default App;

// todo
// drag and drop
// //refactor getinitial
// //check the implication of using context, could props be used for this
//// learn redux with this appllication
// use Animation where necessary
// //review codes and refactor were necessary
//// review file structure
// // Add confirmation popup for deleteorcancel
// //how do you update your object
//// work on view
// //check duplicates
// // add alert popup for duplicate item
// fix header issh with  create new board
