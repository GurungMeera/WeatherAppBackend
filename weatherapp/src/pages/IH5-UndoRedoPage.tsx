import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeuristicPages.css';

export default function IH5Page() {
  interface SearchHistory {
    city: string;
    state: string;
    timestamp: number;
  }

  const [history, setHistory] = useState<SearchHistory[]>([
    { city: 'San Francisco', state: 'California', timestamp: Date.now() - 60000 },
    { city: 'New York', state: 'New York', timestamp: Date.now() - 120000 }
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(history.length - 1);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const current = currentIndex >= 0 && currentIndex < history.length ? history[currentIndex] : null;

  const handleNewSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || !state.trim()) return;

    const newSearch = { city, state, timestamp: Date.now() };
    // If we're not at the end of history, remove everything after current
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newSearch);
    
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setCity('');
    setState('');
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes === 0) return 'just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  return (
    <div className="heuristic-page">
      <div className="page-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>IH#5: Undo/Redo and Backtracking</h1>
        <p className="page-intro">
          Users make mistakes. Allow them to undo actions, redo if they change their mind, and 
          backtrack to previous states without losing their work.
        </p>
      </div>

      <div className="undo-controls">
        <h2>History Controls</h2>
        <div className="button-group">
          <button 
            onClick={handleUndo}
            disabled={!canUndo}
            className="history-button"
            title="Go back to previous search"
          >
            ↶ Undo
          </button>
          <button 
            onClick={handleRedo}
            disabled={!canRedo}
            className="history-button"
            title="Go forward to next search"
          >
            ↷ Redo
          </button>
        </div>
        <p className="help-text">
          💡 Use Undo/Redo to navigate through your search history
        </p>
      </div>

      <div className="current-state">
        <h2>Current Selection</h2>
        {current ? (
          <div className="state-display">
            <p><strong>City:</strong> {current.city}</p>
            <p><strong>State:</strong> {current.state}</p>
            <p><strong>Searched:</strong> {formatTime(current.timestamp)}</p>
          </div>
        ) : (
          <p className="no-state">No searches yet</p>
        )}
      </div>

      <div className="new-search-section">
        <h2>New Search</h2>
        <form onSubmit={handleNewSearch} className="search-form">
          <div className="form-group">
            <label htmlFor="undo-city">City</label>
            <input
              id="undo-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />
          </div>

          <div className="form-group">
            <label htmlFor="undo-state">State</label>
            <input
              id="undo-state"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state"
            />
          </div>

          <button type="submit">Add to History</button>
        </form>
      </div>

      <div className="history-list">
        <h2>Search History</h2>
        <p className="history-note">Click any item to jump to that search (undo/redo to navigate)</p>
        <div className="history-items">
          {history.map((item, index) => (
            <div 
              key={index}
              className={`history-item ${index === currentIndex ? 'current' : ''}`}
              onClick={() => setCurrentIndex(index)}
              role="button"
              tabIndex={0}
            >
              <span className="history-location">
                {item.city}, {item.state}
              </span>
              <span className="history-time">
                {formatTime(item.timestamp)}
              </span>
              {index === currentIndex && <span className="current-badge">← Current</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="implementation-box">
        <h2>How This Heuristic Works</h2>
        <ul>
          <li><strong>Action History:</strong> Every action is recorded with a timestamp</li>
          <li><strong>Undo/Redo Buttons:</strong> Navigate backward and forward through history</li>
          <li><strong>Visual Indicator:</strong> Current state is highlighted in the history list</li>
          <li><strong>Time Context:</strong> Know when each action was taken</li>
          <li><strong>Direct Navigation:</strong> Click any history item to jump directly to it</li>
        </ul>
      </div>

      <div className="best-practices-box">
        <h2>Implementation Best Practices</h2>
        <ol>
          <li>
            <strong>Remember State:</strong> Save the complete state at each point, not just deltas
          </li>
          <li>
            <strong>Limit History:</strong> Too much history consumes memory; typically 20-50 items
          </li>
          <li>
            <strong>Clear Labels:</strong> Use "Undo" and "Redo", not "Go back/forward"
          </li>
          <li>
            <strong>Keyboard Shortcuts:</strong> Support Ctrl+Z (Undo) and Ctrl+Shift+Z (Redo)
          </li>
          <li>
            <strong>Disable When Inactive:</strong> Grey out undo/redo when unavailable
          </li>
          <li>
            <strong>Persist History:</strong> Keep history until app closes (not across sessions)
          </li>
          <li>
            <strong>Clear on Major Actions:</strong> Some actions (like logging out) should clear history
          </li>
        </ol>
      </div>

      <div className="psychology-box">
        <h2>Psychological Safety</h2>
        <p>
          When users know they can undo actions, they're more willing to explore and experiment. 
          They feel safer trying new approaches because mistakes aren't permanent. This encourages 
          engagement and reduces anxiety about using your app.
        </p>
      </div>

      <div className="examples-box">
        <h2>Real-World Examples</h2>
        <ul>
          <li><strong>Text Editors:</strong> Undo/Redo for every keystroke</li>
          <li><strong>Figma/Design Tools:</strong> Maintain full editing history</li>
          <li><strong>Browser Back Button:</strong> Navigate through browsing history</li>
          <li><strong>Git Version Control:</strong> Complete history of code changes</li>
          <li><strong>Google Docs:</strong> "Version history" shows all document changes</li>
        </ul>
      </div>
    </div>
  );
}
