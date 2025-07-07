import { FaUserTie, FaFilter } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { GiSkills } from "react-icons/gi";

const FilterBar = ({ filters, setFilters }) => (
  <div className="grid sm:grid-cols-3 gap-4 mb-6">
    {/* Role Filter */}
    <div className="relative">
      <FaUserTie className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder="Filter by Role"
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        value={filters.role}
        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
      />
    </div>

    {/* Status Filter */}
    <div className="relative">
      <MdOutlineWork className="absolute left-3 top-3 text-gray-400" />
      <select
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="active">Working</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>

    {/* Expertise Filter */}
    <div className="relative">
      <GiSkills className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder="Filter by Expertise"
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        value={filters.expertise}
        onChange={(e) => setFilters({ ...filters, expertise: e.target.value })}
      />
    </div>
  </div>
);

export default FilterBar;
