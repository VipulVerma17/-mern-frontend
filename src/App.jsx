import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import FacultyPage from './pages/FacultyPage';
import CoursesPage from './pages/CoursesPage';
import AttendancePage from './pages/AttendancePage';
import FeesPage from './pages/FeesPage';
import NoticesPage from './pages/NoticesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="faculty" element={<FacultyPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="notices" element={<NoticesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
