import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Admin from "./pages/admin/Admin";
import Trainer from "./pages/trainers/Trainer";
import Events from "./pages/events/Events";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserMembership from "./pages/membership/UserMembership";
import MembershipPackages from "./pages/membership/MembershipPackages";
import AddEvents from "./pages/events/AddEvents";
import MemberList from "./pages/members/MemberList";
import AddMembers from "./pages/members/AddMembers";
import Invoices from "./pages/billing/Invoices";
import Payments from "./pages/billing/Payments";
import RenewalAlerts from "./pages/billing/RenewalAlerts";
import Appointments from "./pages/wellness/Appointments";
import Packages from "./pages/wellness/Packages";
import Services from "./pages/wellness/Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import AddAdmin from "./pages/admin/AddAdmin";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />

            {/* Management */}
            <Route path="admin" element={<Admin />} />
            {/* <Route path="admin/add-admin" element={<AddAdmin />} /> */}
            <Route path="trainer" element={<Trainer />} />
            {/* <Route path="inventory" element={<Inven} /> */}

            {/* Wellness */}
            <Route path="wellness/appointments" element={<Appointments />} />
            <Route path="wellness/packages" element={<Packages />} />
            <Route path="wellness/services" element={<Services />} />

            {/* Members */}
            <Route path="members/list" element={<MemberList />} />
            <Route path="members/add-members" element={<AddMembers />} />

            {/* Membership plans */}
            <Route
              path="membership/user-membership"
              element={<UserMembership />}
            />
            <Route
              path="membership/packages"
              element={<MembershipPackages />}
            />
            {/* Billing */}
            <Route path="billing/invoice" element={<Invoices />} />
            <Route path="billing/payment" element={<Payments />} />
            <Route path="billing/alerts" element={<RenewalAlerts />} />

            {/* Events */}
            <Route path="event/list" element={<Events />} />
            <Route path="event/add-event" element={<AddEvents />} />

            {/* Auth */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
