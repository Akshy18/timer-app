const CircularProgressBar = ({
  progress,    // Current progress (0-100)
  time,        // Current time in seconds
  handleStart, // Function to start the timer
  handlePause, // Function to pause the timer
  handleReset, // Function to reset the timer
  isRunning,   // Boolean to track if timer is running
  handleCloseModal, // Function to close the modal
  formatTime,  // Function to format seconds into readable time
}) => {
  // Set radius for the SVG circle
  const radius = 45;
  
  // Calculate the full circumference of the circle
  const circumference = 2 * Math.PI * radius;
  
  // Calculate how much of the circle to fill based on progress
  // As progress decreases, more of the circle is "unfilled"
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative w-full max-w-xs aspect-square flex items-center justify-center text-gray-700">
      {/* SVG container for the circular progress bar */}
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle (gray) */}
        <circle
          className="text-gray-300"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        
        {/* Foreground circle (colored) that shows progress */}
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
            strokeDasharray: circumference,  // Set the length of dashes to full circumference
            strokeDashoffset,                // Offset determines how much is visible
            transform: "rotate(-90deg)",     // Rotate so progress starts from top
            transformOrigin: "50% 50%",      // Rotate around center
            transition: "stroke-dashoffset 0.5s ease-in-out", // Smooth animation
          }}
        />
      </svg>
      
      {/* Center content - time display and control buttons */}
      <div className="absolute space-y-3 flex flex-col items-center justify-center">
        {/* Display formatted time in large font */}
        <p className="text-[3rem] font-bold">{formatTime(time)}</p>
        
        {/* Control buttons */}
        <div className="space-x-3 ">
          {/* Show Start button when timer is not running */}
          {!isRunning && (
            <button
              className="border-2 border-green-600 rounded-full p-3"
              onClick={handleStart}
            >
              Start
            </button>
          )}
          
          {/* Show Pause button when timer is running */}
          {isRunning && (
            <button
              className="border-2 border-indigo-600 rounded-full p-3"
              onClick={handlePause}
            >
              Pause
            </button>
          )}
          
          {/* Always show Reset button */}
          <button
            className="border-2 border-red-600 rounded-full p-3"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      
      {/* Close button in top-right corner */}
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