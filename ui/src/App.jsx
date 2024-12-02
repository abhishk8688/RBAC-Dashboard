import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./Components/UserList";
import RoleList from "./Components/RoleList";


function App() {
  return (
    <Router>
      <div className="p-8">
        <h1 className="text-4xl font-semibold mb-6">RBAC Dashboard</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/roles" element={<RoleList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
