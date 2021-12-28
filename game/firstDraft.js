"use strict";

/* const updateStatus = function (condition, delay) {
  let time;
  //this determines if the time delay of the msg is greater than 0 or not.
  //this is used so that we can set no time delay to statusNormal when the game starts
  //then.. as the game continues, the time delay will be set to the desired delay
  if (delay == true) {
    time = 2;
  } else {
    time = 0;
  }
  const statusLocked = "Please choose toothpicks from current row!";
  const statusNormal = "Remove your toothpicks of choice...";

  let status = document.querySelector(".status");
  if (condition !== "locked") {
    setTimeout(function () {
      status.textContent = statusNormal;
      console.log(status);
    }, time * 1000);
  } else {
    status.textContent = statusLocked;
    console.log(status);
  }
}; */

const updateStatus = function (condition, delay) {
  let time;
  //this determines if the time delay of the msg is greater than 0 or not.
  //this is used so that we can set no time delay to statusNormal when the game starts
  //then.. as the game continues, the time delay will be set to the desired delay
  if (delay == true) {
    time = 0;
  } else {
    time = 0;
  }
  const statusLocked = "Please choose toothpicks from current row!";
  const statusNormal = "Remove your toothpicks of choice...";

  let status = document.querySelector(".status");
  if (condition !== "locked") {
    setTimeout(function () {
      status.textContent = statusNormal;
      console.log(status);
    }, time * 1000);
  } else {
    status.textContent = statusLocked;
    console.log(status);
  }
};

const localStorageRead = function () {
  const genStats = JSON.parse(localStorage.getItem("genStatsStr"));

  const testGenStats = JSON.parse(localStorage.getItem("genStatsStr"));

  console.log(testGenStats);

  return genStats;
};

const localStorageWrite = function (genStats) {
  console.log(genStats);
  localStorage.clear();
  const genStatsStr = JSON.stringify(genStats);
  console.log(genStatsStr);

  localStorage.setItem("genStatsStr", genStatsStr);

  console.log(localStorage);
};

const localStorageManagerTest = function (genStats) {
  console.log(`orig gensStats`);
  console.log(genStats.tokenList);
  const genStatsStr1 = JSON.stringify(genStats);
  console.log(genStatsStr1);

  const newGenStats = JSON.parse(genStatsStr1);

  console.log(newGenStats.tokenList);
  console.log(genStats.tokenList);
};

const mainMenu = function () {
  localStorageWrite(genStats);
  location.href = "../continue.html";
};

const createTestTokens = function () {};

const tokenHiddenState = function (genStats) {};

const init = function (genStats, matchReset) {
  console.log(matchReset);
  genStats.tokenList.forEach((element) => {
    //unhide the hidden tokens and update object parameter
    element.removed = false;
    element.style.visibility = "visible";
    element.locked = false;
  });
  genStats.plyrLocked = false;
  genStats.countRemovedTokens = 0;
  genStats.gameActive = true;
  genStats.activePlyr = 0;
  document.getElementById("player-no").textContent = "1";
  document.querySelector(".round-no").textContent = `Round ${
    genStats.roundNo + 1
  } of 3`;
  //reset values after a match
  if (matchReset == true) {
    genStats.roundNo = 0;
    /* document.querySelector(".round-no").textContent = "Round 1 f 3"; */
    genStats.roundWins[0] = 0;
    genStats.roundWins[1] = 0;
    genStats.matchReset = false;
  }

  console.log(genStats);
};

const gameStats = function (genStats) {
  document.getElementById("player-no").textContent = `${
    genStats.activePlyr + 1
  }`;
  document.querySelector(".round-no").textContent = `Round ${
    genStats.roundNo + 1
  } of ${genStats.maxRounds}`;
  document.querySelector(".player0-wins").textContent = genStats.roundWins[0];
  document.querySelector(".player1-wins").textContent = genStats.roundWins[1];
};

const winner = function (menuType, genStats) {
  //winner is the player that is  active player (i.e. the player that stays with the last token loses)
  let playerWinner = genStats.activePlyr; /*  == 0 ? 1 : 0 */
  //increment round wins per player
  genStats.roundWins[playerWinner]++;
  console.log(playerWinner);
  //activate the popup
  document.querySelector(".winner-popup").classList.toggle("active");
  //blur the background
  document.getElementById("blur").classList.toggle("active");
  const winnerTitle = document.querySelector(".winner.popup-title");
  const winnerButton1 = document.querySelector(".winner.button1");
  const roundNum = document.querySelector(".round-num");
  const winnerPlayerno = document.querySelector(".winner-player-no");

  winnerPlayerno.textContent = playerWinner + 1;
  //make changes to menu dynamically
  if (menuType == "match") {
    winnerTitle.textContent = "Match Over";
    winnerButton1.textContent = "Play Again";
    roundNum.textContent = "";
    //specify what playerNum won
    //the player no. that appears as winner is the one that is not activePlyr
    /* winnerPlayerno.textContent =
      genStats.roundWins[0] > genStats.roundWins[1] ? "1" : "2"; */
    if (genStats.roundWins[0] > genStats.roundWins[1]) {
      winnerPlayerno.textContent = "1";
    } else if (genStats.roundWins[0] < genStats.roundWins[1]) {
      winnerPlayerno.textContent = "2";
    } else {
      winnerTitle.textContent = "Draw!";
    }

    /* winnerButton1.classList.add("match"); */
  } else if (menuType == "round") {
    winnerTitle.textContent = "Round ";

    roundNum.textContent = `${genStats.roundNo + 1}`;
    winnerButton1.textContent = "Next Round";
  }
  //if button1 is clicked
  document.querySelector(".winner.button1").onclick = function (evt) {
    //unblur the background
    document.getElementById("blur").classList.toggle("active");
    //remove the popup
    document.querySelector(".winner-popup").classList.toggle("active");

    //update the round no (execute gameStats())

    if (menuType == "round") {
      genStats.roundNo++;
      init(genStats, genStats.matchReset);
    } else if (menuType == "match") {
      //match reset is true which means that it will trigger the reset of the match in init()
      genStats.matchReset = true;
      /* genStats.roundNo = 0; */
      init(genStats, genStats.matchReset);
    }
    gameStats(genStats);
  };
};
//end turn
const chgPlyer = function (genStats) {
  //unlock all tokens
  genStats.tokenList.forEach((element) => {
    element.locked = false;
  });
  //unlock the player
  genStats.activePlyr == 0
    ? (genStats.activePlyr = 1)
    : (genStats.activePlyr = 0);

  gameStats(genStats);

  /* document.getElementById("player-no").textContent = `${
    genStats.activePlyr + 1
  }`; */
  genStats.plyrLocked = false;
};
//current game execution
const tokenAction = function (genStats) {
  /* updateStatus("notLocked", false); */
  document.querySelector(".status").textContent =
    "Remove your toothpicks of choice...";

  console.log("Clicked");
  console.log(`genStats.countRemovedTokens - ${genStats.countRemovedTokens}`);

  return function (evt) {
    if (genStats.gameActive == true) {
      console.log(evt.target.id);
      console.log(genStats.tokenList);

      console.log(evt.target.yBasis);

      //only remove token if token/ token row is unlocked
      if (evt.target.locked == false) {
        evt.target.style.visibility = "hidden";

        //increment token count to determine when plyr reaches winning token
        genStats.countRemovedTokens++;

        evt.target.removed = true;
        console.log("NOT LOCKED!!!");

        document.querySelector(".status").textContent =
          "Remove your toothpicks of choice...";
      } else {
        /* updateStatus("locked", true); */
        document.querySelector(".status").textContent =
          "Please choose toothpicks from current row!";
        console.log("LOCKED!!!");
      }
      setTimeout(function () {
        document.querySelector(".status").textContent =
          "Remove your toothpicks of choice...";
      }, 2 * 1000);

      if (genStats.plyrLocked == false) {
        genStats.tokenList.forEach((element) => {
          //if clicked token row no (yBasis) is <> yBasis of the tokenList element

          if (evt.target.id.slice(0, 1) != element.id.slice(0, 1)) {
            element.locked = true;
          }
        });
      } /* else {
        updateStatus("locked", true);
        console.log("LOCKED!!!");
      }
      updateStatus("notLocked", true); */
      //this prevents the forEach loop from executing (preventing the unlocked row to become locked again)
      genStats.plyrLocked = true;

      //if plyr reaches winning token
      if (genStats.countRemovedTokens == 15) {
        genStats.gameActive = false;

        let winnerMenuType;
        genStats.roundNo == genStats.maxRounds - 1
          ? (winnerMenuType = "match")
          : (winnerMenuType = "round");

        winner(winnerMenuType, genStats);
      }
    }
  };
};

//temp test condition - this should be a condition set in localStorage ("refreshBoard");
let testLocalStorage = true;

const genTokenNodes = function (genStats) {
  /* console.log(genStats.tokenList); */

  let tokenNum = 0;

  //splitter
  /* let { tokenList, ...rest } = genStats; */
  //generate tokens with parameters
  const rowLimit = 4;
  //reset xMax regardless if genStat values are taken from init or from localStorage
  let xMax = 1;
  for (let rowNum = 0; rowNum < rowLimit; rowNum++) {
    for (let x = 0; x < xMax; x++) {
      console.log("generating nodes...");
      const token = document.createElement("img");

      //careful here when entering from an existing game

      if (localStorage.getItem("refreshBoard") == "yes") {
        token.locked = false;
        token.removed = false;
        //if refreshBoard == "no" - i.e. continuing from an already loaded match
      } else {
        console.log(genStats.tokenList[0].removed);
        //set property as per the object coming from localStorage
        token.removed = genStats.tokenList[tokenNum].removed;
        if (token.removed == true) {
          token.style.visibility = "hidden";
        }

        token.locked = genStats.tokenList[tokenNum].locked;
      }

      token.src = "Toothpick.png";
      token.id = `${rowNum}${String.fromCharCode(x + 65)}`;
      token.setAttribute("onclick", "clickEvent(event)");

      console.log(token);

      //add token object parameters to array

      //replace token node with property in tokenList array with same reference
      genStats.tokenList[tokenNum] = token;

      tokenNum++;
    }
    xMax += 2;
  }
  console.log(genStats);
};

const initgenStats = function () {
  if (localStorage.getItem("refreshBoard") == "no") {
    let genStats = localStorageRead();
    return genStats;
  } else if (localStorage.getItem("refreshBoard") == "yes") {
    let genStats = {
      tokenList: [],
      plyrLocked: false,
      activePlyr: 0,
      countRemovedTokens: 0,
      gameActive: true,
      roundNo: 0,
      maxRounds: JSON.parse(localStorage.getItem("maxRounds")),
      roundWins: [0, 0],
      matchReset: false,
      localStorageOption: "init",
      xMax: 1,
    };
    return genStats;
  }
};

//populate board tokens on page via DOM
const populateBoard = function (genStats) {
  console.log(localStorage.getItem("refreshBoard"));

  //starting counter to increment the no of tokens per row
  let xMax = 1;
  let tokenIndex = 0;

  for (let rowNum = 0; rowNum < 4; rowNum++) {
    //create div nodes
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("rows");
    rowDiv.id = `row${[rowNum]}`;
    innerWrapper.appendChild(rowDiv);
    for (let x = 0; x < xMax; x++) {
      //DOM - add tokens to document
      rowDiv.appendChild(genStats.tokenList[tokenIndex]);

      tokenIndex++;
    }
    //increment each row by 2 tokens each time
    xMax += 2;
  }
  console.log(genStats);
};

const genStatsSplitter = function (genStats) {
  const { tokenList, ...rest } = JSON.parse(
    localStorage.getItem("genStatsStr")
  );
  console.log(tokenList);
  console.log(rest);
};

const genStats = initgenStats();

//testing to separate tokenList from other properties in genStats

genTokenNodes(genStats);

populateBoard(genStats);

const clickEvent = tokenAction(genStats);

gameStats(genStats);

console.log(genStats);
