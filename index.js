//Default Category Button
const loadCategoriesButton = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => showCategoriesBtn(data.categories));
};
//Default Category Button Showing
const showCategoriesBtn = (categories) => {
  const loadCategoriesBTN = document.getElementById("categories-side-btn");
  //   loadCategoriesBTN.innerHTML = "";
  const createSingleUl = document.createElement("ul");
  categories.map((category) => {
    createSingleUl.innerHTML += `
     <li><button     onclick="handleCategoryClick('${category.id}')" id="categoryBtn${category.id}"  class=" categoryBtn btn btn-sm w-full bg-transparent hover:bg-green-700 hover:text-white text-gray-900">${category.category_name}</button></li>
`;
  });
  loadCategoriesBTN.append(createSingleUl);
};

// Active Button Color And De active Button
const handleCategoryClick = (id) => {
  // remove active color from all button
  const buttons = document.querySelectorAll(".categoryBtn");
  buttons.forEach((btn) => {
    btn.classList.remove("bg-green-700", "text-white");
    btn.classList.add("bg-transparent", "text-gray-700");
  });

  //  button-এ active color add
  const clickedBtn = document.getElementById(`categoryBtn${id}`);
  clickedBtn.classList.add("bg-green-700", "text-white");
  clickedBtn.classList.remove("bg-transparent", "text-gray-700");

  // data load করো
  dataLoadFromCategoryBtn(id);
};

// Showing Spinner
const showSpinner = () => {
  document.getElementById("spinner").classList.remove("hidden");
};
const stopSpinner = () => {
  document.getElementById("spinner").classList.add("hidden");
};

//Click Category Button To Load Data
const dataLoadFromCategoryBtn = async (id) => {
  showSpinner();

  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${id}`
  );
  const data = await res.json();
  dataLoadFromCategoryBtnShowing(data.plants);
  stopSpinner();
};

//Click Category Button To Load Data Showing
const dataLoadFromCategoryBtnShowing = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    const createDiv = document.createElement("div");

    createDiv.innerHTML = `
    <div class="card bg-white shadow-lg p-4">
    <img src=${card.image} alt="" class="bg-gray-200 h-40 rounded">
    <div class="mt-3">
    <h4 class="font-semibold">${card.name}</h4>
    <p class="text-sm text-gray-500">৳${card.price}</p>
    <span class="badge badge-success badge-outline my-2">${card.category}</span>
    <button class="btn w-full bg-green-700 text-white rounded-full">Add to Cart</button>
    </div>
    </div>
    `;
    cardContainer.appendChild(createDiv);
  });
};

// Initially All Data Load Ui
const loadAllDataInitially = async () => {
  showSpinner();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  showingAllDataInitially(data.plants);
  stopSpinner();
};

// Initially All Data Showing Ui
const showingAllDataInitially = (cards) => {
  // console.log(cards);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
        <div class="card bg-white shadow-lg p-4">
    <img src=${card.image} alt="" class="bg-gray-200 h-40 rounded">
    <div class="mt-3">
    <h4 class="font-semibold">${card.name}</h4>
    <p class="text-sm text-gray-500">৳${card.price}</p>
    <span class="badge badge-success badge-outline my-2">${card.category}</span>
    <button class="btn w-full bg-green-700 text-white rounded-full">Add to Cart</button>
    </div>
    </div>
    `;
    cardContainer.appendChild(createDiv);
  });
};

// Default Load All Category Button
loadCategoriesButton();

// Initially Loading All Data Showing Ui
loadAllDataInitially();
