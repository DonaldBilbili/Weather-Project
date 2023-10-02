document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "a28f82a2b4066e81ddc41106d3122fbb";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");

  async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      var data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      const weatherIcons = {
        Clouds: "weatherappimg/images/clouds.svg",
        Clear: "weatherappimg/images/clear.svg",
        Rain: "weatherappimg/images/rain.svg",
        Drizzle: "weatherappimg/images/drizzle.svg",
        Mist: "weatherappimg/images/mist.svg",
        Drizzle: "weatherappimg/images/drizzle.svg",
      };

      if (weatherIcons[data.weather[0].main]) {
        weatherIcon.src = weatherIcons[data.weather[0].main];
      } else {

        weatherIcon.src = "weatherappimg/images/unknown.png";
      }


      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  }

  function startVibration() {
    let errorText = document.querySelector(".error");
    errorText.style.animation = "vibrate 0.3s ease infinite";

    setTimeout(function () {
      errorText.style.animation = "";
    }, 1000);
  }

  document.getElementById("vibrateButton").addEventListener("click", startVibration);


  searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value;
    checkWeather(cityName);
  });
});
