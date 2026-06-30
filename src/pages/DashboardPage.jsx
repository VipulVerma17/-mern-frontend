import { useEffect, useState } from 'react';
import api from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({ students: 0, faculty: 0, courses: 0 });
  const [highlights, setHighlights] = useState([
    'Admissions are on track',
    'Faculty scheduling is balanced',
    'Fee collection is healthy'
  ]);

  useEffect(() => {
    api.get('/dashboard').then(({ data }) => setStats(data));
  }, []);

  return (
    <div>
      <h1>Welcome back</h1>
      <p>Run admissions, academics, attendance, fees, and communications from one modern campus command center.</p>
      <div className="stats-grid">
        <div className="stat-card"><h3>{stats.students}</h3><p>Students</p></div>
        <div className="stat-card"><h3>{stats.faculty}</h3><p>Faculty</p></div>
        <div className="stat-card"><h3>{stats.courses}</h3><p>Courses</p></div>
      </div>
      <div className="card" style={{ marginTop: 20, maxWidth: '100%' }}>
        <h3>Operational Highlights</h3>
        <ul>
          {highlights.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
