/* Search */
const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  /* Load Data */
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data, searchText));

  searchField.value = "";
};

/* Spinner */
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
const toggleSearchResult = (displayStyle) => {
  document.getElementById("search-result").style.display = displayStyle;
};

/* Show Result */
const displaySearchResult = (phones, text) => {
  //   console.log(phones);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";

  phones?.slice(0, 20).forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100 text-center shadow border-0">
              <img src="${phone.image}" class="card-img-top p-4 mx-auto" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  Brand: ${phone.brand}
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="details-button btn btn-dark">See Details</button>
              </div>
            </div>
        `;
    searchResult.appendChild(div);
  });
};

/* Details */
const loadPhoneDetails = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

/* Show Details */
const displayPhoneDetails = (phone) => {
  //   console.log(phone);
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card", "shadow", "border-0", "p-3", "flex-row");
  div.innerHTML = `
  <div class="m-3 d-flex">
  <img src="${phone.image}" class="card-img-top me-3" alt="..." />
    <div class="card-body justify-content-center ms-2">
        <h5 class="card-title fw-bold fs-3">${phone.name}</h5>
        <p class="card-text mb-0">
            <span class="fw-bold">Storage: </span>${
              phone.mainFeatures.storage
            } </br>
            <span class="fw-bold">Display Size: </span>${
              phone.mainFeatures.displaySize
            } </br>
            <span class="fw-bold">Chip Set: </span>${
              phone.mainFeatures.chipSet
            } </br>
            <span class="fw-bold">Memory: </span>${
              phone.mainFeatures.memory
            } </br>
            <span class="fw-bold">Sensors: </span>${
              phone.mainFeatures.sensors
            } </br>
            <span class="fw-bold">Others: </span>
            <div class="ms-4">
                <span class="fw-bold">WLAN: </span>${
                  phone.others?.WLAN ? phone.others.WLAN : "Not found"
                } </br>
                <span class="fw-bold">BlueTooth: </span>${
                  phone.others?.Bluetooth ? phone.others.Bluetooth : "Not found"
                } </br>
                <span class="fw-bold">GPS: </span>${
                  phone.others?.GPS ? phone.others.GPS : "Not found"
                } </br>
                <span class="fw-bold">NFC: </span>${
                  phone.others?.NFC ? phone.others.NFC : "Not found"
                } </br>
                <span class="fw-bold">Radio: </span>${
                  phone.others?.Radio ? phone.others.Radio : "Not found"
                } </br>
                <span class="fw-bold">USB: </span>${
                  phone.others?.USB ? phone.others.USb : "Not found"
                } </br>
            </div>
        </p>
    </div>
  </div>
  `;
  phoneDetails.appendChild(div);
};
