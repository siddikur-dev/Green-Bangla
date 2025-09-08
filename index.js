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
// Stop Spinner
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
let allCards = [];
const dataLoadFromCategoryBtnShowing = (cards) => {
  allCards = cards;
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    const createDiv = document.createElement("div");

    createDiv.innerHTML = `
    <div class="card bg-white shadow-lg p-4">
      <img  onclick="openModal(${card.id})" src="${
      card.image
    }" alt="" class="bg-gray-200 h-40 rounded object-cover cursor-pointer">
      <div class="mt-3">
        <h4 onclick="openModal(${
          card.id
        })" class="font-semibold cursor-pointer">${card.name}</h4>
        <p class="text-sm text-gray-500">৳${card.price}</p>
        <span class="badge badge-success badge-outline my-2 bg-green-100 text-black">${
          card.category
        }</span>
        <button onclick='addToCart(${JSON.stringify({
          name: card.name,
          price: card.price,
        })})' 
          class="btn w-full bg-green-700 text-white rounded-full">
          Add to Cart
        </button>
      </div>
    </div>
    `;
    cardContainer.appendChild(createDiv);
  });
};

//Click Category Button Show Card And Open Modal To Click Card
// Modal Open Function
const openModal = (id) => {
  const card = allCards.find((c) => c.id === id);
  const modal = document.getElementById("cardModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <img src="${card.image}" alt="${
    card.name
  }" class=" h-40 mx-auto w-full object-cover rounded mb-4">
    <h2 class="text-xl font-semibold">${card.name}</h2>
    <p class="text-gray-600 text-sm my-2">${
      card.description || "No description available."
    }</p>
    <p class="font-medium">Category: <span class="badge badge-success badge-outline my-2 bg-green-100 text-black">${
      card.category
    }</span></p>
    <p class="font-bold text-lg mt-2">৳${card.price}</p>
    
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

// Close Modal Function
const closeModal = () => {
  const modal = document.getElementById("cardModal");
  modal.classList.add("hidden");
};

let total = 0; // Total Money Global History

// Add To Cart Button And Added History Section
const addToCart = (item) => {
  const historyContainer = document.getElementById("history-container");

  // Increase Total Price
  total += item.price;
  updateTotal();

  const div = document.createElement("div");
  div.className = "p-2 bg-gray-100 rounded shadow";

  div.innerHTML = `<div class="flex justify-between bg-green-50 p-2 rounded items-center">
  <li class="flex flex-col">
  <span>${item.name}</span>
  <span>৳${item.price} × 1</span>
  </li>
  <li>
  <p class="text-sm">
  <span class="cursor-pointer text-red-600 font-bold text-2xl">×</span>
  </p>
  </li>
    </div>`;

  // Remove Price Event
  const removeBtn = div.querySelector("span.cursor-pointer");
  removeBtn.addEventListener("click", () => {
    total -= item.price;
    updateTotal();
    div.remove();
  });

  historyContainer.appendChild(div);
};

// Call updateTotal Function
const updateTotal = () => {
  document.getElementById("totalMoney").innerText = `Total: ৳${total}`;
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
  allCards = cards;
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    const createDiv = document.createElement("div");

    createDiv.innerHTML = `
        <div class="card bg-white shadow-lg p-4">
    <img onclick="openModal(${card.id})" src=${
      card.image
    } alt="" class="bg-gray-200 h-40 rounded object-cover cursor-pointer">
    <div class="mt-3">
    <h4 class="font-semibold cursor-pointer" onclick="openModal(${card.id})">${
      card.name
    }</h4>
    <p class="text-sm text-gray-500">৳${card.price}</p>
    <span class="badge badge-success badge-outline my-2 bg-green-100 text-black">${
      card.category
    }</span>
    <button onclick='addToCart(${JSON.stringify({
      name: card.name,
      price: card.price,
    })})'   class="btn w-full bg-green-700 text-white rounded-full">Add to Cart</button>
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
