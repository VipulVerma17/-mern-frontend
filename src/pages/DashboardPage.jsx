import { useEffect, useState } from 'react';
import api from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({ students: 0, faculty: 0, courses: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlights] = useState([
    'Admissions are on track',
    'Faculty scheduling is balanced',
    'Fee collection is healthy'
  ]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // API returns: { success, statusCode, data: { students, faculty, courses }, message, timestamp }
        const response = await api.get('/dashboard');
        
        if (response.success && response.data) {
          setStats(response.data);
        } else {
          setError(response.message || 'Failed to load dashboard stats');
        }
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8d7da', 
        color: '#721c24', 
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h3>Error Loading Dashboard</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome back</h1>
      <p>Run admissions, academics, attendance, fees, and communications from one modern campus command center.</p>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.students}</h3>
          <p>Students</p>
        </div>
        <div className="stat-card">
          <h3>{stats.faculty}</h3>
          <p>Faculty</p>
        </div>
        <div className="stat-card">
          <h3>{stats.courses}</h3>
          <p>Courses</p>
        </div>
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
