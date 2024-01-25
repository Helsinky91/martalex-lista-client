import React, { useState, useEffect } from 'react';
import { differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, setHours, setMinutes, setSeconds, parse } from 'date-fns';
import { es } from 'date-fns/locale'; // Import Spanish locale

const CountdownTimerCosplay = () => {
  // Set the target date (28th January 2024 at 8 pm Spain time)
  const targetDate = setSeconds(setMinutes(setHours(parse('2024-01-28', 'yyyy-MM-dd', new Date()), 20), 0), 0);

  // State to store the remaining time
  const [remainingMonths, setRemainingMonths] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);

  useEffect(() => {
    // Calculate the remaining time
    const now = new Date();
    const months = differenceInMonths(targetDate, now);
    const days = differenceInDays(targetDate, now);
    const hours = differenceInHours(targetDate, now);
    const minutes = differenceInMinutes(targetDate, now);

    // Calculate the remaining time in a more human-readable way
    const remainingMonths = months;
    const remainingDays = days % 30; // Remaining days within the current month
    const remainingHours = hours % 24; // Remaining hours within the current day
    const remainingMinutes = minutes % 60; // Remaining minutes within the current hour

    // Update the state with the remaining time
    setRemainingMonths(remainingMonths);
    setRemainingDays(remainingDays);
    setRemainingHours(remainingHours);
    setRemainingMinutes(remainingMinutes);
  }, [targetDate]);

  return (
    <div className="countdown-cosplay-container">
      <h3>Apertura de elección de Cosplay</h3>
      <div className="countdown-cosplay-clock">
        <div className="countdown-cosplay-segment">
          <span>{String(remainingMonths).padStart(2, '0')}</span>
          <p>Meses</p>
        </div>
        <div className="countdown-cosplay-segment">
          <span>{String(remainingDays).padStart(2, '0')}</span>
          <p>Días</p>
        </div>
        <div className="countdown-cosplay-segment">
          <span>{String(remainingHours).padStart(2, '0')}</span>
          <p>Horas</p>
        </div>
        <div className="countdown-cosplay-segment">
          <span>{String(remainingMinutes).padStart(2, '0')}</span>
          <p>Min</p>
        </div>
        
      </div>
    </div>
  );
};

export default CountdownTimerCosplay;
