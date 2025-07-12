import React, { useMemo, useEffect, useState } from "react";

import { Card, CardContent } from "../../admin/components/common/Card";
import { Progress } from "../../ui/Progress";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/Tabs";
import { Tabs } from "../../ui/Tabs"; // ✅ Only import what exists

import { ScrollArea } from "../../ui/ScrollArea";
import axios from "../../utils/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";

/**
 * EmployeeReport component
 * Props:
 *   reportData: { tasks: Task[], byProject: { _id, projectName, taskCount }[] }
 */
export default function EmployeeReport() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const { data } = await axios.get("/api/reports/me", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setReport(data);
    };
    fetchReport();
  }, []);

  // Always define tasks and byProject (even if report is null)
  const tasks = report?.tasks || [];
  const byProject = report?.byProject || [];

  // ✅ Hooks always run regardless of data
  const statusBreakdown = useMemo(() => {
    const counts = tasks.reduce(
      (acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      },
      { "To Do": 0, "In Progress": 0, Done: 0 }
    );
    return Object.entries(counts).map(([status, value]) => ({ status, value }));
  }, [tasks]);

  const priorityBreakdown = useMemo(() => {
    const counts = tasks.reduce((acc, t) => {
      acc[t.priority] = (acc[t.priority] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([priority, value]) => ({
      priority,
      value,
    }));
  }, [tasks]);

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
  };

  if (!report) return <p className="p-4">Loading report…</p>;

  return (
    <div className="w-full p-4 space-y-6">
      {/* KPI Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <StatCard
          icon={<FiCalendar className="w-5 h-5" />}
          label="Total Tasks"
          value={tasks.length}
        />
        <StatCard
          icon={<FiTrendingUp className="w-5 h-5" />}
          label="In Progress"
          value={
            statusBreakdown.find((s) => s.status === "In Progress")?.value || 0
          }
        />
        <StatCard
          icon={<FiClock className="w-5 h-5" />}
          label="Pending"
          value={statusBreakdown.find((s) => s.status === "To Do")?.value || 0}
        />
        <StatCard
          icon={<FiCheckCircle className="w-5 h-5" />}
          label="Completed"
          value={statusBreakdown.find((s) => s.status === "Done")?.value || 0}
        />
      </motion.div>

      {/* Charts & Task Table */}
      <Tabs defaultValue="table" className="space-y-6">
        <TabsList className="w-full justify-center gap-2">
          <TabsTrigger value="table">Task Table</TabsTrigger>
          <TabsTrigger value="status">Status Chart</TabsTrigger>
          <TabsTrigger value="priority">Priority Chart</TabsTrigger>
          <TabsTrigger value="project">By Project</TabsTrigger>
        </TabsList>

        {/* Task Table */}
        <TabsContent value="table">
          <ScrollArea className="h-[400px] rounded-xl border">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-2 text-left">Task</th>
                  <th className="p-2 text-left">Project</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Priority</th>
                  <th className="p-2 text-left">Deadline</th>
                  <th className="p-2 text-left">Progress</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t, i) => (
                  <tr
                    key={t._id}
                    className="border-b hover:bg-muted/20 transition"
                  >
                    <td className="p-2 font-medium">{t.name}</td>
                    <td className="p-2">{t.project?.name}</td>
                    <td className="p-2">{t.status}</td>
                    <td className="p-2">{t.priority}</td>
                    <td className="p-2">{formatDate(t.deadline)}</td>
                    <td className="p-2 w-40">
                      <Progress value={t.progress} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </TabsContent>

        {/* Status Chart */}
        <TabsContent value="status">
         <ChartCard title="Tasks by Status">
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={statusBreakdown} outerRadius={100} label>
          {statusBreakdown.map((_, idx) => (
            <Cell
              key={idx}
              fill={["#38bdf8", "#fbbf24", "#22c55e"][idx % 3]} // ✅ give each slice a colour
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </ChartCard>
        </TabsContent>

        {/* Priority Chart */}
        <TabsContent value="priority">
          <ChartCard title="Tasks by Priority">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityBreakdown}>
                <XAxis dataKey="priority" />
                <YAxis allowDecimals={false} />
                <Bar dataKey="value" fill="#38bdf8" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        {/* Project Chart */}
        <TabsContent value="project">
          <ChartCard title="Tasks by Project">
            <ResponsiveContainer width="100%" height={300}>
              /* Project bars */
              <BarChart data={byProject}>
                <XAxis dataKey="projectName" />
                <YAxis allowDecimals={false} />
                <Bar dataKey="taskCount" fill="#4ade80" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ----------------- Helper components ----------------- */
const StatCard = ({ icon, label, value }) => (
  <Card className="flex items-center gap-4 p-4">
    <div className="p-3 rounded-full bg-primary/10 text-primary">{icon}</div>
    <div>
      <p className="text-2xl font-bold leading-none">{value}</p>
      <p className="text-muted-foreground text-xs mt-1 uppercase tracking-wide">
        {label}
      </p>
    </div>
  </Card>
);

const ChartCard = ({ title, children }) => (
  <Card>
    <CardContent className="p-6">
      <h2 className="font-semibold mb-4 text-lg">{title}</h2>
      {children}
    </CardContent>
  </Card>
);
