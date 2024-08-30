import React, { useEffect } from "react";
import Button from "./Button";

const Modal: React.FC<{
  children: React.ReactNode;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ children, setOpen }) => {

  // Prevent scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed h-screen inset-0 bg-primary-green bg-opacity-30 backdrop-blur-md z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" />
      <div className="relative">
        {setOpen && (
          <Button
            className="!px-1.5 !py-0.5 absolute top-1 right-4 z-10 text-black font-bold text-2xl leading-none !min-w-0"
            color="red"
            size="content-fit"
            onClick={() => setOpen(false)}
            text="×"
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
