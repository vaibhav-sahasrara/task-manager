// export const normalizeAssignees = (assignees = [], teamMembers = []) => {
//   return assignees.map((a) => {
//     if (typeof a === "string") {
//       return teamMembers.find((m) => m.value === a) || { value: a, label: "Unknown" };
//     }
//     if (a._id) return { value: a._id, label: a.name };
//     if (a.value && a.label) return a;
//     return { value: "unknown", label: "Unknown" };
//   });
// };

// export const groupTasksByStatus = (tasks, statuses) => {
//   return statuses.reduce((acc, status) => {
//     acc[status] = tasks.filter((task) => task.status === status);
//     return acc;
//   }, {});
// };



export const normalizeAssignees = (assignees = [], teamMembers = []) => {
  return assignees.map((a) => {
    if (typeof a === "string") {
      const found = teamMembers.find((m) => m.value === a);
      return found || { value: a, label: "Unknown" };
    }
    if (a._id) return { value: a._id, label: a.name };
    if (a.value && a.label) return a;
    return { value: "unknown", label: "Unknown" };
  });
};

export const groupTasksByStatus = (tasks = [], statuses = []) => {
  return statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task?.status === status);
    return acc;
  }, {});
};
