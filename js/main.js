var $getWeatherPage = document.querySelector('.get-weather');
var $backButton = document.querySelector('.back-button');
var $backgroundPic = document.querySelector('.background-pic');
var $goButton = document.querySelector('.go-button');
var $getButton = document.querySelector('.get-button');
var $viewButton = document.querySelector('.view-button');
var $homePage = document.querySelector('.homepage');
var $viewPage = document.querySelector('.viewpage');
var $viewBackButton = document.createElement('button');

$getButton.addEventListener('click', goToGet);
$backButton.addEventListener('click', goBack);
$viewBackButton.addEventListener('click', goBack);
$goButton.addEventListener('click', goForward);
$viewButton.addEventListener('click', goToView);

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
}
function goForward(event) {
  $getWeatherPage.className = 'get-weather hidden';
}
