/* eslint-disable no-unused-vars */
import React from 'react'
import Accordion from '../../sections/Omega/Accordion/Accordion'
import Sponsors from '../../sections/Omega/Sponsors/Sponsors'
import Event from "../../sections/Omega/Event/Event.jsx";
import TeamImage from "../../sections/Omega/TeamImage/TeamImage.jsx";
function Omega() {
  return (
    <>
      <Sponsors/>
      <Accordion/>
      <Event/>
      <TeamImage/>
    </>
  )
}

export default Omega
