/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import style from "./styles/Attend.module.scss";

function Card({ img, title }) {
  return (
    <motion.div
      className={style.card}
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className={style.cut}></div>
      <div className={style.card_img}>
        <img src={img} alt="Event Image" />
      </div>
      <div className={style.card_content}>
        <h2>{title}</h2>
        <div className={style.cut2}></div>
      </div>
    </motion.div>
  );
}

function Attend() {
  return (
    <>
      <div className={style.main}>
        <div className={style.heading}>
          <div className={style.why}><h1>WHY ATTEND</h1></div>
          <div className={style.omega}><h1>OMEGA?</h1></div>
        </div>

        <div className={style.boxmain}>
          <Card img="https://i.ibb.co/RvVwPxK/66.jpg" title="I am FED" />
          <Card img="https://i.ibb.co/RvVwPxK/66.jpg" title="I am FED" />
          <Card img="https://i.ibb.co/RvVwPxK/66.jpg" title="I am FED" />
          <Card img="https://i.ibb.co/RvVwPxK/66.jpg" title="I am FED" />
        </div>
      </div>

      <div className={style.circle1}></div>
      <div className={style.circle2}></div>
    </>
  );
}

export default Attend;
