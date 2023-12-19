import { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import SelectBox from "components/SelectBox";
import { TextInput, TextArea, SubtaskInput } from "../InputField";
import { IBoard, IColumn, ISubTask, ITask } from "types";
import { appData, addTask, editTask, deleteTask } from "redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkDuplicatedTask } from "utilis";
import { useToast } from "@chakra-ui/react";

const generateRandomNumber = (): string => {
  return String(Math.floor(Math.random() * (9999 - 9000 + 1)) + 9000);
};

interface Props {
  handleClose: () => void;
  tasks?: ITask;
  index?: number;
}
export default function AddTask({ handleClose, tasks }: Props) {
  const dispatch = useDispatch();
  const data = useSelector(appData);
  const active: IBoard = data.active;
  const toast = useToast();

  const [selectedColumn, setSelectedColumn] = useState<string | any>(
    tasks
      ? active.columns.find((item: IColumn) =>
          item.tasks.find((o) => o == tasks)
        )?.name
      : active.columns.find((item: IColumn) =>
          item.tasks.find((o, index) => index === 0)
        )?.name
  );

  const TaskSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string(),
    category: Yup.string().required("Required"),
    subtasks: Yup.array().of(
      Yup.object().shape({
        title: Yup.string(),
        isCompleted: Yup.boolean(),
      })
    ),
  });

  const addTaskHandler = (values: ITask) => {
    values.category = selectedColumn;

    const foundDuplicate = checkDuplicatedTask(values, active);
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
    if (values.category === selectedColumn) {
      dispatch(editTask({ values, tasks }));
    } else {
      const updatedTasks = {
        ...values,
        category: selectedColumn,
      };
      dispatch(addTask({ updatedTasks, position: 0 }));
      dispatch(deleteTask(tasks));
    }
    handleClose();
  };

  return (
    <div>
      <h1 className="font-bold pb-2 px-4">
        {tasks ? "Edit" : "Add new"} capability
      </h1>
      <div className="overflow-y-auto h-[25rem] px-4">
        <Formik
          initialValues={
            tasks
              ? {
                  id: tasks.id,
                  name: tasks.name,
                  description: tasks.description,
                  category: tasks.category,
                  techniques: tasks.techniques,
                  subtasks: tasks.subtasks,
                }
              : {
                  id: generateRandomNumber(),
                  name: "",
                  description: "",
                  category: selectedColumn,
                  techniques: [],
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
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="e.g DLP alerts"
                />
              </div>
              <div className="my-4">
                <TextArea
                  placeholder="e.g  Handle DLP alerts"
                  name="description"
                  label="Description"
                />
              </div>

              <div className="mb-6">
                <label className="text-sm font-bold">Workflows</label>
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
                        aria-label="Add workflow"
                        className="bg-white mt-2 font-bold text-sm text-primary p-2 w-full rounded-full"
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            id: generateRandomNumber(),
                            title: "",
                            isCompleted: false,
                          });
                        }}
                      >
                        + Add new workflow
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
                <p>Category</p>
                <SelectBox
                  selectedColumn={selectedColumn}
                  setSelectedColumn={setSelectedColumn}
                  tasks={tasks}
                />
              </div>

              <button
                aria-label="Create capability"
                className="bg-primary p-2 w-full text-sm rounded-full"
                type="submit"
              >
                {tasks ? "Update" : "Create"} capability
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
