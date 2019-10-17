const { singleDeckGame, Result } = require('blackjack-dealer-logic')
const input = require('readline-sync')

const gameIsRunning = true;

p("--------------------------------------");
p("Welcome to Dondons BlackJack Emporium!");
p("--------------------------------------");
while (gameIsRunning) {
  p();
  p(`Your current chip count is: ${singleDeckGame.getUserChips()}`);
  const userWager = Number(ask("Please enter an amount to wager: "));
  singleDeckGame.receiveAnte(userWager);
  p();
  printCurrentAnte();
  singleDeckGame.deal();
  p(`Dealer is showing: ${singleDeckGame.getDealerCardUp()}`);
  p(`Your current hand: ${singleDeckGame.getUserHandValue()}`);
  p();
  p("Action choices:");
  p("---------------");
  p();
  p("1. Hit");
  p("2. Double");
  p("3. Stand");

  while (singleDeckGame.isUserPlaying() && !singleDeckGame.isUserBust()) {
    const userHandAction = ask("what would you like to do? ");
    switch (userHandAction) {
      case "1":
        singleDeckGame.hitUser();
        singleDeckGame.evaluateUser();
        break;

      case "2":
        singleDeckGame.doubleUser();
        singleDeckGame.evaluateUser();
        break;

      case "3":
        singleDeckGame.standUser();
        singleDeckGame.evaluateUser();
        break;

      default:
        break;
    }
    p(`Your current hand: ${singleDeckGame.getUserHandValue()}`);
  }
  p();

  singleDeckGame.settleDealerHand();

  p(`Dealer has: ${singleDeckGame.getDealerHandValue()}`);

  switch (singleDeckGame.outcome()) {
    case Result.LOSS:
      p("You lost...");
      singleDeckGame.resetAnte();
      break;
    case Result.PUSH:
      p("Push... at least you get your money back!");
      singleDeckGame.pushHand();
    case Result.WIN:
      p("Congrats!!! You win!!!");
      singleDeckGame.userWin();

    default:
      break;
  }

  singleDeckGame.resetPlayers();
}

// Private Interface
function ask (query = "") {
  return input.question(query);
}

function p (msg = "") {
  console.log(msg);
}

function printCurrentAnte () {
  p(`Current Ante: ${singleDeckGame.getAnte()}`);
  p("-----------------");
  p();
}
