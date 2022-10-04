const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let movements = 0;
let winContador = 0;
console.log("variaveis");

function flipCard() {
  //this.classList.toggle('flip');
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  console.log("1 Vira  A");
  // console.log(winContador);
  secondCard = this;
  checkForMatch();
}

//Conferindo se as cartas são iguais
function checkForMatch() {
  if (firstCard.dataset.nome !== secondCard.dataset.nome) {
    movements++;
  }
  document.getElementById("movimentos").innerHTML = `${movements}`;
  document.getElementById("movimentos2").innerHTML = `${movements}`;

  if (firstCard.dataset.nome === secondCard.dataset.nome) {
    winContador++;
    disableCards();
    //ALTERAÇÃO* Confere se o "winContador" é igual a "6", que é o número máximo de vitórias que pode haver no jogo!
    if (winContador == 6) {
      setTimeout(() => {
        document.querySelector("#vitoria").style.display = "block";
        document.querySelector("#movimentosvitoria").innerHTML = movements;
      }, 500);
    }
    //1000 para 500
    //FIM-ALTERAÇÃO
    return;
  }
  unflipCards();
  console.log("2 confere igual");
  // console.log(movements);
}

//Desabilitando o clique nas cartas viradas
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

//Virando as cartas erradas de volta
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  console.log("3 desvira");
}

//Embaralhando cartas (IIFE) Vai ser executada assim que for lida
(function shuffle() {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
    // console.log("0 ramdomPos",ramdomPos);
  });
})();

console.log("executar");
cards.forEach((card) => card.addEventListener("click", flipCard));
