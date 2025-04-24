const CircularProgressBar = ({
  progress,
  time,
  handleStart,
  handlePause,
  handleReset,
  isRunning,
  handleCloseModal,
  formatTime,
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-full max-w-xs aspect-square flex items-center justify-center text-gray-700">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-300"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />

        <circle
          className="text-indigo-600"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
      </svg>
      <div className="absolute space-y-3 flex flex-col items-center justify-center">
        <p className="text-[3rem] font-bold">{formatTime(time)}</p>
        <div className="space-x-3 ">
          {!isRunning && (
            <button
              className="border-2 border-green-600 rounded-full p-3"
              onClick={handleStart}
            >
              Start
            </button>
          )}
          {isRunning && (
            <button
              className="border-2 border-indigo-600 rounded-full p-3"
              onClick={handlePause}
            >
              Pause
            </button>
          )}
          <button
            className="border-2 border-red-600 rounded-full p-3"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 text-gray-900 hover:text-gray-700 "
        onClick={() => handleCloseModal()}
      >
        Close{" "}
      </button>
    </div>
  );
};

export default CircularProgressBar;
