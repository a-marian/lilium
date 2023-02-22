import logo from './assets/images/logo.png';
import './App.css';
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import {IP_ADD_API, WEATHER_API_KEY, WEATHER_API_URL} from "./api";
import {useEffect, useState} from "react";
import TimeTicker from "./components/timeTicker/time-ticker";
import axios from "axios";

function App() {

    useEffect(() => {
        getDefaultLocate();
    }, []);

const  [currentWeather, setCurrentWeather]= useState(null);
const [forecast, setForecast] = useState(null);

const handleOnSearchChange = (searchData) => {
    const[lat, lon] =searchData.value.split(" ");
    console.log("Label :" + searchData.label);
    fetchCityData(lat, lon, searchData.label);
}

const fetchCityData = (lat, lon, label) => {
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
        .then(async (response) => {
            const weatherResponse = await response[0].json();
            const forecastResponse = await response[1].json();
            setCurrentWeather({city:  label, ...weatherResponse});
            setForecast({city: label, ...forecastResponse});
        })
        .catch((err) => console.log(err));
    }


    const getDefaultLocate =  async() => {
        const location = await axios.get(IP_ADD_API);
        console.log(location.data);
        const city = location.data.city;
        const countryCode = location.data.country;
        const cityLabel = city.concat(", ").concat(countryCode);
        console.log(cityLabel);
        fetchCityData(location.data.latitude, location.data.longitude, cityLabel);
    }



    return (
        <div className="container">
            <TimeTicker />

            <Search onSearchChange = {handleOnSearchChange}/>
            {currentWeather && <CurrentWeather data={currentWeather}/>}
            {forecast && <Forecast data={forecast} />}
        </div>
    );

}


export default App;
