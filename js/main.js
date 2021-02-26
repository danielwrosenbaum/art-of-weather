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
var $headerColor = document.querySelector('.header');

var $viewPageHeader = document.createElement('h1');
var $weatherHeading = document.createElement('h1');
var $randomBackground = document.createElement('img');
var $newImage = document.createElement('img');
var $backButtonContainer = document.createElement('div');
var $errorContainer = document.createElement('div');
var $weatherContainer = document.createElement('div');
var $imageContainer = document.createElement('div');
var $weatherImageContainer = document.createElement('div');
var $viewBackButton = document.createElement('button');
var $weatherBackButton = document.createElement('button');
var $weatherSaveButton = document.createElement('button');
var $deleteButton = document.createElement('button');
var $popUpSave = document.createElement('div');
var $viewImageContainer = document.createElement('div');
var $viewFullContainer = document.createElement('div');

var $newPic;
var $newPicTitle;
var $newArtistName;
var $newPicAlt;
var idNum;

$getButton.addEventListener('click', goToGet);
$backButton.addEventListener('click', goBack);
$viewBackButton.addEventListener('click', goBack);
$goButton.addEventListener('click', goToWeather);
$goButton.addEventListener('submit', submitCity);
$viewButton.addEventListener('click', goToView);
$weatherBackButton.addEventListener('click', goBack);
$weatherSaveButton.addEventListener('click', saveImageData);
$viewImageContainer.addEventListener('click', viewImage);
$deleteButton.addEventListener('click', deleteFromStorage);

getArtData('snow');
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
  $mainHeading.className = 'heading hidden';
  $headingContainer.appendChild($viewPageHeader);
  $viewPageHeader.className = 'view normal';
  $viewPageHeader.textContent = 'Saved Images';

  $homePage.className = 'homepage hidden';
  $viewPage.className = 'viewpage';
  $viewImageContainer.className = 'view-container';
  $viewPage.appendChild($viewImageContainer);
  if (data.entries.length > 0) {
    for (var i = 0; i < data.entries.length; i++) {
      var $newViewImage = document.createElement('img');
      $newViewImage.className = 'column-half view-image-pic';
      $newViewImage.setAttribute('src', data.entries[i].imageUrl);
      $newViewImage.setAttribute('alt', data.entries[i].title + ' ' + 'by' + ' ' + data.entries[i].artist);
      $newViewImage.setAttribute('data-id', data.entries[i].id);
      $viewImageContainer.prepend($newViewImage);
    }
  }
  $viewBackButton.className = 'back-button';
  $viewBackButton.textContent = 'Back';
  $viewPage.appendChild($viewBackButton);
}
function viewImage(event) {
  var closestId = event.target.closest('img');
  idNum = closestId.getAttribute('data-id');
  var paintingInfo = closestId.getAttribute('alt');
  $viewPage.prepend($viewFullContainer);
  $viewFullContainer.className = 'view-one';
  var $viewFullImage = document.createElement('img');
  $viewFullImage = closestId;
  $viewFullImage.className = 'view-full';
  $viewFullContainer.append($viewFullImage);
  var $paintingInfo = document.createElement('h3');
  $paintingInfo.textContent = paintingInfo;
  $viewFullContainer.append($paintingInfo);
  $viewFullContainer.append($deleteButton);
  $deleteButton.className = 'delete-button';
  $deleteButton.textContent = 'Delete Image';
  $viewImageContainer.className = 'view-container hidden';
  $viewPageHeader.className = 'viewpage-header hidden';
  $mainHeading.className = 'hidden';

}
function changeBackground(weather) {
  var xhr4 = new XMLHttpRequest();
  xhr4.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&ps=100&imgonly=true&type=painting&q=' + weather);
  xhr4.responseType = 'json';
  xhr4.addEventListener('load', function () {
    generateRandomBackground(xhr4.response);
  });
  xhr4.send();
}

function generateRandomBackground(response) {
  var i = Math.floor(Math.random() * response.artObjects.length);
  var $newPic = response.artObjects[i].webImage.url;
  var $newPicAlt = response.artObjects[i].title;
  $newImage.setAttribute('src', $newPic);
  $newImage.setAttribute('alt', $newPicAlt);
  $randomBackground.setAttribute('src', $newPic);
  $randomBackground.setAttribute('alt', $newPicAlt);
  $backgroundPic.prepend($randomBackground);
}

function getArtData(weather) {
  var xhr3 = new XMLHttpRequest();
  xhr3.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&ps=100&imgonly=true&type=painting&q=' + weather);
  xhr3.responseType = 'json';
  xhr3.addEventListener('load', function () {
    generateGetWeatherPage(xhr3.response);
  });
  xhr3.send();
}

function generateGetWeatherPage(response) {
  var i = Math.floor(Math.random() * response.artObjects.length);
  var $newPic = response.artObjects[i].webImage.url;
  var $newPicAlt = response.artObjects[i].title;
  $randomBackground.setAttribute('src', $newPic);
  $randomBackground.setAttribute('alt', $newPicAlt);
  $backgroundPic.prepend($randomBackground);
  $imageContainer.className = 'image-container';
  $getWeatherPage.prepend($imageContainer);
  $newImage.setAttribute('src', $newPic);
  $newImage.setAttribute('alt', $newPicAlt);
  $newImage.className = 'main-pic';
  $imageContainer.prepend($newImage);
  var $newImageTitle = document.createElement('h4');
  $newImageTitle.textContent = response.artObjects[i].title;
  $imageContainer.appendChild($newImageTitle);
  var $newImageArtist = document.createElement('div');
  $newImageArtist.textContent = response.artObjects[i].principalOrFirstMaker;
  $imageContainer.appendChild($newImageArtist);
}

function goBack(event) {
  $getWeatherPage.className = 'get-weather hidden';
  $homePage.className = 'homepage view';
  $viewPage.className = 'viewpage hidden';
  $weatherPage.className = 'weatherpage hidden';
  $headerColor.className = 'header normal';
  $viewPageHeader.className = 'hidden';
  removeContainer($weatherContainer);
  removeContainer($weatherImageContainer);
  removeContainer($viewImageContainer);
  removeContainer($viewFullContainer);
  removeContainer($errorContainer);
  $viewFullContainer.remove();
  $mainHeading.className = 'heading view';
  $weatherHeading.className = 'hidden';
  changeBackground('snow');
}

function removeContainer(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function deleteFromStorage(event) {
  var $idNum = Number(idNum);
  var $storageForRemoval = localStorage.getItem('painting-storage');
  var $parsed = JSON.parse($storageForRemoval);
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].id === $idNum) {
      data.entries.splice(i, 1);
      if ($parsed !== null) {
        $parsed.entries.splice(i, 1);
        window.addEventListener('beforeunload', function () {
          localStorage.setItem('painting-storage', JSON.stringify($parsed));
        });
      }
      data.nextEntryId--;
    }
  }
  removeContainer($viewImageContainer);
  removeContainer($viewFullContainer);
  $viewFullContainer.remove();
  goToView();
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
    generateWeatherContent(xhr.response);
  });
  xhr.send();
}

function generateWeatherContent(response) {
  if (response.cod === '404') {
    $weatherPage.prepend($errorContainer);
    var notFound = document.createElement('h1');
    notFound.className = 'row center';
    notFound.textContent = 'City not found, please try again.';
    $errorContainer.appendChild(notFound);
    $backButtonContainer.className = 'button-container row center';
    $weatherSaveButton.remove();
  } else {
    var cityTemp = Math.trunc(response.main.temp);
    var weatherCondition = response.weather[0].main;
    $mainHeading.className = 'heading hidden';
    $weatherHeading.className = 'view';
    $weatherHeading.textContent = weatherCondition + '  ' + cityTemp + ' \u00B0F';
    $headingContainer.appendChild($weatherHeading);
    getArtWeather(weatherCondition);
    $weatherContainer.className = 'weather-container';
    $weatherPage.appendChild($weatherContainer);
    var $cityName = document.createElement('h1');
    $cityName.textContent = response.name;
    $cityName.className = 'row column-full center';
    $weatherContainer.prepend($cityName);
    var $moreText = document.createElement('h3');
    $moreText.className = 'row column-full center';
    $moreText.textContent = 'Current Weather Conditions:';
    $weatherContainer.appendChild($moreText);
    var $weatherRowContainer = document.createElement('div');
    $weatherRowContainer.className = 'row center';
    $weatherContainer.append($weatherRowContainer);
    var $iconContainer = document.createElement('div');
    $iconContainer.className = 'column-half';
    $weatherRowContainer.append($iconContainer);
    var $weatherIcon = document.createElement('i');
    $iconContainer.append($weatherIcon);
    var $conditionsContainer = document.createElement('div');
    $conditionsContainer.className = 'column-half';
    $weatherRowContainer.append($conditionsContainer);
    var newCityTemp = document.createElement('h2');
    newCityTemp.textContent = cityTemp + ' \u00B0F';
    $conditionsContainer.appendChild(newCityTemp);
    var newCityWeather = document.createElement('h2');
    newCityWeather.textContent = weatherCondition;
    $conditionsContainer.appendChild(newCityWeather);
    if (weatherCondition === 'Clouds') {
      $headerColor.className = 'header clouds';
      $weatherIcon.className = 'fas fa-cloud fa-7x';
      $weatherContainer.style.color = 'white';
    } else if (weatherCondition === 'Clear') {
      $headerColor.className = 'header clear';
      $weatherIcon.className = 'fas fa-sun fa-7x';
      $weatherContainer.style.color = 'rgb(255, 227, 70)';
    } else if (weatherCondition === 'Snow') {
      $headerColor.className = 'header snow';
      $weatherIcon.className = 'far fa-snowflake fa-7x';
      $weatherContainer.style.color = 'rgb(156, 156, 253)';
    } else if (weatherCondition === 'Rain') {
      $headerColor.className = 'header rain';
      $weatherIcon.className = 'fas fa-cloud-showers-heavy fa-7x';
      $weatherContainer.style.color = 'rgba(125, 125, 255, 0.986)';
    } else {
      $headerColor.className = 'header normal';
    }
    $backButtonContainer.appendChild($weatherSaveButton);
    $weatherSaveButton.className = 'weather-save-button';
    $weatherSaveButton.textContent = 'Save Image';
    $backButtonContainer.className = 'button-container row space';
  }
  $weatherPage.appendChild($backButtonContainer);
  $weatherBackButton.className = 'back-button';
  $weatherBackButton.textContent = 'Back';
  $backButtonContainer.prepend($weatherBackButton);
  $form.reset();
}

function getArtWeather(weather) {
  if (weather === 'Clear') {
    weather = 'Sun';
  }
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&ps=100&imgonly=true&type=painting&q=' + weather);
  xhr2.responseType = 'json';
  xhr2.addEventListener('load', function () {
    generateWeatherPicture(xhr2.response);
  });
  xhr2.send();
}

function generateWeatherPicture(response) {
  var i = Math.floor(Math.random() * response.artObjects.length);
  $newPic = response.artObjects[i].webImage.url;
  $newPicTitle = response.artObjects[i].title;
  $newArtistName = response.artObjects[i].principalOrFirstMaker;
  $newPicAlt = $newPicTitle + ' ' + 'by' + ' ' + $newArtistName;
  $randomBackground.setAttribute('src', $newPic);
  $randomBackground.setAttribute('alt', $newPicAlt);
  $backgroundPic.prepend($randomBackground);
  $weatherImageContainer.className = 'image-container';
  $weatherPage.prepend($weatherImageContainer);
  var $newImage = document.createElement('img');
  $newImage.setAttribute('src', $newPic);
  $newImage.setAttribute('alt', $newPicAlt);
  $newImage.className = 'main-pic';
  $weatherImageContainer.prepend($newImage);
  var $newImageTitle = document.createElement('h4');
  $newImageTitle.textContent = $newPicTitle;
  $weatherImageContainer.appendChild($newImageTitle);
  var $newImageArtist = document.createElement('div');
  $newImageArtist.textContent = $newArtistName;
  $weatherImageContainer.appendChild($newImageArtist);
}

function saveImageData(event) {
  var $pictureData = {
    imageUrl: $newPic,
    title: $newPicTitle,
    artist: $newArtistName,
    id: data.nextEntryId
  };
  data.entries.unshift($pictureData);
  data.nextEntryId++;
  $popUpSave.textContent = 'Image Saved!';
  $popUpSave.className = 'saved';
  $weatherPage.appendChild($popUpSave);
  window.setTimeout(function () {
    closePopUp();
  }, 2000);

}

function closePopUp() {
  $popUpSave.className = 'hidden';
}
