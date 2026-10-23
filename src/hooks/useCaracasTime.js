/**
 * @file useCaracasTime.js
 * @description Hook para obtener la hora local de Caracas (UTC-4) y el saludo horario adecuado.
 */

import { useState, useEffect } from 'react';

/**
 * Hook useCaracasTime
 * @returns {{ timeString: string, greeting: string }}
 */
export const useCaracasTime = () => {
  const [timeData, setTimeData] = useState({
    timeString: '',
    greeting: 'Hola'
  });

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('es-VE', {
          timeZone: 'America/Caracas',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        const hourFormatter = new Intl.DateTimeFormat('es-VE', {
          timeZone: 'America/Caracas',
          hour: 'numeric',
          hour12: false
        });

        const currentHour = parseInt(hourFormatter.format(now), 10);
        const timeString = formatter.format(now);

        let greeting = 'Buenas noches';
        if (currentHour >= 5 && currentHour < 12) {
          greeting = 'Buenos días';
        } else if (currentHour >= 12 && currentHour < 19) {
          greeting = 'Buenas tardes';
        }

        setTimeData({
          timeString,
          greeting
        });
      } catch {
        setTimeData({
          timeString: 'Caracas (UTC-4)',
          greeting: 'Hola'
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return timeData;
};
