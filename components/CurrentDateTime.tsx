"use client";
import React, { useEffect } from "react";

const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col gap-2 max-md:p-10">
      <h1 className="text-4xl font-extrabold lg:text-4xl">
        {currentDateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h1>
      <p className="text-lg font-medium text-sky-1 lg-text-2xl">
        {currentDateTime.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default CurrentDateTime;
