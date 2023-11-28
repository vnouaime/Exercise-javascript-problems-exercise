const baseURL = "https://deckofcardsapi.com/api/deck";
const $draw_card_button = $("#draw_card_button");
const $cards = $("#cards")

// Used to set deckID if there is one
let deckID;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Draw one Card From Newly Shuffled Deck
function drawCard() {
    /*
    Draws a shuffled card from a newly created shuffled deck.
    */

    return axios.get(`${baseURL}/new/draw/?count=1`)
}

drawCard()
    /* 
    If promise is fuflilled, returns value and suit of drawed card. 
    If there is an error, browser will console.log the error message. 
    */
    .then(response => {
        let answer = response.data.cards.forEach(index => console.log(`${index.value} of ${index.suit.toLowerCase()}`))
        
    })
    .catch(err => {
        console.log(err)
    })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Draw Multiple Cards From Newly Shuffled Deck
function createNewDeck() {
    /*
    Draws a card from a newly created shuffled deck.
    */
    return axios.get(`${baseURL}/new/draw/?count=1`)
    
}

function drawNewCard(deckID) {
    /*
    Draws a card from an existing deck.
    */
    return axios.get(`${baseURL}/${deckID}/draw/?count=1`)
}


$draw_card_button.on("click", function() {
    /* 
    When card button is clicked, deckID is checked to see if there is a game in progress. If there is, card is drawn from same pile. If there is not a game in progress, new deck is created and card is drawn from there.
    */

    if (!deckID) {
        createNewDeck()
            .then(response => {
                deckID = response.data.deck_id;
                generateCardHTML(response.data)
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        drawNewCard(deckID)
            .then(response => {
                generateCardHTML(response.data)
                if (response.data.remaining === 0) {
                    $draw_card_button.remove()
                } 
            })
            .catch(err => {
                console.log(err);
            });
        }        
})

function generateCardHTML(cardData) {
    /*
    Generates HTML for each card.
    */

    let $div = $("<div>")
    let $img = $("<img>")

    $div.addClass("card")
    $img.addClass("card_image")  
     
    $cards.append($div)
    $div.append($img)
    $img.attr("src", cardData.cards[0].image)

    
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;

    $img.css({
        "transform": `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
    })

    
}
