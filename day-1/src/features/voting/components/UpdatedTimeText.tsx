import { useState, useEffect } from "react";

export default function UpdatedTimeText() {
  const [elapsedTime, setElapsedTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const refreshTime = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - refreshTime) / 1000); // in seconds

      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;

      setElapsedTime({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const parts = [];

    if (elapsedTime.hours > 0) {
      parts.push(
        `${elapsedTime.hours} hour${elapsedTime.hours > 1 ? "s" : ""}`,
      );
    }
    if (elapsedTime.minutes > 0) {
      parts.push(
        `${elapsedTime.minutes} minute${elapsedTime.minutes > 1 ? "s" : ""}`,
      );
    }
    parts.push(
      `${elapsedTime.seconds} second${elapsedTime.seconds !== 1 ? "s" : ""}`,
    );

    return parts.join(", ");
  };

  return (
    <p>
      <span>{formatTime()}</span> ago
    </p>
  );
}
