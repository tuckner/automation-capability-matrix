import { IBoard, IColumn, ISubTask, ITask } from "types";
import { FiMoreVertical } from "react-icons/fi";
import SelectBox from "../SelectBox";
import { useState } from "react";
import Popup from "components/Popup";
import DeleteItem from "components/DeleteItem";
import { useSelector } from "react-redux";
import { appData } from "redux/boardSlice";

interface Props {
  subtasks: ISubTask[];
  tasks: ITask;
  index: number;
  handleClose: () => void;
  handleOpenModal: () => void;
}

export default function TaskDetails({
  subtasks,
  tasks,
  handleClose,
  handleOpenModal,
}: Props) {
  // const dispatch = useDispatch();
  const data = useSelector(appData);
  const active: IBoard = data.active;

  const [selectedColumn, setSelectedColumn] = useState<string | any>(
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
  // const [checkedState, setCheckedState] = useState(
  //   subtasks.map((o) => o.isCompleted === false)
  // );
  const handleOpenMenu = () => setOpenMenu(false);
  // const handleOnChange = (id: number) => {
  //   if (id >= 0) {
  //     const updatedCheckedState = checkedState.map((item, index) =>
  //       index === id ? !item : item
  //     );

  //     setCheckedState(updatedCheckedState);
  //     dispatch(isCompletedToggle({ updatedCheckedState, id, tasks }));
  //   }
  // };

  const editTaskHandler = () => {
    handleOpenModal();
    handleClose();
  };

  return (
    <>
      {!isDeleteTask ? (
        <>
          <div className="text-lg font-bold flex items-center justify-between">
            <p className="">{tasks.name}</p>{" "}
            <div className="relative">
              <p>
                <FiMoreVertical
                  onClick={() => setOpenMenu(!isOpenMenu)}
                  className="text-1xl cursor-pointer"
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
                  handleOpenMenu={handleOpenMenu}
                />
              )}
            </div>
          </div>
          <div className="text-xs text-gray my-2">
              <p>ID: A{tasks.id}</p>
          </div>
          <div>
            <p className="text-sm my-4">
              {tasks.description ? tasks.description : "No description"}
            </p>
            <p className=" text-sm font-bold mb-2 ">Techniques:</p>
            <p className="text-sm my-3">
              {tasks.techniques && tasks.techniques.map((technique: string, index: number) => (
                <li key={index}>{technique}</li>
              ))}
            </p>
            <p className=" text-sm font-bold mb-2 ">{`Workflows: ${tasks.subtasks.length}`}</p>
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
                    <p>
                      {subtask.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6 hidden">
            <p className="text-sm mb-1">Category</p>
            <SelectBox
              selectedColumn={selectedColumn}
              handleClose={handleClose}
              setSelectedColumn={setSelectedColumn}
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
          name={tasks.name}
        />
      )}
    </>
  );
}
