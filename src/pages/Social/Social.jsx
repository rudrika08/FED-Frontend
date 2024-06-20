import React, { useEffect } from 'react';
import { SocialMedia } from "../../components";

const Social = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <SocialMedia />
    </>
  );
}

export default Social;
