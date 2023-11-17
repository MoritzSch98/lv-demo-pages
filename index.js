document.getElementById('link').addEventListener("click", function(){
  resetButtons();
});

document.getElementById('material-search').addEventListener('click', performSearch);
document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = document.getElementById('search-input').value;
    if (query) {
        window.location.href = `./search/?q=${encodeURIComponent(query)}`;
    } else {
        document.getElementById('material-search').classList.add('shake');
        setTimeout(() => {
            document.getElementById('material-search').classList.remove('shake');
        }, 400);
        document.getElementById('search-input').focus();
    }
}

document.getElementById('revert').addEventListener("click", function(){
  var old = localStorage.getItem('oldbg');
  localStorage.setItem('bgimage', old);
  console.log("The old background was recovered");
  document.getElementById('url-input').value = "";
  setBackground();
  document.getElementById('image-message').style.display = 'none';
  toggleButtons();
});

document.getElementById('reset').addEventListener("click", function(){
  var old = localStorage.getItem('oldbg');
  localStorage.setItem('bgimage', old);
  console.log("The old background was recovered");
  document.getElementById('url-input').value = "";
  setBackground();
  document.getElementById('image-message').style.display = 'none';
});

document.getElementById('submit').addEventListener("click", function(){
  var url = document.getElementById('url-input').value;
  var valid = validateImage(url);
  if(valid == true){
    document.getElementById('image-message').innerHTML = "Was your background changed properly."
    +" If it wasn't, please click the reset button below. Otherwise click the finish button.";
    document.getElementById('image-message').classList.remove("alert-danger");

    toggleButtons();
    
    var old = localStorage.getItem('bgimage');
    localStorage.setItem('oldbg', old);

    localStorage.setItem('bgimage', url);
    console.log("The Background-URL was successfully saved under " + url);
    
    document.getElementById('url-input').value = "";
    setBackground();
    document.getElementById('image-message').classList.add("alert-warning");
    document.getElementById('image-message').style.display = 'block';
  } else {
    document.getElementById('image-message').innerHTML = "Your input image wasn't correct, we stayed with the old one. Please retry!";
    document.getElementById('image-message').classList.add("alert-danger");
    document.getElementById('image-message').style.display = 'block';
  }
});

function setBackground() {
  var bgimage = localStorage.getItem('bgimage');

  if (!bgimage) {
    // Set default URL if bgimage is empty
    bgimage = 'images/wallpaper/background-3.jpg';
    localStorage.setItem('bgimage','images/wallpaper/background-3.jpg');
  }

  document.getElementById('body').style.backgroundImage = 'url(' + bgimage + ')';
}

function resetButtons(){
  document.getElementById('revert').style.display = 'none';
  document.getElementById('finish').style.display = 'none';
  document.getElementById('submit').style.display = 'block';
  document.getElementById('modal-body').style.display = 'block';
  document.getElementById('image-message').style.display = 'none';
}

function toggleButtons(){
  var rev = window.getComputedStyle(document.getElementById('revert')).display === "block";
  if(rev === true){
      document.getElementById('revert').style.display = 'none';
      document.getElementById('finish').style.display = 'none';
      document.getElementById('submit').style.display = 'block';
      document.getElementById('modal-body').style.display = 'block';
  }else{
    document.getElementById('revert').style.display = 'block';
    document.getElementById('finish').style.display = 'block';
    document.getElementById('submit').style.display = 'none';
    document.getElementById('modal-body').style.display = 'none';
  }
}

function validateImage(str){
  if(str.includes(".png") || str.includes(".jpg")){
    var pattern = new RegExp('^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
  } else {
    return false;
  }
}

function getFavicon(url){
  var parser = document.createElement('a');
  parser.href = url;
  var favicon = "https://" + parser.hostname + "/favicon.ico";

  return favicon;
};

setBackground();
