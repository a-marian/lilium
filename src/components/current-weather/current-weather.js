import "./current-weather.css";

const CurrentWeather = ({ data, onShowForecast }) => {
  const hasForecastLink = typeof onShowForecast === "function";

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          {hasForecastLink ? (
            <button
              type="button"
              className="weather-description weather-description-button"
              onClick={onShowForecast}
            >
              {data.weather[0].description}
            </button>
          ) : (
            <p className="weather-description">{data.weather[0].description}</p>
          )}
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={require(`../../assets/icons/${data.weather[0].icon}.png`)}
        />
      </div>

      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label top">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-label">{data.wind.speed}m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-label">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-label">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-label">{data.main.pressure}hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

