import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API now returns formatted response: { success, statusCode, data: { token, user }, message, timestamp }
      const response = await api.post('/auth/login', form);
      
      if (response.success && response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMsg = error.message || 'Login failed. Please try again.';
      setError(errorMsg);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Sign in to CampusCore</h2>
        
        {error && <div style={{ color: '#d32f2f', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
        
        <input 
          placeholder="Email" 
          type="email"
          value={form.email} 
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={loading}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p>New here? <Link to="/register">Create account</Link></p>
        
        {/* Demo credentials hint */}
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px', fontSize: '12px' }}>
          <strong>Demo Credentials:</strong><br/>
          Email: admin@college.com<br/>
          Password: Admin@123
        </div>
      </form>
    </div>
  );
}
