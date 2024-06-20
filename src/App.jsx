import { Suspense, lazy, useContext } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// Layouts
import Navbar from "./layouts/Navbar/Navbar";
import MobileNavbar from "./layouts/MobileNavbar/MobileNavbar";
import Footer from "./layouts/Footer/Footer";

// MicroInteractions

import Loading from "./microInteraction/Load/Load";
import OngoingEventModal from "./features/Modals/Event/EventModal/OngoingEventCardModal";
import PastEventModal from "./features/Modals/Event/EventModal/PastEventCardModal";
// import { Alert } from "./MicroInteraction/Alert";

// State
import AuthContext from "./store/AuthContext";

// axios
// import axios from "axios";


// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home/Home"));
const Event = lazy(() => import("./pages/Event/Event"));
const PastEvents = lazy(() => import("./pages/Event/pastPage"));
const Social = lazy(() => import("./pages/Social/Social"));
const Team = lazy(() => import("./pages/Team/Team"));
const Login = lazy(() => import("./pages/Authentication/Login/LoginMain"));
const Signup = lazy(() => import("./pages/Authentication/Signup/SignupMain"));
const Error = lazy(() => import("./pages/Error/Error"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Alumni = lazy(() => import("./pages/Alumni/Alumni"));

// Main Layout
const MainLayout = () => (
  <>
    <Navbar />
    <MobileNavbar />
    <div className="page">
      <Outlet />
    </div>
    <Footer />
  </>
);

// Auth Layout
const AuthLayout = () => (
  <div className="page">
    <Outlet />
  </div>
);

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/Events" element={<Event />} />
            <Route path="/Events/pastEvents" element={<PastEvents />} />
            <Route path="/Social" element={<Social />} />
            <Route path="/Team" element={<Team />} />
            <Route path="/Alumni" element={<Alumni />} />
            <Route path="*" element={<Error />} />

            {authCtx.isLoggedIn && (
              <Route path="/profile" element={<Profile />} />
            )}
            <Route path="/Events/:eventId" element={<Event />}>
              <Route index element={<OngoingEventModal />} />
            </Route>
            <Route path="/Events/pastEvents/:eventId" element={<PastEvents />}>
              <Route index element={<PastEventModal isPastPage={false} />} />
            </Route>
            <Route path="/pastEvents/:eventId" element={<PastEvents />}>
              <Route index element={<PastEventModal isPastPage={true} />} />
            </Route>
          </Route>

          <Route element={<AuthLayout />}>
            <Route
              path="/Login"
              element={authCtx.isLoggedIn ? <Navigate to="/profile" /> : <Login />}
            />
            <Route
              path="/SignUp"
              element={authCtx.isLoggedIn ? <Navigate to="/profile" /> : <Signup />}
            />
          </Route>

        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
