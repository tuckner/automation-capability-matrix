import { Dispatch, SetStateAction, useState } from "react";
import { MdLightMode, MdVisibilityOff } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import Icon from "components/Icon";
import ToggleBtn from "components/ToggleBtn";
import { IBoard } from "types";
import AddBoard from "components/Board/AddBoard";
import Modal from "components/Modal";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { appData, activeItem } from "redux/boardSlice";

interface Props {
setShowSidebar?: Dispatch<SetStateAction<boolean>>;
  handleClose?: () => void;
}

export default function Index({setShowSidebar, handleClose }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const data = useSelector(appData);
  const active: IBoard = data.active;
  const board: IBoard[] = data.board;

  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });

  return (
    <>
      <div
        className={`text-gray bg-white dark:bg-secondary ${
          isMobile && "pr-4 pb-24 border-r-[1px] border-gray/20"
        } 
     pt-4 flex 
        flex-col justify-between h-full left-0`}
      >
        <div>
          <p className="pl-6 py-2 text-xs">ALL BOARDS ({board.length})</p>
          <div>
            {board && (
              <>
                {board.map((options: IBoard) => {
                  return (
                    <div
                      key={options.id}
                      className={`py-3 px-6 flex items-center gap-x-4 font-bold cursor-pointer ${`${
                        active.id === options.id
                          ? "bg-primary rounded-r-full text-white"
                          : "hover:bg-primary/20 rounded-r-full"
                      } `} `}
                      onClick={() => {
                        dispatch(activeItem(options));
                        if (handleClose) {
                          handleClose();
                        }
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
        <div>
          {isMobile && (
            <button
              aria-label="GitHub"
              onClick={() => {
                window.open("https://github.com/tuckner/automation-capability-matrix", "_blank");
              }} 
              className="cursor-pointer border-none inline-flex items-center gap-x-2 text-xs my-4"
            >
            View GitHub
            </button>
          )}
          </div>
          <div
            className="flex items-center text-xs gap-x-6 p-2 bg-secondary-dark 
      justify-center rounded-md"
          >
            <MdLightMode />
            <ToggleBtn />
            <BsMoonStarsFill />
          </div>
          {isMobile && (
            <button
              aria-label="Hide Sidebar"
              onClick={() => {
          setShowSidebar ?setShowSidebar(false) : null;
              }}
              className="cursor-pointer border-none inline-flex items-center gap-x-2 text-xs my-4"
            >
              <MdVisibilityOff /> Hide Sidebar
            </button>
          )}
        </div>
      </div>

      <Modal open={isOpen} handleClose={() => setIsOpen(false)}>
        <AddBoard handleClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
