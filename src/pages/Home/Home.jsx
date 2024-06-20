import { Hero, About, Sponser, Feedback, Contact } from "../../components";

import ChatBot from "../../features/ChatBot/ChatBot";
import LiveEventPopup from "../../features/Modals/Event/LiveEventPopup/LiveEventPopup";

function Home() {
  

  return (
    <>
      <LiveEventPopup />
      <Hero />
      <ChatBot />
      <About />
      <Sponser />
      <Contact />
      <Feedback />
    </>
  );
}

export default Home;
