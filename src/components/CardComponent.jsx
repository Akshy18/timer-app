import React from "react";
import Timer from "./timer.jsx";

const CardComponent = ({ name, seconds, handleDelete, category, id }) => {
  return (
    <div
      className={` w-full flex items-center p-4 border-b-2 rounded-xl border-gray-400 shadow-xl h-[15vh] ${
        window.innerWidth <= 640 && "flex-col "
      }`}
    >
      <div
        className={`text-lg font-medium md:text-xl 2xl:min-w-[30rem] truncate ${
          window.innerWidth <= 640 ? "w-full text-center" : "w-[20rem] "
        } `}
      >
        {name}
      </div>
      <Timer
        seconds={seconds}
        handleDelete={handleDelete}
        name={name}
        category={category}
        id={id}
      />
    </div>
  );
};

export default CardComponent;
