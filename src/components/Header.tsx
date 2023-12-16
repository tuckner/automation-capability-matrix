import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import AddBoard from "./Board/AddBoard";
import { useMediaQuery } from "react-responsive";
// import logoMobile from "../assets/logo-mobile.svg";
import AddTask from "./Board/AddTask";
import DeleteItem from "./DeleteItem";
// import Icon from "./Icon";
import Modal from "./Modal";
import Popup from "./Popup";
import { FiChevronDown } from "react-icons/fi";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { appData } from "redux/boardSlice";
import { IBoard } from "types";
import { exportConfig, resetBoard, handleFilterChange } from "utilis";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBoard, setOpenBoard] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isDeleteBoard, setDeleteBoard] = useState(false);
  const [showDowndrop, setShowDropDown] = useState(false);

  const data = useSelector(appData);
  const active: IBoard = data.active;

  const editBoard = () => {
    setOpenBoard(true);
    setOpenMenu(false);

  };
  const handleOpenMenu = ()=> setOpenMenu(false)
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });
  return (
    <>
      <div className="bg-white dark:bg-secondary flex items-center h-20 fixed w-full border-b-[1px] border-gray/20">
        {/* {isMobile ? (
          <div
            className={`border-r-[1px] border-gray/20 p-6 min-w-[13rem] cursor-pointer`}
          >
            <Icon type="kanban_logo" />
          </div>
        ) : (
          <div className="border-gray/20 p-6 cursor-pointer">
            <img src={logoMobile} alt="logo" className="w-10 h-10" />
          </div>
        )} */}
        <div
          className={`flex items-center justify-between w-full ${
            isMobile ? "px-4" : "pr-4"
          }`}
        >
          {active ? (
            <>
              {isMobile ? (
                <h3 className="font-bold text-xl">{active.name}</h3>
              ) : (
                <div
                  onClick={() => {
                    setShowDropDown(!showDowndrop);
                  }}
                  className="flex items-center relative"
                >
                  <h3 className="font-bold text-xl">{active.name}</h3>{" "}
                  <span>
                    <FiChevronDown className="inline vertical-bottom" />
                  </span>
                </div>
              )}

              <div className="flex items-center">
              <div className="pr-4"></div>
              <div className="flex items-center">
                <label htmlFor="Search" className="sr-only"> Search </label>
                <input
                  type="text"
                  id="Search"
                  placeholder="Filter..."
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="w-full rounded-md border-gray-200 py-2.5 pl-3 pe-10 shadow-sm sm:text-sm"
                />
              </div>
              <div className="pr-4"></div>
                <button
                  aria-label="Add capability"
                  onClick={() => setIsOpen(true)}
                  className={`rounded-full bg-primary text-sm font-bold text-white ${
                    !isMobile ? "w-[40px]" : "w-32"
                  } h-[40px]`}
                >
                  {!isMobile ? (
                    <IoIosAdd className="inline-flex" />
                  ) : (
                    <span className="py-8"> + Add capability</span>
                  )}
                </button>
                <div className="pr-4">
                </div>
                <div className="pr-4">
                <button
                  aria-label="Export"
                  onClick={() => exportConfig()}
                  className={`rounded-full bg-primary text-sm font-bold text-white ${
                    !isMobile ? "w-[40px]" : "w-32"
                  } h-[40px]`}
                >
                  {!isMobile ? (
                    <IoIosAdd className="inline-flex" />
                  ) : (
                    <span className="py-8">Export</span>
                  )}
                </button>
              
                </div>
                <div>
                  <BiDotsVerticalRounded
                    onClick={() => setOpenMenu(!isOpenMenu)}
                    className="text-3xl cursor-pointer"
                  />
                </div>
              </div>
            </>
          ) : (
            <h1 className="font-bold text-xl"> No Board item</h1>
          )}
        </div>
      </div>

      <Modal
        open={isOpen || isOpenBoard || isDeleteBoard}
        handleClose={() => {
          setIsOpen(false), setDeleteBoard(false), setOpenBoard(false);
        }}
      >
        {isOpenBoard ? (
          <AddBoard active={active} handleClose={() => setOpenBoard(false)} />
        ) : isDeleteBoard ? (
          <DeleteItem
            handleClose={() => setDeleteBoard(false)}
            isDeleteBoard={isDeleteBoard}
            name={active.name}
          />
        ) : (
          <AddTask handleClose={() => setIsOpen(false)} />
        )}
      </Modal>
      {isOpenMenu && (
        <Popup
          handleOpenMenu={handleOpenMenu}
          items={[
            {
              title: "Edit board",
              handler: editBoard,
            },
            // {
            //   title: "Delete board",
            //   handler: () => {
            //     setDeleteBoard(true), handleOpenMenu();
            //   },
            // },
            {
              title: "Reset configuration",
              handler: resetBoard,
            },
          ]}
        />
      )}

      {showDowndrop && !isMobile && (
        <div className="absolute top-10">
          <Modal
            showDowndrop={showDowndrop}
            open={showDowndrop}
            handleClose={() => setShowDropDown(false)}
          >
            <SideBar handleClose={() => setShowDropDown(false)} />
          </Modal>
        </div>
      )}
    </>
  );
}
