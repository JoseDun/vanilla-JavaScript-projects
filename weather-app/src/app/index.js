import "./bootstrap.min.css";
import { Weather } from "./weather.js";
import {UI} from './UI.js'
import { Store } from "./store.js";


const store = new Store()
const {city,countryCode} = store.getLocationData()
const weather = new Weather(city, countryCode);
const ui = new UI()


async function fetchWeather() {
 const data = await weather.getWeather();
 console.log(data)
 ui.render(data)

 document.getElementById('w-change-btn').addEventListener('click', (e)=>{
     e.preventDefault()
      const city = document.getElementById('city').value;
      const countryCode = document.getElementById('countryCode').value
      console.log(city,countryCode)
      store.setLocationData(city,countryCode)
      weather.changeLocation(city,countryCode)
      fetchWeather()
 })
}

document.addEventListener("DOMContentLoaded", fetchWeather);
