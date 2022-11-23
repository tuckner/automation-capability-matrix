type Props = {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  showDowndrop?: Boolean;
};

export default function Modal({
  children,
  open,
  handleClose,
  showDowndrop,
}: Props) {
  return (
    <>
      {open && (
        <>
          <div
            onClick={handleClose}
            className="z-30 bg-black/70 fixed -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%] w-screen h-screen"
          />
          <div
            className={`z-30 rounded-lg ${
              showDowndrop
                ? " w-72 p-2 top-[13rem]"
                : "w-[28rem] p-6  top-[50%] "
            }  fixed bg-white dark:bg-secondary 
            -translate-y-[50%] -translate-x-[50%] left-[50%] rounded-lg`}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
}
