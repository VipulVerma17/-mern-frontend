import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ code: '', title: '', department: '', credits: '', semester: '' });

  const loadCourses = async () => {
    const { data } = await api.get('/courses');
    setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/courses', { ...form, credits: Number(form.credits) });
    setForm({ code: '', title: '', department: '', credits: '', semester: '' });
    loadCourses();
  };

  return (
    <div>
      <h1>Courses</h1>
      <form className="card" onSubmit={handleSubmit}>
        <h3>Add course</h3>
        <input placeholder="Course Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
        <input placeholder="Course Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
        <input placeholder="Credits" value={form.credits} onChange={(e) => setForm({ ...form, credits: e.target.value })} />
        <input placeholder="Semester" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} />
        <button type="submit">Save</button>
      </form>
      <div className="card">
        <h3>Course Catalog</h3>
        {courses.map((course) => (
          <div key={course._id} className="row-item">
            <strong>{course.title}</strong>
            <span>{course.code} • {course.department} • {course.credits} credits</span>
          </div>
        ))}
      </div>
    </div>
  );
}
