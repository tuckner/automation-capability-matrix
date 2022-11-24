import Icons from "../assets/icons";

type IconType = { type: string };
const allIcons: any = Icons;

const Icon = ({ type }: IconType, props: any) => {
  const selectedIcon = allIcons[type];
  return selectedIcon ? selectedIcon(props) : null;
};

export default Icon;
