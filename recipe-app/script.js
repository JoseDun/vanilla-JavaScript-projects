//* conexion con el dom
const meals = document.getElementById("meals");
const favoriteMeals = document.getElementById("fav-meals");
const load = document.querySelector(".load");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const divPopup = document.getElementById("popup");
const btnPopup = document.getElementById("close-popup");
const mealInfoEl = document.getElementById("meal-info");


//* llamado de funciones
getRandomMeal();
fetchFavmeals();

load.addEventListener("click", () => {
  meals.innerHTML = "";
  getRandomMeal();
});

//!Funciones principales {

//* Obtener comida al azar el recuadro.
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
}

async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const mealsTerm = respData.meals;
  return mealsTerm;
}
//!Funciones principales }

//* agregar comida al dom
function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
 

  meal.innerHTML = `
   
    <div class="meal-header">
        ${random ? ` <span class="random">Random Recipe</span> ` : ""}
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>

    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn ">
            <i class="fas fa-heart"></i>
        </button>
    </div>`;

  const btn = meal.querySelector(".meal-body .fav-btn");
  const clickQ = meal.querySelector(".meal-header");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
      /*    meals.innerHTML = "";
      getRandomMeal();*/
      fetchFavmeals();
    }
  });

  clickQ.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  meals.appendChild(meal);
}

//! funciones de localStorage {
function addMealLS(mealId) {
  const mealIds = getMealsLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}
//! funciones de localStorage }

//* Obtener  comidas de localStorage
async function fetchFavmeals() {
  //clean the container
  favoriteMeals.innerHTML = "";

  const mealIds = getMealsLS();
  const meals = [];
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    let meal = await getMealById(mealId);
    meals.push(meal);
    addMealFav(meal);
  }
  console.log(meals);

  //* agregar al dom
}

//* agregar a  barra de favoritos
function addMealFav(mealData) {
  const fragment = document.createDocumentFragment(); // new DocumentFragment()
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `

      <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
      <span>${mealData.strMeal}</span>
      <button class="clear">
        <i class="fas fa-window-close"></i> 
      </button>
  
      
  `;
  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);
    fetchFavmeals();
  });

  fragment.appendChild(favMeal);
  favoriteMeals.appendChild(fragment);

  favMeal.addEventListener("click", () => {
    meals.innerHTML = "";

    meals.classList.add("meal");
    meals.innerHTML = `
     
      <div class="meal-header">
          <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
      </div>
  
      <div class="meal-body">
          <h4>${mealData.strMeal}</h4>
          <button class="fav-btn ">
              <i class="fas fa-heart"></i>
          </button>
      </div>`;

    const btn = document.querySelector(".meal-body .fav-btn");
    const clickQ = document.querySelector(".meal-header");
    clickQ.addEventListener("click", () => {
      showMealInfo(mealData);
    });

    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) {
        removeMealLS(mealData.idMeal);
        btn.classList.remove("active");
      } else {
        addMealLS(mealData.idMeal);
        btn.classList.add("active");
        meals.innerHTML = "";
        getRandomMeal();
        fetchFavmeals();
      }
    });
  });

}

searchBtn.addEventListener("click", async () => {
  meals.innerHTML = "";
  const search = searchTerm.value;
  const mealsTerm = await getMealsBySearch(search);
  if (mealsTerm) {
    mealsTerm.forEach((meal) => {
      addMeal(meal);
    });
  }
});

function showMealInfo(mealData) {
  //clean dom
  divPopup.innerHTML = "";
  //update the meal info
  const mealEl = document.createElement("div");
  mealEl.classList.add("meal-info");
  mealEl.setAttribute("id", "meal-info");

  const ingredients = [];
  console.log(ingredients)

  //get ingredients
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `
      ${mealData["strIngredient" + i]} -
      ${mealData["strMeasure" + i]}
      `
      );
    } else {
      break;
    }
  }

  mealEl.innerHTML = `
      <button id="close-popup" class="close-popup">
        <i class="fas fa-window-close"></i> 
      </button>

      <h1>${mealData.strMeal}</h1>

      <img src="${mealData.strMealThumb}" 
      
      alt="">
      <p>${mealData.strInstructions}</p>
        <h3> Ingredients:</h3>
      <ul>
        ${ingredients
          .map(
            (ing) =>`<li>${ing}</li>`).join("")}
      </ul>`;
  divPopup.appendChild(mealEl);

  //show the popup
  divPopup.classList.remove("hidden");
}

divPopup.addEventListener("click", () => {
  divPopup.classList.add("hidden");
});
