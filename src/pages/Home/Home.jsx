import { useEffect } from 'react';

import { Hero, About, Sponser, Feedback, Contact } from "../../sections";

import ChatBot from "../../features/ChatBot/ChatBot";
import LiveEventPopup from "../../features/Modals/Event/LiveEventPopup/LiveEventPopup";
import axios from 'axios'

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
