'use strict';

const btn = document.querySelector('.btn-country');
const backBtn = document.querySelector('.back-button');

const countriesContainer = document.querySelector('.countries');
const formContainer = document.querySelector('.form-container');

// Display Form for Country Input
const renderForm = function () {
  const html = `
  <form class= "form">
  <div>
    <label for="input-country" class = "country-label">Country</label>
    <input
      type="text"
      id="input-country"
      name="country"
      placeholder="Nigeria"
      required
    ></input>
  </div>  
</form>`;
  formContainer.insertAdjacentHTML('beforeend', html);
};
renderForm();

// Display Country Card
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )} million people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name} (${
    data.currencies[0].symbol
  })</p>
    </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  formContainer.style.opacity = 0;
  btn.style.opacity = 0;
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  formContainer.style.opacity = 0;
  btn.style.opacity = 0;
  backBtn.style.opacity = 1;
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

//Read Country from Form Input
const inputCountry = document.getElementById('input-country');

//1. create a function 'readCountry' and pass in
// const readCountry = function (country) {
//   return new Promise(function (resolve, reject) {
//     inputCountry.value = country;
//     btn.addEventListener('click', function () {
//       return resolve(inputCountry.value);
//     });
//     if (inputCountry.value === '') {
//       reject(new Error('No country specified!🗺'));
//     }
//   });
// };

const readCountry = function (country = '') {
  return new Promise(function (resolve, reject) {
    inputCountry.value = country;
    btn.addEventListener('click', function () {
      inputCountry.value === ''
        ? reject(alert('No country specified!🗺'))
        : resolve(inputCountry.value);
    });
  });
};

const getCountryCard = async function () {
  try {
    const countryFilled = await readCountry();
    console.log(countryFilled);
    const countryName = countryFilled;
    // get the response
    const res = await fetch(`https://restcountries.com/v2/name/${countryName}`);
    if (!res.ok) alert(`Country does not exist (${res.status})`);

    // get the response in json = data
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);

    const neighbour = data[0].borders;
    console.log(neighbour);
    if (!neighbour) renderError('No neighbouring country found! 🌐');

    const resNeighbour = await fetch(
      `https://restcountries.com/v2/alpha/${neighbour[0]}`
    );
    // if (!resNeighbour.ok)
    //   throw new Error(
    //     `Neighbouring country not found (${resNeighbour.status}❗)`);

    // get the resNeighbour in json = dataNeighbour
    const dataNeighbour = await resNeighbour.json();
    console.log(dataNeighbour);
    renderCountry(dataNeighbour, 'neighbour');
    backBtn.style.opacity = 1;
  } catch (err) {
    console.error(`${err} ❌❌❌`);
    renderError(`Something went wrong`);
  }
};
getCountryCard();

backBtn.addEventListener('click', function () {
  formContainer.style.opacity = 1;
  btn.style.opacity = 1;
  countriesContainer.style.opacity = 0;
  backBtn.style.opacity = 0;
  countriesContainer.innerHTML = '';

  //Resetting the form
  const form = document.querySelector('.form');

  if (form) {
    form.remove();
  }
  renderForm();
  //Reattaching event listener to 'Get County Details' button

  // btn.removeEventListener('click', readCountry);
  // btn.removeEventListener('click', getCountryCard);

  // btn.addEventListener('click', readCountry());
  // btn.addEventListener('click', getCountryCard);
});
////////////////////////////////////////////////////////////////////////////
//Resovling promise with 'then'
/*let countryName;
readCountry()
  .then(country => {
    console.log(country);
    countryName = country;
    return fetch(`https://restcountries.com/v2/name/${countryName}`);
  })
  .then(response => {
    console.log(response);
    if (!response.ok) throw new Error(`Country not found (${response.status})`);
    return response.json();
  })
  .then(data => {
    console.log(data);
    renderCountry(data[0]);

    const neighbour = data[0].borders[0];
    if (!neighbour) throw new Error('No neighbouring country found! 🌐');

    return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
  })
  .then(response => {
    if (!response.ok) throw new Error(`Country not found (${response.status}❗)`);
    return response.json();
  })
  .then(data => {
    console.log(data);
    renderCountry(data, 'neighbour');
  })

  .catch(err => {
    console.error(`${err} ❌❌❌`);
  });
*/

import 'core-js/stable';
import 'regenerator-runtime';
