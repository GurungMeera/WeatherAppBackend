import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SearchCityPage.css';

interface WeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export default function SearchCityPage() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<Array<{city: string; state: string}>>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{city: string; state: string} | null>(null);

  // QUALITY ATTRIBUTE: ACCURACY
  // Weather data is fetched from external weather API and displayed exactly as received
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      // Fetching data from weather API endpoint
      const response = await fetch('http://127.0.0.1:8000/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city, state }),
      });

      if (!response.ok) {
        throw new Error('City not found. Please check your input and try again.');
      }

      const data = await response.json();
      // Data displayed exactly as received from API - ensuring accuracy
      setWeatherData(data);

      // Add to recent searches
      const newSearch = { city, state };
      setRecentSearches([newSearch, ...recentSearches.filter(s => !(s.city === city && s.state === state))].slice(0, 5));
      
      // Clear form fields
      setCity('');
      setState('');
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // QUALITY ATTRIBUTE: RELIABILITY
  // Handle location service failures gracefully with error handling and fallback options
  const handleUseLocation = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser. Please enter a city manually.');
      setLoading(false);
      return;
    }

    // Set timeout for geolocation request - 10 seconds as specified
    const timeoutId = setTimeout(() => {
      setError('Unable to access your location (timeout after 10 seconds). Please try again or enter a city manually.');
      setLoading(false);
    }, 10000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;
        
        try {
          // Fetch weather using coordinates
          const response = await fetch('http://127.0.0.1:8000/weather_lat_lon', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              lat: latitude.toString(), 
              lon: longitude.toString() 
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch weather for your location');
          }

          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setError('Failed to fetch weather data. Please try entering a city manually.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        clearTimeout(timeoutId);
        // Handle location service failures
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location permission denied. Please enable location services or enter a city manually.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError('GPS service is not available. Please try again or enter a city manually.');
        } else {
          setError('Unable to access your location. Please try again or enter a city manually.');
        }
        setLoading(false);
      }
    );
  };

  const handleRecentSearch = async (searchCity: string, searchState: string) => {
    setCity(searchCity);
    setState(searchState);
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: searchCity, state: searchState }),
      });

      if (!response.ok) {
        throw new Error('City not found. Please check your input and try again.');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecent = (searchCity: string, searchState: string) => {
    setDeleteConfirmation({ city: searchCity, state: searchState });
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      setRecentSearches(prev => 
        prev.filter(s => !(s.city === deleteConfirmation.city && s.state === deleteConfirmation.state))
      );
      setDeleteConfirmation(null);
    }
  };

  return (
    <div className="search-page-container">
      <div className="search-header">
        <Link to="/welcome" className="back-link">← Back to Home</Link>
        <h1>Search Weather by City</h1>
        <p>Find current weather conditions for any city or use your current location</p>
      </div>

      <div className="search-content">
        <div className="search-form-box">
          <h2>Enter City Information</h2>
          <form onSubmit={handleSubmit} className="search-form">
            <div className="form-group">
              <label htmlFor="city">City Name *</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., San Francisco"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State/Province *</label>
              <input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g., CA"
                required
              />
            </div>

            <button type="submit" className="search-button" disabled={loading}>
              {loading ? 'Searching...' : 'Search Weather'}
            </button>
          </form>

          <div className="divider">OR</div>

          <button 
            type="button" 
            className="location-button" 
            onClick={handleUseLocation}
            disabled={loading}
          >
            {loading ? 'Getting Location...' : '📍 Use My Location'}
          </button>

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="reliability-note">
            <strong>Note:</strong> If location services fail or timeout after 10 seconds, you can retry or enter a city manually. The app continues functioning with manual search as a fallback option.
          </div>
        </div>
      </div>

      {weatherData && (
        <div className="weather-result">
          <h2>Weather for {weatherData.name}, {weatherData.sys.country}</h2>
          
          <div className="weather-result-grid">
            <div className="weather-left">
              <div className="result-main">
                <div className="temp-display">
                  <div className="temperature">{Math.round(weatherData.main.temp)}°F</div>
                  <div className="weather-condition">{weatherData.weather[0].main}</div>
                </div>
                
                {weatherData.weather[0].icon && (
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                    alt={weatherData.weather[0].description}
                    className="weather-icon"
                  />
                )}
              </div>
            </div>

            <div className="weather-right">
              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-label">Description:</span>
                  <span className="detail-value">{weatherData.weather[0].description}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Feels Like:</span>
                  <span className="detail-value">{Math.round(weatherData.main.feels_like)}°F</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Humidity:</span>
                  <span className="detail-value">{weatherData.main.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Wind Speed:</span>
                  <span className="detail-value">{weatherData.wind.speed} mph</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!weatherData && !error && !loading && (
        <div className="no-data">
          <p>Enter a city name or use your location to see current weather conditions</p>
        </div>
      )}

      {recentSearches.length > 0 && (
        <div className="recent-searches-box">
          <h3>Recent Searches</h3>
          <div className="recent-searches-list">
            {recentSearches.map((search, index) => (
              <div key={index} className="recent-search-item-container">
                <button
                  type="button"
                  className="recent-search-item"
                  onClick={() => handleRecentSearch(search.city, search.state)}
                >
                  <span className="search-name">{search.city}, {search.state}</span>
                </button>
                <button
                  type="button"
                  className="delete-recent-btn"
                  onClick={() => handleDeleteRecent(search.city, search.state)}
                  title="Delete from recent searches"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {deleteConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you want to remove this city from your recent search?</p>
            <p className="city-name">{deleteConfirmation.city}, {deleteConfirmation.state}</p>
            <div className="modal-buttons">
              <button 
                className="modal-btn modal-yes" 
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button 
                className="modal-btn modal-no" 
                onClick={() => setDeleteConfirmation(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
