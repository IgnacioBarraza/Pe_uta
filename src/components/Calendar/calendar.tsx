import "./calendar.css";
import { useState, useEffect } from "react";

interface CalendarioProps {
  year: number;
  month: number;
}

export default function Calendario({ year, month }: CalendarioProps) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);

  const handleResponsive = () => {
    setIsSmallScreen(window.innerWidth <= 1050);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResponsive);

    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, [isSmallScreen]);

  return (
    <div className={`${isSmallScreen ? "calendar-mobile" : "calendar"}`}>
      {daysOfWeek.map((day) => (
        <div key={day} className="day day-of-week">
          {day}
        </div>
      ))}
      {Array.from({ length: firstDayOfWeek }, (_, index) => (
        <div key={`empty${index}`} className="empty-day">
          &nbsp;
        </div>
      ))}
      {Array.from({ length: daysInMonth }, (_, index) => (
        // to change the day of the science fair, change the number 24 with the day of the science of the year
        <div key={index + 1} className={`day ${index + 1 === 24 ? 'with-circle' : ''}`}>
          {index + 1}
        </div>
      ))}
    </div>
  );
}
