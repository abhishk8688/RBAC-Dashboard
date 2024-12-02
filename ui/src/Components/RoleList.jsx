// src/components/RoleList.jsx
import React, { useState, useEffect } from "react";
import RoleForm from "./RoleForm";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch roles
    const fetchRoles = async () => {
      const data = [
        { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
        { id: 2, name: "Editor", permissions: ["Read", "Write"] },
      ];
      setRoles(data);
    };
    fetchRoles();
  }, []);

  const handleOpen = (role = null) => {
    setSelectedRole(role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRole(null);
  };

  const handleSave = (role) => {
    if (selectedRole) {
      // Update role
      setRoles(
        roles.map((r) => (r.id === selectedRole.id ? { ...r, ...role } : r))
      );
    } else {
      // Add new role
      setRoles([...roles, { ...role, id: roles.length + 1 }]);
    }
    handleClose();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-indigo-100 p-8">
      <button
        className="mb-6 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-xl shadow-md hover:bg-gradient-to-l transition duration-300"
        onClick={() => handleOpen()}
      >
        Add Role
      </button>
      <table className="min-w-full table-auto border-separate border-spacing-4">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-6 py-4 text-left font-semibold">Role</th>
            <th className="px-6 py-4 text-left font-semibold">Permissions</th>
            <th className="px-6 py-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr
              key={role.id}
              className="border-b hover:bg-gray-50 cursor-pointer transition-all duration-300"
            >
              <td className="px-6 py-4">{role.name}</td>
              <td className="px-6 py-4">{role.permissions.join(", ")}</td>
              <td className="px-6 py-4">
                <button
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-all duration-200"
                  onClick={() => handleOpen(role)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && <RoleForm role={selectedRole} onSave={handleSave} onClose={handleClose} />}
    </div>
  );
};

export default RoleList;
