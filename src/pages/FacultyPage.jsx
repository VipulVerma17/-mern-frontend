import { useEffect, useState } from 'react';
import api from '../services/api';

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [form, setForm] = useState({ facultyId: '', fullName: '', email: '', department: '', designation: '' });

  const loadFaculty = async () => {
    const { data } = await api.get('/faculty');
    setFaculty(data);
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/faculty', form);
    setForm({ facultyId: '', fullName: '', email: '', department: '', designation: '' });
    loadFaculty();
  };

  return (
    <div>
      <h1>Faculty</h1>
      <form className="card" onSubmit={handleSubmit}>
        <h3>Add faculty</h3>
        <input placeholder="Faculty ID" value={form.facultyId} onChange={(e) => setForm({ ...form, facultyId: e.target.value })} />
        <input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
        <input placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
        <button type="submit">Save</button>
      </form>
      <div className="card">
        <h3>Faculty Directory</h3>
        {faculty.map((person) => (
          <div key={person._id} className="row-item">
            <strong>{person.fullName}</strong>
            <span>{person.department} • {person.designation}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
