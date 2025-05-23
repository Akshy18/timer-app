import React, { useState, useRef, useEffect } from "react";
import CircularProgressBar from "./CircularProgressBar.jsx";
import AlertComponent from "./AlertComponent.jsx";

const Timer = ({ seconds, handleDelete, name, category, id }) => {
  // Initialize time state from localStorage or use props.seconds as default
  const [time, setTime] = useState(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timerStates")) || {};
    return savedTimers[id]?.time !== undefined ? savedTimers[id].time : seconds;
  });

  // Initialize running state from localStorage, preventing auto-start for completed timers
  const [isRunning, setIsRunning] = useState(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timerStates")) || {};
    const savedTime = savedTimers[id]?.time !== undefined ? savedTimers[id].time : seconds;
    return savedTime > 0 ? (savedTimers[id]?.isRunning || false) : false;
  });

  // Ref to store interval ID for cleanup
  const timerRef = useRef(null);
  
  // Calculate progress percentage (0-100) from localStorage or compute it
  const [progress, setProgress] = useState(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timerStates")) || {};
    if (savedTimers[id]?.progress !== undefined) {
      return savedTimers[id].progress;
    } else {
      return time > 0 ? (time / seconds) * 100 : 0;
    }
  });
  
  // UI state for modal and alerts
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  // Save timer state to localStorage whenever time, isRunning or progress changes
  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timerStates")) || {};

    // Ensure isRunning is false if time is 0
    const currentIsRunning = time === 0 ? false : isRunning;
    
    if (time === 0 && isRunning) {
      setIsRunning(false);
    }
    
    // Update localStorage with current timer state
    savedTimers[id] = { 
      time, 
      isRunning: currentIsRunning, 
      progress 
    };
    localStorage.setItem("timerStates", JSON.stringify(savedTimers));
  }, [time, isRunning, progress, id]);

  // Main timer logic - handles countdown, progress updates, and alerts
  useEffect(() => {
    // Start the timer if it should be running
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            const newTime = prevTime - 1;
            setProgress((newTime / seconds) * 100);
            
            // Show halfway alert when appropriate
            newTime === Math.floor(seconds/2) && setHalfwayAlert(true);
            return newTime;
          }
        });
      }, 1000);
    } else if (time === 0 && isRunning) {
      // Timer just finished - show completion alert and record history
      console.log('helooo finished');
      setHalfwayAlert(false);
      setAlertModal(true);
      handleHistory(name, seconds);
      setIsRunning(false);
    }

    // Cleanup function to clear interval when component unmounts or deps change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, time, seconds]);

  // Handle category-wide actions (StartAll, PauseAll, ResetAll)
  useEffect(() => {
    if (category[1] === "StartAll") {
      if (time > 0) {
        handleStart();
      }
    }
    if (category[1] === "PauseAll") {
      handlePause();
    }
    if (category[1] === "ResetAll") {
      handleReset();
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [category[1]]);

  // Format seconds into human-readable time string (H:MM:SS or MM:SS)
  const formatTime = (seconds) => {
    seconds = Number(seconds);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

    // For times less than a minute, just show seconds
    if (seconds < 60) {
      return `${secs}`;
    }

    // For times less than an hour, show MM:SS
    if (hours === 0) {
      return `${minutes}:${formattedSecs}`;
    }

    // For times with hours, show HH:MM:SS
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSecs}`;
  };

  // Record completed timers to history in localStorage
  const handleHistory = (name, seconds) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const existingEntryIndex = history.findIndex(
      (entry) => entry.name === name
    );
    const formatedTime = formatTime(seconds);
    
    // Update existing entry or add new one
    if (existingEntryIndex !== -1) {
      history[existingEntryIndex] = { name, formatedTime };
    } else {
      history.push({ name, formatedTime });
    }
    localStorage.setItem("history", JSON.stringify(history));
  };

  // Timer control functions
  const handleStart = () => {
    // Only start if timer isn't already running and has time left
    if (!isRunning && time > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setProgress(100);
    setIsRunning(false);
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTime(seconds);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  // Delete timer and clean up its localStorage entry
  const toDelete = (e) => {
    // Pause timer first if it's running
    if (isRunning) {
      handlePause();
    }

    // Remove from localStorage
    const savedTimers = JSON.parse(localStorage.getItem("timerStates")) || {};
    delete savedTimers[id];
    localStorage.setItem("timerStates", JSON.stringify(savedTimers));
    
    // Call parent delete handler
    handleDelete(category[0], id);
  };

  // Close alert modals
  const onCancel = (name) => {
    name === 'Reminder !!!' ? setHalfwayAlert(false) : setAlertModal(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pt-2 space-x-4">
        {/* Progress bar - only shown on larger screens */}
        {window.innerWidth > 640 && 
          <div className="h-2 w-[40%] bg-gray-400 min-w-[30%] rounded-md">
            <div
              className="h-full bg-indigo-600 rounded-md"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        }
        
        {/* Time display */}
        <div className="sm:text-xl md:text-2xl text-sm font-bold">{formatTime(time)}</div>
        
        {/* Status indicator */}
        <div
          className={`${
            isRunning && time > 0
              ? "text-indigo-600"  // Blue for running
              : time === 0
              ? "text-green-600"   // Green for completed
              : "text-red-600"     // Red for paused
          }`}
        >
          {isRunning && time > 0 ? "Running" : time === 0 ? "Completed" : "Paused"}
        </div>
        
        {/* Action buttons */}
        <div className="space-x-3 flex items-center justify-center">
          <button
            className="md:px-3 md:py-2 py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsOpenModal((prev) => !prev)}
          >
            Focus
          </button>
          <button
            className="md:px-3 md:py-2 py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={(e) => toDelete(e)}
          >
            X
          </button>
        </div>
      </div>
      
      {/* Focus mode modal with circular progress */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-50">
          <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-lg border-2 border-gray-400 p-4 flex flex-col items-center justify-center">
            <CircularProgressBar
              progress={progress}
              time={time}
              handleStart={handleStart}
              handlePause={handlePause}
              handleReset={handleReset}
              isRunning={isRunning}
              handleCloseModal={handleCloseModal}
              formatTime={formatTime}
            />
          </div>
        </div>
      )}
      
      {/* Alert modals */}
      {halfwayAlert && <AlertComponent text={'You are Halfway there, keep up!'} onCancel={onCancel} activity={name} header={'Reminder !!!'} />}
      {alertModal && <AlertComponent text={'you have completed your Activity'} onCancel={onCancel} activity={name} header={'congratulations 🎉'} />}
    </div>
  );
};

export default Timer;