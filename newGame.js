"use strict";
localStorage.clear();
localStorage.setItem("refreshBoard", "yes");

const roundsFunc = function () {
  let i = 0;
  localStorage.setItem("maxRounds", "1");
  return function (evt) {
    console.log("clicked!!!");
    console.log(evt.target);
    const totalRounds = [1, 3, 5, 7];

    if (evt.target.className.includes("up")) {
      if (i < totalRounds.length - 1) {
        i++;
      }
    } else {
      if (i > 0) {
        i--;
      }
    }
    console.log(i);
    document.querySelector(".input").textContent = `${totalRounds[i]}`;
    localStorage.setItem("maxRounds", totalRounds[i]);
  };
};

const rounds = roundsFunc();

document.querySelectorAll(".arrow").forEach((item) => {
  item.addEventListener("click", rounds);
});
