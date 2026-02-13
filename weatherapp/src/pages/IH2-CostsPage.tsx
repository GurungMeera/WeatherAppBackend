import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeuristicPages.css';

export default function IH2Page() {
  const [expandedCost, setExpandedCost] = useState<string | null>(null);

  const costs = [
    {
      id: 'geo-privacy',
      feature: 'Geolocation',
      cost: 'Privacy Impact',
      details: 'Your location is shared with the app and weather service',
      dataUsed: 'Precise GPS coordinates sent to server',
      workaround: 'You can always use the manual search instead'
    },
    {
      id: 'geo-permission',
      feature: 'Geolocation',
      cost: 'Browser Permission',
      details: 'Your browser will ask for location permission every time',
      dataUsed: 'Browser stores permission preference',
      workaround: 'Grant permission once, then it remembers your choice'
    },
    {
      id: 'battery',
      feature: 'Geolocation',
      cost: 'Battery Usage',
      details: 'Using GPS can drain battery on mobile devices',
      dataUsed: 'Continuous location tracking uses power',
      workaround: 'Use manual search for better battery life'
    },
    {
      id: 'typing',
      feature: 'City/State Search',
      cost: 'Manual Input Required',
      details: 'You need to type city and state names correctly',
      dataUsed: 'Text input requires keyboard/typing',
      workaround: 'Use geolocation if typing is difficult'
    },
    {
      id: 'internet',
      feature: 'All Features',
      cost: 'Internet Connection',
      details: 'All features require an active internet connection',
      dataUsed: 'Data is sent to weather API servers',
      workaround: 'Features won\'t work offline'
    }
  ];

  return (
    <div className="heuristic-page">
      <div className="page-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>IH#2: Explain Costs of Features</h1>
        <p className="page-intro">
          Every feature has a cost: privacy concerns, battery drain, time investment, or permission 
          requirements. Users deserve to know these trade-offs before using a feature.
        </p>
      </div>

      <div className="features-container">
        <h2>Feature Costs & Trade-offs</h2>
        
        <div className="cost-warning">
          <p>💡 <strong>Transparency Builds Trust:</strong> Being honest about costs shows respect for user autonomy.</p>
        </div>

        {costs.map((cost) => (
          <div key={cost.id} className="cost-card">
            <div 
              className="cost-header"
              onClick={() => setExpandedCost(expandedCost === cost.id ? null : cost.id)}
              role="button"
              tabIndex={0}
            >
              <h3>{cost.feature}</h3>
              <span className="cost-label">Cost: {cost.cost}</span>
              <span className="expand-icon">
                {expandedCost === cost.id ? '▼' : '▶'}
              </span>
            </div>

            {expandedCost === cost.id && (
              <div className="cost-details">
                <div className="cost-section">
                  <h4>⚠️ What It Costs:</h4>
                  <p>{cost.details}</p>
                </div>

                <div className="cost-section">
                  <h4>📊 Data/Resources Used:</h4>
                  <p>{cost.dataUsed}</p>
                </div>

                <div className="cost-section alternative">
                  <h4>✓ Alternative:</h4>
                  <p>{cost.workaround}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="implementation-box">
        <h2>Types of Costs to Disclose</h2>
        <ul>
          <li><strong>Privacy Costs:</strong> What data is collected and where it goes</li>
          <li><strong>Performance Costs:</strong> Battery drain, data usage, loading time</li>
          <li><strong>Accessibility Costs:</strong> Which users might struggle with this feature</li>
          <li><strong>Effort Costs:</strong> How much work the user needs to do</li>
          <li><strong>Safety Risks:</strong> Any potential downsides or dangers</li>
        </ul>
      </div>

      <div className="best-practices-box">
        <h2>Implementation Best Practices</h2>
        <ol>
          <li>Be specific about privacy implications, not vague</li>
          <li>Offer alternatives when a cost is significant</li>
          <li>Place cost warnings BEFORE the user commits to the action</li>
          <li>Use clear, non-technical language</li>
          <li>Update information when costs change (e.g., new privacy policy)</li>
          <li>Let users make informed choices, then respect their decision</li>
        </ol>
      </div>

      <div className="ethics-box">
        <h2>Why This Matters</h2>
        <p>
          Users have the right to understand what they're trading for convenience. 
          Some users may gladly accept high privacy costs for quick access. Others might 
          prefer privacy over convenience. By explaining costs clearly, you empower users 
          to make choices that align with their values.
        </p>
      </div>
    </div>
  );
}
