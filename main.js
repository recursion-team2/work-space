// main.js

// おみくじのデータを別ファイルから読み込む
import * as data from "./data.js";

// -----------------------------------------------------------------------------
// 以下、おみくじアプリの処理
// -----------------------------------------------------------------------------

// コンソールにデバッグ情報を表示するか？
const debugMode = true;

// mainDishes,sideDishesのそれぞれの個数を取得
const NumberOfFortuneTitles = Object.keys(data.fortuneTitles).length;//削除でも良い？
const NumberOfMainDishes = data.mainDishes.length;
const NumberOfSideDishes = data.sideDishes.length;

if (debugMode) {
  console.log(`[DEBUG] NumberOf...
    FortuneTitles: ${NumberOfFortuneTitles},
    MainDishes: ${NumberOfMainDishes},
    SideDishes: ${NumberOfSideDishes}`);
}

// index.html にある要素を以下のコードで指定しやすくしています
const mainArea = document.getElementById('main');
const fortuneArea = document.getElementById('fortune');
const drawButton = document.getElementById('draw');
const retryButton = document.getElementById('retry');

const fortuneTitleElement = document.getElementById('fortune-title');//削除でも良い？
const mainDishesElement = document.getElementById('first-menu');
const mainDishesDescriptionElement = document.getElementById('first-description');
const mainDishesPictureElement = document.getElementById('first-maindish-picture');
const sideDishesElement = document.getElementById('first-side-menu');
const sideDishesPictureElement = document.getElementById('first-sidemenue-picture')

const maskArea = document.getElementById('mask');
const aboutArea = document.getElementById('about');
const aboutButton = document.getElementById('show-about');
const developersArea = document.getElementById('developers');
const developersButton = document.getElementById('show-developers');
const footerArea = document.getElementById('footer');

// おみくじを引く
function drawFortune() {

  // 乱数を生成する
  const fortuneNumber = Math.trunc(Math.random() * 10 + 1); // [1 - 10]までの値 -->料理が9個なので10が出た場合エラーとなる？
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

  // mainDish をセットする
  let mainDish = data.mainDishes[fortuneNumber % NumberOfMainDishes]; // fortuneNumber に応じて必ず mainDishes のいずれかを割り当てる
  if (debugMode) console.log(`[DEBUG] mainDish: ${mainDish}`);

  // sideDish をセットする
  let sideDish = data.sideDishes[fortuneNumber % NumberOfSideDishes];
  if (debugMode) console.log(`[DEBUG] sideDish: ${sideDish}`);

  return [fortuneTitle, mainDish, sideDish];
}

// おみくじの結果を表示する
function updateFortune() {
  const resultFortune = drawFortune(); // おみくじを引いた結果（配列）を保存する変数
  fortuneTitleElement.textContent = resultFortune[0]; // fortuneTitle
  mainDishesElement.textContent = resultFortune[1][0]; // mainDish の料理名
  //first-maindish-pictureElement.src = resultFortune[1][1]; // mainDish の 画像(実装まだ)
  mainDishesDescriptionElement.textContent = resultFortune[1][2]; // mainDish の説明文
  sideDishesElement.textContent = resultFortune[2][0]; // sideDish の料理名
  //first-sidedish-pictureElement.src = resultFortune[1][1]; // sideDish の 画像(実装まだ)
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