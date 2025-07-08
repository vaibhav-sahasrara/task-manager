// client/pages/ClientDiscussions.jsx
import React from "react";

const dummyDiscussions = [
  {
    id: 1,
    topic: "E-commerce UI Feedback",
    author: "John Doe",
    lastReply: "2 hours ago",
    replies: 5,
  },
  {
    id: 2,
    topic: "Payment Gateway Integration",
    author: "Jane Smith",
    lastReply: "1 day ago",
    replies: 2,
  },
];

const ClientDiscussions = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Discussions</h2>
      <div className="bg-white shadow-md rounded-lg divide-y">
        {dummyDiscussions.map((discussion) => (
          <div key={discussion.id} className="p-4 hover:bg-indigo-50 transition">
            <h3 className="text-md font-medium text-gray-800">
              {discussion.topic}
            </h3>
            <p className="text-sm text-gray-500">
              Started by {discussion.author} · Last reply {discussion.lastReply}
            </p>
            <span className="text-sm text-indigo-600">{discussion.replies} replies</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDiscussions;
