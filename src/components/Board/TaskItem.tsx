import Modal from "components/Modal";
import { useState } from "react";
import { ISubTask, ITask } from "types";
import AddTask from "./AddTask";
import TaskDetails from "./TaskDetails";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  tasks: ITask;
  filtered: ISubTask[];
  index: number;
};

export default function TaskItem({ tasks, filtered, index }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <>
      <Draggable 
       key={index} draggableId={index.toString()} index={index}>
      {/* <Draggable draggableId={String(index)} index={index}> */}
        {(provided, snapshot) => {
          return (
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
              data-id={index}
              onClick={() => {
                setIsOpen(true);
              }}
              className="hover:opacity-60 shadow-lg  cursor-pointer bg-white dark:bg-secondary mb-4 rounded-lg py-6 px-4"
            >
              <p className="font-bold text-sm">{tasks.title} </p>
              <p className="pt-2 text-xs text-gray font-bold">
                {" "}
                {filtered.length} of {tasks.subtasks.length} substasks
              </p>
            </div>
          );
        }}
      </Draggable>
      <Modal
        children={
          <TaskDetails
            filtered={filtered}
            subtasks={tasks.subtasks}
            tasks={tasks}
            handleClose={() => setIsOpen(false)}
            index={index}
            setOpenModal={setOpenModal}
          />
        }
        open={isOpen}
        handleClose={() => setIsOpen(false)}
      />

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
