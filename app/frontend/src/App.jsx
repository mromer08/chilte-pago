import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./layouts/PrimaryLayout";
import Welcome from "./pages/Welcome";
import NavBarLayout from "./layouts/NavBar";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import ApplicationForm from "./pages/partials/applicattion/ApplicationForm";
import CreditCardList from "./pages/partials/cards/CreditCardList";
import NotFound from "./pages/NotFound";
import Movement from "./pages/user/Movement";
import BalanceForm from "./pages/user/customer/BalanceForm";
import EditProfile from "./pages/user/EditProfile";
import UserList from "./pages/user/admin/UserList";
import AllMovement from "./pages/user/admin/AllMovements";

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
          {/* rutas de usuario */}
          <Route element={<RequireAuth allowedRole={ROLES.User} />}>
            <Route path="/user/cards" element={<CreditCardList/>} />
            <Route path="/user/movements" element={<Movement/>}/>
            <Route path="/user/balance" element={<BalanceForm/>}/>
            <Route path="/user/profile" element={<EditProfile/>}/>
          
          </Route>

          {/* rutas de admin */}
          <Route element={<RequireAuth allowedRole={ROLES.Admin} />}>
            <Route path="/admin/users" element={<UserList/>}/>
            <Route path="/admin/movements" element={<AllMovement/>}/>
          </Route>
        

          {/* catch all */}
          <Route path="*" element={<NotFound />} />
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;