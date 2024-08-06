/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './styles/Omega.module.scss'
import Hero from '../../sections/Omega/Hero/Hero.jsx'
import Accordion from '../../sections/Omega/Accordion/Accordion'
import Sponsors from '../../sections/Omega/Sponsors/Sponsors'
import Event from "../../sections/Omega/Event/Event.jsx";
import TeamImage from "../../sections/Omega/TeamImage/TeamImage.jsx";
import Attend from "../../sections/Omega/Attend/Attend.jsx";
function Omega() {
  return (
    <div className={styles.body}>
      <Hero/>
      <Event/>
      <Attend/>
      <Sponsors/>
      <Accordion/>
      <TeamImage/>
    </div>
  )
}

export default Omega
