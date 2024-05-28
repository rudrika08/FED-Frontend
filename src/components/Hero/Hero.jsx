import React from 'react'
import styles from "./styles/Hero.module.scss"

const Hero = () => {
  return (
    <>
    <div className = "styles.hero">
    <div id={styles.div}>
        <div id={styles.hero1-1}>
          <div id ={styles.e}>
          <h2>Nurturing</h2>
          <h3>entrepreneurship</h3>
          </div>
          <h2>through creative, authentic,</h2> 
          <h2>and efficient techniques.</h2>
        </div>
        <div id={styles.hero1-2}>
          <div id ={styles.f}>
          <h2>Nurturing</h2>
          <h3>entrepreneurship </h3>
          <h2>through</h2>
          </div>
          <h2> creative, authentic,and efficient techniques.</h2> 
        </div>
    </div>
    <div id={styles.hero2}></div>
</div>
<div id={styles.gola}></div>
</>
  )
}

export default Hero