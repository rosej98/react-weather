import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [loaded, setloaded] = useState(false);
  let [city, setCity] = useState("");
  let [information, setInformation] = useState("");
  let [temp, setTemp] = useState("");
  let [description, setDescription] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [icon, setIcon] = useState("");

  function handelResponse(response) {
    setloaded(true);
    setTemp(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);
  }
  function search(event) {
    event.preventDefault();

    if (city !== "") {
      let apiKey = "689efb7d786944e7c1a6b5dddb92c594";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

      axios.get(`${apiUrl}&appid=${apiKey}`).then(handelResponse);
    } else {
      setInformation(`Pleas enter the name of city.`);
    }
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={search}>
      <input
        type="search"
        placeholder="Type a city"
        autoFocus={true}
        onChange={updateCity}
      />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div>
        <h1>Weather App</h1>
        <p>
          {form}
          <ul>
            <li>Temperature: {temp}°C</li>
            <li>Description: {description}</li>
            <li>Humidity: {humidity}%</li>
            <li>Wind:{wind}km/h</li>
            <li>
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="icon"
              />
            </li>
          </ul>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Weather App</h1>
        {form}
        {information}
      </div>
    );
  }
}
