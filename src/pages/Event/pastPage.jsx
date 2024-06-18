import PastEvents from '../../components/Event/EventCards/PastEventCard/PastEventCard';
import style from './styles/pastPage.module.scss';
import eventData from '../../data/eventData.json';
import { useEffect,useState } from 'react';



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
      <div className={style.whole}>
        <div className={style.eventwhole}>

          <div className={style.pasteventCard}>
            <div className={style.Name}>
              <p>Past</p>
              <h3>Events</h3>
            </div>
            <div className={style.Outcard}>
              <div className={style.cardone}>
                {pastEvents.map((event, index) => (
                  <div key={index}>
                     <PastEvents 
                      data={event}
                      scrollPosition={200}
                      isPastpage={true}
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