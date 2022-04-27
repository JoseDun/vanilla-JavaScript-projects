export class Weather {
  constructor(city, countryCode) {
    this.apiKey = "82f197de0c9a6301fc8016be831d0659";
    this.city = city;
    this.countryCode = countryCode;
  }
  async getWeather() {
    const URI = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.countryCode}&appid=${this.apiKey}&units=metric`;
    const data =await fetch(URI);
    const resp = await data.json()
    return resp;
  }

  changeLocation(city, countryCode){
    this.city = city;
    this.countryCode = countryCode;
  }
}
