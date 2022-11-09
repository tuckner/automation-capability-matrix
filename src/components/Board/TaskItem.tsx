import Modal from "components/Modal";
import { useState } from "react";
import { ISubTask, ITask } from "types";
import TaskDetails from "./TaskDetails";

type Props = { tasks: ITask; filtered: ISubTask[]; index: number };

export default function TaskItem({ tasks, filtered, index }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div
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

      <Modal open={isOpen} handleClose={() =>setIsOpen(false)}>
        <TaskDetails
          filtered={filtered}
          subtasks={tasks.subtasks}
          tasks={tasks}
          handleClose={() =>setIsOpen(false)}
          index={index}
        />
      </Modal>
    </>
  );
}
