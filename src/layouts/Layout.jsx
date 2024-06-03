import React, { useEffect } from "react";
import Style from "./Styles/layout.module.scss";

const Layout = ({ children, title }) => {
    
  useEffect(() => {
    document.title = title ? title + " | FED" : "FED KIIT";
  }, []);

  return (
    <div className={Style.main}>
      <div className={Style.frameMiddle} />
      <div className={Style.bodyChildren}>{children}</div>
      <div className={Style.frameBottom} />
    </div>
  );
};

export default Layout;
