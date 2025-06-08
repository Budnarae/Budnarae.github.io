const BACKGROUNDIMG = 0;
const CHARACTER1IMG = 1;
const CHARACTER2IMG = 2;
const CHARACTERNAME = 3;
const DIALOGUE = 4;
const SOUND = 5;

const DEATH = 0;
const ENDGAME = 1;
const DOUBLEROUTE = 2;
const AROUTENAME = 3;
const BROUTENAME = 4;
const AROUTENUM = 5;
const BROUTENUM = 6;
const ITEMNAME = 7;
const ITEMREQUIRE = 8;

let scenarioNum = 0;
let sceneNum = 0;

let items = [];
let scenarioElements = [
  // 시나리오 번호 0. 학교, 지하철 플랫폼, 이벤트 1(지하철, 달걀귀신) scene
  [
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "김도윤",
      "대학생인 ‘나’는 금요일 수업을 마치고 늦은 밤, 타지역에 있는 본가로 가기 위해 지하철 역으로 향한다.",
      "",
    ],
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[지하철 플랫폼]",
      `아무도 없는 플랫폼.<br>
      심심함을 달래기 위해 핸드폰을 보던 중, 메시지가 하나 도착했다.<br>
      발신자 표시 제한: "귀신 출몰 주의"<br>
      <br>
      장난 문자인 줄 알고 대수롭지 않게 무시한 채 열차에 몸을 실었다.
`,
      "",
    ],
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[열차 안]",
      `플랫폼에는 나 혼자였던 것 같은데, 열차에는 누군가가 이미 타고 있었다.<br>
멀찍이 앉아 있던 사람이 천천히, 천천히 다가오기 시작했다.<br>
<br>
그 사람은 내 앞에 멈춰 섰고, 얼굴을 들었다.<br>
…얼굴이 없다.<br>
`,
      "",
    ],
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "",
      "[열차 안]",
      `마치 흰 달걀처럼 눈·코·입이 하나도 없는 괴이한 얼굴이다. <br>
<br>
거울 귀신은 당신의 이름을 묻는다.
`,
      "",
    ],
    [false, false, true, "이름을 알려준다.", "거울을 들이댄다.", 1, 2, "", ""],
  ],
  // 시나리오 번호 1. 이벤트 1의 이름을 알려준다 선택지
  [
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[열차 안]",
      `당신은 달걀 귀신에게 죽었다.`,
      "",
    ],
    [true, false, false, "", "", -1, -1, "", ""],
  ],
  // 시나리오 번호 2. 이벤트 1의 거울을 들이댄다 선택지 -> 이벤트 2
  [
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[열차 안]",
      `온몸에 소름이 돋는다. 놀라 손에 들고 있던 손거울로 다가오는 얼굴을 막았다.<br>
귀신은 거울 속 자신을 보더니 괴성을 지르며 사라졌다.<br>
<br>
… 꿈인가?
`,
      "",
    ],
    // 이벤트 2
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[사거리 교차로]",
      `열차에서 내려 지하철역 밖으로 나왔다.<br>
조금 걸으니 나오는 사거리 교차로. 그런데 그곳에는 누군가 서 있었다.<br>
흰 소복을 입은 처녀귀신같은 모습.<br>
`,
      "",
    ],
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "처녀 귀신",
      `
      그녀는 울먹이며 말을 건다.<br>
<br>
“내 얘기... 들어줄래...? 그러면 아주 귀한 걸 줄게...”
`,
      "",
    ],
    [
      false,
      false,
      true,
      "이야기를 들어준다.",
      "무시하고 지나간다.",
      3,
      4,
      "",
      "",
    ],
  ],

  // 시나리오 번호 3. 이벤트 2의 이야기를 들어준다 선택지
  [
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[사거리 교차로]",
      `나는 조심스레 고개를 끄덕였고, 그녀는 가슴 속에 묻어둔 슬픈 이야기를 들려주었다.<br>
모든 이야기가 끝난 후, 그녀는  ‘도깨비 감투’를 내민다.<br>
`,
      "",
    ],
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "처녀 귀신",
      `“보이지 않고 싶은 순간이 있을거야”`,
      "",
    ],
    [
      false,
      false,
      false,
      "택시 정류장으로 간다.",
      "",
      5,
      -1,
      "./img/dokkabihat.jpg",
      "",
    ],
  ],
  // 시나리오 번호 4. 이벤트 2의 무시하고 지나간다 선택지
  [
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[사거리 교차로]",
      `귀신과 엮였다가 무슨 봉변을 당할 지 모른다.<br>
      당신은 그녀를 무시한 채 그 자리를 벗어났다.
`,
      "",
    ],
    [false, false, false, "택시 정류장으로 간다.", "", 5, -1, "", "", ""],
  ],
  // 시나리오 번호 5. 이벤트 3 택시정류장 망태기 할아버지
  [
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[택시 정류장]",
      `택시를 타기 위해 사거리에서 정류장 쪽으로 걸어가던 중, 이상한 노인을 마주쳤다.<br>
커다란 망태기를 메고 있었는데, 그 망태기 안이 꿈틀거리고, 안에서 누군가 울고 있는 듯한 소리가 들린다.<br>
<br>
할아버지는 나를 발견하고, 묵묵히 다가오기 시작했다.

`,
      "",
    ],
    [
      false,
      false,
      false,
      "도깨비 감투를 쓴다.",
      "숨 죽인 채 가만히 있는다.",
      7,
      6,
      "",
      "./img/dokkabihat.jpg",
    ],
  ],
  // 시나리오 번호 6. 이벤트 3 숨 죽인 채 가만히 있는다 선택지
  [
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[택시 정류장]",
      `망태기 할아버지는 우악스런 손길로 당신을 망태기에 넣어버렸다.
`,
      "",
    ],
    [true, false, false, "", "", -1, -1, "", ""],
  ],
  // 시나리오 번호 7. 이벤트 3 도깨비 감투를 쓴다 선택지 -> 이벤트 4 자유로 귀신
  [
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[택시 정류장]",
      `불길한 예감에 도깨비 감투를 꺼내 써버렸다.<br>
내 몸은 투명해졌고, 할아버지는 곧 나를 못 본 채 지나쳐갔다.<br>
숨을 죽이며 고개를 들자, 어느새 그는 저 멀리 사라져 있었다.<br>
`,
      "",
    ],
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[택시 안]",
      `겨우 택시를 타고 본가로 향하던 중, 신호에 걸려 잠시 정차했다.<br>
그때 누군가 택시 창문을 ‘똑똑’ 두드렸다.<br>
`,
      "",
    ],
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "여자",
      `붉은 옷을 입은 여자가 나를 보며 말했다.<br>
<br>
“저 좀... 태워주시겠어요...?”<br>
`,
      "",
    ],
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[택시 안]",
      `이 늦은 시간 여기에 여자가 왜 있지 고민하던 찰나, 그녀의 얼굴이 보였다.<br>
…눈에 깊은 구멍이 뚫려 있었다.
`,
      "",
    ],
    [false, false, true, "가만히 있는다.", "여자를 태운다.", 8, 9, "", ""],
  ],
  // 시나리오 번호 8. 이벤트 4 가만히 있는다 선택지 -> 이벤트 5
  [
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[택시 안]",
      `재빨리 시선을 돌리는 순간 택시는 다시 출발했다.<br>
뒤를 돌아보니 그녀는 더 이상 보이지 않았다.
`,
      "",
    ],
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[어느 마을]",
      `당신은 택시에서 내렸다. 당신은 어느 마을에 도착했다...
`,
      "",
    ],
    [false, true, false, "", "", -1, -1, "", ""],
  ],
  // 시나리오 번호 8. 이벤트 4 여자를 태운다 선택지
  [
    [
      'url("./img/tmp.jpg")',
      "./img/ghost.png",
      "./img/ghost.png",
      "[택시 안]",
      `당신은 여자를 안쓰럽게 여겨, 택시 운전사에게 말해 차를 세웠다.<br>
      <br>
      문이 열리자마자 여자는 날카로운 손톱으로 당신의 목을 찔러버렸다...
`,
      "",
    ],
    [true, false, false, "", "", -1, -1, "", ""],
  ],
];

function showNextRoute(
  death,
  endgame,
  doubleRoute,
  aScenarioName,
  bScenarioName,
  aScenarioNum,
  bScenarioNum,
  itemName,
  itemRequire
) {
  if (death) {
    window.location.href = "./gameOver.html";
    return;
  }

  if (endgame) {
    window.location.href = "./gameClear.html";
    return;
  }

  if (itemName !== "") {
    items.push(itemName);
    let slotName = "itemSlot" + items.length;
    let slot = document.getElementById(slotName);
    slot.style = "display: block";
    slot.src = itemName;
  }

  if (itemRequire !== "") {
    doubleRoute = false;
    if (!items.includes(itemRequire)) {
      aScenarioName = bScenarioName;
      aScenarioNum = bScenarioNum;
    }
  }

  document.getElementById("charactername").textContent = "";
  document.getElementById("dialogue").textContent = "";
  const nextButton = document.getElementById("nextbutton");
  nextButton.style.display = "none";
  sceneNum = 0;

  if (doubleRoute) {
    const aroute = document.getElementById("aroute");
    const broute = document.getElementById("broute");

    aroute.style.display = "block";
    aroute.textContent = aScenarioName;
    broute.style.display = "block";
    broute.textContent = bScenarioName;

    function arouteEvent() {
      aroute.style.display = "none";
      broute.style.display = "none";
      nextButton.style.display = "block";
      scenarioNum = aScenarioNum;
      redrawPage();

      aroute.removeEventListener("click", arouteEvent);
      broute.removeEventListener("click", brouteEvent);
    }

    function brouteEvent() {
      aroute.style.display = "none";
      broute.style.display = "none";
      nextButton.style.display = "block";
      scenarioNum = bScenarioNum;
      redrawPage();

      aroute.removeEventListener("click", arouteEvent);
      broute.removeEventListener("click", brouteEvent);
    }

    aroute.addEventListener("click", arouteEvent);
    broute.addEventListener("click", brouteEvent);
  } else {
    const singleroute = document.getElementById("singleroute");

    singleroute.style.display = "block";
    singleroute.textContent = aScenarioName;

    function singlerouteEvent() {
      singleroute.style.display = "none";
      nextButton.style.display = "block";
      scenarioNum = aScenarioNum;
      redrawPage();
      singleroute.removeEventListener("click", singlerouteEvent);
    }

    singleroute.addEventListener("click", singlerouteEvent);
  }
}

function redrawPage() {
  const scene = scenarioElements[scenarioNum][sceneNum];
  document.getElementById("backgroundimg").style.backgroundImage =
    scene[BACKGROUNDIMG];

  if (scene[CHARACTER1IMG] !== "") {
    let character1img = document.getElementById("character1img");
    character1img.src = scene[CHARACTER1IMG];
    character1img.style = "display: block;";
  } else {
    character1img.style = "display: none;";
  }

  if (scene[CHARACTER2IMG] !== "") {
    let character2img = document.getElementById("character2img");
    character2img.src = scene[CHARACTER2IMG];
    character2img.style = "display: block;";
  } else {
    character2img.style = "display: none;";
  }

  document.getElementById("charactername").textContent = scene[CHARACTERNAME];
  document.getElementById("dialogue").innerHTML = scene[DIALOGUE];
  document.getElementById("sound").src = scene[SOUND];

  sceneNum++;
}

document.addEventListener("DOMContentLoaded", () => {
  redrawPage();
  document.getElementById("nextbutton").addEventListener("click", () => {
    if (sceneNum == scenarioElements[scenarioNum].length - 1) {
      const scene = scenarioElements[scenarioNum][sceneNum];
      showNextRoute(...scene);
    } else {
      redrawPage();
    }
  });
});
