import React from 'react';
import Button from './Button';

const Modal: React.FC<{
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ children, setOpen }) => {
  return (
    <div
      className="absolute inset-0 bg-primary-green bg-opacity-30 backdrop-blur-md w-full h-full z-10"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black opacity-30" />
      <div className="absolute inset-0 backdrop-blur-s flex flex-col items-center justify-center">
        <div className="relative">
          <Button
            className="px-1.5 py-0.5 absolute top-1 right-4 z-10 text-white font-bold text-2xl leading-none !min-w-0"
            color="red"
            size="content-fit"
            onClick={() => setOpen(false)}
            text="×"
          />

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
