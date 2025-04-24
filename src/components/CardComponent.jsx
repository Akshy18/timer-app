import React from "react";
import Timer from "./timer.jsx";

// Card component that displays a task with a timer
const CardComponent = ({ name, seconds, handleDelete, category, id }) => {
  return (
    // Main card container with responsive layout
    // On mobile (<=640px), switches to column layout
    <div
      className={`w-full flex items-center p-4 border-b-2 rounded-xl border-gray-400 shadow-xl h-[15vh] ${
        window.innerWidth <= 640 && "flex-col"
      }`}
    >
      {/* Task name section - truncates long text */}
      <div
        className={`text-lg font-medium md:text-xl 2xl:min-w-[30rem] truncate min-h-[2rem] ${
          // On mobile, takes full width with centered text
          // On larger screens, fixed width
          window.innerWidth <= 640 ? "w-full text-center" : "w-[20rem]"
        }`}
      >
        {name}  {/* Display the task name */}
      </div>

      {/* Timer component with all necessary props */}
      <Timer
        seconds={seconds}        // Initial time in seconds
        handleDelete={handleDelete}  // Delete callback function
        name={name}              // Task name (for identification)
        category={category}      // Task category
        id={id}                  // Unique identifier
      />
    </div>
  );
};

export default CardComponent;