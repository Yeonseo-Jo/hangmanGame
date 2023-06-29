const chooseWord = () => {
  const WORD_LIST = ["gosopt", "javascript", "borimong", "yeonseo", "webpart"];
  const TARGET_WORD = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

  return TARGET_WORD;
};

// 랜덤으로 골라진 단어
const answerWords = chooseWord().split("");
const tryList = [];
let REMAIN_LIFE = 6;
let COUNT_CORRECT = 0;

const answerUl = document.querySelector(".answer__letters");
const asnwerInput = document.querySelector(".answer__input");
const trySpan = document.querySelector(".fail__message-try");
const showLife = document.querySelector(".fail__message-life");
showLife.textContent = REMAIN_LIFE;

// 단어 수에 맞게 밑줄 나타내기
const showBlindedAnswer = () => {
  answerWords.forEach((word) => {
    let answerLi = document.createElement("li");
    answerLi.classList.add(word);
    answerLi.textContent = "_";
    answerUl.appendChild(answerLi);
  });
};

const checkInput = (e) => {
  let isAnswer = false;
  if (e.keyCode == 13) {
    // 중복 입력 검사
    if (tryList.includes(e.target.value)) {
      alert("이미 입력한 문자입니다!");
      e.target.value = "";
      return;
    } else {
      tryList.push(e.target.value);
    }

    // 단어 정답 판별
    answerWords.forEach((word) => {
      if (word === e.target.value) {
        isAnswer = true;
        COUNT_CORRECT += 1;
        let targets = document.querySelectorAll(`.${word}`);
        targets.forEach((t) => (t.textContent = word));
      }
    });

    // 정답이 틀렸을 경우 남은 생명 줄어들도록
    if (!isAnswer) {
      console.log("틀");
      REMAIN_LIFE -= 1;
      showLife.textContent = REMAIN_LIFE;
    }

    // 남은 생명이 없으면 게임 종료
    if (REMAIN_LIFE === 0) {
      alert("남은 생명이 없어요😭 다시 도전해주세요💦");
      window.location.reload();
    }

    // 모두 맞추면 게임 성공, 단, 단어가 채워지고 성공임을 보여줘야 하므로 setTimeout 사용
    if (COUNT_CORRECT === answerWords.length) {
      setTimeout(() => {
        alert("🥳축하합니다! 게임 성공!🥳");
        window.location.reload();
      }, [500]);
    }

    console.log(COUNT_CORRECT, answerWords.length);

    // input 초기화
    e.target.value = "";
  }
};

window.onload = () => {
  console.log(answerWords);

  showBlindedAnswer();
  asnwerInput.addEventListener("keyup", (e) => checkInput(e));
};
