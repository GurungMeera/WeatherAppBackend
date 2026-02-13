import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeuristicPages.css';

export default function IH6Page() {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [method, setMethod] = useState<'manual' | 'location'>('manual');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock search
    setTimeout(() => {
      setWeatherData({
        name: `${city}, ${state}`,
        temp: 72,
        feels_like: 70,
        main: 'Partly Cloudy',
        description: 'Scattered clouds'
      });
      setLoading(false);
      setStep(5);
    }, 1000);
  };

  const handleReset = () => {
    setStep(1);
    setCity('');
    setState('');
    setWeatherData(null);
    setMethod('manual');
  };

  return (
    <div className="heuristic-page">
      <div className="page-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>IH#6: Explicit Path Through the Task</h1>
        <p className="page-intro">
          New users shouldn't have to figure out how to use your app. Provide a clear, step-by-step 
          path that guides them to their goal. This is especially important for complex tasks.
        </p>
      </div>

      <div className="wizard-container">
        <div className="progress-bar">
          <div className="progress-track">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s}
                className={`progress-step ${s === step ? 'current' : ''} ${s < step ? 'completed' : ''}`}
              >
                <div className="step-circle">{s < step ? '✓' : s}</div>
                <div className="step-label">
                  {['Start', 'Choose Method', 'Enter Info', 'Confirm', 'Results'][s - 1]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wizard-content">
          {step === 1 && (
            <div className="step-content">
              <h2>Step 1: Welcome to Weather Lookup</h2>
              <p className="step-intro">
                Let's find the weather for any location. This wizard will guide you through the process.
              </p>
              <div className="step-info">
                <h3>You have two options:</h3>
                <ul>
                  <li><strong>Manual Search:</strong> Type in a city and state</li>
                  <li><strong>Current Location:</strong> Use your device's location</li>
                </ul>
                <p className="hint">💡 Click "Next" to choose your method</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h2>Step 2: Choose Your Method</h2>
              <div className="method-selector">
                <label className="method-option">
                  <input
                    type="radio"
                    value="manual"
                    checked={method === 'manual'}
                    onChange={(e) => setMethod(e.target.value as 'manual')}
                  />
                  <div className="method-content">
                    <h3>Manual Search</h3>
                    <p>Type in the city and state you want to search for</p>
                    <span className="method-benefit">✓ Works anywhere, no permissions needed</span>
                  </div>
                </label>

                <label className="method-option">
                  <input
                    type="radio"
                    value="location"
                    checked={method === 'location'}
                    onChange={(e) => setMethod(e.target.value as 'location')}
                  />
                  <div className="method-content">
                    <h3>Current Location</h3>
                    <p>Get weather for your exact location automatically</p>
                    <span className="method-benefit">⚡ One tap, super fast</span>
                  </div>
                </label>
              </div>
              <p className="hint">💡 You can choose either method. Click "Next" to continue.</p>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h2>Step 3: Enter Location Information</h2>
              {method === 'manual' ? (
                <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                  <div className="form-group">
                    <label htmlFor="wizard-city">City Name *</label>
                    <input
                      id="wizard-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., 'San Francisco'"
                      required
                    />
                    <span className="field-hint">What city are you interested in?</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="wizard-state">State Name *</label>
                    <input
                      id="wizard-state"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g., 'California'"
                      required
                    />
                    <span className="field-hint">Which state or province?</span>
                  </div>

                  <p className="hint">💡 Make sure you spelled the city and state correctly</p>
                  <button type="submit" disabled={!city.trim() || !state.trim()}>
                    Next
                  </button>
                </form>
              ) : (
                <div className="location-method">
                  <h3>Using Your Current Location</h3>
                  <p>You've chosen to use your device's location.</p>
                  <div className="location-info">
                    <p>📍 Your browser will ask for permission to access your location</p>
                    <p>✓ Your location is only used to find the weather</p>
                  </div>
                  <button onClick={handleNext}>
                    Continue to Next Step
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="step-content">
              <h2>Step 4: Review & Confirm</h2>
              <div className="review-section">
                <h3>You're about to search for:</h3>
                {method === 'manual' ? (
                  <div className="review-info">
                    <p><strong>City:</strong> {city}</p>
                    <p><strong>State:</strong> {state}</p>
                  </div>
                ) : (
                  <div className="review-info">
                    <p><strong>Method:</strong> Current Location</p>
                    <p><strong>Status:</strong> Ready to fetch your location</p>
                  </div>
                )}
              </div>
              <p className="hint">💡 Click "Get Weather" to fetch the data, or "Back" to make changes</p>
              <button onClick={handleSearch} className="primary-button">
                {loading ? 'Searching...' : 'Get Weather'}
              </button>
            </div>
          )}

          {step === 5 && weatherData && (
            <div className="step-content">
              <h2>Step 5: Weather Results</h2>
              <div className="weather-result">
                <h3>Weather for {weatherData.name}</h3>
                <div className="result-grid">
                  <div className="result-item">
                    <span className="label">Temperature</span>
                    <span className="value">{weatherData.temp}°F</span>
                  </div>
                  <div className="result-item">
                    <span className="label">Condition</span>
                    <span className="value">{weatherData.main}</span>
                  </div>
                  <div className="result-item">
                    <span className="label">Description</span>
                    <span className="value">{weatherData.description}</span>
                  </div>
                </div>
              </div>
              <p className="hint">✓ Success! Here's the weather you requested.</p>
              <button onClick={handleReset} className="secondary-button">
                Search Again
              </button>
            </div>
          )}
        </div>

        <div className="wizard-controls">
          <button 
            onClick={handlePrev}
            disabled={step === 1}
            className="nav-button"
          >
            ← Back
          </button>
          
          {step < 5 && step !== 4 && (
            <button 
              onClick={handleNext}
              className="nav-button primary"
            >
              Next →
            </button>
          )}

          <span className="step-indicator">
            Step {step} of 5
          </span>
        </div>
      </div>

      <div className="implementation-box">
        <h2>How This Heuristic Works</h2>
        <ul>
          <li><strong>Clear Steps:</strong> Each step has a single, clear purpose</li>
          <li><strong>Progress Indication:</strong> Users know where they are in the process</li>
          <li><strong>Helpful Context:</strong> Each step explains what to do and why</li>
          <li><strong>Validation:</strong> Users confirm before executing actions</li>
          <li><strong>Recovery:</strong> Easy to go back and make changes</li>
          <li><strong>No Dead Ends:</strong> Always a way forward</li>
        </ul>
      </div>

      <div className="best-practices-box">
        <h2>Implementation Best Practices</h2>
        <ol>
          <li>
            <strong>5-7 Steps Maximum:</strong> Longer wizards feel tedious
          </li>
          <li>
            <strong>Skip Optional Steps:</strong> If possible, skip steps users don't need
          </li>
          <li>
            <strong>Show Progress:</strong> Progress bars, step numbers, and titles help orientation
          </li>
          <li>
            <strong>Clear Button Labels:</strong> "Next" is better than "Continue"
          </li>
          <li>
            <strong>Allow Back Navigation:</strong> Let users correct mistakes
          </li>
          <li>
            <strong>Helpful Error Messages:</strong> Guide users toward correct input
          </li>
          <li>
            <strong>Save Progress:</strong> If the wizard is interrupted, save state
          </li>
          <li>
            <strong>Context Matters:</strong> Show relevant options based on earlier choices
          </li>
        </ol>
      </div>

      <div className="examples-box">
        <h2>Real-World Examples</h2>
        <ul>
          <li><strong>Hotel Booking:</strong> Search → Filter → Select → Enter Details → Confirm</li>
          <li><strong>Online Shopping Checkout:</strong> Cart → Shipping → Payment → Confirm Order</li>
          <li><strong>Account Setup:</strong> Email → Password → Profile → Verify</li>
          <li><strong>Installation Wizards:</strong> Agree → Install Location → Options → Finish</li>
        </ul>
      </div>
    </div>
  );
}
