import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {
  const heuristics = [
    {
      id: 1,
      title: 'IH#1: Benefits of Features',
      description: 'Explain to users the benefits of using new and existing features',
      path: '/ih1-benefits',
      icon: '✓'
    },
    {
      id: 2,
      title: 'IH#2: Costs of Features',
      description: 'Explain to users the costs of using new and existing features',
      path: '/ih2-costs',
      icon: '⚠️'
    },
    {
      id: 3,
      title: 'IH#3: Information Control',
      description: 'Let users gather as much information as they want, and no more than they want',
      path: '/ih3-info-control',
      icon: '🎚️'
    },
    {
      id: 4,
      title: 'IH#4: Familiar Features',
      description: 'Keep familiar features available alongside new ones',
      path: '/ih4-familiar',
      icon: '🏠'
    },
    {
      id: 5,
      title: 'IH#5: Undo/Redo',
      description: 'Make undo/redo and backtracking available',
      path: '/ih5-undo-redo',
      icon: '↶'
    },
    {
      id: 6,
      title: 'IH#6: Explicit Path',
      description: 'Provide an explicit path through the task',
      path: '/ih6-explicit-path',
      icon: '→'
    },
    {
      id: 7,
      title: 'IH#7 & IH#8: Sandbox',
      description: 'Provide ways to try different approaches and encourage mindful tinkering',
      path: '/ih78-sandbox',
      icon: '🧪'
    }
  ];

  return (
    <div className="home-page">
      <div className="intro-section">
        <h1>Weather App - Inclusivity Heuristics</h1>
        <p className="intro-text">
          This weather application demonstrates 8 inclusive design heuristics. Each page shows 
          how to make features more accessible and inclusive for all users.
        </p>
      </div>

      <div className="heuristics-grid">
        {heuristics.map((h) => (
          <Link key={h.id} to={h.path} className="heuristic-card">
            <div className="card-icon">{h.icon}</div>
            <h2>{h.title}</h2>
            <p>{h.description}</p>
            <span className="card-link">Explore →</span>
          </Link>
        ))}
      </div>

      <section className="definition-section">
        <h2>What are Inclusivity Heuristics?</h2>
        <p>
          Inclusivity heuristics are design principles that help create software accessible to users 
          with varying needs, technical skills, and preferences. They ensure that everyone—regardless 
          of ability—can use your application effectively.
        </p>
      </section>
    </div>
  );
}
