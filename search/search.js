//--------------------------------------Functions--------------------------------------

//Execute new Query through Page reload
function newQuery(){
    window.location.href= "./?q="+document.getElementById('search-input').value;
}

//Get Ads from Linkvertise
function ads(query){
    const ads = [
        {"url": "https://google.com", "title": "1 Google is very cool!", "description": "This is a very good ad from google, hopefully you will use it carefully."},
        {"url": "https://google.com", "title": "2 Google is very cool!", "description": "This is a very good ad from google, hopefully you will use it carefully."},
        {"url": "https://google.com", "title": "3 Google is very cool!", "description": "This is a very good ad from google, hopefully you will use it carefully."}
    ];
    const script = document.createElement("script");
    script.async = true;
    script.src ="../serp/serp-script.js";
    script.id="ads";
    script.setAttribute("data-integrationId", "123");
    script.setAttribute("data-ad-number",'3');
    script.setAttribute("data-keyword",query);
    script.setAttribute("data-jsonp",displayAds(ads));
}

//Execute Search for Organic Results
function search(number) {

    //Settings for the Bing Web Search API
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://bing-web-search4.p.rapidapi.com/bing-search',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'e93bb20affmshb4690e90271a7afp19cffbjsn08a3f2c7d60d',
            'X-RapidAPI-Host': 'bing-web-search4.p.rapidapi.com'
        },
        data: JSON.stringify({
            keyword: query,
            page: number,
            lang: 'en',
            region: 'us'
        })
    };

    //Ensure that query can not be empty
    if(query != ""){

        //Execute Query
        $.ajax(settings)
        .done(function (response) {
            displayResults(response.search_results);
        })
        .fail(function (error) {
            console.error('API-Fehler:', error);
        });
    }else{
        console.log("No Search Input");
    }   
}

//Paginator Function to get the next active page
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
    search(number);
}

//Show Ads
function displayAds(ads){
    const adsContainer = document.getElementById('ad-results');
    adsContainer.innerHTML = '';

    ads.forEach(function(ad, index) {
        if(ad.title != "" && ad.description != ""){     
            const adElement = document.createElement('div');
            adElement.classList.add('ad');
            adElement.innerHTML = `<p><a href="${ad.url}" target="_blank">${escapeHtml(ad.url)}</a></p><h3><a href="${ad.url}" target="_blank">${escapeHtml(ad.title)}</a></h3><p>${escapeHtml(ad.description)}</p>`;
            adsContainer.appendChild(adElement);
        }
    });
}

//Show results
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    results.forEach(function(result, index) {
        if(result.title != "" && result.caption != ""){     
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `<p><a href="${result.url}" target="_blank">${escapeHtml(result.url)}</a></p><h3><a href="${result.url}" target="_blank">${escapeHtml(result.title)}</a></h3><p>${escapeHtml(result.caption)}</p>`;
            resultsContainer.appendChild(resultElement);
        }
    });
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

//Execute initial search
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('q');
 var input = document.getElementById('search-input');
 input.value = query;
 search(1);
 ads(query);


 //Listen on Enter for next search to be executed
 input.addEventListener("keypress", function(event) {
     if (event.key === "Enter") {
         if(input.value == ""){
             console.log("No Search Input");
         }else{
             newQuery();
         }
     }
 });
 