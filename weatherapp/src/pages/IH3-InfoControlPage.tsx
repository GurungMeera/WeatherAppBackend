import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeuristicPages.css';

export default function IH3Page() {
  const [city, setCity] = useState('');
  const [detailLevel, setDetailLevel] = useState<'summary' | 'detailed'>('summary');
  const [mockWeather, setMockWeather] = useState({
    name: 'San Francisco',
    temp: 72,
    feels_like: 70,
    main: 'Partly Cloudy',
    description: 'Partly cloudy throughout the day',
    humidity: 65,
    wind_speed: 12,
    pressure: 1013,
    visibility: 10,
    uv_index: 6,
    dew_point: 58,
    cloud_cover: 45
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock weather data update
    setMockWeather({
      ...mockWeather,
      name: city || 'San Francisco'
    });
    setCity('');
  };

  return (
    <div className="heuristic-page">
      <div className="page-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>IH#3: Information Control</h1>
        <p className="page-intro">
          Different users want different amounts of information. Some want just the basic temperature. 
          Others want detailed meteorological data. Let users choose their detail level.
        </p>
      </div>

      <div className="control-section">
        <h2>Customize Your Information Display</h2>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name (e.g., 'New York')"
            aria-label="City search"
          />
          <button type="submit">Search</button>
        </form>

        <div className="detail-level-controls">
          <h3>Choose Information Detail Level:</h3>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                value="summary"
                checked={detailLevel === 'summary'}
                onChange={(e) => setDetailLevel(e.target.value as 'summary')}
              />
              <span className="radio-label">
                <strong>Summary</strong>
                <p>Just the essentials: temperature and conditions</p>
              </span>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                value="detailed"
                checked={detailLevel === 'detailed'}
                onChange={(e) => setDetailLevel(e.target.value as 'detailed')}
              />
              <span className="radio-label">
                <strong>Detailed</strong>
                <p>All meteorological data including pressure, dew point, UV index, etc.</p>
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="weather-display">
        <h2>Weather for {mockWeather.name}</h2>

        {/* Always show summary */}
        <div className="weather-section summary-section">
          <h3>Current Conditions</h3>
          <div className="weather-grid">
            <div className="weather-item">
              <span className="label">Temperature</span>
              <span className="value">{mockWeather.temp}°F</span>
            </div>
            <div className="weather-item">
              <span className="label">Feels Like</span>
              <span className="value">{mockWeather.feels_like}°F</span>
            </div>
            <div className="weather-item">
              <span className="label">Conditions</span>
              <span className="value">{mockWeather.main}</span>
            </div>
            <div className="weather-item">
              <span className="label">Description</span>
              <span className="value">{mockWeather.description}</span>
            </div>
          </div>
        </div>

        {/* Show detailed info only when requested */}
        {detailLevel === 'detailed' && (
          <div className="weather-section detailed-section">
            <h3>Detailed Meteorological Data</h3>
            <p className="section-note">💡 You can hide this section by switching to Summary mode above</p>
            <div className="weather-grid">
              <div className="weather-item">
                <span className="label">Humidity</span>
                <span className="value">{mockWeather.humidity}%</span>
              </div>
              <div className="weather-item">
                <span className="label">Wind Speed</span>
                <span className="value">{mockWeather.wind_speed} mph</span>
              </div>
              <div className="weather-item">
                <span className="label">Pressure</span>
                <span className="value">{mockWeather.pressure} mb</span>
              </div>
              <div className="weather-item">
                <span className="label">Visibility</span>
                <span className="value">{mockWeather.visibility} mi</span>
              </div>
              <div className="weather-item">
                <span className="label">UV Index</span>
                <span className="value">{mockWeather.uv_index}</span>
              </div>
              <div className="weather-item">
                <span className="label">Dew Point</span>
                <span className="value">{mockWeather.dew_point}°F</span>
              </div>
              <div className="weather-item">
                <span className="label">Cloud Cover</span>
                <span className="value">{mockWeather.cloud_cover}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="implementation-box">
        <h2>How This Heuristic Works</h2>
        <ul>
          <li><strong>User Control:</strong> Users pick their detail level with radio buttons</li>
          <li><strong>Progressive Disclosure:</strong> Basic info always visible, extra info on demand</li>
          <li><strong>No Cognitive Overload:</strong> Users who want simple info aren't overwhelmed</li>
          <li><strong>Flexibility:</strong> Users can switch between modes anytime</li>
          <li><strong>Smart Defaults:</strong> Summary mode is default for most users</li>
        </ul>
      </div>

      <div className="best-practices-box">
        <h2>Implementation Best Practices</h2>
        <ol>
          <li>
            <strong>Know Your Users:</strong> What detail levels do different user groups need?
          </li>
          <li>
            <strong>Sensible Defaults:</strong> Most users want simple info; advanced users can find details
          </li>
          <li>
            <strong>Clear Labeling:</strong> Explain what's in each detail level
          </li>
          <li>
            <strong>Easy Switching:</strong> Let users change detail levels without reloading
          </li>
          <li>
            <strong>Remember Preferences:</strong> Save user's chosen detail level
          </li>
          <li>
            <strong>Mobile Consideration:</strong> Detailed info might need collapsible sections on mobile
          </li>
          <li>
            <strong>Search/Filter:</strong> Let users find specific data points they care about
          </li>
        </ol>
      </div>

      <div className="examples-box">
        <h2>Real-World Examples</h2>
        <ul>
          <li><strong>Gmail:</strong> "More options" button in compose reveals advanced settings</li>
          <li><strong>Google Maps:</strong> Show quick directions, but detailed route info on demand</li>
          <li><strong>Health Apps:</strong> Show daily steps prominently, hide sleep data until requested</li>
          <li><strong>Finance Apps:</strong> Simple "balance" view, detailed transaction history available</li>
        </ul>
      </div>
    </div>
  );
}
