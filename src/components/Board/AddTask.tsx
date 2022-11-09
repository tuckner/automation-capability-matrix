import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import SelectBox from "components/SelectBox";
import { TextInput, TextArea, SubtaskInput } from "../InputField";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { IBoard, IColumn, ISubTask, ITask } from "types";
import { AppContext } from "../../context";
import { AppContextType } from "../../types";

type Props = {
  handleClose: () => void;
  tasks?: ITask;
  index?: number;
};
export default function AddTask({ handleClose, tasks, index }: Props) {
  const { active, getInitialState, board } = useContext(
    AppContext
  ) as AppContextType;
  const [selectedStatus, setStatus] = useState<string>("");

  const TaskSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    status: Yup.string(),
    subtasks: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required("Required"),
          isCompleted: Yup.boolean(),
        })
      )
      .min(1, "Add an item."),
  });

  const addTaskHandler = (values: ITask) => {
    values.status = selectedStatus;
   const see = active.columns.find((item) =>
      item.name === values.status ? item.tasks.push(values) : null
    );
    // what if the values.status is changed?
    console.log(active)
    handleClose();
    localStorage.setItem("board", JSON.stringify(board));
    getInitialState(active);
    console.log(board)
  };

  const editTaskHandler = (values: ITask) => {
    // console.log(index);
     board.find((item) =>
      item.columns.find((o) =>
        o.tasks.find((s) =>
          s.title === tasks?.title ? (s = { ...s, ...values }) : null
        )
      )
    );
 
    localStorage.setItem("board", JSON.stringify([...board]));
    getInitialState(active);
  };

  return (
    <div>
      <h1 className="font-bold pb-2 px-4">{tasks ? "Edit" : "Add New"} Task</h1>
      <div className="overflow-y-auto h-[30rem] px-4">
        <Formik
          initialValues={
            tasks
              ? {
                  title: tasks.title,
                  description: tasks.description,
                  status: tasks.status,
                  subtasks: tasks.subtasks,
                }
              : {
                  title: "",
                  description: "",
                  status: selectedStatus,
                  subtasks: [],
                }
          }
          validationSchema={TaskSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            tasks ? editTaskHandler(values) : addTaskHandler(values);
          }}
        >
          {({ values, errors }) => (
            <Form>
              <div className="my-6">
                <TextInput
                  label="Title"
                  name="title"
                  type="text"
                  placeholder="e.g Take a coffee break"
                />
              </div>
              <div className="my-4">
                <TextArea
                  placeholder="e.g  It's always good to take a break"
                  name="description"
                  label="Description"
                />
              </div>

              <div className="mb-6">
                <label className="text-sm font-bold">Subtasks</label>
                <FieldArray
                  name="subtasks"
                  render={(arrayHelpers) => (
                    <div>
                      {values.subtasks &&
                        values.subtasks.length > 0 &&
                        values.subtasks.map((task: ISubTask, index: number) => (
                          <SubtaskInput
                            key={index}
                            index={index}
                            name={`subtasks.${index}.title`}
                            arrayHelpers={arrayHelpers}
                          />
                        ))}
                      <button
                        className="bg-white mt-2 font-bold text-sm text-primary p-2 w-full rounded-full"
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            title: "",
                            isCompleted: false,
                          });
                        }}
                      >
                        + Add New Subtask
                      </button>

                      {values.subtasks.length >= 0 ? (
                        typeof errors.subtasks === "string" ? (
                          <div className="text-error text-xs">
                            {errors.subtasks}
                          </div>
                        ) : null
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="mb-6">
                <SelectBox
                  selectedStatus={selectedStatus}
                  setStatus={setStatus}
                />
              </div>

              <button
                className="bg-primary p-2 w-full text-sm rounded-full"
                type="submit"
              >
                {tasks ? "Update" : "Create"} Task
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
