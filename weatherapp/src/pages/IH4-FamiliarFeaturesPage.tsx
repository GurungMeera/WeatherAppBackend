import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeuristicPages.css';

export default function IH4Page() {
  const [searchType, setSearchType] = useState<'simple' | 'advanced'>('simple');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('US');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for weather in ${city}, ${state} ${country}`);
    setCity('');
    setState('');
  };

  return (
    <div className="heuristic-page">
      <div className="page-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>IH#4: Keep Familiar Features Available</h1>
        <p className="page-intro">
          When adding new features, don't hide or remove the old ones. Many users prefer familiar 
          workflows. Offer both options so everyone can work their preferred way.
        </p>
      </div>

      <div className="feature-mode-section">
        <h2>Choose Your Search Method</h2>
        
        <div className="mode-selector">
          <label className="mode-button">
            <input
              type="radio"
              value="simple"
              checked={searchType === 'simple'}
              onChange={(e) => setSearchType(e.target.value as 'simple')}
            />
            <span>Simple Search</span>
            <p className="mode-description">Just city and state (what you're used to)</p>
          </label>

          <label className="mode-button">
            <input
              type="radio"
              value="advanced"
              checked={searchType === 'advanced'}
              onChange={(e) => setSearchType(e.target.value as 'advanced')}
            />
            <span>Advanced Search</span>
            <p className="mode-description">Add country, coordinates, and more options</p>
          </label>
        </div>
      </div>

      <div className="search-form-section">
        <form onSubmit={handleSearch} className="weather-search-form">
          <div className="form-group">
            <label htmlFor="city">City Name *</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., 'San Francisco'"
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
              placeholder="e.g., 'California'"
              required
            />
          </div>

          {/* Advanced options - only show if selected */}
          {searchType === 'advanced' && (
            <>
              <div className="advanced-section">
                <h3>Advanced Options (Optional)</h3>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select 
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <p className="advanced-note">
                  💡 Advanced options are optional. You can leave them blank and search will still work.
                </p>
              </div>
            </>
          )}

          <button type="submit" className="search-button">Get Weather</button>
        </form>
      </div>

      <div className="comparison-section">
        <h2>Why Both Options Matter</h2>
        <div className="comparison-table">
          <div className="comparison-row">
            <div className="comparison-cell header">Aspect</div>
            <div className="comparison-cell header">Simple Mode</div>
            <div className="comparison-cell header">Advanced Mode</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell">Speed</div>
            <div className="comparison-cell">⚡ Fast - only 2 fields</div>
            <div className="comparison-cell">📊 More options to fill</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell">Learning Curve</div>
            <div className="comparison-cell">✓ Very Easy</div>
            <div className="comparison-cell">📚 Slightly Complex</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell">Power</div>
            <div className="comparison-cell">Basic - good for most</div>
            <div className="comparison-cell">⚙️ Advanced - precise searches</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell">Best For</div>
            <div className="comparison-cell">Most users, quick checks</div>
            <div className="comparison-cell">Power users, international</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell">Accessibility</div>
            <div className="comparison-cell">✓ Lower cognitive load</div>
            <div className="comparison-cell">Options may confuse some</div>
          </div>
        </div>
      </div>

      <div className="implementation-box">
        <h2>How This Heuristic Works</h2>
        <ul>
          <li><strong>Dual Paths:</strong> Simple and advanced modes coexist</li>
          <li><strong>User Choice:</strong> Users pick what works for them</li>
          <li><strong>No Forced Upgrades:</strong> Simple users aren't forced to learn advanced features</li>
          <li><strong>Feature Parity:</strong> Both modes accomplish the same goal</li>
          <li><strong>Clear Differentiation:</strong> Users understand when to use each mode</li>
        </ul>
      </div>

      <div className="best-practices-box">
        <h2>Implementation Best Practices</h2>
        <ol>
          <li>
            <strong>Don't Remove Old Features:</strong> Add new ones alongside, never replace
          </li>
          <li>
            <strong>Clear Labeling:</strong> Help users understand the difference between modes
          </li>
          <li>
            <strong>Easy Switching:</strong> Let users switch between modes without penalty
          </li>
          <li>
            <strong>Gradual Disclosure:</strong> Show advanced options only when chosen
          </li>
          <li>
            <strong>Document Both:</strong> Provide help for both simple and advanced workflows
          </li>
          <li>
            <strong>Testing with Users:</strong> Verify both paths work for your target users
          </li>
          <li>
            <strong>Defaults Matter:</strong> Default to simple for most, power users will find advanced
          </li>
        </ol>
      </div>

      <div className="real-world-box">
        <h2>Why This Matters</h2>
        <p>
          Users have different comfort levels with technology. Someone might use a weather app dozens 
          of times a day and need power features. Someone else might use it once a week and just wants 
          the simplest interface. By supporting both, you make your app usable for everyone.
        </p>
        <p>
          Additionally, if your advanced mode is confusing or buggy, users can always fall back to 
          the simple, reliable method they know works.
        </p>
      </div>

      <div className="examples-box">
        <h2>Real-World Examples</h2>
        <ul>
          <li><strong>Microsoft Word:</strong> Ribbon mode (simple) AND classic menu mode (familiar)</li>
          <li><strong>Adobe Photoshop:</strong> Simple tools AND advanced customization</li>
          <li><strong>Google Search:</strong> Quick search AND advanced search operators</li>
          <li><strong>Apple iOS:</strong> Standard settings AND advanced developer options</li>
        </ul>
      </div>
    </div>
  );
}
