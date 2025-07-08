import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import EmployeeProjects from './pages/EmployeeProjects';
import EmployeeTasks from './pages/EmployeeTasks';
import EmployeeReports from './pages/EmployeeReports';
import EmployeeProfile from './pages/EmployeeProfile';
import EmployeeHome from './pages/EmployeeHome';
// import ClientSupport from './pages/ClientSupport';

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<EmployeeHome />} />
        <Route path="projects" element={<EmployeeProjects />} />
        <Route path="tasks" element={<EmployeeTasks />} />
        <Route path="reports" element={<EmployeeReports />} />
        <Route path="profile" element={<EmployeeProfile />} />
        {/* <Route path="support" element={<ClientSupport />} /> */}
        <Route path="*" element={<EmployeeHome />} />
      </Route>
    </Routes>
  );
};

export default EmployeeRoutes;
