import { AppContext } from "context";
import React, { useContext, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { AppContextType } from "types";
import AddBoard from "./Board/AddBoard";

import AddTask from "./Board/AddTask";
import Icon from "./Icon";
import Modal from "./Modal";
import Popup from "./Popup";

type Props = { title: string };

export default function Header({ title }: Props) {
  const { active, board, getInitialState } = useContext(
    AppContext
  ) as AppContextType;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBoard, setOpenBoard] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);

  const deleteBoardHandler = () => {
    const newBoard = board.filter((item: any) => item.name !== active.name);
    localStorage.setItem("board", JSON.stringify(newBoard));
    getInitialState();
    setOpenMenu(false);
  };

  const editBoard = () => {
    setOpenBoard(true);
  };
  return (
    <>
      <div className=" z-10 bg-white dark:bg-secondary flex items-center fixed w-full border-b-[1px] border-gray/20">
        <div className="border-r-[1px] border-gray/20  p-6 min-w-[18rem] cursor-pointer">
          <Icon type="kanban_logo" />
        </div>
        <div className="flex items-center justify-between w-full  px-4">
          {title ? (
            <>
              <h3 className="font-bold text-xl">{title}</h3>
              <div className="flex gap-x-4 items-center">
                <button
                  onClick={() => setIsOpen(true)}
                  className="rounded-full bg-primary text-sm font-bold text-white px-6 py-3"
                >
                  <IoIosAdd className="inline-flex" /> Add New Task
                </button>
                <div className="relative">
                  <BiDotsVerticalRounded
                    onClick={() => setOpenMenu(!isOpenMenu)}
                    className="text-3xl cursor-pointer"
                  />
                  {isOpenMenu && (
                    <Popup
                      setOpenMenu={setOpenMenu}
                      items={[
                        {
                          title: "Edit board",
                          handler: editBoard,
                        },
                        {
                          title: "Delete Board",
                          handler: deleteBoardHandler,
                        },
                      ]}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <h1 className="font-bold text-xl"> No Board item</h1>
          )}
        </div>
      </div>

      <Modal open={isOpen} handleClose={() => setIsOpen(false)}>
        <AddTask handleClose={() => setIsOpen(false)} />
      </Modal>

      <Modal open={isOpenBoard} handleClose={() => setOpenBoard(false)}>
        <AddBoard handleClose={() => setOpenBoard(false)} active={active} />
      </Modal>
    </>
  );
}
