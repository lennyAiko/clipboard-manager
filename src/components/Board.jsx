import React from "react";

const Board = (props) => {
  console.log(props);
  const items = props.items;
  const clicker = (text) => {
    console.log(text);
  };
  return (
    <div className="flex flex-col justify-center w-full align-center">
      {items.map((item, index) => (
        <div
          className="cursor-pointer rounded-xl mx-3 my-1.5 p-3 bg-blue-600 text-white h-28 overflow-hidden text-wrap active:scale-95 select-none active:bg-blue-400 duration-200 transition-all"
          onClick={() => clicker(item)}
          key={index}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Board;
