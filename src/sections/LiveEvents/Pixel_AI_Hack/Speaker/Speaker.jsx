import React from "react";
import style from "./styles/Speaker.module.scss";

const TitleSponsor = () => {
  return (
    <div className={style.sponsorSection}>
      <h2 className={style.title}>
        Proudly Sponsored By
      </h2>
      <div className={style.sponsorBox}>
        <img
          src="https://cdn.prod.website-files.com/66ffb182a2a1dbe73904d0b5/67d847ba942a332ceaf9f7af_imageedit_1_4065642770-removebg-preview.png"
          alt="HTraction Logo"
          className={style.sponsorLogo}
        />
        {/* <h3 className={style.sponsorName}>HTraction</h3> */}
      </div>
    </div>
  );
};

export default TitleSponsor;
