import { useContext } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { SubtaskInput, TextInput } from "components/InputField";
import { AppContextType, IBoard, IColumn } from "types";
import { AppContext } from "context";

type Props = {
  handleClose: () => void;
  active?: IBoard;
};
function AddBoard({ handleClose, active }: Props) {
  const { board, getInitialState, setBoard } = useContext(
    AppContext
  ) as AppContextType;
  const TaskSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    columns: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Required"),
          tasks: Yup.array(),
        })
      )
      .min(1, "Add an item."),
  });
  const addBoardHandler = (values: IBoard) => {
    localStorage.setItem("board", JSON.stringify([...board, values]));
    handleClose();
    getInitialState(values);
  };
  const editBoardHandler = (values: IBoard) => {
    const updatedBoard = board.map((item: IBoard) =>
      item.name === active?.name ? { ...item, ...values } : item
    );
    localStorage.setItem("board", JSON.stringify(updatedBoard));
    handleClose();
    getInitialState(values);
  };

  return (
    <div>
      <h1 className="font-bold pb-2 px-4">
        {active ? "Edit" : "Add New"} Board
      </h1>
      <div className="overflow-y-auto  px-4">
        <Formik
          initialValues={
            active
              ? {
                  name: active.name,
                  columns: active.columns,
                }
              : {
                  name: "",
                  columns: [],
                }
          }
          validationSchema={TaskSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={active ? editBoardHandler : addBoardHandler}
        >
          {({ values, errors }) => (
            <Form>
              <div className="my-6">
                <TextInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="e.g Take a coffee break"
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-bold">columns</label>
                <FieldArray
                  name="columns"
                  render={(arrayHelpers) => (
                    <div>
                      {values.columns &&
                        values.columns.length > 0 &&
                        values.columns.map((task: IColumn, index: number) => (
                          <SubtaskInput
                            key={index}
                            index={index}
                            name={`columns.${index}.name`}
                            arrayHelpers={arrayHelpers}
                          />
                        ))}
                      <button
                        className="bg-white mt-3 font-bold text-sm text-primary p-2 w-full rounded-full"
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            name: "",
                            tasks: [],
                          });
                        }}
                      >
                        + Add New Column
                      </button>

                      {values.columns.length >= 0 ? (
                        typeof errors.columns === "string" ? (
                          <div className="text-error text-xs">
                            {errors.columns}
                          </div>
                        ) : null
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                />
              </div>

              <button
                className="bg-primary p-2 w-full text-sm rounded-full"
                type="submit"
              >
                {active ? "Update" : "Create"} Board
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddBoard;
