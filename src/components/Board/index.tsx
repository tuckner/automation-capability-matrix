import { useContext, useEffect, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { AppContext } from "../../context";
import { AppContextType, IColumn, ITask } from "../../types";
import TaskItem from "./TaskItem";

type Props = { active: string };

export default function index({ active }: Props) {
  const { platform, roadmap, marketing } = useContext(
    AppContext
  ) as AppContextType;

  const [selected, setSelected] = useState(platform);

  useEffect(() => {
    if (active === "Marketing Plan") {
      setSelected(marketing);
    } else if (active === "Road Map") {
      setSelected(roadmap);
    } else {
      setSelected(platform);
    }
  }, [active]);

  return (
    <div className="z-0 h-full flex gap-x-10 w-full">
      {selected.columns.map((item: IColumn, index: number) => {
        return (
          <div key={index} data-id={index} className="w-[250px] shrink-0 ">
            <p
              className="flex gap-x-3 items-center text-gray 
            font-bold uppercase text-xs tracking-widest"
            >
              {" "}
              <BsCircleFill
                className={`${
                  item.name === "Todo"
                    ? "fill-sky-blue"
                    : item.name === "Doing"
                    ? "fill-purple"
                    : "fill-sea-green"
                }  `}
              />
              {item.name} ({item.tasks.length})
            </p>
            <div className="mt-4 h-full">
              {item.tasks.length > 0 ? (
                item.tasks.map((tasks: ITask, index: number) => {
                  const filtered = tasks.subtasks.filter(
                    (item) => item.isCompleted === true
                  );
                  return (
                    <TaskItem
                      tasks={tasks}
                      filtered={filtered}
                      key={index}
                      index={index}
                    />
                  );
                })
              ) : (
                <div className="w-[250px] shrink-0 h-full">
                  <div className="h-full dark:bg-secondary/20 border-dashed border-2 border-gray rounded-lg">
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div className="mt-8  w-[250px] shrink-0 ">
        <div className=" h-full dark:bg-secondary/20  flex flex-col justify-center text-center rounded-lg">
          <p className="text-xl  text-gray font-bold"> +New Column</p>
        </div>
      </div>
    </div>
  );
}
