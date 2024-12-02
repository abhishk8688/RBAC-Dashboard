import React, { useState, useEffect } from "react";

const RoleForm = ({ role, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    permissions: {
      read: false,
      write: false,
      delete: false,
    },
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        permissions: {
          read: role.permissions.includes("Read"),
          write: role.permissions.includes("Write"),
          delete: role.permissions.includes("Delete"),
        },
      });
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        permissions: { ...prev.permissions, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRole = {
      ...formData,
      permissions: Object.keys(formData.permissions).filter(
        (perm) => formData.permissions[perm]
      ),
    };
    onSave(updatedRole);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full sm:w-96 max-w-full transition-transform transform scale-105 hover:scale-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{role ? "Edit Role" : "Add Role"}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
              Role Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Role Name"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Permissions</h3>
            <div className="space-y-4">
              {["read", "write", "delete"].map((perm) => (
                <label key={perm} className="flex items-center space-x-3 cursor-pointer hover:text-blue-600 transition-all duration-200">
                  <input
                    type="checkbox"
                    name={perm}
                    checked={formData.permissions[perm]}
                    onChange={handleChange}
                    className="h-6 w-6 text-blue-500 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <span className="text-sm text-gray-600 capitalize">{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-gradient-to-l transition duration-300"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-md hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;
