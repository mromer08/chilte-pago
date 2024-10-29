import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./layouts/PrimaryLayout";
import Welcome from "./pages/Welcome";

export const ROLES = {
  User: 2000,
  Admin: 1001,
};


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Welcome />} />
        
      </Route>
    </Routes>
  );
}

export default App;