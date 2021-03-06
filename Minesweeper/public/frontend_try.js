window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

var i=0, j=0;
var randomVar;
var mines = 0;
var currentScore = 0;
var theta;
var darkColor = "rgb(121, 121, 121)";
var hr = 0;
var min = 0;
var sec = 0;
var stopTime = true;
var divs = new Array(100);
var clockDivs = new Array(12);
var sus = new Array(100);
var boxNumber = new Array(100);
var isClicked = new Array(100);
var isMine = new Array(100);
var susPosition = new Array(10);
var mainSection = document.querySelector('section');
var score = document.getElementById('score');
var minesId = document.getElementById('minesId');
var secHand = document.getElementById('secHand');
var minHand = document.getElementById('minHand');
var clockBefore = document.getElementById('topOne');
var clockAfter = document.getElementById('topTwo');
const timer = document.getElementById('stopwatch');
const tileBGColor = ["white", "rgb(0, 255, 0)", "yellow", "orange", "red", "darkred"];

for (i=0; i<100; i++){
    divs[i] = document.createElement('div');
    divs[i].setAttribute('class', 'box');
    sus[i] = 0;
    boxNumber[i] = 0;
    isClicked[i] = 0;
    isMine[i] = 0;
}
for (i=0; i<100; i++){
    mainSection.appendChild(divs[i]);
}
for (i=0; i<10; i++){
    randomVar = Math.floor((Math.random()) * 100);
    if (sus[randomVar] == 1){
        i--;
        continue;
    }
    sus[randomVar] = 1;
    susPosition[i] = randomVar;
    
    boxNumber[randomVar] = "-1000";
    if (randomVar%10 != 9){
        boxNumber[randomVar-9]++;
        boxNumber[randomVar+1]++;
        boxNumber[randomVar+11]++;
    }
    if (randomVar%10 != 0){
        boxNumber[randomVar-11]++;
        boxNumber[randomVar-1]++;
        boxNumber[randomVar+9]++;
    }
    boxNumber[randomVar-10]++;
    boxNumber[randomVar+10]++;
}
for (i=0; i<12; i++){
    theta = (i*30) * Math.PI / 180;
    clockDivs[i] = document.createElement('div');
    clockDivs[i].setAttribute('class', 'mark');
    clockDivs[i].style.transform = `translate(${100 * Math.sin(theta)}px, ${-100 * Math.cos(theta)}px) rotateZ(${(i*30)}deg)` //
}
for (i=0; i<12; i++){
    document.getElementById('clock').appendChild(clockDivs[i]);
}

function animationFunc(){
    clockBefore.style.animation = "clickAnimation 0.2s";
    clockAfter.style.animation = "clickAnimation 0.2s";
    secHand.style.animationPlayState = 'paused';
    minHand.style.animationPlayState = 'paused';
}

function startFunction(){
    if (stopTime == true) {
        stopTime = false;
        timerCycle();
    }
    secHand.style.animation = "clockHandAnimation 60s steps(3600, end) infinite forwards";
    minHand.style.animation = "clockHandAnimation 3600s infinite forwards";
    clockBefore.style.animation = "clickAnimation 0.2s";
    clockAfter.style.animation = "clickAnimation 0.2s";
    for (i=0; i<100; i++){
        divs[i].setAttribute('onmousedown', `logMouseButton(event, ${i})`);
    }
    setTimeout(() => {
        clockBefore.style.animation = "none";
        clockAfter.style.animation = "none";
    }, 200);
}
function stopFunction(){
    if (stopTime == false) {
        stopTime = true;
    }
    animationFunc();
    for (i=0; i<100; i++){
        divs[i].setAttribute('onmousedown', '');
    }
    setTimeout(() => {
        clockBefore.style.animation = "none";
        clockAfter.style.animation = "none";
    }, 200);
}
function resetFunction(){
    for (j=0; j< 10; j++){
        divs[susPosition[j]].style.background = "red";
    }
    animationFunc();
    setTimeout(() => {
        location.reload();
    }, 1000);
}

function logMouseButton(event, i){
    if (currentScore==89 && sus[i]==0){
        animationFunc();
        setTimeout(() => {
            alert('Congratulations! You have successfully defeated Minesweeper!!');
            location.reload();
        }, 200);
    } else {
        switch (event.button) {
            case 0:
                if (sus[i] == 1){
                    for (j=0; j< 10; j++){
                        divs[susPosition[j]].style.background = "red";
                    }
                    animationFunc();
                    setTimeout(() => {
                        alert('You Lose, Try Again..');
                        location.reload();
                    }, 200);
                } else {
                    if (isClicked[i]==0 || divs[i].style.background=="blue"){
                        isClicked[i]++;
                        currentScore++;
                        divs[i].innerHTML = boxNumber[i];
                        divs[i].style.background = darkColor;
                        divs[i].style.color = tileBGColor[boxNumber[i]];
                        score.innerHTML = currentScore + ' pts';

                        if (isMine[i] == 1){
                            isMine[i]--;
                            mines--;
                            minesId.innerHTML = mines;
                        }
                    }
                }
                break;
            case 2:
                divs[i].style.background = "blue";
                if (isMine[i] == 0){
                    isMine[i]++;
                    mines++;
                }
                if (isClicked[i] == 1){
                    isClicked[i] = 0;
                    currentScore--;
                    divs[i].innerHTML = '';
                    score.innerHTML = currentScore + ' pts';
                }
                if (mines <= 10){
                    minesId.innerHTML = mines;
                } else {
                    minesId.innerHTML = mines + ' &#128123;';
                }
                break;
            default:
                alert('Click using LMB or RMB only!!');
        }
    }
}
  
function timerCycle() {
    if (stopTime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);
    
        sec = sec + 1;
    
        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }
    
        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
            hr = '0' + hr;
        }
    
        timer.innerHTML = hr + ':' + min + ':' + sec;
    
        setTimeout("timerCycle()", 1000);
    }
}

// ==================== CHEAT CODE ;) ====================
window.addEventListener('keydown', function (e) {
    if (e.key == 'c'){
        for (j=0; j< 10; j++){
            divs[susPosition[j]].style.background = "green";
        }
        animationFunc();
        score.innerHTML = "90 pts";
        minesId.innerHTML = "&#128527;";
        setTimeout(() => {
            alert('Congratulations! You have successfully defeated Minesweeper!!');
            location.reload();
        }, 200);
    }
}, false);

function zoomIn(){
    document.querySelector('.wrapper').style.zoom = 0.8;
    document.querySelector('.wrapper').style.marginTop = "80px";
    document.getElementById('zoomIn').style.left = "calc(50% - 82px)";
}
function zoomOut(){
    document.querySelector('.wrapper').style.zoom = 1;
    document.getElementById('wrapper').style.marginTop = "0px";
    document.getElementById('zoomIn').style.left = "calc(50% - 84px)";
}