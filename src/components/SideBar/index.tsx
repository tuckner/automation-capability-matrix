import { Dispatch, SetStateAction, useState } from "react";
import { MdLightMode, MdVisibilityOff } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import Icon from "components/Icon";
import ToggleBtn from "components/ToggleBtn";

type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  active: string;
  setIsActive: Dispatch<SetStateAction<string>>;
};

export default function index({ active, setIsActive, show, setShow }: Props) {
  const NavItem = [
    { id: 0, title: "Platform Launch", link: "" },
    { id: 1, title: "Marketing Plan", link: "" },
    { id: 2, title: "Road Map", link: "" },
    {
      id: 3,
      title: " + Create New Board",
      link: "",
    },
  ];
  return (
    <>
      {show && (
        <div
          className={`text-gray bg-white dark:bg-secondary border-r-[1px] 
    border-gray/20 pt-4 pr-4 pb-24 flex 
        flex-col justify-between fixed left-0 h-screen w-72`}
        >
          <div>
            <p className="pl-6 py-2 text-xs">ALL BOARDS(3)</p>
            <>
              {NavItem.map((options) => {
                return (
                  <div
                    key={options.id}
                    className={`py-3 px-6 flex items-center gap-x-4 font-bold cursor-pointer ${
                      options.id === 3
                        ? "text-primary hover:opacity-20"
                        : `${
                            active === options.title
                              ? "bg-primary rounded-r-full text-white"
                              : "hover:bg-primary/20 rounded-r-full"
                          } `
                    } `}
                    onClick={() => {
                      setIsActive(options.title);
                    }}
                  >
                    <Icon type="board" />
                    {options.title}
                  </div>
                );
              })}
            </>
          </div>
          <div className="mx-auto w-4/5 mb-4">
            <div
              className="flex items-center text-xs gap-x-6 p-2 bg-secondary-dark 
      justify-center rounded-md"
            >
              <MdLightMode />
              <ToggleBtn />
              <BsMoonStarsFill />
            </div>
            <button
              onClick={() => {
                setShow(false);
              }}
              className="cursor-pointer inline-flex items-center gap-x-2 text-xs my-4"
            >
              <MdVisibilityOff /> Hide Sidebar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
