import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import SearchCityPage from './pages/SearchCityPage';
import WeeklyForecastPage from './pages/WeeklyForecastPage';

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Sys {
  country: string;
}

export interface WeatherData {
  name: string;
  weather: Weather[];
  main: Main;
  wind: Wind;
  sys: Sys;
}

export interface WeeklyWeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: DailyWeather[];
}

export interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temperature;
}

export interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>⛅ Weather App</h1>
        <div className="nav-links">
          <Link to="/welcome" className="nav-link">Welcome</Link>
          <Link to="/search-city" className="nav-link">Search Weather</Link>
          <Link to="/weekly-forecast" className="nav-link">Forecast</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/search-city" element={<SearchCityPage />} />
        <Route path="/weekly-forecast" element={<WeeklyForecastPage />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;
