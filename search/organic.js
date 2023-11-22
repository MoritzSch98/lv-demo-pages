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

//Show results with new implementation
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