import { useEffect, useState } from 'react';
import api from '../services/api';

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: '', body: '', priority: 'Normal' });

  const loadNotices = async () => {
    const { data } = await api.get('/notices');
    setNotices(data);
  };

  useEffect(() => { loadNotices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/notices', form);
    setForm({ title: '', body: '', priority: 'Normal' });
    loadNotices();
  };

  return (
    <div>
      <h1>Notices & Announcements</h1>
      <form className="card" onSubmit={handleSubmit}>
        <h3>Post a notice</h3>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Message" rows="4" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
        <button type="submit">Publish</button>
      </form>
      <div className="card">
        {notices.map((item) => (
          <div key={item._id} className="row-item" style={{ display: 'block' }}>
            <strong>{item.title}</strong>
            <p style={{ margin: '6px 0 0' }}>{item.body}</p>
            <small>{item.priority}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
