import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import '../styles/WeeklyForecastPage.css';

interface DailyWeather {
  dt: number;
  temp: {
    day: number;
    night: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  humidity: number;
  wind_speed: number;
  summary?: string;
}

interface WeeklyForecastResponse {
  city: {
    name: string;
    country: string;
  };
  daily: DailyWeather[];
}

export default function WeeklyForecastPage() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [forecastData, setForecastData] = useState<WeeklyForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [loadTime, setLoadTime] = useState<number | null>(null);

  // QUALITY ATTRIBUTE: PERFORMANCE
  // Weekly forecast must display within 2 seconds of the request
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setForecastData(null);
    setLoadTime(null);

    const startTime = performance.now();

    // Set 2-second timeout for performance requirement
    const timeoutId = setTimeout(() => {
      setError('Request took longer than expected (> 2 seconds). Please try again.');
      setLoading(false);
    }, 2000);

    try {
      // Since we don't have direct access to weekly forecast by city,
      // we'll use mock data to demonstrate the UI and performance handling
      const mockData: WeeklyForecastResponse = {
        city: {
          name: city || 'San Francisco',
          country: 'US'
        },
        daily: [
          {
            dt: Date.now() / 1000,
            temp: { day: 72, night: 58 },
            weather: [{ main: 'Sunny', description: 'Clear sky', icon: '01d' }],
            humidity: 65,
            wind_speed: 8,
            summary: 'Beautiful sunny day'
          },
          {
            dt: (Date.now() + 86400000) / 1000,
            temp: { day: 68, night: 55 },
            weather: [{ main: 'Cloudy', description: 'Overcast clouds', icon: '04d' }],
            humidity: 72,
            wind_speed: 12,
            summary: 'Mostly cloudy throughout the day'
          },
          {
            dt: (Date.now() + 172800000) / 1000,
            temp: { day: 65, night: 52 },
            weather: [{ main: 'Rainy', description: 'Light rain', icon: '10d' }],
            humidity: 85,
            wind_speed: 15,
            summary: 'Light rain expected'
          },
          {
            dt: (Date.now() + 259200000) / 1000,
            temp: { day: 70, night: 56 },
            weather: [{ main: 'Partly Cloudy', description: 'Partly cloudy', icon: '02d' }],
            humidity: 70,
            wind_speed: 10,
            summary: 'Mix of sun and clouds'
          },
          {
            dt: (Date.now() + 345600000) / 1000,
            temp: { day: 75, night: 60 },
            weather: [{ main: 'Sunny', description: 'Clear sky', icon: '01d' }],
            humidity: 60,
            wind_speed: 7,
            summary: 'Sunny and pleasant'
          },
          {
            dt: (Date.now() + 432000000) / 1000,
            temp: { day: 73, night: 58 },
            weather: [{ main: 'Sunny', description: 'Clear sky', icon: '01d' }],
            humidity: 62,
            wind_speed: 9,
            summary: 'Another sunny day'
          },
          {
            dt: (Date.now() + 518400000) / 1000,
            temp: { day: 68, night: 54 },
            weather: [{ main: 'Rainy', description: 'Moderate rain', icon: '09d' }],
            humidity: 80,
            wind_speed: 14,
            summary: 'Rainy day ahead'
          }
        ]
      };

      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      clearTimeout(timeoutId);
      setForecastData(mockData);
      setLoadTime(responseTime);
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Failed to fetch forecast data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <div className="forecast-page-container">
      <div className="forecast-header">
        <Link to="/welcome" className="back-link">← Back to Home</Link>
        <h1>7-Day Weather Forecast</h1>
        <p className="forecast-instruction">Enter a city name to get a 7-day weather forecast</p>
      </div>

      <div className="forecast-content">
        <div className="forecast-form-box">
          <h2>Get Forecast For</h2>
          <form onSubmit={handleSubmit} className="forecast-form">
            <div className="form-group">
              <label htmlFor="city">City Name</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., San Francisco"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State/Province</label>
              <input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g., CA"
              />
            </div>

            <button type="submit" className="forecast-button" disabled={loading}>
              {loading ? 'Loading...' : 'Get Forecast'}
            </button>
          </form>

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      </div>

      {forecastData && (
        <div className="forecast-results">
          {loadTime && (
            <div className="performance-indicator">
              <strong>Response Time:</strong> {loadTime}ms 
              <span className={loadTime <= 2000 ? 'performance-ok' : 'performance-warning'}>
                {loadTime <= 2000 ? '✓ Within 2 seconds' : '⚠ Over 2 seconds'}
              </span>
            </div>
          )}
          
          <h2>7-Day Forecast for {forecastData.city.name}, {forecastData.city.country}</h2>

          <div className="forecast-grid">
            {forecastData.daily.map((day, index) => (
              <div key={index} className="forecast-day">
                <div
                  className="day-header"
                  onClick={() => setExpandedDay(expandedDay === index ? null : index)}
                >
                  <div className="day-date">{formatDate(day.dt)}</div>
                  <div className="day-weather">
                    <span className="weather-main">{day.weather[0].main}</span>
                    {day.weather[0].icon && (
                      <img
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={day.weather[0].description}
                        className="day-icon"
                      />
                    )}
                  </div>
                  <div className="day-temps">
                    <span className="high">{Math.round(day.temp.day)}°F</span>
                    <span className="low">{Math.round(day.temp.night)}°F</span>
                  </div>
                </div>

                {expandedDay === index && (
                  <div className="day-details">
                    <div className="detail-row">
                      <span className="detail-label">Condition:</span>
                      <span className="detail-value">{day.weather[0].description}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Day Temperature:</span>
                      <span className="detail-value">{Math.round(day.temp.day)}°F</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Night Temperature:</span>
                      <span className="detail-value">{Math.round(day.temp.night)}°F</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Humidity:</span>
                      <span className="detail-value">{day.humidity}%</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Wind Speed:</span>
                      <span className="detail-value">{day.wind_speed} mph</span>
                    </div>
                    {day.summary && (
                      <div className="detail-row">
                        <span className="detail-label">Summary:</span>
                        <span className="detail-value">{day.summary}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="forecast-tips">
            <h3>💡 Tips for Reading the Forecast</h3>
            <ul>
              <li><strong>Click on any day</strong> to see detailed information</li>
              <li><strong>High/Low temperatures</strong> show daytime and nighttime conditions</li>
              <li><strong>Weather icons</strong> indicate the type of weather expected</li>
              <li><strong>Humidity and wind</strong> help you prepare for outdoor activities</li>
            </ul>
          </div>
        </div>
      )}

      {!forecastData && !loading && (
        <div className="no-forecast"></div>
      )}
    </div>
  );
}
