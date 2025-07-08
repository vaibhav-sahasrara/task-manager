// client/pages/ClientTeam.jsx
const dummyTeam = [
  { _id: "1", name: "John Doe", role: "Frontend Developer", email: "john@example.com" },
  { _id: "2", name: "Jane Smith", role: "Backend Developer", email: "jane@example.com" },
  { _id: "3", name: "Ravi Kumar", role: "UI/UX Designer", email: "ravi@example.com" },
];

const ClientTeam = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyTeam.map((member) => (
        <div
          key={member._id}
          className="bg-white border border-gray-200 rounded-xl shadow p-5 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-indigo-700">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.role}</p>
          <p className="text-xs text-gray-500 mt-2">{member.email}</p>
        </div>
      ))}
    </div>
  );
};

export default ClientTeam;
