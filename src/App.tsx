import { useEffect, useState } from "react";
import Header from "components/Header";
import SideBar from "components/SideBar";
import Board from "components/Board";
import { MdVisibilityOff } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import {  Collapse } from "@chakra-ui/react";

function App() {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem("theme", "dark");
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
      <div className="w-full h-full">
        <Header />
        <div className="w-full h-screen">
          <div className={`absolute top-[75px] overflow-auto w-full`}>
            <div className={` h-[87vh]`}>
              {isMobile && (
                <Collapse in={show} animateOpacity>
                  <div
                    className={`z-20 h-screen fixed w-72 ${
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
                    show && isMobile ? "clamp(300px, 10vw, 500px)" : "0px",
                }}
                className={`z-0 h-auto py-4 mb-8 pr-8  ${
                  isMobile ? "pl-8" : "pl-8"
                }`}
              >
                <Board />
              </div>
            </div>
          </div>
        </div>

        <button
          aria-label="Visibilityoff"
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
// Add animation
