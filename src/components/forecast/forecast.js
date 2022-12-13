import "./forecast.css"

const Forecast = ({data, unitSettings}) => {
    return (
        <>
            {data.list.map((data) => (
                <div className="forecast">
                    <div className="forecast-top">
                        <div>
                            <p className="forecast-city">{data.weather[0].description}</p>
                            <p className="forecast-description">{data.dt_txt}</p>
                        </div>
                        <img alt="weather" className="forecast-icon" src={`icons/${data.weather[0].icon}.png`} />
                    </div>
                    <div className="forecast-bottom">
                        <p className="forecast-temperature">{Math.round(data.main.temp)}{unitSettings.temp_unit}</p>
                        <div className="forecast-details">
                            <div className="forecast-parameter-row">
                                <span className="forecast-parameter-label">Feels like</span>
                                <span className="forecast-parameter-value">{Math.round(data.main.feels_like)}{unitSettings.temp_unit}</span>
                            </div>
                            <div className="forecast-parameter-row">
                                <span className="forecast-parameter-label">Wind</span>
                                <span className="forecast-parameter-value">{Math.round(data.wind.speed)} {unitSettings.wind_unit}</span>
                            </div>
                            <div className="forecast-parameter-row">
                                <span className="forecast-parameter-label">Humidity</span>
                                <span className="forecast-parameter-value">{data.main.humidity}%</span>
                            </div>
                            <div className="forecast-parameter-row">
                                <span className="forecast-parameter-label">Pressure</span>
                                <span className="forecast-parameter-value">{data.main.pressure}hPa</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )};




export default Forecast;