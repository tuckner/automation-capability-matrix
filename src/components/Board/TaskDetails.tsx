import { IColumn, ISubTask, ITask } from "types";
import { FiMoreVertical } from "react-icons/fi";
import SelectBox from "../SelectBox";
import { Dispatch, SetStateAction, useState } from "react";

import Popup from "components/Popup";
import DeleteItem from "components/DeleteItem";
import { useDispatch, useSelector } from "react-redux";
import { appData, isCompletedToggle } from "redux/boardSlice";

type Props = {
  subtasks: ISubTask[];
  tasks: ITask;
  filtered: ISubTask[];
  index: number;
  handleClose: () => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function TaskDetails({
  subtasks,
  tasks,
  filtered,
  handleClose,
  setOpenModal,
}: Props) {
  const dispatch = useDispatch();
  const data = useSelector(appData);
  const { active } = data;

  const [selectedStatus, setStatus] = useState<string | any>(
    tasks
      ? active.columns.find((item: IColumn) =>
          item.tasks.find((o) => o == tasks)
        )?.name
      : active.columns.find((item: IColumn) =>
          item.tasks.find((o, index) => index === 0)
        )?.name
  );
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isDeleteTask, setDeleteTask] = useState(false);

  const [checkedState, setCheckedState] = useState(
    subtasks.map((o) => o.isCompleted === true)
  );

  const handleOnChange = (id: number) => {
    if (id >= 0) {
      const updatedCheckedState = checkedState.map((item, index) =>
        index === id ? !item : item
      );

      setCheckedState(updatedCheckedState);
      dispatch(isCompletedToggle({ updatedCheckedState, id, tasks }));
    }
  };

  const editTaskHandler = () => {
    setOpenModal(true);
    handleClose();
  };

  return (
    <>
      {!isDeleteTask ? (
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
                      handler: () => {
                        setDeleteTask(true);
                      },
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
                      className={`${
                        checkedState[index] && "line-through"
                      } text-xs`}
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
            <SelectBox
              selectedStatus={selectedStatus}
              handleClose={handleClose}
              setStatus={setStatus}
              tasks={tasks}
            />
          </div>
        </>
      ) : (
        <DeleteItem
          handleClose={() => {
            setDeleteTask(false), handleClose();
          }}
          tasks={tasks}
          name={tasks.title}
        />
      )}
    </>
  );
}
