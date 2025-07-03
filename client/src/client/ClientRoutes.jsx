import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import ClientHome from './pages/ClientHome';
import ClientProjects from './pages/ClientProjects';
import ClientTasks from './pages/ClientTasks';
import ClientReports from './pages/ClientReports';
import ClientProfile from './pages/ClientProfile';
import ClientSupport from './pages/ClientSupport';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<ClientHome />} />
        <Route path="projects" element={<ClientProjects />} />
        <Route path="tasks" element={<ClientTasks />} />
        <Route path="reports" element={<ClientReports />} />
        <Route path="profile" element={<ClientProfile />} />
        <Route path="support" element={<ClientSupport />} />
        <Route path="*" element={<ClientHome />} />
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
