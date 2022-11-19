import { Dispatch, SetStateAction, useState } from "react";
import "./style.css";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { IColumn, ITask } from "types";
import { addTask, appData, deleteTask } from "redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  selectedStatus: string;
  setStatus: Dispatch<SetStateAction<string>>;
  tasks?: ITask;
  handleClose?: () => void;
}

export default function index({ selectedStatus, setStatus, tasks }: Props) {
  const dispatch = useDispatch();
  const data = useSelector(appData);
  const { active } = data;
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (title: string) => {
    setStatus(title);
    if (tasks?.status !== title && tasks !== undefined) {
      const updatedTasks = {
        ...tasks,
        status: title,
      };
      dispatch(addTask(updatedTasks));
      dispatch(deleteTask(tasks));
    }
  };

  return (
    <div className="dropdown">
      <div
        className={`dropdown-header dark:bg-secondary-dark relative ${
          isOpen && "border-2 border-primary"
        }`}
        onClick={toggleDropdown}
      >
        <p className="text-sm">
          {" "}
          {selectedStatus
            ? selectedStatus
            : active.columns.find((item: IColumn) =>
                item.tasks.find((o, index) => index === 0)
              )?.name}
        </p>
        {isOpen ? (
          <BiChevronDown className={`icon ${isOpen && "open"}`} />
        ) : (
          <BiChevronUp className={`icon ${isOpen && "open"}`} />
        )}
        {isOpen && (
          <div className={`dropdown-body bg-offwhite dark:bg-secondary-dark `}>
            {active.columns.map((item: IColumn, i: number) => (
              <div
                className={`dropdown-item text-sm px-4 py-2 hover:text-primary cursor-pointer ${
                  i < 2 && "border-b-[1px] border-gray/20"
                }`}
                onClick={(e) =>
                  handleItemClick(
                    String(e.currentTarget.getAttribute("data-title"))
                  )
                }
                key={i}
                data-title={item.name}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
