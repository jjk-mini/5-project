import { Navigate, Route, Routes } from "react-router-dom"
import useAuth from "./hooks/useAuth"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from "./pages/HomePage";
import LoginPage     from "./pages/LoginPage";
import RegisterPAge from './pages/RegisterPage'
import PrivateRoute from "./utils/PrivateRoute"
import RoleRoute    from "./utils/RoleRoute"
import NotFoundPage from "./pages/NotFoundPage";
import { ROLES }    from "./constants/roles";
import BillingPage from "./pages/BillingPage"
import BookingPage from "./pages/BookingPage"
import ContactPage from "./pages/ContactPage"
import PrivacyPolicy from "./components/PrivacyPolicy"
import TermAndServices from "./components/TermsAndServices"
import Cookies from "./components/CookiesPolicy"
import AdminDashboard from "./pages/AdminDashboard"
import StaffManagement from "./pages/StaffManagement"
import  ProfilePage from "./pages/ProfilePage"
import RoomManagement from "./pages/RoomManagement"
import CheckInOut from "./pages/CheckInOut"
import HousekeepingPage from "./pages/HousekeepingDashboard"
import MantenanceRequestsPage from "./pages/MaintenanceRequestsPage"
import GuestDashboard from "./pages/GuestDashboard"
import ReportsPage from "./pages/ReportsPage"
import FeedbackPage from "./pages/FeedbackPage"
import Accommodations from "./pages/Accommodations"
import RoomExperience from "./pages/RoomExperience";
import PaymentForm from "./components/PaymentForm"
import NewBookingModal from "./components/NewBookingModal";
import GuestServices from "./pages/GuestServices";
import AboutUsPage from "./pages/AboutUsPage";
import AmenitiesPage from "./pages/AmenitiesPage";
import GalleryPage from "./pages/GalleryPage";
import GuestProfilePage from "./pages/GuestProfilePage";


function Placeholder({ title, owner }) {
  return (
    <div style={{
      minHeight:      "60vh",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      fontFamily:     "'Inter', sans-serif",
      gap:            "12px",
    }}>
      <div style={{
        width:        "56px",
        height:       "56px",
        borderRadius: "50%",
        background:   "#f2ebe4",
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        fontSize:     "24px",
      }}>🚧</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#3e2f20", margin: 0 }}>
        {title}
      </h2>
      <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>
        Being built by <strong>{owner}</strong> — coming soon
      </p>
    </div>
  );
}

function UnauthorizedPage() {
  return (
    <div style={{
      minHeight:      "60vh",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      fontFamily:     "'Inter', sans-serif",
      gap:            "12px",
    }}>
      <div style={{ fontSize: "48px" }}>🔒</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#3e2f20", margin: 0 }}>
        Access Denied
      </h2>
      <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>
        You don't have permission to view this page.
      </p>
    </div>
  );
}


function DefaultRedirect(){
  const {user, isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
switch (user?.role) {
  case ROLES.ADMIN:
    case ROLES.MANAGER: return  <Navigate to="/admin/dashboard" replace />;
    case ROLES.RECEPTIONIST: return <Navigate to="/receptionist/dashboard" replace />;
    case ROLES.HOUSEKEEPING: return <Navigate to="/housekeeping/dashboard" replace />;
    // case ROLES.GUEST:        return <Navigate to="/guest/dashboard" replace />;
    default:                 return <Navigate to="/" replace />;

}

}

// showNav defaults to true — pass showNav={false} on internal/dashboard
// routes (admin, receptionist, housekeeping, profile, settings, staff) so
// logged-in users see the sidebar-driven layout without the public navbar.
function Layout({ children, showFooter, showNav = true }){
return(
  <>
  {showNav && <Navbar/>}
  <main>{children}</main>
  {showFooter && <Footer/> }
  </>
)
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={
        <Layout showFooter>
          <HomePage/>
        </Layout>
      }/>




     <Route path="/login" element={< LoginPage />} />
    <Route path="/register" element={ <RegisterPAge/> } />

  <Route path="" element={
    <Layout>
      <UnauthorizedPage/>
    </Layout>
  } />

  <Route path="/dashboard" element={<DefaultRedirect/>} />

  <Route path="/admin/dashboard" element={
    <Layout showFooter={false} showNav={false}>
      <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
        <AdminDashboard/>
      </RoleRoute>
   </Layout>
  } />

      <Route path="/admin/reports" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <ReportsPage />
          </RoleRoute>
        </Layout>
      } />

            <Route path="/admin/setting" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.ADMIN, ]}>
            <placeholder title="Settings" owner="You" />
          </RoleRoute>
        </Layout>
      } />

         <Route path="/receptionist/dashboard" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.RECEPTIONIST]}>
            <BookingPage />
          </RoleRoute>
        </Layout>
      } />


      <Route path="/admin/rooms" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.RECEPTIONIST]}>
            <RoomManagement />
          </RoleRoute>
        </Layout>
      } />

      <Route path="/receptionist/bookings" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.RECEPTIONIST]}>
            <BookingPage />
          </RoleRoute>
        </Layout>
      } />

      <Route path="/receptionist/checkinout" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.RECEPTIONIST]}>
            <CheckInOut />
          </RoleRoute>
        </Layout>
      } />

      
      <Route path="/receptionist/billing" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.RECEPTIONIST]}>
            < BillingPage />
          </RoleRoute>
        </Layout>
      } />

      <Route path="/housekeeping/dashboard" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.HOUSEKEEPING]}>
            <HousekeepingPage />
          </RoleRoute>
        </Layout>
      } />

            <Route path="/housekeeping/maintenance" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.HOUSEKEEPING]}>
            < MantenanceRequestsPage />
          </RoleRoute>
        </Layout>
      } />

      <Route path="/guest/dashboard" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.GUEST]}>
            <GuestDashboard />
          </RoleRoute>
        </Layout>
      } />

      <Route path="/guest/services" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.GUEST]}>
           <GuestServices/>
          </RoleRoute>
        </Layout>
      } />
            {/* <Route path="/guest/invoice" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.GUEST]}>
            <BillingPage />
          </RoleRoute>
        </Layout>
      } /> */}

            {/* <Route path="/guest/feedback" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.GUEST]}>
            <FeedbackPage />
          </RoleRoute>
        </Layout>
      } /> */}

      <Route path="/profile" element={
        <Layout showFooter={false} showNav={false}>
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.RECEPTIONIST, ROLES.HOUSEKEEPING, ROLES.GUEST]}>
            {/* <ProfielePag /> */}
<GuestProfilePage/>
          </RoleRoute>
        </Layout>
      } />


            <Route path="/settings" element={
        <Layout showFooter={false} showNav={false}>
          <PrivateRoute>
            <Placeholder title="Settings" owner="You (Leader)" />
          </PrivateRoute>
        </Layout>
      } />

            <Route path="*" element={
        <Layout showFooter>
          <NotFoundPage />
        </Layout>
      } />

    <Route path="/contact" element={
      <Layout showFooter>
        <ContactPage/>
      </Layout>
    } />


    <Route path="/gallery" element={
      <Layout showFooter>
        <GalleryPage/>
      </Layout>
    } />


      <Route path="/privacypolicy" element={
      <Layout showFooter>
        <PrivacyPolicy/>
      </Layout>
    } />

      <Route path="/cookies" element={
      <Layout showFooter>
        <Cookies/>
      </Layout>
    } />

          <Route path="/terms" element={
      <Layout showFooter>
        <TermAndServices/>
      </Layout>
    } />

<Route
  path="/rooms"
  element={
    <Layout showFooter>
      <Accommodations />
    </Layout>
  }
/>



<Route
  path="/rooms/roomexperience"
  element={
    <Layout showFooter>
      <RoomExperience />
    </Layout>
  }
/>
<Route
  path="/PaymentForm"
  element={
    <Layout showFooter>
      <PaymentForm />
    </Layout>
  }
/>

<Route
  path="/about"
  element={
    <Layout showFooter>
      <AboutUsPage />
    </Layout>
  }
/>

<Route
  path="/amenities"
  element={
    <Layout showFooter>
      <AmenitiesPage />
    </Layout>
  }
/>

<Route
  path="/admin/staff"
  element={
    <Layout showFooter={false} showNav={false}>
      <StaffManagement />
    </Layout>
  }
/>

<Route
  path="/booking/newbooking"
element={
      <NewBookingModal />
}
  />


    </Routes>
  )
}
