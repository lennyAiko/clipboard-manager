import React from "react";

const ClearButton = (props) => {
  async function clear() {
    console.log("clicked");
    await props.onClick();
  }
  return (
    <div className="flex justify-end w-full text-white">
      <button
        onClick={() => clear()}
        className="hover:bg-gray-600 font-medium bg-gray-400 duration-200 transition-all m-2 px-3.5 py-1.5 rounded-lg w-fit"
      >
        clear all
      </button>
    </div>
  );
};

export default ClearButton;