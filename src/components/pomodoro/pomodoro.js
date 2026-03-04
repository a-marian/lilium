import { useEffect, useRef, useState } from "react";
import "./pomodoro.css";

const WORK_DURATION_SECONDS = 25 * 60;
const BREAK_DURATION_SECONDS = 5 * 60;

const PomodoroTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkInterval, setIsWorkInterval] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        const nextIsWork = !isWorkInterval;
        setIsWorkInterval(nextIsWork);
        return nextIsWork ? WORK_DURATION_SECONDS : BREAK_DURATION_SECONDS;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, isWorkInterval]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWorkInterval(true);
    setSecondsLeft(WORK_DURATION_SECONDS);
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const modeLabel = isWorkInterval ? "Focus time" : "Break time";

  return (
    <div className="pomodoro">
      <div className="pomodoro-header">
        <span className="pomodoro-title">Pomodoro timer</span>
        <span
          className={`pomodoro-mode ${
            isWorkInterval ? "pomodoro-mode-work" : "pomodoro-mode-break"
          }`}
        >
          {modeLabel}
        </span>
      </div>

      <div className="pomodoro-time">
        {minutes}:{seconds}
      </div>

      <div className="pomodoro-controls">
        <button
          type="button"
          className="pomodoro-button pomodoro-button-primary"
          onClick={handleStartPause}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          className="pomodoro-button pomodoro-button-secondary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <p className="pomodoro-hint">
        Use 25 minutes to focus, then enjoy a 5 minute break.
      </p>
    </div>
  );
};

export default PomodoroTimer;

