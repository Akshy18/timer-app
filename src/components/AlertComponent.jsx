import React from "react";

const AlertComponent = ({ onCancel, header, text , activity }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm border ${header === 'Reminder !!!' ? 'border-indigo-600' : 'border-green-600'}  max-w-md w-full mx-4`}>
        <h2 className={`text-2xl font-bold ${header === 'Reminder !!!' ? 'text-indigo-700' : 'text-green-700'}  mb-4 text-center`}>
          {header}
        </h2>
        <p className="text-gray-700 text-center">
            {text}
        
        </p>
        <p className="text-gray-700 text-center mb-6 font-medium">
          {activity[0].toUpperCase() + activity.slice(1)}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={()=>onCancel(header)}
            className={`${header === 'Reminder !!!' ? 'bg-red-700 hover:bg-red-600 ' : 'bg-green-700 hover:bg-green-600 '} text-white py-2 px-6 rounded-lg transition-all duration-200 font-medium flex-1 sm:flex-none`}
          >
           {header === 'Reminder !!!' ? 'Cancel' : 'Ok'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;