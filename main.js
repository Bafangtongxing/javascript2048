var board = new Array(); //board是一个二维数组,4x4大小，
var added = new Array();
var score = 0;
var top = 240;
var best = localStorage.getItem("best") || 0;
$(document).ready(function (e) {
  newGame();
});

function newGame() {
  //初始化棋盘格
  init();
  //随机生成两个数字
  generateOneNumber();
  updateBoardView();
  generateOneNumber();
  updateBoardView();
}

function init() {
  score = 0;
  $(".score").html(score);
  $(".best").html(best);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let gridCell = $(`#grid-cell-${i}-${j}`);
      gridCell.css("top", getPosTop(i));
      gridCell.css("left", getPosLeft(j));
    }
  }

  for (let i = 0; i < 4; i++) {
    board[i] = new Array();
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0; //0代表格子为空
    }
  }

  for (let i = 0; i < 4; i++) {
    added[i] = new Array();
    for (let j = 0; j < 4; j++) {
      added[i][j] = 0;
    }
  }
  updateBoardView();
}

function updateBoardView() {
  $(".number-cell").remove();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      $(".grid-container").append(
        `<div class="number-cell" id="number-cell-${i}-${j}"></div>`
      );
      let theNumberCell = $(`#number-cell-${i}-${j}`);
      if (board[i][j] == 0) {
        theNumberCell.css({
          width: "0px",
          height: "0px",
          top: getPosTop(i),
          left: getPosLeft(j),
        });
      } else {
        theNumberCell.css({
          width: "100px",
          height: "100px",
          top: getPosTop(i),
          left: getPosLeft(j),
          backgroundColor: getNumberBackgroundColor(board[i][j]),
          color: getNumberColor(board[i][j]),
        });
        theNumberCell.text(board[i][j]);
      }
    }
  }
}

function generateOneNumber() {
  //生成随机的格子，如果棋盘没有空位，则返回
  if (nospace(board)) return false;
  //随机一个位置
  let randx = parseInt(Math.floor(Math.random() * 4));
  let randy = parseInt(Math.floor(Math.random() * 4));
  while (true) {
    if (board[randx][randy] == 0) break;
    randx = parseInt(Math.floor(Math.random() * 4));
    randy = parseInt(Math.floor(Math.random() * 4));
  }
  //随机一个数字,2或者4
  let randNumber = Math.random() < 0.5 ? 2 : 4;
  //在随机位置显示随机数字
  board[randx][randy] = randNumber;
  showNumberWithAnimation(randx, randy, randNumber);
  return true;
}

//键盘输入事件
$(document).keydown(function (e) {
  switch (e.keyCode) {
    case 37: //left
      if (canMoveLeft(board)) {
        moveLeft();
        update();
      }
      break;
    case 38: //up
      if (canMoveTop(board)) {
        moveTop();
        update();
      }
      break;
    case 39: //right
      if (canMoveRight(board)) {
        moveRight();
        update();
      }
      break;
    case 40: //down
      if (canMoveBottom(board)) {
        moveBottom();
        update();
      }
      break;
  }
});

//---------------------------------------------------------------------------
//以下四个函数实现向四个方向移动
function moveLeft() {
  isaddedArray();
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        for (let k = 0; k < j; k++) {
          if (board[i][k] === 0 && !blockHorizontal(i, k, j, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (
            board[i][k] == board[i][j] &&
            !blockHorizontal(i, k, j, board)
          ) {
            showMoveAnimation(i, j, i, k);
            if (added[i][k] != 0) {
              board[i][k + 1] = board[i][j];
              board[i][j] = 0;
            } else {
              board[i][k] += board[i][j];
              board[i][j] = 0;
              added[i][k] = 1;
              score += board[i][k];
            }
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
}

function moveTop() {
  isaddedArray();
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (let k = 0; k < i; k++) {
          if (board[k][j] === 0 && !blockVertical(j, k, i, board)) {
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (
            board[k][j] === board[i][j] &&
            !blockVertical(j, k, i, board)
          ) {
            showMoveAnimation(i, j, k, j);
            if (added[k][j] != 0) {
              board[k + 1][j] = board[i][j];
              board[i][j] = 0;
            } else {
              board[k][j] += board[i][j];
              board[i][j] = 0;
              added[k][j] = 1;
              score += board[k][j];
            }
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
}

function moveRight() {
  isaddedArray();
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        for (let k = 3; k > j; k--) {
          if (board[i][k] === 0 && !blockHorizontal(i, j, k, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (
            board[i][k] === board[i][j] &&
            !blockHorizontal(i, j, k, board)
          ) {
            showMoveAnimation(i, j, i, k);
            if (added[i][k] != 0) {
              board[i][k - 1] = board[i][j];
              board[i][j] = 0;
            } else {
              board[i][k] += board[i][j];
              board[i][j] = 0;
              added[i][k] = 1;
              score += board[i][k];
            }
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
}

function moveBottom() {
  isaddedArray();
  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (let k = 3; k > i; k--) {
          if (board[k][j] === 0 && !blockVertical(j, i, k, board)) {
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (
            board[k][j] === board[i][j] &&
            !blockVertical(j, i, k, board)
          ) {
            showMoveAnimation(i, j, k, j);
            if (added[k][j] != 0) {
              board[k - 1][j] = board[i][j];
              board[i][j] = 0;
            } else {
              board[k][j] += board[i][j];
              board[i][j] = 0;
              added[k][j] = 1;
              score += board[k][j];
            }
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
}
