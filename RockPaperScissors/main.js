const game = {
    playerChoose: '',
    computerChoose: '',
}
const gameSummary = {
    gamesNumber: '',
    winsNumber: '',
    loosesNumber: '',
    drawsNumber: '',
}


const allChoices = [...document.querySelectorAll('.hand')];
const playBtn = document.querySelector('.playboard button');


const userChoose = function(){
    game.playerChoose = this.id;
    allChoices.forEach(hand => hand.style.border = '3px solid #7ea3f8')
    this.style.border = '3px solid #e74427';
}
function computerSelect(){
    return allChoices[Math.floor(Math.random()*allChoices.length)].id;
}
// Compaare the results
const compareResults = function(user, computer){
    if(user === computer){
        return 'Draw'
    }else if(user === "paper" && computer === "rock" || user === "rock" && computer === "scissors" || user === "scissors" && computer === "paper"){
        return "Win"
    }else {
        return "Loss"
    }
}

//Publikacja wyników, zmiana tekstu
function publishResults(user, computer, result){
    document.querySelector('[data-summary="user-choice"]').textContent = user.toUpperCase();
    document.querySelector('[data-summary="comp-choice"]').textContent = computer.toUpperCase();
    document.querySelector('.gamenumber span').textContent = ++gameSummary.gamesNumber;

    if(result === "Win"){
        document.querySelector('#user-score').textContent = ++gameSummary.winsNumber;
        document.querySelector('.result').innerHTML = `You win :D <br/> ${user.toUpperCase()} beat ${computer.toUpperCase()}`;
        document.querySelector('.result').style.color = "green";
    }else if(result === "Loss"){
        document.querySelector('#comp-score').textContent = ++gameSummary.loosesNumber;
        document.querySelector('.result').innerHTML = `You loss! :( <br/> ${computer.toUpperCase()} beat ${user.toUpperCase()}`;
        document.querySelector('.result').style.color = "red";
    }else{
        document.querySelector('p.draws span').textContent = ++gameSummary.drawsNumber;
        document.querySelector('.result').innerHTML = `It was good fight! <br/> ${user.toUpperCase()} and ${computer.toUpperCase()}`;
        document.querySelector('.result').style.color = "yellow";
    }
}

const playGame = () =>{

    if(!game.playerChoose) return document.querySelector('.popup').classList.add('show-popup');

    game.computerChoose = computerSelect();
    const gameResult = compareResults(game.playerChoose, game.computerChoose);

    publishResults(game.playerChoose, game.computerChoose, gameResult);
    endGame();
}


// Clear all
function endGame(){
    document.querySelector(`#${game.playerChoose}`).style.border = '3px solid #7ea3f8';
    game.playerChoose = "";
    game.compuerChoose = "";
}

document.querySelector('.close').addEventListener('click', ()=> {
    document.querySelector('.popup').classList.remove('show-popup')
})
allChoices.forEach(hand => hand.addEventListener('click', userChoose))
playBtn.addEventListener('click', playGame);