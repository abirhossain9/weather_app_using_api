let weatherAPIKey = "d6871fcb9cce814f23b29dbb8fe7c079";
let weatherBaseEndpoint = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherAPIKey}`;

//data fetch from api
const getWeatherDataByCity = async (city) => {
  const endpoint = `${weatherBaseEndpoint}&q=${city}`;
  let request = await fetch(endpoint);
  let data = await request.json();
  console.log(data);
};

getWeatherDataByCity("dhaka");
