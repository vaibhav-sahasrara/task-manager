// import { motion } from "framer-motion";

// const TeamCard = ({ member, index, onView, onUpdate }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay: index * 0.1 }}
//     className={`rounded-3xl shadow-xl p-5 text-center hover:scale-105 transition transform duration-300
//       ${
//         !member.avatar || !member.expertise.length || !member.pastProjects.length
//           ? "bg-red-100 border border-red-300"
//           : "bg-gradient-to-br from-indigo-100 to-white"
//       }`}
//   >
//     <img
//       src={member.avatar || "https://i.pravatar.cc/150?img=1"}
//       alt={member.name}
//       className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-300 mb-3"
//     />
//     <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
//     <p className="text-sm text-indigo-600">{member.role}</p>
//     <p className="text-xs text-gray-500">{member.email}</p>
//     <button
//       className="mt-4 px-4 py-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 text-sm"
//       onClick={onView}
//     >
//       View Profile
//     </button>

//     {(!member.avatar || !member.expertise.length || !member.pastProjects.length) && (
//       <button
//         className="mt-2 px-4 py-1.5 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 text-sm"
//         onClick={onUpdate}
//       >
//         Update Profile
//       </button>
//     )}
//   </motion.div>
// );

// export default TeamCard;



import { motion } from "framer-motion";

const TeamCard = ({ member, index, onView, onUpdate }) => {
  const isIncomplete =
    !member.avatar || !member.expertise.length || !member.pastProjects.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-3xl shadow-xl p-5 text-center hover:scale-105 transition transform duration-300
        ${
          isIncomplete
            ? "bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-600"
            : "bg-gradient-to-br from-indigo-100 to-white dark:from-indigo-900 dark:to-gray-800"
        }`}
    >
      <img
        src={member.avatar || "https://i.pravatar.cc/150?img=1"}
        alt={member.name}
        className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-300 dark:border-indigo-600 mb-3"
      />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {member.name}
      </h3>
      <p className="text-sm text-indigo-600 dark:text-indigo-300">
        {member.role}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{member.email}</p>

      <button
        className="mt-4 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm"
        onClick={onView}
      >
        View Profile
      </button>

      {isIncomplete && (
        <button
          className="mt-2 px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full text-sm"
          onClick={onUpdate}
        >
          Update Profile
        </button>
      )}
    </motion.div>
  );
};

export default TeamCard;
