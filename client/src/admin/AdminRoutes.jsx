import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
// import TaskAssign from './pages/TaskAssign';
import TaskManager from "./pages/TaskManager/TaskManager";

// import TaskManager from "./pages/TaskManager";
import PendingUsers from "./pages/PendingUsers";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="team" element={<Team />} />
        {/* <Route path="tasks-manager" element={<TaskManager />} /> */}
        <Route path="tasks" element={<TaskManager />} />
        <Route path="tasks-manager" element={<Team />} />
        <Route path="pending-users" element={<PendingUsers />} />

        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
