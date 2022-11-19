import Icons from "../assets/icons";

type IconType = { type: string };
const allIcons: any = Icons;

const Icon = ({ type }: IconType, props: any) => {
  const selectedIcon = allIcons[type];
  return selectedIcon ? selectedIcon(props) : null;
};

export default Icon;




// const addTaskHandler = (values: ITask) => {
//   values.status = selectedStatus;
//   const foundDuplicate = checkDuplicates(values, active);
//   foundDuplicate ? (
//     <p>Item already exist</p>
//   ) : (
//     dispatch(dispatch(addTask(values)))
//   );
//   handleClose();
// };

// const editTaskHandler = (values: ITask) => {
//   if (values.status === selectedStatus) {
//     const foundDuplicate = checkDuplicates(values, active);
//     foundDuplicate ? (
//       <p>Item already exist</p>
//     ) : (
//       dispatch(editTask({ values, tasks }))
//     );
//   } else {
//     values.status = selectedStatus;
//     const foundDuplicate = checkDuplicates(values, active);
//     foundDuplicate ? (
//       <p>Item already exist</p>
//     ) : (
//       (dispatch(addTask(values)), dispatch(deleteTask(tasks)))
//     );
//   }
//   handleClose();
// };
