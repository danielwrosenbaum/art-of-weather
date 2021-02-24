var $getWeatherPage = document.querySelector('.get-weather');
var $headingContainer = document.querySelector('.heading-container');
var $mainHeading = document.querySelector('.heading');
var $backButton = document.querySelector('.back-button');
var $backgroundPic = document.querySelector('.background-pic');
var $goButton = document.querySelector('.go-button');
var $getButton = document.querySelector('.get-button');
var $viewButton = document.querySelector('.view-button');
var $homePage = document.querySelector('.homepage');
var $viewPage = document.querySelector('.viewpage');
var $weatherPage = document.querySelector('.weatherpage');
var $form = document.querySelector('.city-form');

var $viewBackButton = document.createElement('button');
var $randomBackground = document.createElement('img');
var $weatherBackButton = document.createElement('button');
var $errorContainer = document.createElement('div');
var $backButtonContainer = document.createElement('div');
var $weatherHeading = document.createElement('h1');
var $weatherContainer = document.createElement('div');
var $imageContainer = document.createElement('div');

$getButton.addEventListener('click', goToGet);
$backButton.addEventListener('click', goBack);
$viewBackButton.addEventListener('click', goBack);
$goButton.addEventListener('click', goToWeather);
$goButton.addEventListener('submit', submitCity);
$viewButton.addEventListener('click', goToView);
$weatherBackButton.addEventListener('click', goBack);

function submitCity(event) {
  event.preventDefault();
  var cityWeather = event.target.elements.cityName.value;
  getWeather(cityWeather);
}
function goToGet(event) {
  $getWeatherPage.className = 'get-weather view';
  $homePage.className = 'homepage hidden';
}
function goToView(event) {
  $homePage.className = 'homepage hidden';
  $viewPage.className = 'viewpage';
  var $viewImageContainer = document.createElement('div');
  $viewImageContainer.className = 'view-container';
  $viewPage.appendChild($viewImageContainer);
  $viewBackButton.className = 'back-button';
  $viewBackButton.textContent = 'Back';
  $viewPage.appendChild($viewBackButton);

}
function changeBackground(weather) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&imgonly=true&type=painting&q=' + weather);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var i = Math.floor(Math.random() * xhr.response.artObjects.length);
    var $newPic = xhr.response.artObjects[i].webImage.url;
    var $newPicAlt = xhr.response.artObjects[i].title;
    $randomBackground.setAttribute('src', $newPic);
    $randomBackground.setAttribute('alt', $newPicAlt);
    $backgroundPic.prepend($randomBackground);
  });
  xhr.send();
}

function getArtData(weather) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&imgonly=true&type=painting&q=' + weather);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var i = Math.floor(Math.random() * xhr.response.artObjects.length);
    var $newPic = xhr.response.artObjects[i].webImage.url;
    var $newPicAlt = xhr.response.artObjects[i].title;
    $randomBackground.setAttribute('src', $newPic);
    $randomBackground.setAttribute('alt', $newPicAlt);
    $backgroundPic.prepend($randomBackground);
    $imageContainer.className = 'image-container';
    $getWeatherPage.prepend($imageContainer);
    var $newImage = document.createElement('img');
    $newImage.setAttribute('src', $newPic);
    $newImage.setAttribute('alt', $newPicAlt);
    $newImage.className = 'main-pic';
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

getArtData('snow');

function goBack(event) {
  $getWeatherPage.className = 'get-weather hidden';
  $homePage.className = 'homepage view';
  $viewPage.className = 'viewpage hidden';
  $weatherPage.className = 'weatherpage hidden';
  $mainHeading.className = 'heading view';
  $weatherHeading.className = 'hidden';
  changeBackground('snow');
}

function goToWeather(event) {
  $getWeatherPage.className = 'get-weather hidden';
  $weatherPage.className = 'weatherpage view';

}
function getWeather(cityName) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=8e56c099331856fb966227282999fa5c');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.response.cod === '404') {
      $weatherPage.prepend($errorContainer);
      var notFound = document.createElement('h1');
      notFound.className = 'text-align';
      notFound.textContent = 'City not found, please try again.';
      $errorContainer.appendChild(notFound);
    } else {
      var cityTemp = Math.trunc(xhr.response.main.temp);
      var weatherCondition = xhr.response.weather[0].main;
      $mainHeading.className = 'heading hidden';
      $weatherHeading.textContent = weatherCondition + '  ' + cityTemp + ' \u00B0F';
      $headingContainer.appendChild($weatherHeading);
      getArtWeather(weatherCondition);
      $weatherContainer.className = 'weather-container';
      $weatherPage.appendChild($weatherContainer);
      var $cityName = document.createElement('h1');
      $cityName.textContent = xhr.response.name;
      $weatherContainer.append($cityName);
      var newCityTemp = document.createElement('div');
      newCityTemp.textContent = cityTemp + ' \u00B0F';
      $weatherContainer.appendChild(newCityTemp);
      var newCityWeather = document.createElement('div');
      newCityWeather.textContent = weatherCondition;
      $weatherContainer.appendChild(newCityWeather);
    }
    $weatherPage.appendChild($backButtonContainer);
    $backButtonContainer.className = 'button-container';
    $weatherBackButton.className = 'back-button';
    $weatherBackButton.textContent = 'Back';
    $backButtonContainer.appendChild($weatherBackButton);
    $form.reset();
  });
  xhr.send();
}

function getArtWeather(weather) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&imgonly=true&type=painting&q=' + weather);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var i = Math.floor(Math.random() * xhr.response.artObjects.length);
    var $newPic = xhr.response.artObjects[i].webImage.url;
    var $newPicAlt = xhr.response.artObjects[i].title;
    $randomBackground.setAttribute('src', $newPic);
    $randomBackground.setAttribute('alt', $newPicAlt);
    $backgroundPic.prepend($randomBackground);
    var $imageContainer = document.createElement('div');
    $imageContainer.className = 'image-container';
    $weatherPage.prepend($imageContainer);
    var $newImage = document.createElement('img');
    $newImage.setAttribute('src', $newPic);
    $newImage.setAttribute('alt', $newPicAlt);
    $newImage.className = 'main-pic';
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
