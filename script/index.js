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
        <div class="country-section" data-id="${country.name.common}">
            <div class="image-section" data-id="${country.name.common}"><img src="${country.flags.png}" alt="country flag" /></div>
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

// display border countries

// display particular country details
let detailSection = document.querySelector(".detailed-section");
const mainCountrySection = document.querySelector(".main-country");
const backBtn = document.getElementById("back-btn");

document.addEventListener("click", function (e) {
  let parentElement = e.target.parentElement;
  let parentElementId = parentElement.dataset.id;
  let borderItem = e.target.className;

  console.log();
  if (
    parentElement.className === "country-section" ||
    parentElement.className === "image-section"
  ) {
    detailSection.classList.remove("hidden");
    handleParticularCountry(parentElementId);
    backBtn.addEventListener("click", function () {
      detailSection.classList.add("hidden");
    });
  }
});

function handleParticularCountry(urlParameter) {
  let html = "";
  let url = `https://restcountries.com/v2/name/${urlParameter}`;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      let country = data[0];
      let borderHtml = "";
      if (country.borders) {
        country.borders.forEach((border) => {
          borderHtml += `
              <li class="border-item" data-borderName="${border}">${border}</li>
            `;
        });
      } else {
        borderHtml = `<li class="border-item"> No borders..</li>`;
      }
      html = `
        <div class="flag"><img src="${country.flags.png}" alt="country flag" /></div>
        <div class="about">
          <div class="name">${country.name}</div>
          <div class="name-details">
            <div class="name-details-left">
              <p>Native Name: <span>${country.nativeName}</span></p>
              <p>Population: <span>${country.population}</span></p>
              <p>Region: <span>${country.region}</span></p>
              <p>Sub Region: <span>${country.subregion}</span></p>
              <p>Capital: <span>${country.capital}</span></p>
            </div>
            <div class="name-details-right">
              <p>Top Level Domain: <span>${country.topLevelDomain}</span></p>
              <p>Currencies: <span>${country.currencies[0].name}</span></p>
              <p>Languages: <span>${country.languages[0].name}</span></p>
            </div>
          </div>
          <div class="border-countries">
            Border Countries:
            <ul>
              ${borderHtml}
            </ul>
          </div>
        </div>
        `;

      mainCountrySection.innerHTML = html;
    });
}

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
