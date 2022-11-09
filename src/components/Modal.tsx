import { Dispatch, SetStateAction, useState } from "react";
type Props = {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
};

export default function Modal({ children, open, handleClose }: Props) {
  return (
    <>
      {open && (
        <>
          <div
            onClick={handleClose}
            className="z-20 bg-black/70 fixed -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%] w-screen h-screen"
          />
          <div className=" z-30 rounded-lg p-6 w-[28rem] fixed bg-white dark:bg-secondary -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%]">
            {children}
          </div>
        </>
      )}
    </>
  );
}
