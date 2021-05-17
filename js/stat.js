'use strict';
var CLOUD_WIDTH = 420; //ширина окна
var CLOUD_HEIGHT = 270; //высота окна
var CLOUD_X = 100; //координаты окна по оси X
var CLOUD_Y = 10; //координаты окна по оси Y
var GAP = 10; // смещение тени
var COLUMNS_HEIGHT= 150; //высота столбца
var COLUMNS_WIDTH = 40; //ширина столбца
var COLUMNS_GAP = 50; //расстояние между столбцами
var TEXT_GAP = 15; //
var FONT = '16px PT Mono'; //Параметры шрифта
var FONT_BASELINE = 'hanging'; //относительно чего рисуется шрифт

//Отрисовка облачка
var renderCloud = function(ctx, x,y,color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

//Максимальный элемент:
var findMaxElement = function (array) {
  var maxElement = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};
var getRandomColor = function () {
  return 'hsl(240, ' + (Math.floor(Math.random() * 100) + '%') + ', 50%)';
};

//Всплывающее окно:
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "white");
  var maxTime = findMaxElement(times);

  //Сводка о том, что Вы победили
  ctx.fillStyle = "red";
  ctx.font = FONT;
  ctx.textBaseline = FONT_BASELINE;
  ctx.fillText('Ура, вы победили!', 115, 25);
  ctx.fillText('Список результатов:', 115, 45);

  // Рисуем гистограмму:
  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      (ctx.fillStyle = 'rgba(255, 0, 0, 1)');
    } else {
      (ctx.fillStyle = getRandomColor());
    }
    times[i] = Math.round(times[i]);
    ctx.fillRect(CLOUD_X + COLUMNS_GAP + (COLUMNS_WIDTH  + COLUMNS_GAP) * i, 240- COLUMNS_HEIGHT * times[i] / maxTime, COLUMNS_WIDTH , COLUMNS_HEIGHT * times[i] / maxTime);
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], CLOUD_X + (COLUMNS_WIDTH + COLUMNS_GAP) * i + COLUMNS_GAP, 240 + TEXT_GAP );
    ctx.fillText(times[i], CLOUD_X  + (COLUMNS_WIDTH  + COLUMNS_GAP) * i + COLUMNS_GAP, 220- COLUMNS_HEIGHT * times[i] / maxTime - TEXT_GAP  / 2);
  }
};
















