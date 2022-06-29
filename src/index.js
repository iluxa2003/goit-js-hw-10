import './css/styles.css';
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
var debounce = require('lodash.debounce');

input.addEventListener(
  'input',
  debounce(() => {
    fetchCountries(input.value.trim()).then(countries => {
      list.innerHTML = '';
      info.innerHTML = '';
      try {
        if (countries.length > 2 && countries.length < 10) {
          const countryList = countries.map(country => country);
          for (const country of countryList) {
            const li = document.createElement('li');
            const content = `<img src='${country.flags.svg}' height="20" width="30" style='margin-right:10px'/>`;
            li.textContent = `${country.name.official}`;
            li.style.listStyle = 'none';
            list.append(li);
            li.insertAdjacentHTML('afterbegin', content);
          }
        }
        if (countries.length > 10) {
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length == 1) {
          correctCountry(countries[0])
        }
      } catch {}
    });
  }, DEBOUNCE_DELAY)
);
function correctCountry(param){
  const headerDiv = document.createElement('div');
  const capitalDiv = document.createElement('div');
  const populationDiv = document.createElement('div');
  const languagesDiv = document.createElement('div');
  capitalDiv.textContent = `${param.name.official}`;
  headerDiv.textContent = `Capital: ${param.capital}`;
  populationDiv.textContent = `Population: ${param.population}`;
  const allLanguages = Object.values(param.languages).join(', ');
  languagesDiv.textContent = `Laguages: ${allLanguages}`;
  const content = `<img src='${param.flags.svg}' height="20" width="30" style='margin-right:10px'/>`;
  headerDiv.insertAdjacentHTML('afterbegin', content);
  info.append(headerDiv);
  info.append(capitalDiv);
  info.append(populationDiv);
  info.append(languagesDiv);
}