import style from './styles/pastPage.module.scss';
import eventData from '../../data/eventData.json';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { EventCard } from '../../components';



const PastPage = () => {


  const [activeEventId, setActiveEventId] = useState(null);

  const handleModalOpen = (eventId) => {
    setActiveEventId(eventId);
    document.body.style.overflow = 'hidden'; 
    
  };

  const handleModalClose = () => {
    setActiveEventId(null);
    document.body.style.overflow = 'unset'; 
    // document.body.style.backdropFilter='unset'
  };

  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  const pastEvents = eventData.filter(event => !event.ongoingEvent);
    return(
      <div className={style.main}>
          <Link to={'/Events'}>
          <div className={style.ArrowBackIcon}>
            <ArrowBackIcon />
          </div>
        </Link>
      <div className={style.whole}>
        <div className={style.eventwhole}>

          <div className={style.pasteventCard}>
            <div className={style.name}>
            <span className={style.w1}>Past</span>
            <span className={style.w2}>Events</span>
            </div>
            <div className={style.Outcard}>
              <div className={style.cardone}>
                {pastEvents.map((event, index) => (
                  <div style={{height: "auto", width: "22rem"}} key={index}>
                     {/* <PastEvents 
                      data={event}
                      scrollPosition={200}
                      isPastpage={true}
                    /> */}
                    
                    <EventCard
                    data={event}
                    type="past"
                    // customStyles={customStyles}
                    modalpath='/pastEvents/'
                  />

                  
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={style.circle}></div>
        <div className={style.circleone}></div>
        <div className={style.circletwo}></div>
        <div className={style.circlethree}></div>
      </div>
    </div>
  );
}

export default PastPage