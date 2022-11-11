// fetch("https://restcountries.com/v3.1/region/e")
//   .then((resp) => resp.json())
//   .then((data) => {
//     console.log(data);
//   });

const mainDisplay = document.querySelector(".main");
let url = "https://restcountries.com/v3.1/all";

function renderCountries() {
  let html = "";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((country) => {
        html += `
        <div class="country-section">
            <div class="image-section"><img src="${country.flags.png}" alt="country flag" /></div>
            <div class="description-section">
              <h2 class="country-name">${country.name.common}</h2>
              <span class="population">Population: ${country.population}</span>
              <span class="region">Region: ${country.region}</span>
              <span class="capital">Capital: ${country.capital}</span>
            </div>
          </div>
        `;
      });
      mainDisplay.innerHTML = html;
    });
}

renderCountries();

// search by region

const regionInput = document.getElementById("region-list");

regionInput.addEventListener("keyup", renderCountryByRegion);

function renderCountryByRegion() {
  let html = "";
  let inputValue = regionInput.value.toLowerCase();
  if (inputValue) {
    let url = `https://restcountries.com/v3.1/region/${inputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((country) => {
          html += `
            <div class="country-section">
                <div class="image-section"><img src="${country.flags.png}" alt="country flag" /></div>
                <div class="description-section">
                  <h2 class="country-name">${country.name.common}</h2>
                  <span class="population">Population: ${country.population}</span>
                  <span class="region">Region: ${country.region}</span>
                  <span class="capital">Capital: ${country.capital}</span>
                </div>
              </div>
            `;
        });
        mainDisplay.innerHTML = html;
      });
  }
}

//  search country by name
let inputEl = document.getElementById("search-country");
inputEl.addEventListener("keyup", renderCountryByName);

function renderCountryByName() {
  let html = "";
  let countriesArray = [];
  let nameValue = inputEl.value;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((country) => {
        if (country.name.common.toLowerCase().includes(nameValue)) {
          countriesArray.push(country);
        }
      });
      countriesArray.forEach((country) => {
        html += `
          <div class="country-section">
              <div class="image-section"><img src="${country.flags.png}" alt="country flag" /></div>
              <div class="description-section">
                <h2 class="country-name">${country.name.common}</h2>
                <span class="population">Population: ${country.population}</span>
                <span class="region">Region: ${country.region}</span>
                <span class="capital">Capital: ${country.capital}</span>
              </div>
            </div>
          `;
      });
      mainDisplay.innerHTML = html;
    });
}
