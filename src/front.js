/* ---------- HACKTOBER FEST  -------------*/

// Adicione a foto da comida nessa pasta aqui:
const FoodPicsDir = "public/foodpics";

// Adicione
const Foods = [
  { name: "Misto quente", filename: "mistoquente.jpeg" },
  { name: "Sanduba", filename: "sanduba.jpg" },
  { name: "Hamburguer", filename: "hamburger.jpg" },
  { name: "Pizza dobrada ao meio", filename: "pizza_dobrada.jpg" },
  { name: "Pão com ovo", filename: "paocomovo.jpg" },
  { name: "Cachorro quente", filename: "cachorroquente.jpg" },
  { name: "Empanada", filename: "empanada.jpeg" },
  { name: "Tapioca", filename: "tapioca.jpg" },
  { name: "Burrito", filename: "Burrito.jpg" },
  // Adicione na linha acima a nova comida que você
  // acha que é sanduíche (ou não) em formato:
  // { name: nome da comida, filename: nome do arquivo }
];

/* -------------------------------------- */
// Não precisa alterar código a partir daqui

let yesButton = document.getElementById("yesbutton");
let noButton = document.getElementById("nobutton");

yesButton.onclick = function () {
  submitAnswer(true);
};

noButton.onclick = function () {
  submitAnswer(false);
};

let foodPicture = document.getElementById("food-pic");
let foodName = document.getElementById("caption-text");

let currIdx = 0;
let answers = [];
let currFood = Foods[currIdx];

replaceImage();

function replaceImage() {
  foodName.textContent = currFood.name;
  foodPicture.alt = currFood.name;
  foodPicture.src = `${FoodPicsDir}/${currFood.filename}`;
}

function submitAnswer(answer) {
  answers.push({ food_id: getFoodId(currFood), is_sandwich: answer });
  currFood = Foods[++currIdx];

  if (currIdx == Foods.length) {
    sendToServer();
  } else {
    replaceImage();
  }
}

function getFoodId(currFood) {
  return currFood.filename.substr(0, currFood.filename.indexOf("."));
}

function sendToServer() {
  alert("Aguarde um momento! Adicionando seu voto...");
  fetch("https://damp-wildwood-21405.herokuapp.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e))
    .then((json) => {
      showResultsPage(json.stats);
    });
}

async function showResultsPage(stats) {
  const b = document.getElementById("content");
  const response = await fetch("../public/result.html");
  const data = await response.text();
  b.innerHTML = "";

  stats.forEach(function (stat, i) {
    const doc = new DOMParser().parseFromString(data, "text/html");
    const picElement = doc.getElementById("food-pic");
    const yesStats = doc.getElementById("yesstats");
    const noStats = doc.getElementById("nostats");

    picElement.alt = Foods[i].name;
    picElement.src = `${FoodPicsDir}/${Foods[i].filename}`;

    const total = stat.yes + stat.no;
    const yesPercent = (stat.yes / total) * 100;
    const noPercent = (stat.no / total) * 100;

    yesStats.textContent = `Sim: ${yesPercent.toFixed(2)}%`;
    noStats.textContent = `Não: ${noPercent.toFixed(2)}%`;

    const cellContent = doc.getElementsByClassName("cell")[0];
    b.appendChild(cellContent);
  });
}

function preloadImages() {
  const imagesPath = Foods.map((image) => `${FoodPicsDir}/${image.filename}`);

  function preload(url) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      imagesPath.shift();
      if (imagesPath.length > 0){
        preload(imagesPath[0]);
      }
    };
  }

  preload(imagesPath[0]);
};

preloadImages();
