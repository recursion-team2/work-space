// main.js

// おみくじのデータを別ファイルから読み込む
import * as data from "./data.js";

// -----------------------------------------------------------------------------
// 以下、おみくじアプリの処理
// -----------------------------------------------------------------------------

// コンソールにデバッグ情報を表示するか？
const debugMode = true;

// おみくじの内容の個数をそれぞれ取得
const NumberOfFortuneTitles = Object.keys(data.fortuneTitles).length;
const NumberOfLuckyColors = data.luckyColors.length;
const NumberOfLuckyFoods = data.luckyFoods.length;
const NumberOfLuckyPlaces = data.luckyPlaces.length;
if (debugMode) {
  console.log(`[DEBUG] NumberOf...
    FortuneTitles: ${NumberOfFortuneTitles},
    LuckyColors: ${NumberOfLuckyColors},
    LuckyFoods: ${NumberOfLuckyFoods},
    LuckyPlaces: ${NumberOfLuckyPlaces}`);
}

// index.html にある要素を以下のコードで指定しやすくしています
const mainArea = document.getElementById('main');
const fortuneArea = document.getElementById('fortune');
const drawButton = document.getElementById('draw');
const retryButton = document.getElementById('retry');

const fortuneTitleElement = document.getElementById('fortune-title');
const luckyColorElement = document.getElementById('lucky-color');
const luckyFoodElement = document.getElementById('lucky-food');
const luckyPlaceElement = document.getElementById('lucky-place');

const maskArea = document.getElementById('mask');
const aboutArea = document.getElementById('about');
const aboutButton = document.getElementById('show-about');
const developersArea = document.getElementById('developers');
const developersButton = document.getElementById('show-developers');
const footerArea = document.getElementById('footer');

// おみくじを引く
function drawFortune() {

  // 乱数を生成する
  const fortuneNumber = Math.trunc(Math.random() * 10 + 1); // [1 - 10]までの値
  if (debugMode) {
    console.log(`====================\n[DEBUG] fortuneNumber: ${fortuneNumber}`);
  }

  // fortuneTitle をセットする
  let fortuneTitle = data.fortuneTitles["kichi"];
  if (fortuneNumber === 7) {
    fortuneTitle = data.fortuneTitles["dai-kichi"];
  }
  if (fortuneNumber === 9) {
    fortuneTitle = data.fortuneTitles["kyou"];
  }
  if (debugMode) console.log(`[DEBUG] fortuneTitle: ${fortuneTitle}`);

  // luckyColor をセットする
  let luckyColor = data.luckyColors[fortuneNumber % NumberOfLuckyColors]; // fortuneNumber に応じて必ず luckyColors のいずれかを割り当てる
  if (debugMode) console.log(`[DEBUG] luckyColor: ${luckyColor}`);

  // luckyFood をセットする
  let luckyFood = data.luckyFoods[fortuneNumber % NumberOfLuckyFoods];
  if (debugMode) console.log(`[DEBUG] luckyFood: ${luckyFood}`);

  // luckyPlace をセットする
  let luckyPlace = data.luckyPlaces[fortuneNumber % NumberOfLuckyPlaces];
  if (debugMode) console.log(`[DEBUG] luckyPlace: ${luckyPlace}`);

  return [fortuneTitle, luckyColor, luckyFood, luckyPlace];
}

// おみくじの結果を表示する
function updateFortune() {
  const resultFortune = drawFortune(); // おみくじを引いた結果（配列）を保存する変数
  fortuneTitleElement.textContent = resultFortune[0]; // fortuneTitle
  luckyColorElement.textContent = resultFortune[1][0]; // luckyColor の色名
  fortuneArea.style.backgroundColor = resultFortune[1][1]; // luckyColor の 色コード
  luckyColorElement.textContent += resultFortune[1][2]; // luckyColor の説明文
  luckyFoodElement.textContent = resultFortune[2]; // luckyFood の配列（食べ物名, 説明文）
  luckyPlaceElement.textContent = resultFortune[3]; // luckyPlace の配列（場所名, 説明文）
}


// おみくじを引くボタンを押したとき
drawButton.addEventListener('click', () => {
  mainArea.classList.add('hide'); // おみくじを引くボタンの領域を隠す
  footerArea.classList.add('hide'); // このアプリについて・・・の領域を隠す
  fortuneArea.classList.remove('hide'); // おみくじの結果の領域を表示する
  updateFortune(); // おみくじの結果を表示する
});

// もう一度やるボタンを押したとき
retryButton.addEventListener('click', () => {
  fortuneArea.classList.add('hide'); // おみくじの結果の領域を隠す
  mainArea.classList.remove('hide'); // おみくじを引くボタンの領域を表示する
  footerArea.classList.remove('hide'); // このアプリについて・・・の領域を表示する
});


// このアプリについてボタンをクリックしたとき
const toggleAboutArea = () => {
  mask.classList.toggle('hide');
  aboutArea.classList.toggle('hide');
}

aboutButton.addEventListener('click', toggleAboutArea);

// アプリについての領域をクリックしたとき
aboutArea.addEventListener('click', toggleAboutArea);


// 開発者一覧のボタンをクリックしたとき
const toggleDevelopersArea = () => {
  maskArea.classList.toggle('hide');
  developersArea.classList.toggle('hide');
}

developersButton.addEventListener('click', toggleDevelopersArea);

// 開発者一覧の領域をクリックしたとき
developersArea.addEventListener('click', toggleDevelopersArea);

// マスク領域をクリックしたとき
const hideBothArea = () => {
  maskArea.classList.add('hide');
  aboutArea.classList.add('hide');
  developersArea.classList.add('hide');
}

maskArea.addEventListener('click', hideBothArea);