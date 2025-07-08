// client/pages/ClientNotifications.jsx
const dummyNotifications = [
  { id: 1, message: "Project ‘E-commerce’ is 65% completed.", date: "2025-07-08" },
  { id: 2, message: "New team member added: Jane Smith.", date: "2025-07-07" },
  { id: 3, message: "Deadline for ‘Analytics Dashboard’ is approaching.", date: "2025-07-06" },
];

const ClientNotifications = () => {
  return (
    <div className="space-y-4">
      {dummyNotifications.map((note) => (
        <div
          key={note.id}
          className="bg-white border border-gray-100 p-4 rounded-lg shadow hover:shadow-md transition"
        >
          <p className="text-sm text-gray-800">{note.message}</p>
          <span className="text-xs text-gray-500">{note.date}</span>
        </div>
      ))}
    </div>
  );
};

export default ClientNotifications;
