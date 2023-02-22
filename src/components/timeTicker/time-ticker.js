import {useEffect, useState} from "react";
import './time-ticker.css';
import Logo from '../../assets/images/logo.png'

const TimeTicker = () => {
    const locale = 'en';
    const [realTime, setRealTime] = useState(new Date());

    useEffect(() => {
        let inter =   setInterval(() =>{
            setRealTime(new Date());
        }, 1000) ;

        return () => clearInterval(inter);
    }, []);

    const day = realTime.toLocaleDateString(locale, {weekday: 'long'});
    const date = `${day}, ${realTime.toLocaleString(locale, {month: 'long'})}\n\n`;
    const time = realTime.toLocaleTimeString(locale, {hour: 'numeric', hour12: true, minute:'numeric', second:'numeric'});
    const hour = realTime.getHours();
    const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}`;
   return(
    <div className="time-ticker">
        <img src={Logo} className="logo-main" alt="Lilium, weather on perfect time"/>
        <h1>
            {wish} visitor!
        </h1>
        <div className="date-time-tick">
            <label className="date">{date}</label>
            <label className="time">{time}</label>
        </div>
    </div>
   );
}


export default TimeTicker;
