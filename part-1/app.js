const baseURL = "http://numbersapi.com";
const factTypes = ["math", "trivia", "date", "year"]
let rangeNumberFactsArr = [];
let favoriteNumberFactsArr = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Range Number Facts
function rangeNumberFacts(minNum, maxNum) {
    /* 
    Calls api to get response with data for range of numbers
    */
    return axios.get(`${baseURL}/${minNum}..${maxNum}`);
};

rangeNumberFactsArr.push(rangeNumberFacts(1, 5));

Promise.all(rangeNumberFactsArr)
    /*
    If promise response is fufilled, then function is called to generate HTML for fact.
    If there is an error, browser will alert user that something is wrong
    */
    .then(factsArray => { 
        factsArray.map((fact, index) => {
            Object.entries(fact.data).forEach(([key, value]) => {
                generateFactHTML(value);
            });
        });
    })
    .catch(err => {
        alert("Something went wrong.");
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Favorite Number Facts
function favoriteNumberFacts(number, fact) {
    /*
    Calls api to get response with data for favorite numbers. 
    */
    return axios.get(`${baseURL}/${number}/${fact}?json`);
};
factTypes.forEach(function(fact) {
    // Loops through different types of facts from array, factTypes, and adds response to favoriteNumberFactsArr
    favoriteNumberFactsArr.push(favoriteNumberFacts(10, fact));
});

Promise.all(favoriteNumberFactsArr)
   /*
    If promise response is fufilled, then function is called to generate HTML for fact.
    If there is an error, browser will alert user that something is wrong
    */
    .then(factsArray => { 
        factsArray.map(fact => generateFactHTML(fact.data.text));
    })
    .catch(err => {
        alert("Something went wrong.");
    }) 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HTML Generator Function for Facts
function generateFactHTML(fact) {
    /* 
    Generates HTML for each fact generated in different arrays and appends to list
    */
    let $listOfFacts = $("#list_facts");
    let $fact = $("<li>");

    $listOfFacts.append($fact);
    $fact.html(`${fact}`);
}

    



