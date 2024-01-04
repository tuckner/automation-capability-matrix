import { useMediaQuery } from "react-responsive";
interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  showDowndrop?: boolean;
}

export default function Modal({
  children,
  open,
  handleClose,
  showDowndrop,
}: Props) {
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });

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
                : `${!isMobile && 'w-[22rem]'} w-[34rem] p-6 top-[50%]`
            } overflow-auto fixed bg-white dark:bg-secondary 
            max-h-[calc(100vh-10rem)] -translate-y-[50%] -translate-x-[50%] left-[50%]`}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
}
