import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API now returns formatted response: { success, statusCode, data: { token, user }, message, timestamp }
      const response = await api.post('/auth/register', form);
      
      if (response.success && response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMsg = error.message || 'Registration failed. Please try again.';
      setError(errorMsg);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create your account</h2>
        
        {error && <div style={{ color: '#d32f2f', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
        
        <input 
          placeholder="Full Name" 
          value={form.fullName} 
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          disabled={loading}
          required
        />
        <input 
          placeholder="Email" 
          type="email"
          value={form.email} 
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={loading}
          required
        />
        <input 
          type="password" 
          placeholder="Password (min 8 chars, uppercase, lowercase, number, special char)" 
          value={form.password} 
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={loading}
          required
        />
        <select 
          value={form.role} 
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          disabled={loading}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
