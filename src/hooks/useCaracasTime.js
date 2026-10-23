/**
 * @file useCaracasTime.js
 * @description Hook reactivo para obtener y actualizar la hora oficial de Caracas (VET, UTC-4).
 * Calcula dinámicamente si Sofia se encuentra en horario de atención comercial activa.
 */

import { useState, useEffect } from 'react';

/**
 * Hook useCaracasTime
 * @returns {{ timeString: string, isWorkingHours: boolean, greeting: string }}
 */
export const useCaracasTime = () => {
  const [timeData, setTimeData] = useState({
    timeString: '',
    isWorkingHours: true,
    greeting: 'Hola'
  });

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        // Formateador con huso horario de Caracas
        const formatter = new Intl.DateTimeFormat('es-VE', {
          timeZone: 'America/Caracas',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });

        const hourFormatter = new Intl.DateTimeFormat('es-VE', {
          timeZone: 'America/Caracas',
          hour: 'numeric',
          hour12: false
        });

        const currentHour = parseInt(hourFormatter.format(now), 10);
        const timeString = formatter.format(now);

        // Horario comercial activo: 8:00 AM a 8:00 PM (8 a 20 hrs)
        const isWorkingHours = currentHour >= 8 && currentHour < 20;

        let greeting = 'Buenas noches';
        if (currentHour >= 5 && currentHour < 12) {
          greeting = 'Buenos días';
        } else if (currentHour >= 12 && currentHour < 19) {
          greeting = 'Buenas tardes';
        }

        setTimeData({
          timeString,
          isWorkingHours,
          greeting
        });
      } catch (err) {
        // Fallback en caso de incompatibilidad de Intl
        setTimeData({
          timeString: 'Caracas, VET (UTC-4)',
          isWorkingHours: true,
          greeting: 'Hola'
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeData;
};
