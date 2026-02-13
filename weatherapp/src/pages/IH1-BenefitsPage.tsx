import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeuristicPages.css';

export default function IH1Page() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'geolocation',
      name: 'Geolocation Weather',
      benefit: 'Get instant weather for your exact location without typing an address',
      whenUseful: 'Perfect when you\'re traveling or want quick weather info',
      timeToUse: 'One tap - saves you from entering city/state manually',
      icon: '📍'
    },
    {
      id: 'search',
      name: 'City/State Search',
      benefit: 'Look up weather for any location worldwide',
      whenUseful: 'Useful for checking weather in other cities or planning trips',
      timeToUse: '2-3 seconds of typing',
      icon: '🔍'
    },
    {
      id: 'weekly',
      name: 'Weekly Forecast',
      benefit: 'Plan ahead with 7-day weather predictions',
      whenUseful: 'Essential for trip planning or scheduling outdoor activities',
      timeToUse: 'One click to see the entire week',
      icon: '📅'
    }
  ];

  return (
    <div className="heuristic-page">
      <div className="page-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>IH#1: Explain Benefits of Features</h1>
        <p className="page-intro">
          Users should understand WHY they would use each feature. Clear explanations help them make 
          informed decisions about which tools best serve their needs.
        </p>
      </div>

      <div className="features-container">
        <h2>Weather App Features & Benefits</h2>
        
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div 
              className="feature-header"
              onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
              role="button"
              tabIndex={0}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.name}</h3>
              <span className="expand-icon">
                {expandedFeature === feature.id ? '▼' : '▶'}
              </span>
            </div>

            {expandedFeature === feature.id && (
              <div className="feature-details">
                <div className="benefit-section">
                  <h4>✓ Main Benefit:</h4>
                  <p>{feature.benefit}</p>
                </div>

                <div className="benefit-section">
                  <h4>💡 When to Use It:</h4>
                  <p>{feature.whenUseful}</p>
                </div>

                <div className="benefit-section">
                  <h4>⏱️ Time Investment:</h4>
                  <p>{feature.timeToUse}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="implementation-box">
        <h2>How This Heuristic Works</h2>
        <ul>
          <li><strong>Tooltips & Help Text:</strong> Each button has a description of what it does and why you'd use it</li>
          <li><strong>Expandable Details:</strong> Click any feature to learn more about its benefits</li>
          <li><strong>Real-World Context:</strong> Benefits are explained in practical, user-relevant terms</li>
          <li><strong>Visual Hierarchy:</strong> Icons and formatting make benefits easy to scan</li>
        </ul>
      </div>

      <div className="best-practices-box">
        <h2>Best Practices</h2>
        <ol>
          <li>Always explain WHAT the feature does, not just HOW to use it</li>
          <li>Focus on benefits that matter to your specific users</li>
          <li>Make benefits discoverable without clicking through 5 menus</li>
          <li>Use concrete examples users can relate to</li>
          <li>Update benefit descriptions based on user feedback</li>
        </ol>
      </div>
    </div>
  );
}
