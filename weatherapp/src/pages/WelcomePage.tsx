import { Link } from 'react-router-dom';
import '../styles/WelcomePage.css';

export default function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-hero">
        <h1>Weather App</h1>
        <p className="welcome-subtitle">Get accurate weather information instantly</p>
        <p className="welcome-description">
          Search for weather conditions in any city, view weekly weather forecast, 
          add to favorites your favorite city and get weather alerts all in one. 
          This app provides real-time weather data to help plan your day.
        </p>
      </div>

      <div className="welcome-features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Search by City</h3>
            <p>Find current weather conditions for any city by entering the city name and state</p>
            <Link to="/search-city" className="feature-link">Go to Search →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Weekly Forecast</h3>
            <p>View a 7-day weather forecast with detailed information and conditions</p>
            <Link to="/weekly-forecast" className="feature-link">View Forecast →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
