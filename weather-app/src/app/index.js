import "./bootstrap.min.css";
import { Weather } from "./weather.js";
import {UI} from './UI.js'

const weather = new Weather("London", "uk");
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
      weather.changeLocation(city,countryCode)
      fetchWeather()
 })
}

document.addEventListener("DOMContentLoaded", fetchWeather);
