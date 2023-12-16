import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { SubtaskInput, TextInput } from "components/InputField";
import { IBoard, IColumn } from "types";
import { editBoard, appData, addBoard } from "redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkDuplicatedBoard } from "utilis";
import { useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
interface Props {
  active?: IBoard;
  handleClose: () => void;
}
function AddBoard({ handleClose, active }: Props) {
  const dispatch = useDispatch();
  const data = useSelector(appData);
  const board: IBoard[] = data.board;
  const toast = useToast();

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
    const foundDuplicate = checkDuplicatedBoard(values, board);
    if (foundDuplicate === false) {
      dispatch(addBoard(values));
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
  const editBoardHandler = (values: IBoard) => {
    dispatch(editBoard(values));
    handleClose();
  };

  return (
    <div>
      <h1 className="font-bold pb-2 px-4">
        {active ? "Edit" : "Add new"} board
      </h1>
      <div className="overflow-y-auto  px-4">
        <Formik
          initialValues={
            active
              ? { id: active.id, name: active.name, columns: active.columns }
              : {
                  id: uuidv4(),
                  name: "",
                  columns: [
                    { id: uuidv4(), name: "Alert Handling", tasks: [] },
                    { id: uuidv4(), name: "Issue Tracking", tasks: [] },
                    { id: uuidv4(), name: "Enrichment", tasks: [] },
                    { id: uuidv4(), name: "User Interaction", tasks: [] },
                    { id: uuidv4(), name: "Response", tasks: [] },
                    { id: uuidv4(), name: "Continuity", tasks: [] },
                    { id: uuidv4(), name: "Procedural", tasks: [] },
                  ],
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
                  placeholder="e.g ACME Corp capabilities"
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-bold">Columns</label>
                <FieldArray
                  name="columns"
                  render={(arrayHelpers) => (
                    <div>
                      {values.columns &&
                        values.columns.length > 0 &&
                        values.columns.map((task: IColumn, index: number) => (
                          <SubtaskInput
                            key={task.id}
                            index={index}
                            name={`columns.${index}.name`}
                            arrayHelpers={arrayHelpers}
                          />
                        ))}
                      <button
                        aria-label="Add column"
                        className="bg-white mt-3 font-bold text-sm text-primary p-2 w-full rounded-full"
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            id: Number(uuidv4()),
                            name: "",
                            tasks: [],
                          });
                        }}
                      >
                        + Add new category
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
                aria-label="Board"
                className="bg-primary p-2 w-full text-sm rounded-full"
                type="submit"
              >
                {active ? "Update" : "Create"} board
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddBoard;
