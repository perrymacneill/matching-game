var prevCLick = {id: null, text: null};
var currClick = {id: null, text: null};
var clickCounter = 0;
var correctCount = 0;
var timer;

window.onload = init();

function init() {
  //all possible values for cards
  var values = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
  var nodes = document.querySelectorAll("*[id^='col-']");
  for(var i = 0; i < nodes.length; i++) {
    var value = randomIndex(values);
    document.getElementById('col-'+ i).innerHTML = values[value];
    document.getElementById('col-'+ i).onclick = checkClick;
    //remove used value from array
    values.splice(value, 1);
  }
}

function randomIndex(arr) {
  return Math.floor(Math.random()*arr.length);
}

function checkClick() {
  //check if same card is clicked
  if(this.id !== currClick.id) {
    clickCounter++;
    this.style.fontSize = '3em';
    prevClick = Object.assign({}, currClick);
    currClick.id = this.id;
    currClick.text = this.innerHTML;
    //two different cards clicked
    if(clickCounter > 1) {
      document.getElementById('game-container').style.pointerEvents = 'none';
      if(currClick.text === prevClick.text) {
        cardMatch();
      } else {
        cardMismatch();
      }
    }
  }
}

function cardMatch() {
  var nodes = [document.getElementById(currClick.id), document.getElementById(prevClick.id)];
  for(var i = 0; i < nodes.length; i++) {
    nodes[i].disabled = true;
    nodes[i].style.fontSize = '3em';
    nodes[i].style.pointerEvents = 'none';
  }
  resetPairs();
  correctCount++;
  //all cards are matched
  if(correctCount > 7) {
    allCardsMatched();
  }
}

function cardMismatch() {
  window.clearTimeout(timer);
    timer = window.setTimeout(function() {
      document.getElementById(currClick.id).style.fontSize = '0px';
      document.getElementById(prevClick.id).style.fontSize = '0px';
      resetPairs();
    }, 500);
}

function resetPairs() {
  prevClick.text = null;
  currClick.text = null;
  prevClick.id = null;
  currClick.id = null;
  document.getElementById('game-container').style.pointerEvents = 'auto';
  clickCounter = 0;
}

function allCardsMatched() {
  $('#congrats-modal').modal('show');
  document.getElementById('game-container').style.pointerEvents = 'none';
}
