window.onload = () => {
    showSizes();
}

const cardsContainer = document.getElementById('cardsContainer');

function showSizes()
{
    resetScore();

    const title = document.createElement('h1');
    title.innerHTML = "Choose one!";
    title.id = "introTitle";

    cardsContainer.appendChild(title);

    let buttonsContainer = document.createElement('div');
    buttonsContainer.id = "buttonsContainer";

    for(let i = 0; i < 3; i++)
    {
        let button = document.createElement('button');
        button.value = i;
        button.innerHTML = buttonText(i);
        button.id = 'button' + i.toString();
        button.className = 'button';
        buttonsContainer.appendChild(button);
    }

    cardsContainer.appendChild(buttonsContainer);

    setClickEventToButtons();
}

function buttonText(index)
{
    switch(index)
    {
        case 0:
            return 'small';
            break;
        case 1: 
            return 'medium';
            break;
        case 2:
            return 'high';
            break;
    }
    return '????????';
}

function setClickEventToButtons()
{
    const sizesButtons = document.getElementsByClassName('button');
    for (const btn of sizesButtons) {
        btn.addEventListener('click', () => {
            buttonClicked(btn, btn.innerHTML);
        });
    }
}

function showWinText()
{
    let container = document.createElement('div');
    container.id = 'gratulationContainer';

    let contentContainer = document.createElement('div');

    let title = document.createElement('h2');
    title.innerHTML = 'Congratulation!';

    contentContainer.appendChild(title);

    let description = document.createElement('p');
    description.innerHTML = 'You can play again if you click on the restart game button at the top of the left';

    contentContainer.appendChild(description);

    let cardsContainerParent = cardsContainer.parentElement;

    container.appendChild(contentContainer);

    cardsContainerParent.insertBefore(container, cardsContainer);
}

function contentRemover()
{
    cardsContainer.innerHTML = '';

    if (document.getElementById('gratulationContainer'))
    {
        document.getElementById('gratulationContainer').remove();
    }
}

function resetScore()
{
    document.getElementById('score').value = 0;
}

document.getElementById('restartBtn').addEventListener('click', () => {
    contentRemover();
    showSizes();
    setStoredCardsDatas(null);
});