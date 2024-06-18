
import { Suspense, lazy } from "react";
import { Routes, Route ,Outlet} from "react-router-dom";

// layouts
import Navbar from "./layouts/Navbar/Navbar";
import MobileNavbar from "./layouts/MobileNavbar/MobileNavbar";
import Footer from "./layouts/Footer/Footer";

// pages
const Home = lazy(() => import("./pages/Home/Home"));
const Event = lazy(() => import("./pages/Event/Event"));
const PastEvents = lazy(() => import("./pages/Event/pastPage"));
const Social = lazy(() => import("./pages/Social/Social"));
const Team = lazy(() => import("./pages/Team/Team"));
const Login = lazy(() => import("./pages/Authentication/Login/Login"));
const Signup = lazy(()=>import("./pages/Authentication/Signup/SignupMain"))
const Error = lazy(() => import("./pages/Error/Error"));
const Admin = lazy(()=>import("./pages/Profile/Admin/Admin"))

// microInteraction
import Loading from "./microInteraction/Load/Load";
import OngoingEvent from "./components/Event/EventCards/OngoingEventCard/OngoingEventCard";
import OngoingEventModal from "./features/Modals/Event/EventModal/OngoingEventCardModal";
import PastEventModal from "./features/Modals/Event/EventModal/PastEventCardModal";


// import { Alert } from "./MicroInteraction/Alert";

// // state
// import AuthContext from "./context/auth-context";

// // axios
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
     

  return (
    <>
      
      <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Events" element={<Event />} />
          <Route path="/Events/pastEvents" element={<PastEvents />} />
          <Route path="/Social" element={<Social />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/profile" element={<Admin />} />
          <Route path="/Events/:eventId" element={[<Event />,<OngoingEventModal/>]}/>
          <Route path="/Events/pastEvents/:eventId" element={[<Event />,<PastEventModal  isPastPage={false}/>]}/>
          <Route path="pastEvents/:eventId" element={[<PastEvents/>,<PastEventModal isPastPage={true}/>]}/>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
        </Route>
      </Routes>
    </Suspense>
   

     
    </>
  );
}

export default App;



