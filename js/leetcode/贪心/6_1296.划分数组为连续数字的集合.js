// 1296. 划分数组为连续数字的集合
// 给你一个整数数组 nums 和一个正整数 k，请你判断是否可以把这个数组划分成一些由 k 个连续数字组成的集合。
// 如果可以，请返回 true；否则，返回 false。

// 示例 1：

// 输入：nums = [1,2,3,3,4,4,5,6], k = 4
// 输出：true
// 解释：数组可以分成 [1,2,3,4] 和 [3,4,5,6]。
// 示例 2：

// 输入：nums = [3,2,1,2,3,4,3,4,5,9,10,11], k = 3
// 输出：true
// 解释：数组可以分成 [1,2,3] , [2,3,4] , [3,4,5] 和 [9,10,11]。
// 示例 3：

// 输入：nums = [3,3,2,2,1,1], k = 3
// 输出：true
// 示例 4：

// 输入：nums = [1,2,3,4], k = 3
// 输出：false
// 解释：数组不能分成几个大小为 3 的子数组。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var isPossibleDivide = function(nums, k) {
  let n = nums.length;
  if (n % k != 0) {
    return false;
  }

  nums.sort((a, b) => a - b);

  // 统计元素个数
  let cntMap = new Map();
  for (let i = 0; i < n; i++) {
    cntMap.set(nums[i], cntMap.get(nums[i]) ? cntMap.get(nums[i]) + 1 : 1);
  }

  for (let i = 0; i < n; i++) {
    if (!cntMap.has(nums[i])) {
      continue;
    }

    for (let j = 0; j < k; j++) {
      let num = nums[i] + j;
      if (!cntMap.has(num)) {
        return false;
      }

      cntMap.set(num, cntMap.get(num) - 1);
      if (cntMap.get(num) == 0) {
        cntMap.delete(num);
      }
    }
  }
  return true;
};