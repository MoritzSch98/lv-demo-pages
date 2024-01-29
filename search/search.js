//Execute new Query through Page reload
function appendQueryToUrl(){
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("q",document.getElementById('search-input').value);
    this.window.location.search = urlParams;
}

//Listen if enter was pressed to execute new query
function submitQueryListener(){
    const input = document.getElementById("search-input");

    //Listen on Enter for next search to be executed
    input.addEventListener("keypress", function(event) {
       if (event.key === "Enter") {
           if(input.value == ""){
               console.log("No Search Input");
           }else{
               appendQueryToUrl();
           }
       }
   });
}


//A new query was entered, now getting the results
function getResults(){
    //Get Query from URL
    const searchTerm = new URLSearchParams(window.location.search).get('q');
    
    //Put Query in the search bar
    var input = document.getElementById('search-input');
    input.value = searchTerm;

    //Define things for calling results
    var q = searchTerm;
    var limit = 10;

    //Functions to load results. Organic and Ad Results
    organic(q, limit);
    getAds(searchTerm); 
}



//Pagination - not so good, make better soon
function activatePage(number){
    //Scroll to top after pagination hit
    window.scrollTo({ top: 0, behavior: 'smooth' });

    //Make new page active
    document.getElementsByClassName('active')[0].classList.remove('active');
    document.getElementById('page-'+number).classList.add('active');
    
    //See if necessary to add more pages
    if(document.getElementById('page-'+(number+1)) == null){
        const pagination = document.getElementById('pagination');
        const page = document.createElement('a');
        page.setAttribute("id","page-"+(number+1));
        page.setAttribute("onclick","activatePage("+(number+1)+")");
        page.innerHTML = (number+1);
        pagination.appendChild(page);

    }

    //Execute Search for this page
    organic(page, keyword, lang, region);
}


//Security functions
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}


//--------------------------------------Executives --------------------------------------
submitQueryListener();
getResults();


 
 