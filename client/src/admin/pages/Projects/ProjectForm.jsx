// import React from "react";
// import Select from "react-select";

// const ProjectForm = ({
//   formData,
//   setFormData,
//   ownerOptions,
//   teamOptions,
//   onCancel,
//   onSubmit,
// }) => {
//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <form
//         onSubmit={onSubmit}
//         className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-2xl space-y-4"
//       >
//         <h2 className="text-xl font-bold text-gray-800">Add New Project</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             name="name"
//             placeholder="Project Name"
//             value={formData.name}
//             onChange={handleInput}
//             className="w-full border rounded p-2"
//             required
//           />
//           <input
//             type="date"
//             name="deadline"
//             value={formData.deadline}
//             onChange={handleInput}
//             className="w-full border rounded p-2"
//             required
//           />
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleInput}
//             className="w-full border rounded p-2"
//           >
//             <option>In Progress</option>
//             <option>Completed</option>
//             <option>Pending</option>
//             <option>On Hold</option>
//             <option>Cancelled</option>
//           </select>
//           <select
//             name="priority"
//             value={formData.priority}
//             onChange={handleInput}
//             className="w-full border rounded p-2"
//           >
//             <option>Low</option>
//             <option>Medium</option>
//             <option>High</option>
//             <option>Critical</option>
//           </select>

//           <Select
//             name="owner"
//             options={ownerOptions}
//             value={ownerOptions.find((opt) => opt.value === formData.owner)}
//             onChange={(selectedOption) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 owner: selectedOption?.value || "",
//               }))
//             }
//             placeholder="Select Owner (Client Only)"
//             className="w-full"
//           />

//           <Select
//             isMulti
//             name="team"
//             options={teamOptions || []}
//             value={(teamOptions || []).filter((opt) =>
//               formData.team.includes(opt.value)
//             )}
//             onChange={(selectedOptions) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 team: selectedOptions.map((opt) => opt.value),
//               }))
//             }
//             placeholder="Select Team Members"
//             className="w-full"
//           />
//         </div>

//         {/* Description Input */}
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleInput}
//           className="w-full border rounded p-2"
//         />

//         {/* 🧱 Milestones Section */}
//         <div className="border-t pt-4">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">
//             Milestones
//           </h3>

//           {formData.milestones?.map((milestone, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3 items-center"
//             >
//               <input
//                 type="text"
//                 placeholder="Milestone Title"
//                 value={milestone.title}
//                 onChange={(e) => {
//                   const updated = [...formData.milestones];
//                   updated[index].title = e.target.value;
//                   setFormData({ ...formData, milestones: updated });
//                 }}
//                 className="border rounded p-2"
//               />

//               <input
//                 type="date"
//                 value={milestone.dueDate?.split("T")[0] || ""}
//                 onChange={(e) => {
//                   const updated = [...formData.milestones];
//                   updated[index].dueDate = e.target.value;
//                   setFormData({ ...formData, milestones: updated });
//                 }}
//                 className="border rounded p-2"
//               />

//               <label className="flex items-center gap-2 text-sm text-gray-600">
//                 <input
//                   type="checkbox"
//                   checked={milestone.completed}
//                   onChange={(e) => {
//                     const updated = [...formData.milestones];
//                     updated[index].completed = e.target.checked;
//                     setFormData({ ...formData, milestones: updated });
//                   }}
//                 />
//                 Completed
//               </label>

//               <button
//                 type="button"
//                 onClick={() => {
//                   const updated = [...formData.milestones];
//                   updated.splice(index, 1);
//                   setFormData({ ...formData, milestones: updated });
//                 }}
//                 className="text-red-500 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() =>
//               setFormData((prev) => ({
//                 ...prev,
//                 milestones: [
//                   ...(prev.milestones || []),
//                   { title: "", dueDate: "", completed: false },
//                 ],
//               }))
//             }
//             className="mt-2 text-indigo-600 text-sm"
//           >
//             + Add Milestone
//           </button>
//         </div>

//         <div className="flex justify-end gap-3 pt-2">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProjectForm;



import React from "react";
import Select from "react-select";

const ProjectForm = ({
  formData,
  setFormData,
  ownerOptions,
  teamOptions,
  onCancel,
  onSubmit,
}) => {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl w-full max-w-2xl space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {formData._id ? "Edit Project" : "Add New Project"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Project Name"
            value={formData.name}
            onChange={handleInput}
            className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
            required
            aria-label="Project Name"
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInput}
            className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
            required
            aria-label="Deadline"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleInput}
            className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
          >
            <option>In Progress</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>On Hold</option>
            <option>Cancelled</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleInput}
            className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <div className="col-span-1">
            <Select
              name="owner"
              options={ownerOptions}
              value={ownerOptions.find((opt) => opt.value === formData.owner)}
              onChange={(selectedOption) =>
                setFormData((prev) => ({
                  ...prev,
                  owner: selectedOption?.value || "",
                }))
              }
              placeholder="Select Owner"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div className="col-span-1">
            <Select
              isMulti
              name="team"
              options={teamOptions || []}
              value={(teamOptions || []).filter((opt) =>
                formData.team.includes(opt.value)
              )}
              onChange={(selectedOptions) =>
                setFormData((prev) => ({
                  ...prev,
                  team: selectedOptions.map((opt) => opt.value),
                }))
              }
              placeholder="Select Team Members"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInput}
          className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
        />

        {/* Milestones Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Milestones
          </h3>

          {formData.milestones?.map((milestone, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3 items-center"
            >
              <input
                type="text"
                placeholder="Milestone Title"
                value={milestone.title}
                onChange={(e) => {
                  const updated = [...formData.milestones];
                  updated[index].title = e.target.value;
                  setFormData({ ...formData, milestones: updated });
                }}
                className="border rounded p-2 dark:bg-gray-800 dark:text-white"
              />

              <input
                type="date"
                value={milestone.dueDate?.split("T")[0] || ""}
                onChange={(e) => {
                  const updated = [...formData.milestones];
                  updated[index].dueDate = e.target.value;
                  setFormData({ ...formData, milestones: updated });
                }}
                className="border rounded p-2 dark:bg-gray-800 dark:text-white"
              />

              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  onChange={(e) => {
                    const updated = [...formData.milestones];
                    updated[index].completed = e.target.checked;
                    setFormData({ ...formData, milestones: updated });
                  }}
                />
                Completed
              </label>

              <button
                type="button"
                title="Remove this milestone"
                onClick={() => {
                  const updated = [...formData.milestones];
                  updated.splice(index, 1);
                  setFormData({ ...formData, milestones: updated });
                }}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                milestones: [
                  ...(prev.milestones || []),
                  { title: "", dueDate: "", completed: false },
                ],
              }))
            }
            className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm"
          >
            + Add Milestone
          </button>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
