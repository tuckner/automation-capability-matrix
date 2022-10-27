import { ISubTask, ITask } from "types";
import { FiMoreVertical } from "react-icons/fi";
import SelectBox from "../SelectBox";

type Props = {
  subtasks: ISubTask[];
  tasks: ITask;
  filtered: ISubTask[];
};

export default function TaskDetails({ subtasks, tasks, filtered }: Props) {
  return (
    <>
      <div className=" text-lg font-bold flex items-center justify-between">
        <p className=""> {tasks.title}</p>{" "}
        <p>
          <FiMoreVertical />
        </p>
      </div>
      <div>
        <p className="text-sm text-gray my-6">
          {tasks.description ? tasks.description : "No description"}
        </p>
        <p className=" text-sm font-bold mb-2">{`Substasks (${filtered.length} of ${tasks.subtasks.length})`}</p>
        {subtasks.map((subtasks: ISubTask, index: number) => {
          return (
            <div
              key={index}
              className="dark:bg-secondary-dark bg-offwhite flex items-center gap-x-4 rounded-sm p-3 mt-2"
            >
              <input type="checkbox" value={subtasks.title} />
              <p className="text-xs">{subtasks.title}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 ">
        <p className=" text-sm mb-1">Status</p>
        <SelectBox />
      </div>
    </>
  );
}
