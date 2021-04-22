var $backgroundPic = document.querySelector('.background-pic');
var $loader = document.querySelector('.loader');
var $loading = document.querySelector('.loading');
var $getWeatherPage = document.querySelector('.get-weather');
var $headingContainer = document.querySelector('.heading-container');
var $headerColor = document.querySelector('.header');
var $mainHeading = document.querySelector('.heading');
var $mainContainer = document.querySelector('.main-container');
var $homePage = document.querySelector('.homepage');
var $viewPage = document.querySelector('.viewpage');
var $weatherPage = document.querySelector('.weatherpage');
var $backButton = document.querySelector('.back-button');
var $form = document.querySelector('.city-form');
var $goButton = document.querySelector('.go-button');
var $getButton = document.querySelector('.get-button');
var $viewButton = document.querySelector('.view-button');
var $searchCity = document.querySelector('.search-city');
var $randomButton = document.querySelector('.random-button');
var $randomPage = document.querySelector('.randompage');
var $viewSaved = document.querySelector('.view-saved');
var $mainHeader = document.querySelector('.main-header');
var $appTitle = document.querySelector('.app-title');

var $heartContainer = document.createElement('a');
var $viewPageHeader = document.createElement('h1');
var $weatherHeading = document.createElement('h1');
var $randomBackground = document.createElement('img');
var $newImage = document.createElement('img');
var $backButtonContainer = document.createElement('div');
var $errorContainer = document.createElement('div');
var $weatherContainer = document.createElement('div');
var $imageContainer = document.createElement('div');
var $weatherImageContainer = document.createElement('div');
var $viewImageContainer = document.createElement('div');
var $viewFullContainer = document.createElement('div');
var $deleteButton = document.createElement('button');
var $smallHeart = document.createElement('i');
var $bigHeart = document.createElement('i');
var $overlay = document.createElement('div');
var $viewFullImage = document.createElement('img');
var $infoContainer = document.createElement('div');
var $popUp = document.createElement('div');
var $errorOverlay = document.createElement('div');

var newPic;
var newPicTitle;
var newArtistName;
var newPicAlt;
var idNum;
var index;
$heartContainer.className = 'save-button';

$getButton.addEventListener('click', goToGet);
$backButton.addEventListener('click', goBack);
$goButton.addEventListener('submit', submitCity);
$form.addEventListener('submit', submitCity);
$viewButton.addEventListener('click', goToView);
$viewSaved.addEventListener('click', goToView);
$smallHeart.addEventListener('click', saveImageData);
$viewImageContainer.addEventListener('click', viewImage);
$deleteButton.addEventListener('click', deleteImage);
$randomButton.addEventListener('click', getRandomImage);
$overlay.addEventListener('click', backToView);
$errorOverlay.addEventListener('click', goBack);

// Generate a specific image for homepage background: //
homePageBackground();
function homePageBackground() {
  $randomBackground.setAttribute('src', 'https://lh4.ggpht.com/HjpfCsR3sxYtz486QQYsgAnCDVHRtJ3eZsESB_ZCpfDS-msLE9Ty7dri1JQr-ERBGXQwuf0b3Ta5cwtEOVuXvFCiS0c=s0');
  $backgroundPic.prepend($randomBackground);
}

// Submit form to get weather by city name //
function submitCity(event) {
  event.preventDefault();
  var cityWeather = event.target.elements.cityName.value;
  getWeather(cityWeather);
  goToWeather();
}

// Go to the Get Weather Page //
function goToGet(event) {
  $mainContainer.className = 'main-container content-wrap';
  $appTitle.className = 'app-title hidden';
  getArtData('snow');
  $headerColor.className = 'header normal';
  $getWeatherPage.className = 'get-weather view';
  $homePage.className = 'homepage hidden';
}

// Go to the View Saved Images Page //
function goToView(event) {
  removeContainer($imageContainer);
  removeContainer($infoContainer);
  removeContainer($weatherContainer);
  removeContainer($weatherImageContainer);
  removeContainer($errorOverlay);
  $weatherPage.className = 'weatherpage hidden';
  $appTitle.className = 'app-title hidden';
  $viewSaved.className = 'hidden';
  $headerColor.className = 'header hidden';
  $weatherHeading.className = 'hidden';
  $getWeatherPage.className = 'get-weather hidden';
  $mainContainer.className = 'main-container content-wrap';
  $headerColor.className = 'heading normal';
  $mainHeading.className = 'heading hidden';
  $headingContainer.prepend($viewPageHeader);
  $viewPageHeader.className = 'view normal';
  $viewPageHeader.textContent = 'Saved Images';
  changeBackground('autumn');
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
}

function backToView(event) {
  removeContainer($viewFullContainer);
  $overlay.className = 'hidden';
}
function viewImage(event) {
  var closestId = event.target.closest('img');
  if (closestId !== null) {
    idNum = closestId.getAttribute('data-id');
    var paintingInfo = closestId.getAttribute('alt');
    $viewPage.prepend($viewFullContainer);
    $viewFullContainer.className = 'view-one';
    var imageUrl = closestId.getAttribute('src');
    $viewFullImage.setAttribute('src', imageUrl);
    $viewFullImage.className = 'view-full';
    $viewFullContainer.append($viewFullImage);
    var $paintingInfo = document.createElement('h3');
    $paintingInfo.textContent = paintingInfo;
    $viewFullContainer.append($paintingInfo);
    $viewFullContainer.append($deleteButton);
    $deleteButton.className = 'delete-button';
    $deleteButton.textContent = 'Delete Image';
    $viewImageContainer.prepend($overlay);
    $overlay.className = 'overlay';
  }
}

function changeBackground(weather) {
  var xhr = new XMLHttpRequest();
  $loader.className = 'loader';
  xhr.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&ps=100&imgonly=true&type=painting&q=' + weather);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    generateRandomBackground(xhr.response);
    $loader.className = 'loader hidden';
  });
  xhr.addEventListener('error', () => loadError());
  xhr.send();
}

function generateRandomBackground(response) {
  var i = Math.floor(Math.random() * response.artObjects.length);
  var newPic = response.artObjects[i].webImage.url;
  var newPicAlt = response.artObjects[i].title;
  $newImage.setAttribute('src', newPic);
  $newImage.setAttribute('alt', newPicAlt);
  $randomBackground.setAttribute('src', newPic);
  $randomBackground.setAttribute('alt', newPicAlt);
}

// Gets an image for the Get Weather Page //
function getArtData(weather) {
  var xhr = new XMLHttpRequest();
  $loader.className = 'loader';
  xhr.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&ps=100&imgonly=true&type=painting&q=' + weather);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    generateGetWeatherPage(xhr.response);
  });
  xhr.addEventListener('error', () => loadError());
  xhr.send();
}

function getRandomImage() {
  var xhr = new XMLHttpRequest();
  $loader.className = 'loader';
  xhr.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&ps=100&imgonly=true&type=painting&toppieces=true');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    generateRandomImage(xhr.response);
  });
  xhr.addEventListener('error', () => loadError());
  xhr.send();

}
function generateGetWeatherPage(response) {
  index = Math.floor(Math.random() * response.artObjects.length);
  var newPic = response.artObjects[index].webImage.url;
  var newPicAlt = response.artObjects[index].title;
  $randomBackground.setAttribute('src', newPic);
  $randomBackground.setAttribute('alt', newPicAlt);
  $backgroundPic.prepend($randomBackground);
  $loader.className = 'loader hidden';
}

function generateRandomImage(response) {
  var i = Math.floor(Math.random() * response.artObjects.length);
  $mainHeading.className = 'heading';
  $appTitle.className = 'app-title hidden';
  newPic = response.artObjects[i].webImage.url;
  newPicTitle = response.artObjects[i].title;
  newArtistName = response.artObjects[i].principalOrFirstMaker;
  newPicAlt = newPicTitle + ' ' + 'by' + ' ' + newArtistName;
  $mainContainer.className = 'main-container content-wrap';
  $headerColor.className = 'header normal';
  $mainHeader.textContent = 'Random Painting';
  $homePage.className = 'homepage hidden';
  $randomPage.className = 'randompage';
  var $infoContainerColumnMost = document.createElement('div');
  var $infoContainerColumnSome = document.createElement('div');
  $imageContainer.className = 'image-container';
  $randomPage.prepend($imageContainer);
  $newImage.setAttribute('src', newPic);
  $newImage.setAttribute('alt', newPicAlt);
  $newImage.className = 'main-pic';
  $imageContainer.prepend($newImage);
  $infoContainer.className = 'row';
  $imageContainer.append($infoContainer);
  $infoContainerColumnMost.className = 'column-most';
  $infoContainer.prepend($infoContainerColumnMost);
  var $newImageTitle = document.createElement('h4');
  $newImageTitle.textContent = response.artObjects[i].title;
  $infoContainerColumnMost.appendChild($newImageTitle);
  var $newImageArtist = document.createElement('div');
  $newImageArtist.textContent = response.artObjects[i].principalOrFirstMaker;
  $infoContainerColumnMost.appendChild($newImageArtist);
  $infoContainer.appendChild($infoContainerColumnSome);
  $infoContainerColumnSome.className = 'column-some';
  $infoContainerColumnSome.append($heartContainer);
  $heartContainer.className = 'save-button';
  $heartContainer.appendChild($smallHeart);
  $smallHeart.className = 'far fa-heart heart';
  $loader.className = 'loader hidden';
}

function goBack(event) {
  $appTitle.className = 'app-title';
  $viewSaved.className = 'view-saved';
  $mainContainer.className = 'main-container';
  $getWeatherPage.className = 'get-weather hidden';
  $homePage.className = 'homepage view';
  $viewPage.className = 'viewpage hidden';
  $weatherPage.className = 'weatherpage hidden';
  $mainHeader.textContent = 'Get Weather';
  $headerColor.className = 'header normal';
  $viewPageHeader.className = 'hidden';
  $mainHeading.className = 'heading view';
  removeContainer($weatherContainer);
  removeContainer($weatherImageContainer);
  removeContainer($viewImageContainer);
  removeContainer($viewFullContainer);
  removeContainer($errorContainer);
  removeContainer($imageContainer);
  removeContainer($infoContainer);
  removeContainer($errorOverlay);
  removeContainer($popUp);
  $errorOverlay.className = 'hidden';
  $headerColor.className = 'header hidden';
  $weatherHeading.className = 'hidden';
  $overlay.className = 'hidden';
  homePageBackground();
}

function removeContainer(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function deleteImage(event) {
  var idNumber = Number(idNum);
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].id === idNumber) {
      data.entries.splice(i, 1);
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
  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=8e56c099331856fb966227282999fa5c');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    generateWeatherContent(xhr.response);
  });
  xhr.addEventListener('error', () => loadError());
  xhr.send();
}

function generateWeatherContent(response) {
  if (response.cod === '404') {
    $getWeatherPage.className = 'get-weather view';
    $searchCity.textContent = 'City not found. Please try again.';
    $backButtonContainer.className = 'button-container row center';
    window.setTimeout(function () {
      errorMessage();
    }, 2500);
  } else {
    var cityTemp = Math.trunc(response.main.temp);
    var weatherCondition = response.weather[0].main;
    var weatherHumidity = 'Humidity:' + ' ' + response.main.humidity + '%';
    var weatherDescription = response.weather[0].description;
    $mainHeading.className = 'heading hidden';
    $weatherHeading.className = 'view';
    $weatherHeading.textContent = weatherCondition + '  ' + cityTemp + ' \u00B0F';
    $headingContainer.prepend($weatherHeading);
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
    var $newCityDescription = document.createElement('h4');
    $newCityDescription.textContent = weatherDescription;
    $newCityDescription.className = 'capitalize';
    $iconContainer.appendChild($newCityDescription);
    var $conditionsContainer = document.createElement('div');
    $conditionsContainer.className = 'column-half';
    $weatherRowContainer.append($conditionsContainer);
    var $newCityTemp = document.createElement('h2');
    $newCityTemp.textContent = cityTemp + ' \u00B0F';
    $conditionsContainer.appendChild($newCityTemp);
    var $newCityWeather = document.createElement('h3');
    $newCityWeather.textContent = weatherCondition;
    $conditionsContainer.appendChild($newCityWeather);
    var $newCityHumidity = document.createElement('h4');
    $newCityHumidity.textContent = weatherHumidity;
    $conditionsContainer.appendChild($newCityHumidity);
    if (weatherCondition === 'Clouds') {
      $headerColor.className = 'header clouds';
      $weatherIcon.className = 'fas fa-cloud fa-7x';
      $weatherIcon.style.color = '#687179';
    } else if (weatherCondition === 'Clear') {
      $headerColor.className = 'header clear';
      $weatherIcon.className = 'fas fa-sun fa-7x';
      $weatherIcon.style.color = '#FAC934';
    } else if (weatherCondition === 'Snow') {
      $headerColor.className = 'header snow';
      $weatherIcon.className = 'far fa-snowflake fa-7x';
      $weatherIcon.style.color = '#FFFAFA';
    } else if (weatherCondition === 'Rain') {
      $headerColor.className = 'header rain';
      $weatherIcon.className = 'fas fa-cloud-showers-heavy fa-7x';
      $weatherIcon.style.color = '#224B8B';
    } else {
      $headerColor.className = 'header normal';
    }
  }
  $form.reset();
}

// Gets Image based on weather conditions in specified city //
function getArtWeather(weather) {
  if (weather === 'Clear') {
    weather = 'Sun';
  }
  var xhr = new XMLHttpRequest();
  $loader.className = 'loader';
  xhr.open('GET', 'https://www.rijksmuseum.nl/api/en/collection?key=TnIr6Ed8&ps=100&imgonly=true&type=painting&q=' + weather);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    generateWeatherPicture(xhr.response);
  });
  xhr.addEventListener('error', () => loadError());
  xhr.send();
}

function generateWeatherPicture(response) {
  var i = Math.floor(Math.random() * response.artObjects.length);
  newPic = response.artObjects[i].webImage.url;
  newPicTitle = response.artObjects[i].title;
  newArtistName = response.artObjects[i].principalOrFirstMaker;
  newPicAlt = newPicTitle + ' ' + 'by' + ' ' + newArtistName;
  $randomBackground.setAttribute('src', newPic);
  $randomBackground.setAttribute('alt', newPicAlt);
  $backgroundPic.prepend($randomBackground);
  $weatherImageContainer.className = 'image-container';
  $weatherPage.prepend($weatherImageContainer);
  var $newImage = document.createElement('img');
  var $infoContainerColumnMost = document.createElement('div');
  var $infoContainerColumnSome = document.createElement('div');
  $newImage.setAttribute('src', newPic);
  $newImage.setAttribute('alt', newPicAlt);
  $newImage.className = 'main-pic';
  $weatherImageContainer.prepend($newImage);
  $infoContainer.className = 'row';
  $weatherImageContainer.append($infoContainer);
  $infoContainerColumnMost.className = 'column-most';
  $infoContainer.prepend($infoContainerColumnMost);
  var $newImageTitle = document.createElement('h4');
  $newImageTitle.textContent = newPicTitle;
  $infoContainerColumnMost.appendChild($newImageTitle);
  var $newImageArtist = document.createElement('div');
  $newImageArtist.textContent = newArtistName;
  $infoContainerColumnMost.appendChild($newImageArtist);
  $infoContainer.appendChild($infoContainerColumnSome);
  $infoContainerColumnSome.className = 'column-some';
  $infoContainerColumnSome.append($heartContainer);
  $heartContainer.className = 'save-button';
  $heartContainer.appendChild($smallHeart);
  if ((add(data.entries, newPic) === null)) {
    $smallHeart.className = 'fas fa-heart heart';
    $smallHeart.style.color = 'rgb(236, 47, 63)';
  } else {
    $smallHeart.className = 'far fa-heart heart';
    $smallHeart.style.color = 'black';
  }
  $loader.className = 'loader hidden';
}
function add(array, imageUrl) {
  var found = array.some(item => item.imageUrl === imageUrl);
  if (!found) {
    return imageUrl;
  } else {
    return null;
  }
}
function saveImageData(event) {
  var $pictureData = {
    imageUrl: newPic,
    title: newPicTitle,
    artist: newArtistName,
    id: data.nextEntryId
  };
  if (add(data.entries, $pictureData.imageUrl) !== null) {
    data.entries.unshift($pictureData);
    data.nextEntryId++;
    $smallHeart.className = 'fas fa-heart heart';
    $smallHeart.style.color = 'rgb(236, 47, 63)';
    $loader.className = 'loader';
    $loader.append($bigHeart);
    $bigHeart.className = 'big-heart fas fa-heart fa-6x';
    $loading.className = 'loading hidden';
    window.setTimeout(function () {
      closePopUp();
    }, 1500);
  } else {
    $smallHeart.className = 'fas fa-heart heart';
  }
}

function closePopUp() {
  $loader.className = 'loader hidden';
  $bigHeart.className = 'hidden';
  $loading.className = 'loading';
}

function errorMessage() {
  $searchCity.textContent = 'Search by City';
}

function loadError() {
  $loader.className = 'loader hidden';
  $mainContainer.prepend($errorOverlay);
  $errorOverlay.className = 'error-overlay';
  $errorOverlay.append($popUp);
  $popUp.className = 'pop-up';
  $popUp.textContent = 'Oops Something Went Wrong. Please Try Again!';
}
