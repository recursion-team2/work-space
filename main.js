// main.js

// -----------------------------------------------------------------------------
// おみくじの内容（別ファイルにした方が良いかもしれない）
// -----------------------------------------------------------------------------
const fortuneTitles = {
  "dai-kichi": "大吉",
  "kichi": "吉",
  "kyou": "凶",
}

const luckyColors = [
  ["赤色", "red", "赤色はエネルギーと情熱の象徴。身の回りに赤いアイテムを置くと、やる気が湧き、ポジティブな気持ちになれるでしょう。元気をチャージして、どんな困難も乗り越えられる力をくれます。"],
  ["青色", "lightblue", "青色は冷静さと安心感を与えてくれます。心を落ち着け、前向きな考えを促進。青い空や海を思い浮かべると、心がスッキリして、明日への希望が湧いてきます。"],
  ["緑色", "lightgreen", "緑色は自然と調和を象徴し、心を穏やかにしてくれる色。身近な緑を意識することで、リラックスし、疲れが癒され、前向きなエネルギーが充電されるような気持ちになります。"],
  ["黄色", "lightyellow", "黄色は明るさと幸運を引き寄せる色です。周囲に黄色いものを取り入れると、自然と笑顔が増し、良い運気が舞い込むでしょう。ポジティブなエネルギーを感じることで、毎日が楽しくなります。"],
];

const luckyFoods = [
  ["おにぎり", "おにぎりは心を温かくしてくれる幸せの味。大切な人と一緒に食べれば、楽しい時間が流れ、元気がみなぎります。忙しい日でも、おにぎり一つでホッとできる瞬間を大切に。"],
  ["ラーメン", "ラーメンは温かさと安心感を与えてくれる一杯。香りと味に包まれ、どんな疲れも吹き飛ばす力をくれます。ラーメンの熱々のスープで、元気と幸運を一緒に摂取しましょう。"],
  ["うどん", "うどんはシンプルで心がほっこりする食べ物。温かい一杯で、気持ちが安らぎ、毎日の疲れをリセットできます。うどんを食べると、前向きなエネルギーが自然に湧き上がります。"],
];

const luckyPlaces = [
  ["海", "海は無限の広がりと安らぎを感じさせてくれる場所。波の音や広大な景色に心がリフレッシュされ、元気が湧いてきます。海の力で、心も体もリセットして、新しいスタートを切りましょう。"],
  ["森", "森は静けさと癒しのエネルギーを与えてくれます。木々に囲まれることで、心が落ち着き、疲れが取れ、前向きな気持ちを取り戻せます。自然と触れ合うことで、元気をチャージできる場所です。"],
  ["公園", "公園はリフレッシュの場所。緑の中で深呼吸をすると、心も体も軽くなり、前向きなエネルギーを感じます。散歩やピクニックを楽しむことで、幸せな気持ちが広がります。"],
]

// -----------------------------------------------------------------------------
// 以下、おみくじアプリの処理
// -----------------------------------------------------------------------------

// コンソールにデバッグ情報を表示するか？
const debugMode = true;

// おみくじの内容の個数をそれぞれ取得
const NumberOfFortuneTitles = Object.keys(fortuneTitles).length;
const NumberOfLuckyColors = luckyColors.length;
const NumberOfLuckyFoods = luckyFoods.length;
const NumberOfLuckyPlaces = luckyPlaces.length;
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

// おみくじを引く
function drawFortune() {

  // 乱数を生成する
  const fortuneNumber = Math.trunc(Math.random() * 10 + 1); // [1 - 10]までの値
  if (debugMode) {
    console.log(`====================\n[DEBUG] fortuneNumber: ${fortuneNumber}`);
  }

  // fortuneTitle をセットする
  let fortuneTitle = fortuneTitles["kichi"];
  if (fortuneNumber === 7) {
    fortuneTitle = fortuneTitles["dai-kichi"];
  }
  if (fortuneNumber === 9) {
    fortuneTitle = fortuneTitles["kyou"];
  }
  if (debugMode) console.log(`[DEBUG] fortuneTitle: ${fortuneTitle}`);

  // luckyColor をセットする
  let luckyColor = luckyColors[fortuneNumber % NumberOfLuckyColors]; // fortuneNumber に応じて必ず luckyColors のいずれかを割り当てる
  if (debugMode) console.log(`[DEBUG] luckyColor: ${luckyColor}`);

  // luckyFood をセットする
  let luckyFood = luckyFoods[fortuneNumber % NumberOfLuckyFoods];
  if (debugMode) console.log(`[DEBUG] luckyFood: ${luckyFood}`);

  // luckyPlace をセットする
  let luckyPlace = luckyPlaces[fortuneNumber % NumberOfLuckyPlaces];
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
  fortuneArea.classList.remove('hide'); // おみくじの結果の領域を表示する
  updateFortune(); // おみくじの結果を表示する
});

// もう一度やるボタンを押したとき
retryButton.addEventListener('click', () => {
  fortuneArea.classList.add('hide'); // おみくじの結果の領域を隠す
  mainArea.classList.remove('hide'); // おみくじを引くボタンの領域を表示する
});
