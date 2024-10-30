import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./layouts/PrimaryLayout";
import Welcome from "./pages/Welcome";
import NavBarLayout from "./layouts/NavBar";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import UserDashboard from "./pages/user/UserDashboard";
import ApplicationForm from "./pages/partials/applicattion/ApplicationForm";
import CreditCardList from "./pages/partials/cards/CreditCardList";
import NotFound from "./pages/NotFound";

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
        <Route element={<NavBarLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/user/new-app" element={<ApplicationForm/>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth allowedRole={ROLES.User} />}>
            <Route path="/user/cards" element={<CreditCardList/>} />
            <Route path="/user/dashboard" element={<UserDashboard/>} />
          
          </Route>
        

          {/* catch all */}
          <Route path="*" element={<NotFound />} />
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;