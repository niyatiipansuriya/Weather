const url =
  "https://api.openweathermap.org/data/2.5/weather?appid=09981163b4e3d1cd05c8f7e574b1625a&units=metric&q=";

let mainEl = document.querySelector("#main");

let city = "surat";

async function fetchData() {
  try {
    const response = await fetch(`${url}${city}`);
    let data = await response.json();
    console.log(data);
    document.querySelector("#city").textContent = data.name;
    document.querySelector("#main #right .info .i1").textContent =
      data.wind.speed + ` km/h`;
    document.querySelector("#main #left .info .i1").textContent =
      data.main.humidity + `%`;
    document.querySelector("#main #temp").textContent = data.main.temp + `℃`;

    let imgEl = document.querySelector("#main #weatherImg");

    const weather = data.weather[0].main;

    if (weather === "Clouds") {
      imgEl.innerHTML = '<img src="images/clouds.png" alt="Cloudy">';
      mainEl.style.background = `linear-gradient(150deg, #d3d3d3, #a9a9a9, #808080)`;
    } else if (weather === "Clear") {
      imgEl.innerHTML = '<img src="images/clear.png" alt="Clear">';
      mainEl.style.background = `linear-gradient(150deg, #00fafe, #5b548a)`;
    } else if (weather === "Drizzle") {
      imgEl.innerHTML = '<img src="images/drizzle.png" alt="Drizzle">';
      mainEl.style.background = `linear-gradient(150deg, #a4b0be, #dfe4ea, #ced6e0)`;
    } else if (weather === "Mist") {
      imgEl.innerHTML = '<img src="images/mist.png" alt="Mist">';
      mainEl.style.background = `linear-gradient(150deg, #e0e0e0, #f8f8f8, #d4d4d4)`;
    } else if (weather === "Rain") {
      imgEl.innerHTML = '<img src="images/rain.png" alt="Rain">';
      mainEl.style.background = `linear-gradient(150deg, #4e54c8, #8f94fb, #1f2e50)`;
    } else if (weather === "Snow") {
      imgEl.innerHTML = '<img src="images/snow.png" alt="Snow">';
      mainEl.style.background = `linear-gradient(150deg, #ffffff, #e0e0e0)`;
    }
  } catch (err) {
    alert("City not found");
    console.error("Error: ", err);
  }
}

const btnEl = document.querySelector("#main #search i");
const inputEl = document.querySelector("#main #search input");

btnEl.addEventListener("click", function () {
  city = inputEl.value;
  fetchData();
  inputEl.value = "";
});

inputEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    city = inputEl.value;
    fetchData();
    inputEl.value = "";
  }
});

// Initial fetch for the default city
fetchData();
