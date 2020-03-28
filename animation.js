//生成数字动画
function showNumberWithAnimation(i, j, randNumber) {
  var numberCell = $(`#number-cell-${i}-${j}`);
  numberCell.css("background-color", getNumberBackgroundColor(randNumber));
  numberCell.css("color", getNumberColor(randNumber));
  numberCell.text(randNumber);
  numberCell.animate(
    {
      width: "100px",
      height: "100px",
      top: getPosTop(i, j),
      left: getPosLeft(i, j)
    },
    1000
  );
}

//数字移动动画
function showMoveAnimation(fromX, fromY, toX, toY) {
  var numberCell = $(`#number-cell-${fromX}-${fromY}`);
  numberCell.animate(
    { top: getPosTop(toX, toY), left: getPosLeft(toX, toY) },
    1000,
    "swing"
  );
}
