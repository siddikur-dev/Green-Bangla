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
     <li><button onclick="dataLoadFromCategoryBtn('${category.id}')" id="dynamicCategoryBtn" class="btn btn-sm w-full bg-transparent hover:bg-green-100 text-gray-700">${category.category_name}</button></li>
`;
  });
  loadCategoriesBTN.append(createSingleUl);
};

//Click Category Button To Load Data
const dataLoadFromCategoryBtn = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${id}`
  );
  const data = await res.json();
  dataLoadFromCategoryBtnShowing(data.plants);
};

//Click Category Button To Load Data Showing
const dataLoadFromCategoryBtnShowing = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const creteDiv = document.createElement("div");
  cards.forEach((card) => {
    const createDiv = document.createElement("div");
    createDiv.className = "card bg-base-100 shadow-md";
    createDiv.innerHTML = `
  <div class="card bg-white shadow p-4">
<img src=${card.image} alt="" class="bg-gray-200 h-40 rounded">
<div class="mt-3">
<h4 class="font-semibold">${card.name}</h4>
<p class="text-sm text-gray-500">৳${card.price}</p>
<span class="badge badge-success badge-outline my-2">Fruit Tree</span>
<button class="btn w-full bg-green-700 text-white rounded-full">Add to Cart</button>
</div>
</div>
    `;
    cardContainer.appendChild(createDiv);
  });
};

// Default Load All Category Button
loadCategoriesButton();
