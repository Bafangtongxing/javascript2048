function getPosTop(i) {
  return 20 + i * 120;
}

function getPosLeft(j) {
  return 20 + j * 120;
}

//数字的背景颜色
function getNumberBackgroundColor(number) {
  switch (number) {
    case 2:
      return "#eee4da";
    case 4:
      return "#ede0c8";
    case 8:
      return "#f2b179";
    case 16:
      return "#f59563";
    case 32:
      return "#f67c5f";
    case 64:
      return "#f65e3b";
    case 128:
      return "#edcf72";
    case 256:
      return "#edcc61";
    case 512:
      return "#9c0";
    case 1024:
      return "#3365a5";
    case 2048:
      return "#09c";
  }
  return "black";
}

//数字的颜色
function getNumberColor(number) {
  if (number <= 4) {
    return "#776e65";
  }
  return "#f9f6f2";
}

function isaddedArray() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      added[i][j] = 0;
    }
  }
}

//判断水平方向是否有障碍物
function blockHorizontal(row, col1, col2, board) {
  for (let i = col1 + 1; i < col2; i++) {
    if (board[row][i] != 0) return true;
  }
  return false;
}

//判断竖直方向是否有障碍物
function blockVertical(col, row1, row2, board) {
  for (let i = row1 + 1; i < row2; i++) {
    if (board[i][col] != 0) return true;
  }
  return false;
}

//---------------------------------------------------------------------
//下面四个函数判断是否能向上下左右移动

//判断能否左移
function canMoveLeft(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

//判断能否上移
function canMoveTop(board) {
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

//判断能否右移
function canMoveRight(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}
//判断能否下移
function canMoveBottom(board) {
  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}
//-------------------------------------------------------------------------

function updateScore() {
  $(".score").html(score);
}

//在随机生成数字前判断16宫格中是否还有空
function nospace(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}
function canmove(board) {
  return (
    canMoveLeft(board) ||
    canMoveRight(board) ||
    canMoveTop(board) ||
    canMoveBottom(board)
  );
}

function update() {
  updateScore();
  generateOneNumber();
  updateBoardView();
  isVictory();
  setTimeout(isGameover, 500);
}

function isGameover() {
  if (nospace(board) && !canmove(board)) {
    gameover();
  }
}

function isVictory() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 2048) {
        victory();
      }
    }
  }
}

function gameover() {
  $(".grid-container").addClass("gameover");
  if (score > best) {
    best = score;
    localStorage.setItem("best", best);
  }
  let answer = confirm(
    `Game Over! 你的分数是 ${score} 分! 再来一局吗？`,
    "再来一局!",
    "不玩了不玩了"
  );
  if (answer) {
    newGame();
    location.reload();
  } else {
    window.close();
  }
}

function victory() {
  if (score > best) {
    best = score;
    localStorage.setItem("best", best);
  }
  let answer = confirm(
    `恭喜你通关了，太强了! 再来一局吗？`,
    "再来一局!",
    "不玩了不玩了"
  );
  if (answer) {
    newGame();
    location.reload();
  } else {
    window.close();
  }
}
