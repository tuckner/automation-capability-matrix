import { Dispatch, SetStateAction, useContext, useState } from "react";
import { MdLightMode, MdVisibilityOff } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import Icon from "components/Icon";
import ToggleBtn from "components/ToggleBtn";
import { AppContextType, IBoard } from "types";
import AddBoard from "components/Board/AddBoard";
import Modal from "components/Modal";

type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  active: IBoard;
  setIsActive: Dispatch<SetStateAction<IBoard>>;
  board: IBoard[];
};

export default function index({
  board,
  active,
  setIsActive,
  show,
  setShow,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {show && (
        <div
          className={`z-10 text-gray bg-white dark:bg-secondary border-r-[1px] 
    border-gray/20 pt-4 pr-4 pb-24 flex 
        flex-col justify-between fixed left-0 h-screen w-72`}
        >
          <div>
            <p className="pl-6 py-2 text-xs">ALL BOARDS({board.length})</p>
            <div className="">
              {board && (
                <>
                  {board.map((options, index) => {
                    return (
                      <div
                        key={index}
                        className={`py-3 px-6 flex items-center gap-x-4 font-bold cursor-pointer ${`${
                          active.name === options.name
                            ? "bg-primary rounded-r-full text-white"
                            : "hover:bg-primary/20 rounded-r-full"
                        } `} `}
                        onClick={() => {
                          setIsActive(options);
                        }}
                      >
                        <Icon type="board" />
                        {options.name}
                      </div>
                    );
                  })}
                </>
              )}

              <div
                onClick={() => {
                  setIsOpen(true);
                }}
                className="pl-6 my-2 font-bold cursor-pointer text-primary hover:opacity-20"
              >
                + Create New Board
              </div>
            </div>
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
              className="cursor-pointer border-none inline-flex items-center gap-x-2 text-xs my-4"
            >
              <MdVisibilityOff /> Hide Sidebar
            </button>
          </div>
        </div>
      )}

      <Modal open={isOpen} handleClose={() => setIsOpen(false)}>
        <AddBoard handleClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
