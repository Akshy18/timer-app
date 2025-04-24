import { useState } from "react";

const HistoryComponent = () => {
  // Grab history items from local storage or use empty array if none exist
  const [historyItems, setHistoryItems] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const handleDelete = (index) => {
    // Create a copy of our history array so we don't modify state directly
    const updatedHistory = [...historyItems];

    // Remove the selected item from our history
    updatedHistory.splice(index, 1);

    // Update our state with the new history (item removed)
    setHistoryItems(updatedHistory);

    // Save the updated history back to local storage
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center bg-gray-100">
        {/* Show a message when history is empty */}
        {historyItems.length === 0 && (
          <div className="h-[80vh] w-full flex items-center justify-center text-2xl font-bold text-gray-500">
            No history available
          </div>
        )}

        {/* Map through and display each history item */}
        {historyItems.map((item, index) => (
          <div
            key={index}
            className="h-[10vh] w-[90%] flex items-center p-4 border-b-2 rounded-xl border-gray-400 shadow-xl justify-between mx-3"
          >
            <div className="sm:text-xl md:text-2xl text-sm font-medium">
              {index + 1}. {item.name}
            </div>
            <div className="flex items-center space-x-4">
              <div className=" sm:text-xl md:text-2xl text-sm font-bold mr-5">
                {item.formatedTime}
              </div>
              <button
                onClick={()=>handleDelete(index)}
                className="md:px-3 md:py-2 py-1 px-2  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HistoryComponent;