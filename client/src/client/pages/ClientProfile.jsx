import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientProfile = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/team');
        setTeam(res.data);
      } catch (err) {
        console.error('Failed to fetch team members:', err);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Team Members</h2>
      {team.length === 0 ? (
        <p className="text-gray-500">No team members found.</p>
      ) : (
        <ul className="space-y-3">
          {team.map((member) => (
            <li
              key={member._id}
              className="border rounded-md p-3 bg-white shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-600">{member.email}</p>
                <p className="text-xs text-gray-400">ID: {member._id}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientProfile;
