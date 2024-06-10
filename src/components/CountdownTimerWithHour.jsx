import React, { useState, useEffect } from 'react';
import { differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const CountdownTimerWithHour = () => {
  // Define the target date and time in ISO format
  const targetDateStr = '2024-06-15T17:00:00+02:00'; // 5 PM in CEST (Madrid timezone)

  // Parse the target date as UTC
  const targetDate = parseISO(targetDateStr);

  // State to store the remaining time
  const [remainingMonths, setRemainingMonths] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const nowInMadrid = toZonedTime(now, 'Europe/Madrid');
      const months = differenceInMonths(targetDate, nowInMadrid);
      const days = differenceInDays(targetDate, nowInMadrid);
      const hours = differenceInHours(targetDate, nowInMadrid);
      const minutes = differenceInMinutes(targetDate, nowInMadrid);

      const remainingMonths = months;
      const remainingDays = days % 30; // Remaining days within the current month
      const remainingHours = hours % 24; // Remaining hours within the current day
      const remainingMinutes = minutes % 60; // Remaining minutes within the current hour

      // Update the state with the remaining time
      setRemainingMonths(remainingMonths);
      setRemainingDays(remainingDays);
      setRemainingHours(remainingHours);
      setRemainingMinutes(remainingMinutes);
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="countdown-container">
      <h3>Días para el fiestón</h3>
      <div className="countdown-clock">
        <div className="countdown-segment">
          <span>{String(remainingMonths).padStart(2, '0')}</span>
          <p>Meses</p>
        </div>
        <div className="countdown-segment">
          <span>{String(remainingDays).padStart(2, '0')}</span>
          <p>Días</p>
        </div>
        <div className="countdown-segment">
          <span>{String(remainingHours).padStart(2, '0')}</span>
          <p>Horas</p>
        </div>
        <div className="countdown-segment">
          <span>{String(remainingMinutes).padStart(2, '0')}</span>
          <p>Min</p>
        </div>
      </div>
    </div>
  );
};


export default CountdownTimerWithHour;