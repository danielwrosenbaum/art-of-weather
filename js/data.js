/* exported data */

var data = {
  entries: [],
  nextEntryId: 1
};

var $paintingStorage = localStorage.getItem('painting-storage');

if ($paintingStorage !== null) {
  data = JSON.parse($paintingStorage);
}
window.addEventListener('beforeunload', function () {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('painting-storage', dataJSON);
});
