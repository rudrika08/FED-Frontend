/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import style from "./styles/Attend.module.scss"

function Card( img, title) {
    return (
      <div className={`${style.card}`}>
        <div className={`${style.cut}`}></div>
        <div className={`${style.card_img}`}>
          <img src={img} alt="Event Image" />
        </div>
        <div className={`${style.card_content}`}>
          <h2>{title}</h2>
          <div className={`${style.cut2}`}></div>
        </div>
      </div>
    );
  }
function Attend(){
    return(
        <>
        <div className={style.main}>
                <div className={style.heading}>
                    <div className={style.why}><h1>WHY ATTEND</h1></div>
                    <div className={style.omega}><h1>OMEGA?</h1></div>
                </div>

                <div className={style.boxmain}>
                    {Card("https://i.ibb.co/RvVwPxK/66.jpg","I am FED")}
                    {Card("https://i.ibb.co/RvVwPxK/66.jpg","I am FED")}
                    {Card("https://i.ibb.co/RvVwPxK/66.jpg","I am FED")}
                    {Card("https://i.ibb.co/RvVwPxK/66.jpg","I am FED")}

                    {/* <div className={style.box}>
                        <div className={style.icon}><img src="https://i.ibb.co/RvVwPxK/66.jpg"/></div>
                        <div className={style.text}>Inspiration and Knowledge</div>
                    </div>
                    <div className={style.box}>
                        <div className={style.icon}><img src="https://i.ibb.co/0MLbdB0/Icon-wrapper.png"/></div>
                        <div className={style.text}>Inspiration and Knowledge</div>
                    </div>
                    <div className={style.box}>
                        <div className={style.icon}><img src="https://i.ibb.co/9ttC8Dp/Icon-wrapper3.png"/></div>
                        <div className={style.text}>Inspiration and Knowledge</div>
                    </div>
                    <div className={style.box}>
                        <div className={style.icon}><img src="https://i.ibb.co/djkxNSq/Frame-1116606599.jpg"/></div>
                        <div className={style.text}>Inspiration and Knowledge</div>
                    </div> */}
                </div>
        </div>
        
        {/* <div className={style.circle1}></div>
        <div className={style.circle2}></div> */}

        {/* <div className={style.square1}></div>
        <div className={style.square2}></div>
        <div className={style.square3}></div>                   
        <div className={style.square4}></div>
        <div className={style.square5}></div>
        <div className={style.square6}></div>
        <div className={style.square7}></div>                   
        <div className={style.square8}></div> */}

        </>
    )
}

export default Attend