const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  /* Load Data */
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));

  searchField.value = "";
};

const displaySearchResult = (phones) => {
  console.log(phones);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";

  phones?.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 text-center shadow border-0">
          <img src="${phone.image}" class="card-img-top p-4 mx-auto" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Name: ${phone.phone_name}</h5>
            <p class="card-text">
              Brand: ${phone.brand}
            </p>
            <button class="details-button">See Details</button>
          </div>
        </div>
    `;
    searchResult.appendChild(div);
  });
};
