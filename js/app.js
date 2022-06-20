let e_temp = document.querySelector(".weather-temp h2");
/*let e_temp_min = document.querySelector(".weather-temp-min");
let e_temp_max = document.querySelector(".weather-temp-max");*/
let e_location = document.querySelector(".weather-location h2 a");
let icon_weather = document.querySelector(".weather-icon img");
let time = new Date();
let current_time = time.getHours();
let body = document.querySelector("body");
let main = document.querySelector("main");

window.addEventListener("load", () => {
  if (current_time < 21 && current_time > 6) {
    body.style.backgroundColor = "var(--background-body-day)";
    main.style.backgroundColor = "var(--background-main-day)";
    main.style.boxShadow = "12px 12px 0px var(--shadow-main-day)";
    e_location.classList.add("weather-location-day");
  } else {
    body.style.backgroundColor = "var(--background-body-night)";
    main.style.backgroundColor = "var(--background-main-night)";
    main.style.boxShadow = "12px 12px 0px var(--shadow-main-night)";
    e_location.classList.add("weather-location-night");
  }
  let lon, lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((p) => {
      lon = p.coords.longitude;
      lat = p.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=17dbd38cf5f32579d238c079ddfa7f48`;
      console.log(url);
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let temp = Math.round(data.main.temp);
          /*let temp_min = Math.round(data.main.temp_min);
          let temp_max = Math.round(data.main.temp_max);*/
          let location = data.name;
          e_temp.textContent = `${temp} °C`;
          /*e_temp_min.textContent = `MIN ${temp_min} °C`;
          e_temp_max.textContent = `MAX ${temp_max} °C`;*/
          e_location.textContent = `${location}`;
          e_location.href = `https://www.google.com.ar/maps/@${lat},${lon}`;
          switch (data.weather[0].main) {
            case "Clear":
              if (current_time < 21 && current_time > 6) {
                icon_weather.src = "images/animated/day.svg";
              } else {
                icon_weather.src = "images/animated/night.svg";
              }
              break;
            case "Clouds":
              if (current_time < 21 && current_time > 6) {
                icon_weather.src = "images/animated/cloudy-day-3.svg";
              } else {
                icon_weather.src = "images/animated/cloudy-night-3.svg";
              }
              break;
            case "Atmosphere":
              icon_weather.src = "images/animated/cloudy.svg";
              break;
            case "Snow":
              if (current_time < 21 && current_time > 6) {
                icon_weather.src = "images/animated/snowy-3.svg";
              } else {
                icon_weather.src = "images/animated/snowy-5.svg";
              }
              break;
            case "Rain":
              if (current_time < 21 && current_time > 6) {
                icon_weather.src = "images/animated/rainy-3.svg";
              } else {
                icon_weather.src = "images/animated/rainy-5.svg";
              }
              break;
            case "Drizzle":
              if (current_time < 21 && current_time > 6) {
                icon_weather.src = "images/animated/rainy-2.svg";
              } else {
                icon_weather.src = "images/animated/rainy-4.svg";
              }
              break;
            case "Thunderstorm":
              icon_weather.src = "images/animated/thunder.svg";
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
});
