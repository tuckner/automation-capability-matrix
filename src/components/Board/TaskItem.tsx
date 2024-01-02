import Modal from "components/Modal";
import { useState } from "react";
import { ITask } from "types";
import AddTask from "./AddTask";
import TaskDetails from "./TaskDetails";
import { Draggable } from "@hello-pangea/dnd";
import { BsCircleFill } from "react-icons/bs";
// import { randomColor } from "utilis";

interface Props {
  tasks: ITask;
  index: number;
}

export default function TaskItem({ tasks, index }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  return (
    <>
      <Draggable key={tasks.id} draggableId={tasks.id.toString()} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              id="task-item"
              ref={provided.innerRef}
              data-snapshot={snapshot}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              data-id={index}
              onClick={() => {
                setIsOpen(true);
              }}
              className="hover:opacity-60 shadow-lg  
              cursor-pointer bg-white dark:bg-secondary mb-4 rounded-lg py-6 px-4"
            >
              <p className="font-bold text-sm">{tasks.name} </p>
              <p className="pt-2 text-xs text-gray font-bold">
                {" "}
                {tasks.subtasks.length} workflows
              </p>
              <div className="hidden">
                {tasks.subtasks.map((subtask, index) => (
                  <div key={index}>
                    <p className="pt-2 text-xs text-gray font-bold">
                      {" "}
                      {subtask.title}
                    </p>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-xs text-gray content-end font-bold">
                {" "}
                <div className="flex justify-end">
                  <BsCircleFill
                    className=""
                    onClick={handleOpenModal}
                    style={{
                      color:
                        tasks.subtasks.length === 1
                          ? "#e6e22e"
                          : tasks.subtasks.length >= 2
                          ? "#238823"
                          : "#e64747",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </Draggable>
      {/* <Icon type="board" /> */}
      <Modal open={isOpen} handleClose={() => setIsOpen(false)}>
        <TaskDetails
          subtasks={tasks.subtasks}
          tasks={tasks}
          handleClose={() => setIsOpen(false)}
          index={index}
          handleOpenModal={handleOpenModal}
        />
      </Modal>
      <Modal open={isOpenModal} handleClose={() => setOpenModal(false)}>
        <AddTask
          tasks={tasks}
          index={index}
          handleClose={() => setOpenModal(false)}
        />
      </Modal>
    </>
  );
}
