import { useEffect, useState } from 'react';
import api from '../services/api';

export default function FeesPage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ studentName: '', amount: '', status: 'Pending' });

  const loadRecords = async () => {
    const { data } = await api.get('/fees');
    setRecords(data);
  };

  useEffect(() => { loadRecords(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/fees', { ...form, amount: Number(form.amount) });
    setForm({ studentName: '', amount: '', status: 'Pending' });
    loadRecords();
  };

  return (
    <div>
      <h1>Fee Management</h1>
      <form className="card" onSubmit={handleSubmit}>
        <h3>Add fee record</h3>
        <input placeholder="Student Name" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} />
        <input placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        <button type="submit">Save</button>
      </form>
      <div className="card">
        {records.map((item) => (
          <div key={item._id} className="row-item">
            <strong>{item.studentName}</strong>
            <span>{item.amount} • {item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
