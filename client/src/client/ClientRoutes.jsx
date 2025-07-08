import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout"; // reuse common layout
import ClientHome from "./pages/ClientHome";
import ClientProjects from "./pages/ClientProjects";
import ClientTeam from "./pages/ClientTeam";
import ClientNotifications from "./pages/ClientNotifications";
import ClientReports from "./pages/ClientReports";
import ClientDiscussions from "./pages/ClientDiscussions";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<ClientHome />} />
        <Route path="/projects" element={<ClientProjects />} />
        <Route path="/team" element={<ClientTeam />} />
          <Route path="/reports" element={<ClientReports />} />
            <Route path="/discussions" element={<ClientDiscussions />} />
        <Route path="/notifications" element={<ClientNotifications />} />
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
