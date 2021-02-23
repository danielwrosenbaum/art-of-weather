var $mainContainer = document.querySelector('.main-container');
var $backgroundPic = document.querySelector('.background-pic');

function getArtData(weather) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&imgonly=true&type=painting&q=' + weather);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var i = Math.floor(Math.random() * xhr.response.artObjects.length);
    var $newPic = xhr.response.artObjects[i].webImage.url;
    var $newPicAlt = xhr.response.artObjects[i].title;
    var $randomBackground = document.createElement('img');
    $randomBackground.setAttribute('src', $newPic);
    $randomBackground.setAttribute('alt', $newPicAlt);
    $backgroundPic.prepend($randomBackground);
    var $imageContainer = document.createElement('div');
    $mainContainer.prepend($imageContainer);
    var $newImage = document.createElement('img');
    $newImage.setAttribute('src', $newPic);
    $newImage.setAttribute('alt', $newPicAlt);
    $imageContainer.prepend($newImage);
    var $newImageTitle = document.createElement('h4');
    $newImageTitle.textContent = xhr.response.artObjects[i].title;
    $imageContainer.appendChild($newImageTitle);
    var $newImageArtist = document.createElement('div');
    $newImageArtist.textContent = xhr.response.artObjects[i].principalOrFirstMaker;
    $imageContainer.appendChild($newImageArtist);
  });
  xhr.send();
}

getArtData('autumn');

function getWeather(cityName) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=8e56c099331856fb966227282999fa5c');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
    // var weatherCondition = xhr.response.weather[0].main;
    // var newCityTemp = document.createElement('div');
    // newCityTemp.textContent = cityName + ' ' + 'current temperature:' + ' ' + xhr.response.main.temp;
    // $newWeather.appendChild(newCityTemp);
    // var newCityWeather = document.createElement('div');
    // newCityWeather.textContent = cityName + ' ' + 'current conditions:' + ' ' + weatherCondition;
    // $newWeather.appendChild(newCityWeather);
  });
  xhr.send();
}

getWeather('chicago');
