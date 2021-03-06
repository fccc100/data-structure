// 329. 矩阵中的最长递增路径
// 给定一个 m x n 整数矩阵 matrix ，找出其中 最长递增路径 的长度。

// 对于每个单元格，你可以往上，下，左，右四个方向移动。 你 不能 在 对角线 方向上移动或移动到 边界外（即不允许环绕）。

// 示例 1：
// 输入：matrix = [[9,9,4],[6,6,8],[2,1,1]]
// 输出：4 
// 解释：最长递增路径为 [1, 2, 6, 9]。

// 递归
function longestIncreasingPath(matrix) {
  let m = matrix.length;
  let n = matrix[0].length;
  let dir = [[-1, 0], [1, 0], [0, 1], [0, -1]]

  // 从i，j点出发的最长递增路径
  function _longestIncreasingPath(matrix, i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n) {
      return 0;
    }

    let max = 1;
    for (let k = 0; k < dir.length; k++) {
      let i1 = i + dir[k][0];
      let j1 = j + dir[k][1];

      if (i1 >= 0 && i1 < m && j1 >= 0 && j1 < n && matrix[i1][j1] > matrix[i][j]) {
        max = Math.max(max, _longestIncreasingPath(matrix, i1, j1) + 1);
      }
    }

    return max;
  }

  let max = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      max = Math.max(max, _longestIncreasingPath(matrix, i, j));
    }
  }

  return max;
}

// 记忆化搜索
function longestIncreasingPath(matrix) {
  let m = matrix.length;
  let n = matrix[0].length;
  let dir = [[-1, 0], [1, 0], [0, 1], [0, -1]]
  let memo = Array(m);
  for (let i = 0; i < memo.length; i++) {
    memo[i] = Array(n);
  }

  // 从i，j点出发的最长递增路径
  function _longestIncreasingPath(matrix, i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n) {
      return 0;
    }
    if (memo[i][j] !== undefined) {
      return memo[i][j];
    }

    // 来到一个点时，最长路径默认是1，就是该点自身
    let max = 1;
    for (let k = 0; k < dir.length; k++) {
      let i1 = i + dir[k][0];
      let j1 = j + dir[k][1];

      // 当满足这些条件时，从其相邻点继续查找找出最大值
      if (i1 >= 0 && i1 < m && j1 >= 0 && j1 < n && matrix[i1][j1] > matrix[i][j]) {
        max = Math.max(max, _longestIncreasingPath(matrix, i1, j1) + 1);
      }
    }

    return memo[i][j] = max;
  }

  let max = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      max = Math.max(max, _longestIncreasingPath(matrix, i, j));
    }
  }

  return max;
}

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
  let m = matrix.length;
  if (!m) return 0;
  let n = matrix[0].length;

  let dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  let memo = Array(m);
  for (let i = 0; i < m; i++) {
    memo[i] = Array(n);
  }

  function dfs(matrix, i, j) {
    if (memo[i][j] !== undefined) {
      return memo[i][j];
    }

    let max = 1;
    for (let k = 0; k < dir.length; k++) {
      let newI = i + dir[k][0];
      let newJ = j + dir[k][1];
      if (newI >= 0 && newI < m && newJ >= 0 && newJ < n && matrix[newI][newJ] > matrix[i][j]) {
        max = Math.max(max, dfs(matrix, newI, newJ) + 1);
      }
    }
    return memo[i][j] = max;
  }

  let max = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      max = Math.max(max, dfs(matrix, i, j));
    }
  }
  return max;
};