import Modal from "components/Modal";
import { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IBoard, IColumn, ITask } from "../../types";
import AddBoard from "./AddBoard";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import { addTask, appData, deleteTask } from "redux/boardSlice";
import { Droppable, DragDropContext } from "@hello-pangea/dnd";
import { randomColor } from "utilis";

import { v4 as uuidv4 } from "uuid";

export default function Index() {
  const data = useSelector(appData);
  const dispatch = useDispatch();
  const active: IBoard = data.active;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBoard, setOpenBoard] = useState(false);
  const [isEditBoard, setEditBoard] = useState(false);


  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const activeCopy = { ...active };
    const sourceList = activeCopy.columns.find(
      (item: IColumn) => item.name === result.source.droppableId
    );
    const sourceTask = sourceList?.tasks.find(
      (item: ITask, index: number) => index === result.source.index
    );

    dispatch(deleteTask(sourceTask));
    const updatedTasks = {
      ...sourceTask,
      id: uuidv4(),
      status: result.destination.droppableId,
    };
    const position = result.destination.index;
    dispatch(addTask({ updatedTasks, position }));
  };

  return (
    <div className="w-[72rem] h-full">
      <div className="mt-3 z-10 h-full flex gap-x-10 w-full">
        {active ? (
          <DragDropContext onDragEnd={onDragEnd}>
            {active.columns?.map((item: IColumn, index: number) => {
              return (
                <div key={item.name} className="w-[250px] shrink-0">
                  <p
                    className="flex gap-x-3 items-center text-gray 
            font-bold uppercase text-xs tracking-widest"
                  >
                    {" "}
                    <BsCircleFill
                      style={{
                        fill:
                          index === 0
                            ? "hsla(193, 75%, 59%,1)"
                            : index === 1
                            ? "hsla(249, 83% ,70%, 1)"
                            : randomColor(),
                      }}
                    />
                    {item.name} ({item.tasks.length})
                  </p>
                  <Droppable droppableId={`${item.name}`}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="mt-4 h-full"
                      >
                        {item.tasks.length > 0 ? (
                          <div>
                            {item.tasks.map((tasks: ITask, index: number) => {
                              const filtered = tasks.subtasks.filter(
                                (item) => item.isCompleted === true
                              );
                              return (
                                <TaskItem
                                  tasks={tasks}
                                  filtered={filtered}
                                  key={tasks.id}
                                  index={index}
                                />
                              );
                            })}
                          </div>
                        ) : (
                          <div className="w-[250px] shrink-0 h-full">
                            <div className="h-screen dark:bg-secondary/20 border-dashed border-2 border-gray rounded-lg"></div>
                          </div>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}

            <div className="mt-8 h-screen w-[250px] shrink-0">
              <div
                onClick={() => setEditBoard(true)}
                className="h-full dark:bg-secondary/20 cursor-pointer flex flex-col justify-center text-center rounded-lg"
              >
                <p className="text-xl text-gray font-bold"> + New Column</p>
              </div>
            </div>
          </DragDropContext>
        ) : (
          <div
            onClick={() => {
              setOpenBoard(true);
            }}
            className="font-bold text-xl cursor-pointer text-primary hover:opacity-20
      fixed -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%]"
          >
            + Create New Board
          </div>
        )}
      </div>

      <Modal
        open={isOpen || isOpenBoard || isEditBoard}
        handleClose={() => {
          setIsOpen(false), setOpenBoard(false), setEditBoard(false);
        }}
      >
        {isEditBoard ? (
          <AddBoard active={active} handleClose={() => setEditBoard(false)} />
        ) : isOpenBoard ? (
          <AddBoard handleClose={() => setOpenBoard(false)} />
        ) : (
          <AddTask handleClose={() => setIsOpen(false)} />
        )}
      </Modal>
    </div>
  );
}
