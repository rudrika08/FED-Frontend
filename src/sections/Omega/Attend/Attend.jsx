import style from "./styles/Attend.module.scss"


function Attend(){
    return(
        <>
        <div className={style.main}>
            <div className={style.attend}>
                <div className={style.heading}>
                    <div className={style.why}><h1>WHY ATTEND</h1></div>
                    <div className={style.omega}><h1>OMEGA?</h1></div>
                </div>

                <div className={style.boxmain}>
                    <div className={style.box}>
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
                    </div>
                </div>
            </div>
        </div>
        
        <div className={style.circle1}></div>
        <div className={style.circle2}></div>

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