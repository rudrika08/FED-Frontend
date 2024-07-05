import { useEffect } from 'react';

import { Hero, About, Sponser, Feedback, Contact } from "../../sections";
import { ChatBot, LiveEventPopup } from "../../features";

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
