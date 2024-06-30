import { Suspense, lazy, useContext } from "react";
import { Routes, Route ,Outlet, Navigate} from "react-router-dom";

// layouts
import Navbar from "./layouts/Navbar/Navbar";
import MobileNavbar from "./layouts/MobileNavbar/MobileNavbar";
import Footer from "./layouts/Footer/Footer";
import EditProfile from "./features/Modals/EditProfile/EditProfile";

// pages
const Home = lazy(() => import("./pages/Home/Home"));
const Event = lazy(() => import("./pages/Event/Event"));
const PastEvents = lazy(() => import("./pages/Event/pastPage"));
const Social = lazy(() => import("./pages/Social/Social"));
const Team = lazy(() => import("./pages/Team/Team"));
const Login = lazy(() => import("./pages/Authentication/Login/LoginMain"));
const Signup = lazy(()=>import("./pages/Authentication/Signup/SignupMain"))
const Error = lazy(() => import("./pages/Error/Error"));
const Profile = lazy(()=>import("./pages/Profile/Profile"))
const Alumni = lazy(()=>import("./pages/Alumni/Alumni"))

// microInteraction
import Loading from "./microInteraction/Load/Load";
import EventModal from "./features/Modals/Event/EventModal/EventModal";
// import PastEventModal from "./features/Modals/Event/EventModal/PastEventCardModal";


// state
import AuthContext from "./context/AuthContext";

// axios
// import axios from "axios";


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};


const AuthLayout = () => {
  return (
    <div className="page">
      <Outlet />
    </div>
  );
};


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
          {authCtx.isLoggedIn && (<Route path="/profile" element={<Profile />} />)}
          <Route path="/Events/:eventId" element={[<Event />,<EventModal onClosePath='/Events'/>]}/>
          <Route path="/Events/pastEvents/:eventId" element={[<Event />,<EventModal onClosePath='/Events'/>]}/>
          <Route path="/pastEvents/:eventId" element={[<PastEvents/>,<EventModal onClosePath='/Events/pastEvents'/> ]}/>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/Login" element={authCtx.isLoggedIn?<Navigate to='/profile'></Navigate>:<Login />} />
          <Route path="/SignUp" element={authCtx.isLoggedIn?<Navigate to='/profile'></Navigate>:<Signup />} />
        </Route>
      </Routes>
    </Suspense>
   
  {/* <EditProfile/> */}
     
    </div>
  );
}

export default App;



