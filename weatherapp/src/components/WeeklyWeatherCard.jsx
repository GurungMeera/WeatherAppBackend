// {
//             "dt": 1770919200,
//             "sunrise": 1770902139,
//             "sunset": 1770941503,
//             "moonrise": 1770890400,
//             "moonset": 1770924900,
//             "moon_phase": 0.85,
//             "summary": "Expect a day of partly cloudy with clear spells",
//             "temp": {
//                 "day": 69.91,
//                 "min": 42.46,
//                 "max": 75.74,
//                 "night": 54,
//                 "eve": 73.94,
//                 "morn": 42.46
//             },
//             "feels_like": {
//                 "day": 68.72,
//                 "night": 51.91,
//                 "eve": 73.06,
//                 "morn": 39.97
//             },
//             "pressure": 1020,
//             "humidity": 45,
//             "dew_point": 47.62,
//             "wind_speed": 9.53,
//             "wind_deg": 161,
//             "wind_gust": 22.75,
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02d"
//                 }
//             ],
//             "clouds": 18,
//             "pop": 0,
//             "uvi": 5.4
//         }

import React from 'react';

const WeeklyWeatherCard = ({ dayData }) => {
  const date = new Date(dayData.dt * 1000);
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return (
    <div className="weekly-weather-card">
      <h3>{formattedDate}</h3>
      <p>{dayData.summary}</p>
      <p>Day Temp: {dayData.temp.day}°F</p>
      <p>Night Temp: {dayData.temp.night}°F</p>
      <p>Humidity: {dayData.humidity}%</p>
      <p>Wind Speed: {dayData.wind_speed} mph</p>
    </div>
  );
}

export default WeeklyWeatherCard;
