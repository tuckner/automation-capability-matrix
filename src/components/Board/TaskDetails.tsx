import { AppContextType, IBoard, IColumn, ISubTask, ITask } from "types";
import { FiMoreVertical } from "react-icons/fi";
import SelectBox from "../SelectBox";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "context";
import Popup from "components/Popup";
import Modal from "components/Modal";
import AddTask from "./AddTask";

type Props = {
  subtasks: ISubTask[];
  tasks: ITask;
  filtered: ISubTask[];
  index: number;

  handleClose: () => void;
};

export default function TaskDetails({
  subtasks,
  tasks,
  filtered,
  handleClose,
  index,
}: Props) {
  const { active, setIsActive, board, setBoard, getInitialState } = useContext(
    AppContext
  ) as AppContextType;
  const [selectedStatus, setStatus] = useState<string>("");
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  const [checkedState, setCheckedState] = useState(
    subtasks.map((o) => o.isCompleted === true)
  );


  console.log(checkedState[0]);
  const deleteTaskHandler = () => {
    board.find((o: IBoard) => {
      o.columns === active.columns
        ? o.columns.find((item: IColumn) => {
            item.tasks = item.tasks.filter(
              (s: ITask) => s.title !== tasks.title
            );
          })
        : null;
    });
    setBoard([...board]);
    handleClose();
    localStorage.setItem("board", JSON.stringify(board));
  };
  const handleOnChange = (id: number) => {
    console.log(id);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === id ? !item : item
    );

    setCheckedState(updatedCheckedState);
    board.find((o: IBoard) => {
      o.columns === active.columns
        ? o.columns.find((item: IColumn) => {
            item.tasks.find((s: ITask) => {
              s.title === tasks.title
                ? s.subtasks.find((subtask: ISubTask, i: number) =>
                    i === id
                      ? (subtask.isCompleted = updatedCheckedState[id])
                      : null
                  )
                : null;
            });
          })
        : null;
    });

    localStorage.setItem("board", JSON.stringify(board));
    // const items = JSON.parse(localStorage.getItem("board") || "");
    // getInitialState(active)
  };

  const editTaskHandler = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className=" text-lg font-bold flex items-center justify-between">
        <p className=""> {tasks.title}</p>{" "}
        <div className="relative">
          <p>
            <FiMoreVertical
              onClick={() => setOpenMenu(!isOpenMenu)}
              className="text-3xl cursor-pointer"
            />
          </p>
          {isOpenMenu && (
            <Popup
              items={[
                {
                  title: "Edit Task",
                  handler: editTaskHandler,
                },
                {
                  title: "Delete Task",
                  handler: deleteTaskHandler,
                },
              ]}
              setOpenMenu={setOpenMenu}
            />
          )}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray my-6">
          {tasks.description ? tasks.description : "No description"}
        </p>
        <p className=" text-sm font-bold mb-2 ">{`Substasks (${filtered.length} of ${tasks.subtasks.length})`}</p>
        <div
          className={`overflow-y-auto px-4 ${
            tasks.subtasks.length >= 4 && "h-[10rem]"
          }`}
        >
          {subtasks.map((subtask: ISubTask, index: number) => {
            return (
              <div
                key={index}
                className="dark:bg-secondary-dark bg-offwhite flex items-center gap-x-4 rounded-sm p-3 mt-2"
              >
                <input
                  type="checkbox"
                  value={subtask.title}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />
                <p
                  className={`${checkedState[index] && "line-through"} text-xs`}
                >
                  {subtask.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 ">
        <p className=" text-sm mb-1">Status</p>
        <SelectBox selectedStatus={selectedStatus} setStatus={setStatus} />
      </div>
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
