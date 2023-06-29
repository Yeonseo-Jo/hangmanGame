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

const resetBtn = document.querySelector(".header__resetBtn");
const answerUl = document.querySelector(".answer__letters");
const answerInput = document.querySelector(".answer__input");
const showTry = document.querySelector(".fail__message-try");
const showLife = document.querySelector(".fail__message-life");
const showLifeImage = document.querySelector(".fail__lifeImage");
showLife.textContent = REMAIN_LIFE;
showLifeImage.src = `./assets/Life_${REMAIN_LIFE}.png`;

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
  //input에 enter 입력 시 수행
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
        // 중복 정답 처리를 위한 forEach문
        let targets = document.querySelectorAll(`.${word}`);
        targets.forEach((t) => (t.textContent = word));
      }
    });

    // 정답이 틀렸을 경우 남은 생명 줄어들도록 (setTimeout으로 화면 그려지고 alert 뜨도록)
    if (!isAnswer) {
      REMAIN_LIFE -= 1;
      showLifeImage.src = `./assets/Life_${REMAIN_LIFE}.png`;
      showLife.textContent = REMAIN_LIFE;

      let tryWord = document.createElement("li");
      tryWord.innerText = e.target.value;
      showTry.appendChild(tryWord);
    }

    // 남은 생명이 없으면 게임 종료
    if (REMAIN_LIFE === 0) {
      setTimeout(() => {
        alert("남은 생명이 없어요😭 다시 도전해주세요💦");
        window.location.reload();
      }, [500]);
    }

    // 모두 맞추면 게임 성공, (setTimeout으로 화면 그려지고 alert 뜨도록)
    if (COUNT_CORRECT === answerWords.length) {
      setTimeout(() => {
        alert("🥳축하합니다! 게임 성공!🥳");
        window.location.reload();
      }, [500]);
    }

    // input 초기화
    e.target.value = "";
  }
};

//input과 reset 버튼 이벤트 캡슐화 함수
const listenEvent = () => {
  answerInput.addEventListener("keyup", (e) => checkInput(e));
  resetBtn.addEventListener("click", () => window.location.reload());
};

const startGame = () => {
  console.log(answerWords);
  showBlindedAnswer();
  listenEvent();
};

startGame();
