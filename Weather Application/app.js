const serachCity = document.querySelector('#search');
serachCity.value = '';
let city = '';
loadEventListeners();
function loadEventListeners() {
  serachCity.addEventListener('keypress', EnterKeyEvent);
}

function EnterKeyEvent(e) {
  const errorMsg = document.querySelector('.alert-text');
  if (e.key === 'Enter') {
    e.preventDefault();
    city = serachCity.value;
    if (city === '') {
      errorMsg.style.display = 'block';
      return;
    }

    getWeather(city);
    console.log(city);
  } else {
    errorMsg.style.display = 'none';
  }
}

function getWeather(city) {
  const weather = new Weather(city);

  weather
    .getWeather()
    .then((results) => {
      updateData(results);
    })
    .catch((err) => console.log(err));
}

function updateData(results) {
  const location = results.location;
  const currentWeather = results.current;
  let date = new Date(location.localtime.slice(0, 10));
  let day = date.toLocaleString('en-us', { weekday: 'long' });
  document.querySelector(
    '.location'
  ).innerHTML = `<i class="fa fa-map-marker p-2" aria-hidden="true"></i>${location.name}, ${location.country}`;
  document.querySelector('.time').innerHTML = `${location.localtime.slice(
    0,
    10
  )},${day}`;
  document
    .querySelector('#w-icon')
    .setAttribute('src', currentWeather.weather_icons);
  document.querySelector(
    '.temperature'
  ).innerHTML = `${currentWeather.temperature}<sup>°C</sup>`;
  document.querySelector(
    '.weather-type'
  ).innerHTML = `${currentWeather.weather_descriptions}`;
  document.querySelector(
    '.feelsLike'
  ).innerHTML = `Feels like ${currentWeather.feelslike}<sup>°C</sup>`;
  document.querySelector(
    '.humidity'
  ).innerHTML = `Humidity ${currentWeather.humidity}%`;
  document.querySelector(
    '.wind'
  ).innerHTML = `Wind ${currentWeather.wind_speed} km/h`;
  document.querySelector(
    '.pressure'
  ).innerHTML = `Pressure ${currentWeather.pressure} mb`;
}
