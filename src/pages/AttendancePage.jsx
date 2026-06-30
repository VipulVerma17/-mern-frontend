import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AttendancePage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ studentName: '', course: '', status: 'Present' });

  const loadRecords = async () => {
    const { data } = await api.get('/attendance');
    setRecords(data);
  };

  useEffect(() => { loadRecords(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/attendance', form);
    setForm({ studentName: '', course: '', status: 'Present' });
    loadRecords();
  };

  return (
    <div>
      <h1>Attendance</h1>
      <form className="card" onSubmit={handleSubmit}>
        <h3>Mark attendance</h3>
        <input placeholder="Student Name" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} />
        <input placeholder="Course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
        <button type="submit">Save</button>
      </form>
      <div className="card">
        {records.map((item) => (
          <div key={item._id} className="row-item">
            <strong>{item.studentName}</strong>
            <span>{item.course} • {item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
