setBackground();
showFirstBookmarks();


document.getElementById('link').addEventListener("click", function(){
  resetButtons();
});

document.getElementById('revert').addEventListener("click", function(){
  chrome.storage.sync.get('oldbg', function(data){
    var old = data.oldbg;
    chrome.storage.sync.set({bgimage: old}, function() {
          console.log("The old background was recovered");
          document.getElementById('url-input').value = "";
          setBackground();
          document.getElementById('image-message').style.display = 'none';
          toggleButtons();
    });
  });
});

document.getElementById('submit').addEventListener("click", function(){
  var url = document.getElementById('url-input').value;
  var valid = validateImage(url);
  if(valid == true){
    document.getElementById('image-message').innerHTML = "Was your background changed properly."
    +" If it wasn't, please click the reset button below. Otherwise click the finish button.";
    document.getElementById('image-message').classList.remove("alert-danger");

    toggleButtons();
    //Set the old Background as safety
    chrome.storage.sync.get('bgimage', function(data){
      var old = data.bgimage;
      chrome.storage.sync.set({oldbg: old}, function(){
        //Set the new Background Image, after old
        chrome.storage.sync.set({bgimage: url}, function() {
              console.log("The Background-URL was sucessfully saved under "+ url);
              document.getElementById('url-input').value = "";
              setBackground();
              document.getElementById('image-message').classList.add("alert-warning");
              document.getElementById('image-message').style.display = 'block';
        });
      });
    });

  }else{
    document.getElementById('image-message').innerHTML = "Your input image wasn't correct, we stayed with the old one. Please retry!";
    document.getElementById('image-message').classList.add("alert-danger");
    document.getElementById('image-message').style.display = 'block';
  }

});

function setBackground(){
  chrome.storage.sync.get('bgimage', function(data){
    var bgimage = 'url('+data.bgimage+')';
  document.getElementById('body').style.backgroundImage = bgimage;
  });
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
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }else{
    return false;
  }
}

// Bookmarks under the screen
function showFirstBookmarks() {
  var count = 0;
  chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
    count++;
    console.log(count);
    var bookmarks = bookmarkTreeNodes[0].children;
    console.log(bookmarks);
    printBookmarks(bookmarks);
  });
}

function printBookmarks(bookmarks, count) {
  var count = 4;
  bookmarks.forEach(function(bookmark) {
    if (bookmark.url != null && count > 0) {
      count = count - 1;
      
      if(document.querySelectorAll("#bookmark-body").length >= 4){
        return;
      }
      
      // Build the title
      var title = document.createElement("div");
      title.id = "bookmark-title";
      var truncatedTitle;
      if(bookmark.title.length > 15){
        truncatedTitle = bookmark.title.substring(0, 15)+"...";
      }else{
        truncatedTitle = bookmark.title;
      }
      
      title.innerHTML = "<span>" + truncatedTitle + "</span>";

      // Build titleholder
      var titleholder = document.createElement("div");
      titleholder.classList.add("d-flex");
      titleholder.classList.add("justify-content-center");
      titleholder.appendChild(title);

      // Build the icon
      var icon = document.createElement("img");
      icon.id = "bookmark-icon";
      icon.src = getFavicon(bookmark.url);

      // Build iconholder around icon
      var iconholder = document.createElement("div");
      iconholder.id = "bookmark";
      iconholder.classList.add("d-flex");
      iconholder.classList.add("justify-content-center");
      iconholder.classList.add("align-items-center");
      iconholder.appendChild(icon);

      // Build dummy holder for bookmark to make centering possible
      var dummy = document.createElement("div");
      dummy.classList.add("d-flex");
      dummy.classList.add("justify-content-center");
      dummy.appendChild(iconholder);

      // Build Bookmark link
      var link = document.createElement('a');
      link.href = bookmark.url;
      link.appendChild(dummy);
      link.appendChild(titleholder);

      // Build Bookmark body
      var body = document.createElement("div");
      body.classList.add("col-md-3");
      body.id = "bookmark-body";
      body.appendChild(link);

      document.getElementById('top-bookmarks').appendChild(body);
    }

    if (bookmark.children && count != 0) {
      printBookmarks(bookmark.children);
    }
  });
}


function getFavicon(url){
  var parser = document.createElement('a');
  parser.href = url;
  var favicon = "https://"+parser.hostname+"/favicon.ico";

  return favicon;
}
