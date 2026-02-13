import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeuristicPages.css';

export default function IH78Page() {
  interface Experiment {
    id: string;
    name: string;
    description: string;
    result?: string;
  }

  const [experiments, setExperiments] = useState<Experiment[]>([
    {
      id: 'exp1',
      name: 'Try Different Coordinates',
      description: 'Manually enter latitude and longitude instead of city/state',
      result: undefined
    },
    {
      id: 'exp2',
      name: 'Batch City Search',
      description: 'Search for multiple cities at once and compare results',
      result: undefined
    },
    {
      id: 'exp3',
      name: 'Historical Weather',
      description: 'Try entering historical dates to see past weather patterns',
      result: undefined
    }
  ]);

  const [tinkering, setTinkering] = useState<Record<string, boolean>>({});
  const [mindfulnessFocus, setMindfulnessFocus] = useState('curiosity');

  const toggleExperiment = (id: string) => {
    setTinkering(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const recordResult = (id: string, result: string) => {
    setExperiments(prev =>
      prev.map(exp =>
        exp.id === id ? { ...exp, result } : exp
      )
    );
  };

  const clearResults = () => {
    setExperiments(prev =>
      prev.map(exp => ({ ...exp, result: undefined }))
    );
    setTinkering({});
  };

  return (
    <div className="heuristic-page">
      <div className="page-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>IH#7 & IH#8: Safe Tinkering & Experimentation</h1>
        <p className="page-intro">
          Give users a safe space to try different approaches without consequences. Encourage 
          exploration while helping them tinker mindfully and learn from experiments.
        </p>
      </div>

      <div className="sandbox-intro">
        <h2>Experimentation Sandbox</h2>
        <p>
          This is a safe space to try different ideas. Nothing you do here affects your real weather data. 
          Experiment, make mistakes, learn what works—all without risk.
        </p>
      </div>

      <div className="mindfulness-guide">
        <h2>Tinker Mindfully</h2>
        <p>Choose what you want to focus on while experimenting:</p>
        <div className="mindfulness-options">
          <label className="mindfulness-option">
            <input
              type="radio"
              value="curiosity"
              checked={mindfulnessFocus === 'curiosity'}
              onChange={(e) => setMindfulnessFocus(e.target.value)}
            />
            <span>
              <strong>Pure Curiosity</strong>
              <p>Explore without a goal. See what happens when you change things.</p>
            </span>
          </label>

          <label className="mindfulness-option">
            <input
              type="radio"
              value="problem"
              checked={mindfulnessFocus === 'problem'}
              onChange={(e) => setMindfulnessFocus(e.target.value)}
            />
            <span>
              <strong>Problem Solving</strong>
              <p>Have a specific question? Tinker to find the answer.</p>
            </span>
          </label>

          <label className="mindfulness-option">
            <input
              type="radio"
              value="learning"
              checked={mindfulnessFocus === 'learning'}
              onChange={(e) => setMindfulnessFocus(e.target.value)}
            />
            <span>
              <strong>Learning</strong>
              <p>Study how the system works. Build mental models.</p>
            </span>
          </label>
        </div>
      </div>

      <div className="experiments-section">
        <h2>Try Different Approaches</h2>
        <p className="section-intro">
          Below are some suggested experiments. Try one, or come up with your own idea!
        </p>

        <div className="experiments-list">
          {experiments.map((exp) => (
            <div key={exp.id} className="experiment-card">
              <div 
                className="experiment-header"
                onClick={() => toggleExperiment(exp.id)}
                role="button"
                tabIndex={0}
              >
                <div className="experiment-title">
                  <input
                    type="checkbox"
                    checked={tinkering[exp.id] || false}
                    onChange={() => toggleExperiment(exp.id)}
                    aria-label={`Experiment: ${exp.name}`}
                  />
                  <h3>{exp.name}</h3>
                </div>
                <span className="expand-icon">
                  {tinkering[exp.id] ? '▼' : '▶'}
                </span>
              </div>

              {tinkering[exp.id] && (
                <div className="experiment-details">
                  <p className="description">{exp.description}</p>

                  <div className="experiment-form">
                    <label htmlFor={`${exp.id}-input`}>What did you discover?</label>
                    <textarea
                      id={`${exp.id}-input`}
                      value={exp.result || ''}
                      onChange={(e) => recordResult(exp.id, e.target.value)}
                      placeholder="Write down what you learned or tried..."
                      className="experiment-textarea"
                    />
                  </div>

                  {exp.result && (
                    <div className="result-preview">
                      <h4>✓ Result Recorded:</h4>
                      <p>{exp.result}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={clearResults} className="clear-button">
          Clear All Experiments
        </button>
      </div>

      <div className="custom-experiment">
        <h2>Create Your Own Experiment</h2>
        <div className="custom-idea">
          <h3>Have an idea?</h3>
          <p>
            Try it! Some questions to guide your thinking:
          </p>
          <ul>
            <li>What happens if I enter invalid data?</li>
            <li>Can I find weather for places that don't exist?</li>
            <li>What's the fastest way to get results?</li>
            <li>Are there any unexpected combinations that work?</li>
            <li>How does the app handle edge cases?</li>
          </ul>
        </div>
      </div>

      <div className="safe-space-info">
        <h2>This Is a Safe Space</h2>
        <div className="safety-features">
          <div className="feature">
            <h3>✓ No Permanent Changes</h3>
            <p>Experiment results are stored only in your browser. Refresh the page and they're gone.</p>
          </div>

          <div className="feature">
            <h3>✓ No Data Limits</h3>
            <p>Try anything you want. There are no artificial limits to prevent experimentation.</p>
          </div>

          <div className="feature">
            <h3>✓ Instant Feedback</h3>
            <p>See results immediately so you can iterate quickly.</p>
          </div>

          <div className="feature">
            <h3>✓ Learn from Mistakes</h3>
            <p>Errors and failures are learning opportunities, not problems.</p>
          </div>

          <div className="feature">
            <h3>✓ No Judgment</h3>
            <p>There's no "wrong" way to tinker. Exploration is the goal.</p>
          </div>
        </div>
      </div>

      <div className="implementation-box">
        <h2>How These Heuristics Work</h2>
        <ul>
          <li><strong>IH#7 - Try Different Approaches:</strong> Multiple valid ways to accomplish goals</li>
          <li><strong>IH#8 - Tinker Mindfully:</strong> Safe space + guided curiosity = learning</li>
          <li><strong>Clear Results:</strong> Users immediately see the outcomes of their experiments</li>
          <li><strong>Record Findings:</strong> Capture insights and discoveries</li>
          <li><strong>No Consequences:</strong> Experiments are isolated from actual functionality</li>
        </ul>
      </div>

      <div className="best-practices-box">
        <h2>Design Best Practices</h2>
        <ol>
          <li>
            <strong>Provide Sandboxes:</strong> Create separate areas for experimentation
          </li>
          <li>
            <strong>Show Examples:</strong> Suggest experiments to spark creativity
          </li>
          <li>
            <strong>Make it Obvious It's Safe:</strong> Use language like "try", "experiment", "test"
          </li>
          <li>
            <strong>Fast Feedback:</strong> Show results immediately, not after a delay
          </li>
          <li>
            <strong>Document Discoveries:</strong> Let users record what they learned
          </li>
          <li>
            <strong>Encourage Sharing:</strong> Let users share discoveries with others
          </li>
          <li>
            <strong>Low Stakes:</strong> No timers, no penalties, no scores
          </li>
          <li>
            <strong>Progressive Disclosure:</strong> Start with guided experiments, then open-ended
          </li>
        </ol>
      </div>

      <div className="psychology-box">
        <h2>Why Tinkering Matters</h2>
        <p>
          Humans learn by doing. When people can safely experiment, they:
        </p>
        <ul>
          <li>Discover features they didn't know existed</li>
          <li>Build mental models of how systems work</li>
          <li>Feel more in control of the application</li>
          <li>Become more engaged and motivated</li>
          <li>Make better decisions when they understand their options</li>
          <li>Feel ownership and mastery over the tool</li>
        </ul>
      </div>

      <div className="examples-box">
        <h2>Real-World Examples</h2>
        <ul>
          <li><strong>Scratch (Programming):</strong> Safe coding sandbox for learners</li>
          <li><strong>Figma Prototypes:</strong> Test design interactions without affecting live design</li>
          <li><strong>Spreadsheet Draft Mode:</strong> Try formulas in a safe copy</li>
          <li><strong>Analytics Dashboards:</strong> "Draft" view for experimenting with layouts</li>
          <li><strong>Browser Dev Tools:</strong> Console for testing code snippets safely</li>
        </ul>
      </div>

      <div className="reflection-box">
        <h2>Reflect on Your Experiments</h2>
        <p>
          After trying a few experiments, think about:
        </p>
        <ul>
          <li>What surprised you about how the app works?</li>
          <li>What did you learn about your own preferences?</li>
          <li>What would you want to try next?</li>
          <li>Did the safe space make you more or less willing to experiment?</li>
        </ul>
      </div>
    </div>
  );
}
