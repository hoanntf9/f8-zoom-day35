import { useState, useEffect } from "react";
import styles from "./Weather.module.scss";


const weatherData = {
  "hanoi": { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65, icon: "☀️" },
  "hcm": { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78, icon: "🌤️" },
  "danang": { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82, icon: "🌧️" },
  "haiphong": { city: "Hải Phòng", temp: 27, weather: "Nhiều mây", humidity: 70, icon: "⛅" },
  "cantho": { city: "Cần Thơ", temp: 31, weather: "Nắng nóng", humidity: 74, icon: "🌞" },
  "hue": { city: "Huế", temp: 29, weather: "Mưa rào", humidity: 85, icon: "🌦️" },
  "quangninh": { city: "Quảng Ninh", temp: 26, weather: "Có sương mù", humidity: 88, icon: "🌫️" },
};

function Weather() {
  const [weathers, setWeathers] = useState([]);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const weatherList = Object.entries(weatherData).map(([key, value]) => {
      return { key, ...value };
    });
    setWeathers(weatherList);
    setWeather(weatherList[0]);
  }, []);

  const handleChange = (e) => {
    const selectedKey = e.target.value;
    const selectedWeather = weathers.find(item => item.key === selectedKey);
    if (selectedWeather) {
      setWeather(selectedWeather);
    }
  };

  const getWeatherIcon = (temp, humidity) => {
    switch (true) {
      case humidity > 85:
        return { weather: "Mưa", icon: "🌧️" };

      case temp > 32:
        return { weather: "Nắng nóng", icon: "🌞" };

      case temp >= 28 && humidity < 70:
        return { weather: "Nắng", icon: "☀️" };

      case humidity >= 70 && humidity <= 85:
        return { weather: "Có mây", icon: "⛅" };

      case temp < 25 && humidity > 80:
        return { weather: "Có sương mù", icon: "🌫️" };

      default:
        return { weather: "Trời đẹp", icon: "🌤️" };
    }
  };


  const handleRefresh = () => {
    // Để random lại nhiệt độ và độ ẩm(±5 độ /%);
    const randomOffset = () => Math.floor(Math.random() * 11) - 5;
    const newTemp = Math.max(0, weather.temp + randomOffset());
    const newHumidity = Math.min(100, Math.max(0, weather.humidity + randomOffset()));
    const { weather: newWeather, icon } = getWeatherIcon(newTemp, newHumidity);

    const updatedWeather = {
      ...weather,
      temp: newTemp,
      humidity: newHumidity,
      weather: newWeather,
      icon
    };

    setWeather(updatedWeather);
  };

  return (
    <div className={styles.container}>
      <h2>Thông tin thời tiết</h2>

      <select onChange={handleChange}>
        {weathers.map(weather => (
          <option
            value={weather.key}
            key={weather.key}
            name={weather.city}
          >
            {weather.city}
          </option>
        ))}
      </select>

      {
        weather && (
          <div className={styles.weatherInfo}>
            <div className="icon">{weather.icon}</div>
            <p><strong>{weather.city}</strong></p>
            <p>Nhiệt độ: {weather.temp}°C</p>
            <p>Tình trạng: {weather.weather}</p>
            <p>Độ ẩm: {weather.humidity}%</p>
          </div>
        )
      }

      <button id="refreshBtn" className={styles.refreshBtn} onClick={handleRefresh}>Làm mới</button>
    </div>

  );
}

export default Weather;