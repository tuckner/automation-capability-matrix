import Modal from "components/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { appData } from "redux/boardSlice";
import { IBoard, IColumn, ITask } from "../../types";
import AddBoard from "./AddBoard";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";

export default function index() {
  const data = useSelector(appData);
  const { active } = data;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBoard, setOpenBoard] = useState(false);

  return (
    <>
      <div className=" h-full flex gap-x-10 w-full">
        {active ? (
          <>
            {active.columns?.map((item: IColumn, index: number) => {
              return (
                <div
                  key={index}
                  data-id={index}
                  className="w-[250px] shrink-0 "
                >
                  <p
                    className="flex gap-x-3 items-center text-gray 
            font-bold uppercase text-xs tracking-widest"
                  >
                    {" "}
                    <BsCircleFill
                      className={`${
                        item.name === "Todo"
                          ? "fill-sky-blue"
                          : item.name === "Doing"
                          ? "fill-purple"
                          : "fill-sea-green"
                      }  `}
                    />
                    {item.name} ({item.tasks.length})
                  </p>
                  <div className="mt-4 h-full">
                    {item.tasks.length > 0 ? (
                      item.tasks.map((tasks: ITask, index: number) => {
                        const filtered = tasks.subtasks.filter(
                          (item) => item.isCompleted === true
                        );
                        return (
                          <TaskItem
                            tasks={tasks}
                            filtered={filtered}
                            key={index}
                            index={index}
                          />
                        );
                      })
                    ) : (
                      <div className="w-[250px] shrink-0 h-full">
                        <div className="h-full dark:bg-secondary/20 border-dashed border-2 border-gray rounded-lg"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="mt-8 h-full w-[250px]  shrink-0 ">
              <div
                onClick={() => setIsOpen(true)}
                className=" h-full dark:bg-secondary/20 cursor-pointer flex flex-col justify-center text-center rounded-lg"
              >
                <p className="text-xl  text-gray font-bold"> + New Column</p>
              </div>
            </div>
            <div className="mt-8 h-full w-[250px]  shrink-0 ">
              <div
                onClick={() => setIsOpen(true)}
                className=" h-full dark:bg-secondary/20 cursor-pointer flex flex-col justify-center text-center rounded-lg"
              >
                <p className="text-xl  text-gray font-bold"> + New Column</p>
              </div>
            </div>
            <div className="mt-8 h-full w-[250px]  shrink-0 ">
              <div
                onClick={() => setIsOpen(true)}
                className=" h-full dark:bg-secondary/20 cursor-pointer flex flex-col justify-center text-center rounded-lg"
              >
                <p className="text-xl  text-gray font-bold"> + New Column</p>
              </div>
            </div>
          </>
        ) : (
          <div
            onClick={() => {
              setOpenBoard(true);
            }}
            className="font-bold  text-xl cursor-pointer text-primary hover:opacity-20
      fixed -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%]"
          >
            + Create New Board
          </div>
        )}
      </div>

      <Modal
        open={isOpen || isOpenBoard}
        handleClose={() => {
          setIsOpen(false), setOpenBoard(false);
        }}
      >
        {isOpenBoard ? (
          <AddBoard handleClose={() => setOpenBoard(false)} />
        ) : (
          <AddTask handleClose={() => setIsOpen(false)} />
        )}
      </Modal>
    </>
  );
}
