import { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import SelectBox from "components/SelectBox";
import { TextInput, TextArea, SubtaskInput } from "../InputField";
import { IBoard, IColumn, ISubTask, ITask } from "types";
import { appData, addTask, editTask, deleteTask } from "redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkDuplicatesTask } from "utilis";
import { useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
type Props = {
  handleClose: () => void;
  tasks?: ITask;
  index?: number;
};
export default function AddTask({ handleClose, tasks }: Props) {
  const dispatch = useDispatch();
  const data = useSelector(appData);
  const active: IBoard = data.active;
  const toast = useToast();

  const [selectedStatus, setStatus] = useState<string | any>(
    tasks
      ? active.columns.find((item: IColumn) =>
          item.tasks.find((o) => o == tasks)
        )?.name
      : active.columns.find((item: IColumn) =>
          item.tasks.find((o, index) => index === 0)
        )?.name
  );

  const TaskSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string(),
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

    const foundDuplicate = checkDuplicatesTask(values, active);
    if (foundDuplicate === false) {
      dispatch(addTask({ updatedTasks: values, position: 0 }));
    } else {
      toast({
        title: "Item already exist.",
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    handleClose();
  };

  const editTaskHandler = (values: ITask) => {
    if (values.status === selectedStatus) {
      dispatch(editTask({ values, tasks }));
    } else {
      const updatedTasks = {
        ...values,
        status: selectedStatus,
      };
      dispatch(addTask({ updatedTasks, position: 0 }));
      dispatch(deleteTask(tasks));
    }
    handleClose();
  };

  return (
    <div>
      <h1 className="font-bold pb-2 px-4">{tasks ? "Edit" : "Add New"} Task</h1>
      <div className="overflow-y-auto h-[30rem] px-4">
        <Formik
          initialValues={
            tasks
              ? {
                  id: tasks.id,
                  title: tasks.title,
                  description: tasks.description,
                  status: tasks.status,
                  subtasks: tasks.subtasks,
                }
              : {
                  id: uuidv4(),
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
                            key={task.id}
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
                            id: uuidv4(),
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
