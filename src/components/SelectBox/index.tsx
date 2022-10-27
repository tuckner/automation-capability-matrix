import { useState } from "react";
import "./style.css";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

export default function index() {
  interface Idata {
    id: number; 
    label: string;
  }
  const data = [
    { id: 0, label: "Todo" },
    { id: 1, label: "Doing" },
    { id: 2, label: "Done" },
  ];

  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState<Idata[]>(data);
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (id: number) => {
    selectedItem === id ? setSelectedItem(selectedItem) : setSelectedItem(id);
  };

  return (
    <div className="dropdown">
      <div
        className={`dropdown-header dark:bg-secondary-dark ${
          isOpen && "border-2 border-primary"
        }`}
        onClick={toggleDropdown}
      >
        <p className="text-sm">
          {" "}
          {items.find((item) => item.id === selectedItem)?.label}
        </p>
        {isOpen ? (
          <BiChevronDown className={`icon ${isOpen && "open"}`} />
        ) : (
          <BiChevronUp className={`icon ${isOpen && "open"}`} />
        )}
      </div>
      {isOpen && (
        <div className={`dropdown-body bg-offwhite dark:bg-secondary-dark`}>
          {items.map((item) => (
            <div
              className={`dropdown-item text-sm px-4 py-2 hover:text-primary cursor-pointer ${
                item.id < 2 && "border-b-[1px] border-gray/20"
              }`}
              onClick={(e) =>
                handleItemClick(Number(e.currentTarget.getAttribute("data-id")))
              }
              key={item.id}
              data-id={item.id}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
