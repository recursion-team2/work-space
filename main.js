// main.js

// 夜ごはんのデータを別ファイルから読み込む
import * as data from "./data.js";

// レシピサイトの基となるURL
const recipeBaseURL = 'https://cookpad.com/jp/search/';

// 地図サイトの基となるURL
const mapBaseURL = 'https://www.google.com/maps/search/?api=1&query=';

// -----------------------------------------------------------------------------
// 以下、夜ごはん提案アプリの処理
// -----------------------------------------------------------------------------

// コンソールにデバッグ情報を表示するか？
const debugMode = true;

// mainDishes,sideDishesのそれぞれの個数を取得
const NumberOfMainDishes = data.mainDishes.length;
const NumberOfSideDishes = data.sideDishes.length;

if (debugMode) {
  console.log(`[DEBUG] NumberOf...
    MainDishes: ${NumberOfMainDishes},
    SideDishes: ${NumberOfSideDishes}`);
}

// index.html にある要素を以下のコードで指定しやすくしています
const mainArea = document.getElementById('main');
const fortuneArea = document.getElementById('fortune');
const drawButton = document.getElementById('draw');
const retryButton = document.getElementById('retry');

const mainDishesElement = document.getElementById('first-menu');
const mainDishesDescriptionElement = document.getElementById('first-description');
const mainDishesPictureElement = document.getElementById('first-maindish-picture');
const sideDishesElement = document.getElementById('first-side-menu');
const sideDishesPictureElement = document.getElementById('first-sidemenue-picture')
const firstMenuRecipeLink = document.getElementById('first-menu-recipe-link');
const firstMenuMapLink = document.getElementById('first-menu-map-link')

const maskArea = document.getElementById('mask');
const aboutArea = document.getElementById('about');
const aboutButton = document.getElementById('show-about');
const developersArea = document.getElementById('developers');
const developersButton = document.getElementById('show-developers');
const footerArea = document.getElementById('footer');

// 晩ご飯をランダムで提案する
function drawDinner() {

  // 乱数を生成する
  const fortuneNumber = Math.trunc(Math.random() * 100 + 1); // [1 - 100]までの値
  if (debugMode) {
    console.log(`====================\n[DEBUG] fortuneNumber: ${fortuneNumber}`);
  }

  // mainDish をセットする
  let mainDish = data.mainDishes[fortuneNumber % NumberOfMainDishes]; // fortuneNumber に応じて必ず mainDishes のいずれかを割り当てる
  if (debugMode) console.log(`[DEBUG] mainDish: ${mainDish}`);

  // sideDish をセットする
  let sideDish = data.sideDishes[fortuneNumber % NumberOfSideDishes];
  if (debugMode) console.log(`[DEBUG] sideDish: ${sideDish}`);

  return [mainDish, sideDish];
}

// 夜ご飯の提案結果を表示する
function updateDinner() {
  const resultDinner = drawDinner(); // 提案する晩ご飯の結果（配列）を保存する変数
  mainDishesElement.textContent = resultDinner[0][0]; // mainDish の料理名
  //first-maindish-pictureElement.src = resultDinner[0][1]; // mainDish の 画像(実装まだ)
  mainDishesDescriptionElement.textContent = resultDinner[0][2]; // mainDish の説明文
  sideDishesElement.textContent = resultDinner[1][0]; // sideDish の料理名
  //first-sidedish-pictureElement.src = resultDinner[1][1]; // sideDish の 画像(実装まだ)

  const encodedMainDishName = encodeURIComponent(resultDinner[0][0]); // mainDish の料理名をエンコードする
  const nowOpen = encodeURIComponent(' 営業中'); // mapの絞り込み条件「 営業中」をエンコードする
  firstMenuRecipeLink.setAttribute('href', recipeBaseURL + encodedMainDishName); // レシピを調べるリンクの href 属性の値を置き換える
  firstMenuMapLink.setAttribute('href', mapBaseURL + encodedMainDishName + nowOpen); // 近くで食べられるところを探すリンクの href 属性の値を置き換える
}


// 夜ごはんを提案するボタンを押したとき
drawButton.addEventListener('click', () => {
  mainArea.classList.add('hide'); // 夜ごはんを提案するボタンの領域を隠す
  footerArea.classList.add('hide'); // このアプリについて・・・の領域を隠す
  fortuneArea.classList.remove('hide'); // 夜ごはん提案結果の領域を表示する
  updateDinner(); // 夜ごはん提案の結果を表示する
});

// もう一度やるボタンを押したとき
retryButton.addEventListener('click', () => {
  fortuneArea.classList.add('hide'); // 夜ごはん提案結果の領域を隠す
  mainArea.classList.remove('hide'); // 夜ごはん提案するボタンの領域を表示する
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