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
const debugMode = false;

// mainDishes,sideDishesのそれぞれの個数を取得
const numberOfMainDishes = data.mainDishes.length;
const numberOfSideDishes = data.sideDishes.length;

if (debugMode) {
  console.log(`[DEBUG] numberOf...
    MainDishes: ${numberOfMainDishes},
    SideDishes: ${numberOfSideDishes}`);
}

// index.html にある要素を以下のコードで指定しやすくしています
const mainArea = document.getElementById('main');
const dinnerArea = document.getElementById('dinner');
const drawButton = document.getElementById('draw');
const retryButton = document.getElementById('retry');

const mainDishesElement = document.getElementById('first-menu');
const mainDishesDescriptionElement = document.getElementById('first-description');
const mainDishesPictureElement = document.getElementById('first-maindish-picture');
const sideDishesElement = document.getElementById('first-side-menu');
const sideDishesPictureElement = document.getElementById('first-side-menu-picture')
const firstMenuRecipeLink = document.getElementById('first-menu-recipe-link');
const firstMenuMapLink = document.getElementById('first-menu-map-link')

const maskArea = document.getElementById('mask');
const aboutArea = document.getElementById('about');
const aboutButton = document.getElementById('show-about');
const developersArea = document.getElementById('developers');
const developersButton = document.getElementById('show-developers');
const footerArea = document.getElementById('footer');

const targetArea = document.getElementById('target');
const snsShare = document.getElementById('x-share');

// 晩ご飯をランダムで提案する
function drawDinner() {

  // 主菜の乱数を生成する
  const mainDinnerNumber = Math.trunc(Math.random() * 100); // [0 - 99]までの値
  if (debugMode) {
    console.log(`====================\n[DEBUG] mainDinnerNumber: ${mainDinnerNumber}`);
  }

  // mainDish をセットする
  let mainDish = data.mainDishes[mainDinnerNumber % numberOfMainDishes]; // mainDinnerNumber に応じて必ず mainDishes のいずれかを割り当てる
  if (debugMode) console.log(`[DEBUG] mainDish: ${mainDish}`);

  // 副菜の乱数を生成する
  const sideDinnerNumber = Math.trunc(Math.random() * 100); // [0 - 99]までの値
  if (debugMode) {
    console.log(`[DEBUG] sideDinnerNumber: ${sideDinnerNumber}`);
  }
  // sideDish をセットする
  let sideDish = data.sideDishes[sideDinnerNumber % numberOfSideDishes];
  if (debugMode) console.log(`[DEBUG] sideDish: ${sideDish}`);

  return [mainDish, sideDish];
}



// 夜ご飯の提案結果を表示する
function updateDinner() {
  const resultDinner = drawDinner(); // 提案する晩ご飯の結果（配列）を保存する変数
  mainDishesElement.textContent = resultDinner[0][0]; // mainDish の料理名
  mainDishesPictureElement.src = resultDinner[0][1]; // mainDish の 画像
  mainDishesDescriptionElement.textContent = resultDinner[0][2]; // mainDish の説明文
  sideDishesElement.textContent = resultDinner[1][0]; // sideDish の料理名
  sideDishesPictureElement.src = resultDinner[1][1]; // sideDish の 画像

  const encodedMainDishName = encodeURIComponent(resultDinner[0][0]); // mainDish の料理名をエンコードする
  const nowOpen = encodeURIComponent(' 営業中'); // mapの絞り込み条件「 営業中」をエンコードする
  firstMenuRecipeLink.href = recipeBaseURL + encodedMainDishName; // レシピを調べるリンクの href 属性の値を置き換える
  firstMenuMapLink.href = mapBaseURL + encodedMainDishName + nowOpen; // 近くで食べられるところを探すリンクの href 属性の値を置き換える
  
  // シェア内容の設定を追加
  if (snsShare) {
    // シェアするテキストを設定
    const shareText = encodeURIComponent(`今日の夜ごはんは「${resultDinner[0][0]}」と「${resultDinner[1][0]}」に決まりました！ #くじ引き夜ごはん`);
    
    // data-text属性を設定
    snsShare.setAttribute('data-text', shareText);
    
  }
  
}


// 夜ごはんを提案するボタンを押したとき
drawButton.addEventListener('click', () => {
  mainArea.classList.add('hide'); // 夜ごはんを提案するボタンの領域を隠す
  footerArea.classList.add('hide'); // このアプリについて・・・の領域を隠す
  targetArea.classList.add('fix-width'); // 親divの幅を固定して表示崩れを防ぐ
  dinnerArea.classList.remove('hide'); // 夜ごはん提案結果の領域を表示する
  updateDinner(); // 夜ごはん提案の結果を表示する
});

// もう一度やるボタンを押したとき
retryButton.addEventListener('click', () => {
  dinnerArea.classList.add('hide'); // 夜ごはん提案結果の領域を隠す
  targetArea.classList.remove('fix-width'); // 親divの幅固定を解除
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