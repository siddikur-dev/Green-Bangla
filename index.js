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
    console.log(category);
    createSingleUl.innerHTML += `
     <li><button class="btn btn-sm w-full bg-transparent hover:bg-green-100 text-gray-700">${category.category_name}</button></li>
`;
  });
  loadCategoriesBTN.append(createSingleUl);
};

//Click Category Button To Load Data


// Default Load All Category Button
loadCategoriesButton();
