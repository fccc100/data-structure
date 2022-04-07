// 131. 分割回文串
// 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。

// 回文串 是正着读和反着读都一样的字符串。

// 示例 1：
// 输入：s = "aab"
// 输出：[["a","a","b"],["aa","b"]]

var partition = function (s) {
  let res = [];

  function _partition(s, index, path) {
    if (index >= s.length) {
      res.push([...path]);
      return;
    }
    for (let i = index; i < s.length; i++) {
      if (!isPalindrome(s, index, i)) continue;
      path.push(s.substr(index, i - index + 1));
      _partition(s, i + 1, path);
      path.pop();
    }
  }

  _partition(s, 0, []);
  return res;
};

function isPalindrome(s, i, j) {
  for (let l = i, r = j; l < r; l++, r--) {
    if (s[l] != s[r]) return false;
  }
  return true;
}