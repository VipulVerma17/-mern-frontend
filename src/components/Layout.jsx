import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <h2>CampusCore</h2>
          <p>College Management Suite</p>
        </div>
        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/students">Students</NavLink>
          <NavLink to="/faculty">Faculty</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/attendance">Attendance</NavLink>
          <NavLink to="/fees">Fees</NavLink>
          <NavLink to="/notices">Notices</NavLink>
        </nav>
        <button onClick={logout}>Logout</button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
