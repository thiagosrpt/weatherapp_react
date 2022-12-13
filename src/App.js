import logo from './logo.svg';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import ToggleMetric from './components/toggleMetric/toggleMetric'
import Forecast from './components/forecast/forecast'
import { WEATHER_API_KEY, WEATHER_API_URL, IP_API, IP_LOCATION_API } from './api';
import { useState,  useEffect, ReactComponentElement } from 'react';


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unit, setUnit] = useState({status: false, value: 'units=imperial', temp_unit: '°F', wind_unit: 'mph'});
  const [forecast, setForecast] = useState();
  const [loading, setLoading] = useState(true);
  const [reRender, setReRender] = useState("");

  useEffect(() => {
    fetchIpData();
  }, []);

 //this gets the user IP

 const fetchIpData = () => {
  setLoading(true);
  const proxy = "https://cros-anywhere.herokuapp.com/";
  fetch(`${[[proxy]]}${IP_API}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      getCoordinates(data.ip)
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false)
    });
 }

  //Gets user coordinates
  function getCoordinates(ip) {
    setLoading(true);
    const location = `${IP_LOCATION_API}/${ip}`;
    fetch(location)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const localData = {
          value:    `${data.lat} ${data.lon}`,
          label:  `${data.city}, ${data.country}`,
        }
        handleOnSearchChange(localData);
        setReRender(localData)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  }
  

  const handleOnSearchChange = (searchData) => {
    setUnit({status: false, value: 'units=imperial', temp_unit: '°F', wind_unit: 'mph'});
    const [lat, lon] = searchData.value.split(" ");
    setLoading(true)
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&${unit.value}`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&${unit.value}`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
        setLoading(false)
        setReRender(searchData)
      })
      .catch((err) => console.log(err))
      console.log(forecast)
  }

  const handleCelciusChange = (setting) => {
    const [lat, lon] = reRender.value.split(" ");
    if(setting === "°C") {
      setLoading(true)
      setUnit({status: true, value: 'units=metric', temp_unit: '°C', wind_unit: 'km/h'});
      const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
      const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

      Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({city: reRender.label, ...weatherResponse});
        setForecast({city: reRender.label, ...weatherResponse});
        setLoading(false)
      })
      .catch((err) => console.log(err))
      setLoading(false)

    } else {
      setLoading(true)
      setUnit({status: false, value: 'units=imperial', temp_unit: '°F', wind_unit: 'mph'});
      const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);
      const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);

      Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({city: reRender.label, ...weatherResponse});
        setLoading(false)
      })
      .catch((err) => console.log(err))
      setLoading(false)
    }
  }


  return (
    <>
        {loading ? (
      <div className="loading">loading</div>
    ):(

      <div className="container">
      <div className="topBar">
        < Search
          onSearchChange={handleOnSearchChange}
        />
        <div className="toggleButton_CF">
          <ToggleMetric
            celciusChange={handleCelciusChange}>
          </ToggleMetric>
        </div>
      </div>
      { currentWeather && <CurrentWeather data={currentWeather} unitSettings={unit}/> }
      { forecast && <Forecast data={forecast} unitSettings={unit}/> }
      </div>
    )}
    </>
  );

  
}

export default App;
