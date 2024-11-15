const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-90 flex justify-center items-center">
      <div className="bg-black h-full lg:h-3/4 p-5 rounded-xl shadow-lg w-full lg:w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 text-white right-2 text-3xl font-bold hover:bg-slate-700 rounded-full pb-1 px-3 hover:bg-opacity-40"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
