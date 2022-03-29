// 69. x 的平方根 
// 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。

// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。

// 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

// 示例 1：
// 输入：x = 4
// 输出：2

function mySqrt(x) {
  let l = 1;
  let r = x;
  let res = 0;
  while(l <= r) {
    let mid = l + (r - l >> 1);
    if (mid * mid <= x) {
      res = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return res;
}