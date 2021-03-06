// 276. 栅栏涂色
// 有 k 种颜色的涂料和一个包含 n 个栅栏柱的栅栏，请你按下述规则为栅栏设计涂色方案：

// 每个栅栏柱可以用其中 一种 颜色进行上色。
// 相邻的栅栏柱 最多连续两个 颜色相同。
// 给你两个整数 k 和 n ，返回所有有效的涂色 方案数 。

// 示例 1：

// 输入：n = 3, k = 2
// 输出：6
// 解释：所有的可能涂色方案如上图所示。注意，全涂红或者全涂绿的方案属于无效方案，因为相邻的栅栏柱 最多连续两个 颜色相同。

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numWays = function(n, k) {
  // dp[i]表示[0, i]范围的栅栏柱的涂色方案
  let dp = Array(n + 1);

  dp[0] = 0;
  dp[1] = k;
  dp[2] = k * k;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] * (k - 1) + dp[i - 2] * 1 * (k - 1);
  }

  return dp[n];
};


/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numWays = function(n, k) {
  // dp[i] 表示给第i个栅栏涂色的方案数
  let dp = Array(n + 1);
  dp[0] = 0;

  // 只有1个栅栏可以有k种涂色方案
  dp[1] = k;
  // 只有2个栅栏时可以有k * k种涂色方案
  dp[2] = k * dp[1];

  for (let i = 3; i <= n; i++) {
    // 第i个栅栏的涂色方案数：
    // 1.第i个栅栏与前一个栅栏颜色不同，则第i个栅栏可选的颜色为k - 1种，相乘就是所有方案数
    let sum1 = dp[i - 1] * (k - 1);

    // 2.第i个栅栏与前一个栅栏颜色相同，则第i - 1个栅栏颜色不能与i - 2个栅栏颜色相同，第i个栅栏颜色只能与i - 1个栅栏颜色相同
    let sum2 = dp[i - 2] * 1 * (k - 1);

    dp[i] = sum1 + sum2;
  }
  
  return dp[n];
};

