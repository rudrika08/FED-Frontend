import React, { useEffect } from 'react';
import { Hero, About, Sponser, Feedback, Contact } from "../../components";
import LiveEventPopup from "../../features/Modals/Event/LiveEventPopup/LiveEventPopup";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <LiveEventPopup />
      <Hero />
      <About />
      <Sponser />
      <Contact />
      <Feedback />
    </>
  );
}

export default Home;
