import { Dispatch, SetStateAction } from "react";
type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
};

export default function Modal({ children, setIsOpen }: Props) {
  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className="z-10 bg-black/70 fixed -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%] w-screen h-screen"
      />
      <div className=" z-20 rounded-lg p-6 w-[28rem] fixed bg-white dark:bg-secondary -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%]">
        {children}
      </div>
    </>
  );
}
