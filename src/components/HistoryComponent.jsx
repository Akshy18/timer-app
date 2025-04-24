import { useState } from "react";

const HistoryComponent = () => {
  const [historyItems, setHistoryItems] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const handleDelete = (index) => {
    const updatedHistory = [...historyItems];
    updatedHistory.splice(index, 1);

    setHistoryItems(updatedHistory);

    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center bg-gray-100">
        {historyItems.length === 0 && (
          <div className="h-[80vh] w-full flex items-center justify-center text-2xl font-bold text-gray-500">
            No history available
          </div>
        )}

        {historyItems.map((item, index) => (
          <div
            key={index}
            className="h-[10vh] w-[80%] flex items-center p-4 border-b-2 rounded-xl border-gray-400 shadow-xl justify-between mx-3"
          >
            <div className=" text-2xl">
              {index + 1}. {item.name}
            </div>
            <div className="flex items-center space-x-4">
              <div className=" text-2xl font-bold mr-5">
                {item.formatedTime}
              </div>
              <button
                onClick={handleDelete}
                className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
