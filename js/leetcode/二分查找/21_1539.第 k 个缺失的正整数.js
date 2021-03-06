// 1539. 第 k 个缺失的正整数
// 给你一个 严格升序排列 的正整数数组 arr 和一个整数 k 。

// 请你找到这个数组里第 k 个缺失的正整数。

// 示例 1：

// 输入：arr = [2,3,4,7,11], k = 5
// 输出：9
// 解释：缺失的正整数包括 [1,5,6,8,9,10,12,13,...] 。第 5 个缺失的正整数为 9 。

// [1,2,3,4,5,6,7,8,9,10,11]
// [2,3,4,7,11]
function findKthPositive(arr, k) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= k) {
      k++;
    }
  }
  return k;
}