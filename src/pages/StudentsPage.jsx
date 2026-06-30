import { useEffect, useState } from 'react';
import api from '../services/api';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', fullName: '', email: '', department: '', year: '' });

  const loadStudents = async () => {
    const { data } = await api.get('/students');
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/students', form);
    setForm({ studentId: '', fullName: '', email: '', department: '', year: '' });
    loadStudents();
  };

  return (
    <div>
      <h1>Students</h1>
      <form className="card" onSubmit={handleSubmit}>
        <h3>Add student</h3>
        <input placeholder="Student ID" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} />
        <input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
        <input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
        <button type="submit">Save</button>
      </form>
      <div className="card">
        <h3>Student Directory</h3>
        {students.map((student) => (
          <div key={student._id} className="row-item">
            <strong>{student.fullName}</strong>
            <span>{student.department} • {student.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
