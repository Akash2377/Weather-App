async function getData() {
  try {
    let city = document.getElementById("CityName").value;
    console.log(city);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=af5866d50eb7aeb061dd3a373bdc15c2`;
    let res = await fetch(url);
    let data = await res.json();
    if (data.Error) {
      alert("City Not Found");
    } else {
      displayData(data);
    }
  } catch (error) {
    console.log(error);
  }
}

function displayData(data) {
  document.getElementById("DataOfCityW").innerHTML = "";
  document.getElementById("MapOfCity").innerHTML = "";
  document.querySelector(".contnetNews").style.display = "block";
  let city2 = document.getElementById("CityName").value;
  console.log(data);
  let mapOfCity = `<iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=${city2}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>`;
  let div = document.createElement("div");
  div.innerHTML = mapOfCity;
  div.setAttribute("class", "map");
  document.getElementById("MapOfCity").append(div);
  let weathercontent = `<p>City: <span>${data.name}</span></p>
            <p>Temperature: <span>${(data.main.temp - 273.15).toFixed(
              2
            )}</span>°C</p>
            <p>Temp Max: <span>${(data.main.temp_max - 273.15).toFixed(
              2
            )}</span>°C</p> </p>
            <p>Temp Min: <span>${(data.main.temp_min - 273.15).toFixed(
              2
            )}</span>°C</p>
            <p>Wind : <span>${data.wind.speed}</span>Km/h</p>
            <p>Sun Rise: <span>${window
              .moment(data.sys.sunrise * 1000)
              .format("hh:mm a ddd yyyy")}</span></p>
            <p>Sun Set : <span>${window
              .moment(data.sys.sunset * 1000)
              .format("hh:mm a ddd yyyy")}</span></p>`;
  let dataofcity = document.createElement("div");
  dataofcity.innerHTML = weathercontent;
  dataofcity.setAttribute("id", "contentOfcity");
  document.getElementById("DataOfCityW").append(dataofcity);
  ShowEightDays(data.coord);
}

async function ShowEightDays(data) {
  try {
    let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&appid=af5866d50eb7aeb061dd3a373bdc15c2&units=metric`;

    let respose = await fetch(url2);
    let dataEight = await respose.json();
    console.log(dataEight);
    displayEight(dataEight.daily);
  } catch (error) {}
}
function displayEight(elem) {
  
  document.querySelector(".contnetNews2").style.display = "block";
  document.getElementById("EightDay").innerHTML = "";
  elem.map(function (data) {
    let mydata = `  <p>${window.moment(data.dt * 1000).format("ddd")}</p>
          <img src="https://openweathermap.org/img/wn/${
            data.weather[0].icon
          }.png" alt="" />
          <p>Temp Max : ${data.temp.max} °C </p>
          <p>Temp Min : ${data.temp.min} °C</p>
          <p>Wind : ${data.wind_speed} Km/h</p>`;
    let div = document.createElement("div");
    div.setAttribute("class", "contentEight");
    div.innerHTML = mydata;
    document.getElementById("EightDay").append(div);
  });
}
