"use client";

import { useEffect, useState } from "react";

const Dates = () => {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const today = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      });
      setDate(today);
    }, 0); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p className="text-xs text-gray-500 font-medium">{date}</p>
    </div>
  );
};

export default Dates;
