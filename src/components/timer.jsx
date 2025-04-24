import React, { useState, useRef, useEffect } from "react";
import CircularProgressBar from "./CircularProgressBar.jsx";

const Timer = ({ seconds, handleDelete, name, category, id }) => {
  const [time, setTime] = useState(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timerStates")) || {};
    return savedTimers[id]?.time !== undefined ? savedTimers[id].time : seconds;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timerStates")) || {};
    return savedTimers[id]?.isRunning || false;
  });

  const timerRef = useRef(null);
  const [progress, setProgress] = useState(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timerStates")) || {};
    return savedTimers[id]?.progress !== undefined
      ? savedTimers[id].progress
      : 100;
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timerStates")) || {};
    savedTimers[id] = { time, isRunning, progress };
    localStorage.setItem("timerStates", JSON.stringify(savedTimers));
  }, [time, isRunning, progress, id]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            setProgress(((prevTime - 1) / seconds) * 100);
            return prevTime - 1;
          }
          setProgress(0);
          handleHistory(name, seconds);
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsRunning(false);
          return 0;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (category[1] === "StartAll") {
      handleStart();
    }
    if (category[1] === "PauseAll") {
      handlePause();
    }
    if (category[1] === "ResetAll") {
      handleReset();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [category[1]]);

  const formatTime = (seconds) => {
    seconds = Number(seconds);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

    if (seconds < 60) {
      return `${secs}`;
    }

    if (hours === 0) {
      return `${minutes}:${formattedSecs}`;
    }

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSecs}`;
  };

  const handleHistory = (name, seconds) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const existingEntryIndex = history.findIndex(
      (entry) => entry.name === name
    );
    const formatedTime = formatTime(seconds);
    if (existingEntryIndex !== -1) {
      history[existingEntryIndex] = { name, formatedTime };
    } else {
      history.push({ name, formatedTime });
    }
    localStorage.setItem("history", JSON.stringify(history));
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            setProgress(((prevTime - 1) / seconds) * 100);

            return prevTime - 1;
          }
          setProgress(0);
          handleHistory(name, seconds);
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsRunning(false);
          return 0;
        });
      }, 1000);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
      timerRef.current = null;
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

  const toDelete = (e) => {
    if (isRunning) {
      handlePause();
    }

    const savedTimers = JSON.parse(localStorage.getItem("timerStates")) || {};
    delete savedTimers[id];
    localStorage.setItem("timerStates", JSON.stringify(savedTimers));
    handleDelete(category[0], id);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-4 space-x-4">
        <div className="h-2 w-[40%] bg-gray-400 min-w-[30%] rounded-md">
          <div
            className="h-full bg-indigo-600 rounded-md"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-2xl font-bold">{formatTime(time)}</div>
        <div
          className={`${
            isRunning
              ? "text-indigo-600"
              : time === 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {isRunning ? "Running" : time === 0 ? "Completed" : "Paused"}
        </div>
        <div className="space-x-3 flex items-center justify-center">
          <button
            className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsOpenModal((prev) => !prev)}
          >
            Focus
          </button>
          <button
            className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={(e) => toDelete(e)}
          >
            X
          </button>
        </div>
      </div>
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
    </div>
  );
};

export default Timer;
