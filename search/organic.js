//Execute Search for Organic Results
function organic(page,keyword,lang,region) {

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
            keyword,
            page,
            lang,
            region,
        })
    };

    //Ensure that query can not be empty
    if(keyword != ""){

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

//Show results
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    results.forEach(function(result, index) {
        if(result.title != "" && result.caption != ""){     
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <a href="${result.url}}" target="_blank">
                    <p>${escapeHtml(result.url)}</p>
                    <h3>${escapeHtml(result.title)}</h3>
                    <p>${escapeHtml(result.caption)}</p>
                </a>
            `;
            resultsContainer.appendChild(resultElement);
        }
    });
}


//Show Ads
function displayAds(ads){
    //Create Ad Container
    const adsContainer = document.getElementById('ad-results');
    adsContainer.innerHTML = '';
    //Loop ads and append them to container
    ads.forEach(ad => {
        //Create Ad Result Element
        const adElement = document.createElement('div');
        adElement.classList.add('ad');
        adElement.innerHTML = `
            <a href="${ad.clickout_url}" target="_blank">
                <div id="ad-header">
                    <img src=${escapeHtml(ad.thumbnail_url)}>
                    <p>${escapeHtml(ad.target_url)}</p>
                </div>
                <h3>${escapeHtml(ad.title)} - ${escapeHtml(ad.call_to_action)}</h3>
                <p>${escapeHtml(ad.description)}</p>
            </a>
        `;
        //Append ad to container
        adsContainer.appendChild(adElement);
    });
}