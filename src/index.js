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
    fetchCountries(input.value).then(countries => {
      list.innerHTML = '';
      info.innerHTML = '';
      if (countries.length > 2 && countries.length < 10) {
        const countryList = countries.map(country => country);
        for (country of countryList) {
          const li = document.createElement('li');
          const div = document.createElement('div');
          div.style.backgroundImage = `url('data:image/svg+xml,${country.flags.svg}')`;
          div.style.width = '30px';
          div.style.height = '20px';
          div.style.display = 'inline-block';
          div.style.objectFit = 'contain';
          li.textContent = `${country.name.official}`;
          li.append(div);
          list.append(li);
        }
      }
      if (countries.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length == 1) {
        const headerDiv = document.createElement('div');
        const capitalDiv = document.createElement('div');
        const populationDiv = document.createElement('div');
        const languagesDiv = document.createElement('div');
        capitalDiv.textContent = `${countries[0].name.official}`;
        headerDiv.textContent = `Capital: ${countries[0].capital}`;
        populationDiv.textContent = `Population: ${countries[0].population}`;
        const allLanguages = Object.values(countries[0].languages).join(', ');
        languagesDiv.textContent = `Laguages: ${allLanguages}`;
        const content = `<svg height="70px" width="70px">
                <use xlink:href="${countries[0].flags.svg} height="70px" width="70px"" height="70px" width="70px"></use>
              </svg>`;
        headerDiv.insertAdjacentHTML('afterbegin', content);
        info.append(headerDiv);
        info.append(capitalDiv);
        info.append(populationDiv);
        info.append(languagesDiv);
      }
    });
  }, DEBOUNCE_DELAY)
);
