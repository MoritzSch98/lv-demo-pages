//Execute Search for Organic Results
function organic(q, limit) {

    //Settings for the Bing Web Search API
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://real-time-web-search.p.rapidapi.com/search?q='+q+'&limit='+limit,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e93bb20affmshb4690e90271a7afp19cffbjsn08a3f2c7d60d',
            'X-RapidAPI-Host': 'real-time-web-search.p.rapidapi.com'
        }
    };


    //Ensure that query can not be empty
    if(q != ""){

        //Execute Query
        $.ajax(settings)
        .done(function (response) {
            displayResults(response.data);
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
    console.log(results);
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    results.forEach(function(result, index) {
        if(result.title != "" && result.snippet != ""){     
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <a id="ad-link" href="${result.url}}" target="_blank">
                    <p>${escapeHtml(result.url)}</p>
                    <h3>${escapeHtml(result.title)}</h3>
                    <p>${escapeHtml(result.snippet)}</p>
                </a>
            `;
            resultsContainer.appendChild(resultElement);
        }
    });
}  