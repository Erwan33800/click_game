const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

daysLeft = 60;
gamesOverNumber = 40;
loopPlay = false;

function start() {
    count = 0;
    getFaster = 6000;
    daysRemaining = daysLeft;

    canvas.innerHTML = '';
    score.innerHTML = count;
    days.innerHTML = daysRemaining;

    // make sure to note play loop several times
    loopPlay ? '' : game();
    loopPlay = true;

    function game() {
        let randomTime = Math.round(Math.random() * getFaster);
        getFaster > 700 ? getFaster = (getFaster * 0.90) : '';

        setTimeout(() => {
            if (daysRemaining === 0){
                youWin();
            }else if (canvas.childElementCount < gamesOverNumber){ // childElementCount compte le nombre de virus
               virusPop();
                game(); 
            }else {
                gameOver();
            }
        }, randomTime);
    };

    const gameOver = () => {
        endScreen.innerHTML = `<div class="gameOver">Game Over <br/>score : ${count}</div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1';
        loopPlay = false;
    };

    const youWin = () => {
        let accuracy = Math.round(count / daysLeft * 100); // calculer le pourcentage de réussite de tirs par rapport au jour restant (chaque clic enlève un jour)
        endScreen.innerHTML = `<div class="youWin">Bravo ! Tu as atomisé cette merde<br/><span>précision : ${accuracy}%</span></div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1';
        loopPlay = false;
    };

};

function virusPop() {
    let virus = new Image();

    virus.src = Math.round(Math.random() * 1);
    if (virus.src == 1){
        virus.src = "./media/basic-pics/pngwave.png";
    }else{
        virus.src = "media/basic-pics/pngwave.png";
    }
    
    
    virus.classList.add('virus');
    virus.style.top = Math.random() * 500 + 'px';
    virus.style.left = Math.random() * 500 + 'px';

    let x, y;
    x = y = (Math.random() * 45) + 30; // taille du virus + 30px pour qu'il fasse au mini 30px
    virus.style.setProperty('--x', `${ x }px`);
    virus.style.setProperty('--y', `${ y }px`);

    let plusMinus = Math.random() < 0.5 ? -1 : 1;
    let trX = Math.random() * 500 * plusMinus;
    let trY = Math.random() * 500 * plusMinus;
    virus.style.setProperty('--trX', `${ trX }%`); // on injecte dans le css les valeurs trX et trY
    virus.style.setProperty('--trY', `${ trY }%`);

    canvas.appendChild(virus);
}

// remove element clicked
document.addEventListener('click', function(e){
    let targetElement = e.target || e.srcElement; // permet de savoir ou est-ce que l'utilisateur clique

    if(targetElement.classList.contains('virus')){
        targetElement.remove();
        count++;
        score.innerHTML = count;
    };
});

// countdwon click

canvas.addEventListener('click', () => {
    if (daysRemaining > 0) {
        daysRemaining--;
        days.innerHTML = daysRemaining;
    }
});

endScreen.addEventListener('click', () => {
    setTimeout(() => {
        start();
        endScreen.style.opacity = '0';
        endScreen.style.visibility = 'hidden';
    }, 3500);
    
});