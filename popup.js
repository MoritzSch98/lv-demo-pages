
let page = document.getElementById('buttonDiv');
const kButtonColors = ['transparent','#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
        changeColor();
      })
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);


function changeColor(){
  chrome.storage.sync.get('color', function(data) {
    let color = data.color;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  });
}
