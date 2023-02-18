function buttonClicked(clickedBtn, grid)
{
    switch(clickedBtn.value)
    {
        case '0':
            setupGame(8, grid);
            break;
        case '1':
            setupGame(12, grid);
            break;
        case '2':
            setupGame(16, grid);
            break;
    }
}

function setupGame(numberOfCards, gridSize)
{
    contentRemover();

    let gridsContainer = document.createElement('div');
    gridsContainer.className = gridSize;
    gridsContainer.id = 'gridsContainer';

    for (let i = 0; i < numberOfCards; i++)
    {
        let grid = document.createElement('div');
        grid.className = 'grid';

        let card = document.createElement('img');
        card.id = i;
        card.src = 'img/hide.png';
        card.className = 'card';

        card.addEventListener('click', () => {
            cardClicked(card);
        });

        grid.appendChild(card);
        gridsContainer.appendChild(grid);
    }

    cardsContainer.appendChild(gridsContainer);

    setupCards();
}

function setupCards()
{
    let cards = document.getElementsByClassName('card');

    let storingCards = [];

    for (const card of cards) {
        let cardDatas = {
            id: card.id,
            value: 0,
            visibility: "hide",
            status: 0
        };
        storingCards.push(cardDatas);
    }

    storingCards = setValues(storingCards);

    setStoredCardsDatas(storingCards);
}

function setValues(arr)
{
    let values = generateValues();

    for (let i = 0; i < arr.length; i++) 
    {
        arr[i].value = values[i];
    }


    return arr;
}

function generateValues()
{
    let cards = document.getElementsByClassName('card');

    let values = [];

    for (let i = 0; i < (cards.length / 2); i++) 
    {
        values.push(Math.floor(Math.random()*9)+1);
    }

    let checkValues = new Set(values);

    if (checkValues.size !== values.length)
    {
        return generateValues();
    }

    let duplicatedValues = [];

    for (let j = 0; j < values.length; j++) 
    {
        duplicatedValues.push(values[j]);
        if (duplicatedValues.length === values.length)
        {
            j = -1;
        }
    }

    console.log('Basic values!');

    console.log(values);

    console.log("Duplicate them!");

    console.log(duplicatedValues);

    console.log("Let's shuffle those values!");

    values = shuffleValues(duplicatedValues);
    
    console.log(values);

    return values;
}

function shuffleValues(arr)
{
    for (let i = 0; i < arr.length; i++)
    {
        let newIndex = Math.floor(Math.random()*arr.length);
        let temp = arr[newIndex];
        arr[newIndex] = arr[i];
        arr[i] = temp;
    }

    return arr;
}

function cardClicked(card) 
{
    setClickedCardVisibility(card.id);

    let amountOfVisibleCards = checkCardsVisibility();

    if (amountOfVisibleCards === 2)
    {
        setTimeout(() => {
            checkAreCardsArePair();
        }, 500);
    }
    else if (amountOfVisibleCards > 2)
    {
        hideCards();
    }
}

function setClickedCardVisibility(id)
{
    let amountOfVisibleCards = checkCardsVisibility();

    if (amountOfVisibleCards < 2)
    {
        let storedCards = getStoredCardsDatas();

        for (const card of storedCards) {
            if (card.id === id)
            {
                card.visibility = 'visible';
            }
        }

        setStoredCardsDatas(storedCards);

        showVisibleCards(id);
    }
}

function showVisibleCards(id)
{
    let storedCards = getStoredCardsDatas();

    let cardImage = document.getElementById(id);

    for (const card of storedCards) {
        if (id === card.id)
        {
            cardImage.src = 'img/card-'+card.value+'.png';
        }
    }
}

function checkCardsVisibility()
{
    let storedCards = getStoredCardsDatas();
    let counter = 0;
    for (const card of storedCards) {
        if (card.visibility === 'visible' && card.status !== 1)
        {
            counter++;
        }
    }

    return parseInt(counter);
}

function checkAreCardsArePair()
{
    let storedCards = getStoredCardsDatas();

    let visibleCards = [];

    for (const card of storedCards) {
        if (card.visibility === 'visible' && card.status !== 1)
        {
            visibleCards.push(card);
        }
    }

    if (visibleCards.length === 2)
    {
        if (visibleCards[0].value === visibleCards[1].value)
        {
            console.log('Pair!');
            cardsArePair(visibleCards[0], visibleCards[1]);
        }
        else
        {
            console.log('Not a pair!');
            cardsAreNotPair();
        }
    }
}

function cardsArePair(card1, card2)
{
    setCardsStatus(card1, card2);

    setScore();
}

function cardsAreNotPair()
{
    hideCards();
}

function setScore()
{
    let scoreCounter = document.getElementById('score');

    let storedCards = getStoredCardsDatas();

    let counter = 0;

    for (const card of storedCards) {
        if (card.status === 1)
        {
            counter++;
        }
    }

    scoreCounter.value = (counter / 2);

    checkScore();
}

function checkScore()
{
    let score = document.getElementById('score').value;

    let storedCards = getStoredCardsDatas().length;

    if((storedCards / score) === 2)
    {
        showWinText();
    }
}

function setCardsStatus(card1, card2)
{
    let storedCards = getStoredCardsDatas();

    for (const card of storedCards) {
        if (parseInt(card.id) === (parseInt(card1.id)))
        {
            card.status = 1;
        }
        else if (parseInt(card.id) === parseInt(card2.id))
        {
            card.status = 1;
        }
    }

    setStoredCardsDatas(storedCards);
}

function hideCards()
{
    let storedCards = getStoredCardsDatas();

    for (const card of storedCards) {
        if (card.visibility === 'visible' && card.status !== 1)
        {
            card.visibility = 'hide';
        }
    }

    setStoredCardsDatas(storedCards);

    cardsRollBack();
}

function cardsRollBack()
{
    let storedCards = getStoredCardsDatas();

    let cardsImages = document.getElementsByClassName('card');

    for ( let i = 0; i < cardsImages.length; i++)
    {
        if (parseInt(storedCards[i].status) !== 1)
        {
            cardsImages[i].src = 'img/hide.png';
        }
    }
}

function getStoredCardsDatas()
{
    return JSON.parse(localStorage.getItem('cards'));
}

function setStoredCardsDatas(cards)
{
    localStorage.setItem('cards', JSON.stringify(cards));
}