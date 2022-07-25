class Weather {
  constructor(city) {
    this.apiKey = '357b44d5e3f6e74936886b693d638893';
    this.city = city;
  }

  //Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${this.apiKey}&query=${this.city}`
    );

    const responseData = await response.json();
    return responseData;
  }

  changeLocation(city) {
    this.city = city;
  }
}
