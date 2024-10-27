import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import MenuSideBar from './assets/components/MenuSideBar';
import LoginPage from './pages/LoginPage';
import ResidentListPage from './pages/ResidentListPage';
import UserListPage from './pages/UserListPage';
import ReportListPage from './pages/ReportListPage';

function App() {
  const location = useLocation();

  const showSidebar = location.pathname !== '/';

  return (
    <div className="grid grid-cols-8 gap-4 h-screen">
      {showSidebar && (
        <div className="col-span-1">
          <MenuSideBar />
        </div>
      )}
      <div className={`${!showSidebar ? 'col-span-8' : 'col-span-7'}`}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/residents" element={<ResidentListPage />} />
          <Route path="/admin/users" element={<UserListPage />} />
          <Route path="/admin/reports" element={<ReportListPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
