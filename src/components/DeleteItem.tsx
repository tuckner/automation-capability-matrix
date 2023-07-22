import { useDispatch, useSelector } from "react-redux";
import { appData, deleteBoard, deleteTask } from "redux/boardSlice";
import { ITask } from "types";
interface Props {
  handleClose: () => void;
  isDeleteBoard?: boolean;
  tasks?: ITask;
  name: string;
};

export default function Delete({
  handleClose,
  tasks,
  isDeleteBoard,
  name,
}: Props) {
  const dispatch = useDispatch();
  const data = useSelector(appData);
  const { active } = data;

  const deleteBoardHandler = () => {
    dispatch(deleteBoard(active));
    handleClose();
  };
  const deleteTaskHandler = () => {
    dispatch(deleteTask(tasks));
    handleClose();
  };

  return (
    <div className="p-4">
      <h1 className="text-left text-xl text-error font-bold mb-4">
        {" "}
        Delete {isDeleteBoard ? "Board" : " Tasks"}
      </h1>
      <p className="text-center text-sm">
        Are you sure you want to delete{" "}
        <span className="font-bold text-base text-primary">{name}</span> from
        the board? This action will remove all columns and tasks and cannot be
        reversed.
      </p>
      <div className="text-center flex items-center justify-around mt-8">
        <button
         aria-label="Delete"
          className="py-2 w-40 hover:bg-error/10 px-4 rounded-md bg-error font-bold"
          type="button"
          onClick={isDeleteBoard ? deleteBoardHandler : deleteTaskHandler}
        >
          {" "}
          Delete
        </button>
        <button
         aria-label="Cancel"
          className="py-2 w-40 hover:bg-error/10 duration-300 px-4 rounded-md"
          type="button"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
