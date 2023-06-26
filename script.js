const chooseWord = () => {
  const WORD_LIST = ["gosopt", "javascript", "borimong", "yeonseo", "webpart"];
  const TARGET_WORD = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

  return TARGET_WORD;
};

// 랜덤으로 골라진 단어
const answerWords = chooseWord().split("");

// 단어 수에 맞게 밑줄 나타내기
const showBlindedAnswer = () => {
  const underLineUl = document.querySelector(".answer__letter");
  console.log(underLineUl);

  answerWords.forEach(() => {
    let underLineLi = document.createElement("li");
    underLineLi.textContent = "_";
    underLineUl.appendChild(underLineLi);
  });
};

window.onload = () => {
  console.log(answerWords);
  showBlindedAnswer();
};
