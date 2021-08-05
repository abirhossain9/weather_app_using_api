//selectors
const searchInput = document.querySelector(".weather__search");
const city = document.querySelector(".weather__city");
const day = document.querySelector(".weather__day");
const humidity = document.querySelector(".weather__indicator--humidity>.value");
const wind = document.querySelector(".weather__indicator--wind>.value");
const pressure = document.querySelector(".weather__indicator--pressure>.value");
const image = document.querySelector(".weather__image");
const temp = document.querySelector(".weather__temperature>.value");
const forecastBlock = document.querySelector(".weather__forecast");

//image icons data
const weatherImages = [
  {
    URL: "../images/clear-sky.png",
    ids: [800],
  },
  {
    URL: "../images/broken-clouds.png",
    ids: [803, 804],
  },
  {
    URL: "../images/few-clouds.png",
    ids: [801],
  },
  {
    URL: "../images/mist.png",
    ids: [701],
  },
  {
    URL: "../images/mist.png",
    ids: [701, 711, 721, 731, 741, 751, 761, 761, 771, 781],
  },
  {
    URL: "../images/rain.png",
    ids: [501, 502, 503, 504],
  },
  {
    URL: "../images/scattered-clouds.png",
    ids: [802],
  },
  {
    URL: "../images/shower-rain.png",
    ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 321],
  },
  {
    URL: "../images/snow.png",
    ids: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  },
  {
    URL: "../images/thunderstorm.png",
    ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  },
];

//api keys
let weatherAPIKey = "d6871fcb9cce814f23b29dbb8fe7c079";
let weatherBaseEndpoint = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${weatherAPIKey}`;
let forecastBaseEndpoint = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${weatherAPIKey}`;

//data fetch from server

//get weather data by city name
const getWeatherDataByCity = async (city) => {
  const endpoint = `${weatherBaseEndpoint}&q=${city}`;
  let request = await fetch(endpoint);
  let data = await request.json();
  return data;
};

//get forecast data by city id
const getForecastDataByCity = async (id) => {
  const endpoint = `${forecastBaseEndpoint}&id=${id}`;
  let result = await fetch(endpoint);
  const forecast = await result.json();
  const forecatList = forecast.list;
  const dailyTemp = [];
  forecatList.forEach((day) => {
    let date = new Date(day.dt_txt.replace(" ", "T"));
    let hours = date.getHours();
    if (hours === 12) {
      dailyTemp.push(day);
    }
  });
  console.log(dailyTemp);
};
//search functionality
searchInput.addEventListener("keydown", async (e) => {
  const cityName = searchInput.value;
  if (e.keyCode === 13) {
    let data = await getWeatherDataByCity(cityName);
    let cityId = data.id;
    updateCurrentWeather(data);
    getForecastDataByCity(cityId);
    //console.log(data);
    searchInput.value = "";
  }
});

//render functionality

//update current weather
const updateCurrentWeather = (data) => {
  city.textContent = `${data.name},${data.sys.country}`;
  day.textContent = dayOfWeek();
  humidity.textContent = data.main.humidity;
  wind.textContent = `${calculateWindDirection(data.wind.deg)} , ${
    data.wind.speed
  }`;
  pressure.textContent = data.main.pressure;
  temp.textContent =
    data.main.temp > 0
      ? `+${Math.round(data.main.temp)}`
      : `-${Math.round(data.main.temp)}`;
  const imageId = data.weather[0].id;
  weatherImages.forEach((obj) => {
    if (obj.ids.includes(imageId)) {
      image.src = obj.URL;
    }
  });
};
//calculating day of week
const dayOfWeek = (dt = new Date().getTime()) => {
  return new Date().toLocaleDateString("en-EN", { weekday: "long" });
};

//caculating wind direction
const calculateWindDirection = (deg) => {
  if (deg > 45 && deg <= 135) {
    return "East";
  } else if (deg > 135 && deg <= 225) {
    return "South";
  } else if (deg > 225 && deg <= 315) {
    return "West";
  } else {
    return "North";
  }
};
