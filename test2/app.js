const stores = [
    "Adidas", "ARCTERY", "Beams", "Bottega", "Boss", "Colehaan", "Calvin Klein",
    "loewe", "NEWERA", "Goldwin", "Kenzo", "nano universe", "New Balance",
    "Onitsuka Tiger", "Patagonia", "Regal", "Ray-ban", "FRED PERRY", "shipps",
    "asics", "ace", "Polo Ralph Lauren", "Lego", "Stussy", "Marni", "Nike",
    "lacoste", "Callway"
  ];
  
  const players = ["せな", "なかまん", "かい", "にき"];
  let turnIndex = -1;
  let round = 0;
  
  let commonDobons = []; // 共通ドボン店5つ
  let bigDobon = "";
  let personalDobons = {}; // プレイヤーごと
  
  function populateSelectOptions(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = stores.map(store => `<option value="${store}">${store}</option>`).join("");
  }
  
  function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("visible"));
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    const el = document.getElementById(screenId);
    el.classList.remove("hidden");
    el.classList.add("visible");
  }
  
  function saveDobons() {
    // 共通ドボン5つ取得
    const selectedCommon = [
      document.getElementById("commonDobon1").value,
      document.getElementById("commonDobon2").value,
      document.getElementById("commonDobon3").value,
      document.getElementById("commonDobon4").value,
      document.getElementById("commonDobon5").value
    ];
  
    // 重複チェック
    const uniqueSet = new Set(selectedCommon);
    if (uniqueSet.size !== 5) {
      alert("共通ドボン店は重複せず5つ選んでください。");
      return;
    }
  
    commonDobons = selectedCommon;
  
    bigDobon = document.getElementById("bigDobon").value;
  
    personalDobons = {
      "せな": document.getElementById("dobonSena").value,
      "なかまん": document.getElementById("dobonNakaman").value,
      "かい": document.getElementById("dobonKai").value,
      "にき": document.getElementById("dobonNiki").value
    };
  
    turnIndex = -1;
    round = 0;
    nextTurn();
  }
  
  function confirmStore() {
    const store = document.getElementById("storeChoice").value;
    const currentPlayer = players[turnIndex];
    let result = "セーフ！";
  
    // 1周目は1人ごとに共通ドボン店が-1されるルール
    const effectiveCount = Math.max(0, 5 - round);
    const effectiveDobons = commonDobons.slice(0, effectiveCount);
  
    if (effectiveDobons.includes(store)) {
      result = `共通ドボン店(${store})でアウト！`;
    } else if (store === bigDobon) {
      result = `共通オオドボン店(${store})でアウト！`;
    } else if (store === personalDobons[currentPlayer]) {
      result = `${currentPlayer}のパーソナルドボン店(${store})でアウト！`;
    }
  
    document.getElementById("resultText").textContent = result;
    showScreen("screen3");
  }
  
  function nextTurn() {
    turnIndex++;
    if (turnIndex >= players.length) {
      turnIndex = 0;
      round++;
    }
  
    document.getElementById("playerLabel").textContent = `${players[turnIndex]} の番です`;
    populateSelectOptions("storeChoice");
    showScreen("screen2");
  }
  
  window.onload = () => {
    ["commonDobon1", "commonDobon2", "commonDobon3", "commonDobon4", "commonDobon5",
      "bigDobon", "dobonSena", "dobonNakaman", "dobonKai", "dobonNiki"].forEach(id => populateSelectOptions(id));
    showScreen("screen1");
  };
  