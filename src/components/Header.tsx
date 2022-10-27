import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import AddTask from "./Board/AddTask";
import Icon from "./Icon";
import Modal from "./Modal";

type Props = { title: string };

export default function Header({ title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className=" z-10 bg-white dark:bg-secondary flex items-center fixed w-full border-b-[1px] border-gray/20">
        <div className="border-r-[1px] border-gray/20 p-6 min-w-[18rem] cursor-pointer">
          <Icon type="kanban_logo" />
        </div>
        <div className="flex items-center justify-between w-full  px-4">
          <h3 className="font-bold text-xl">{title}</h3>
          <div className="flex gap-x-4 items-center">
            <button onClick={()=>setIsOpen(true)} className="rounded-full bg-primary text-sm font-bold text-white px-6 py-3">
              <IoIosAdd className="inline-flex" /> Add New Task
            </button>
            <button>
              <BiDotsVerticalRounded className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <AddTask />
        </Modal>
      )}
    </>
  );
}
