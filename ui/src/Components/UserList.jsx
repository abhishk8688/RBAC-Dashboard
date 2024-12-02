import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    
    const fetchUsers = async () => {
      const data = [
        { id: 1, name: "Abhishek ", email: "abhi123@gmail.com", role: "Admin", status: "Active" },
        { id: 2, name: "Steve Smith", email: "steve@gmail.com", role: "Editor", status: "Inactive" },
      ];
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleOpen = (user = null) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = (user) => {
    if (selectedUser) {
      
      setUsers(users.map(u => u.id === user.id ? user : u));
    } else {
      
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setOpen(false);
  };

  return (
    <div>
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => handleOpen()}
      >
        Add User
      </button>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-gray-700">
              <td className="px-4 py-2 border-b">{user.name}</td>
              <td className="px-4 py-2 border-b">{user.email}</td>
              <td className="px-4 py-2 border-b">{user.role}</td>
              <td className="px-4 py-2 border-b">{user.status}</td>
              <td className="px-4 py-2 border-b">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleOpen(user)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && <UserForm user={selectedUser} onSave={handleSave} onClose={handleClose} />}
    </div>
  );
};

export default UserList;
