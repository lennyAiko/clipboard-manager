import React from "react";

const ClearButton = (props) => {
  async function clear() {
    await props.onClick();
  }

  return (
    <div className="flex justify-end w-full text-white">
      <button
        onClick={() => clear()}
        className="hover:bg-blue-600 font-medium bg-blue-700 duration-200 transition-all m-2 px-3.5 py-1.5 rounded-lg w-fit"
      >
        clear all
      </button>
    </div>
  );
};

export default ClearButton;
