import './App.css';
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import {IP_ADD_API, WEATHER_API_KEY, WEATHER_API_URL} from "./api";
import {useEffect, useState} from "react";
import TimeTicker from "./components/timeTicker/time-ticker";
import PomodoroTimer from "./components/pomodoro/pomodoro";
import axios from "axios";

function App() {

    useEffect(() => {
        getDefaultLocate();
    }, []);

const  [currentWeather, setCurrentWeather]= useState(null);
const [forecast, setForecast] = useState(null);
const [view, setView] = useState("home"); // "home" | "forecast"


const fetchCityData = (lat, lon, label) => {
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
        .then(async (response) => {
            const weatherResponse = await response[0].json();
            const forecastResponse = await response[1].json();
            setCurrentWeather({city:  label, ...weatherResponse});
            setForecast({city: label, ...forecastResponse});
            setView("home");
        })
        .catch((err) => console.log(err));
    }


    const getDefaultLocate =  async() => {
        const location = await axios.get(IP_ADD_API);
        const city = location.data.city;
        const countryCode = location.data.country;
        const cityLabel = city.concat(", ").concat(countryCode);
        fetchCityData(location.data.latitude, location.data.longitude, cityLabel);
    }



    return (
        <div className="container">
            <TimeTicker />
            <PomodoroTimer />
            {view === "home" && (
                <>
                    {currentWeather && (
                        <CurrentWeather
                            data={currentWeather}
                            onShowForecast={() => setView("forecast")}
                        />
                    )}
                </>
            )}

            {view === "forecast" && forecast && (
                <div className="forecast-page">
                    <button
                        type="button"
                        className="forecast-back-button"
                        onClick={() => setView("home")}
                    >
                        ← Back to today&apos;s weather
                    </button>
                    <Forecast data={forecast} />
                </div>
            )}
        </div>
    );

}


export default App;
