import {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from "react";
import "./style.css";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { AppContext } from "../../context";
import { AppContextType, IColumn } from "../../types";

interface Props {
  selectedStatus: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

export default function index({ selectedStatus, setStatus }: Props) {
  const { active } = useContext(AppContext) as AppContextType;
  const [isOpen, setOpen] = useState(false);
  const [columns, setColumn] = useState<IColumn[]>(active.columns);

  useEffect(() => {
    let columnData = active.columns.filter((subitem) => subitem.name);
    setColumn(columnData);
    columnData.find((item, index) =>
      index === 0 ? setStatus(item.name) : null
    );
  }, [active]);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (title: string) => {
    setStatus(title);
    setOpen(false);
    
    // active.columns.find((o)=>o.)
  };

  return (
    <div className="dropdown">
      <div
        className={`dropdown-header dark:bg-secondary-dark relative ${
          isOpen && "border-2 border-primary"
        }`}
        onClick={toggleDropdown}
      >
        <p className="text-sm">
          {" "}
          {selectedStatus
            ? selectedStatus
            : columns.find((item, index) => index === 0)?.name}
        </p>
        {isOpen ? (
          <BiChevronDown className={`icon ${isOpen && "open"}`} />
        ) : (
          <BiChevronUp className={`icon ${isOpen && "open"}`} />
        )}
        {isOpen && (
          <div className={`dropdown-body bg-offwhite dark:bg-secondary-dark `}>
            {columns.map((item, i) => (
              <div
                className={`dropdown-item text-sm px-4 py-2 hover:text-primary cursor-pointer ${
                  i < 2 && "border-b-[1px] border-gray/20"
                }`}
                onClick={(e) =>
                  handleItemClick(
                    String(e.currentTarget.getAttribute("data-title"))
                  )
                }
                key={i}
                data-title={item.name}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
